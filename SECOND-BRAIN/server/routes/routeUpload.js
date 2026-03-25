import { Router } from 'express'
import path from 'path'
import authMiddleware from '../middleware/authMiddleware.js'
import upload from '../config/multer.js'
import Item from '../models/Item.js'
import getPineconeIndex from '../config/pinecone.js'
import { getEmbedding } from '../utils/embeddings.js'
import { extractTextFromPDF, getFileType, deleteFile } from '../utils/fileHandler.js'

const router = Router()

router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const filePath = req.file.path
    const fileType = getFileType(req.file.mimetype)
    let content    = ''

    // PDF se text extract karo
    if (fileType === 'pdf') {
      content = await extractTextFromPDF(filePath) || ''
    }

    // Groq se analyze karo
    const { analyzeContent } = await import('../controllers/aiController.js')

    const itemData = {
      title:   req.file.originalname.replace(/\.[^.]+$/, ''),
      type:    fileType,
      content: content,
      summary: content.slice(0, 200) || `${fileType} file`,
      tags:    [fileType],
      url:     `/uploads/${path.basename(filePath)}`,
      user:    req.user._id,
    }

    const item = await Item.create(itemData)

    // Pinecone mein store karo
    try {
      const text      = `${item.title} ${item.summary} ${item.tags.join(' ')} ${content.slice(0, 500)}`
      const embedding = await getEmbedding(text)
      if (embedding && Array.isArray(embedding) && embedding.length === 384) {
        const index = getPineconeIndex()
        await index.upsert([{
          id:     item._id.toString(),
          values: embedding,
          metadata: {
            title:  item.title,
            type:   item.type,
            tags:   item.tags.join(','),
            userId: req.user._id.toString(),
          }
        }])
        console.log('✅ Pinecone upsert successful')
      }
    } catch (pineconeErr) {
      console.error('❌ Pinecone error:', pineconeErr.message)
    }

    // Temp file delete karo
    deleteFile(filePath)

    res.status(201).json(item)
  } catch (err) {
    console.error('Upload error:', err.message)
    res.status(500).json({ message: err.message })
  }
})

// Serve uploaded files
router.use('/files', authMiddleware, (req, res) => {
  res.sendFile(path.resolve('uploads', req.path.slice(1)))
})

export default router