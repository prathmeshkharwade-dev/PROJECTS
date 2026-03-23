import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import Item from '../models/Item.js'
import getPineconeIndex from '../config/pinecone.js'
import { getEmbedding } from '../utils/embeddings.js'

const router = Router()

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { q } = req.query
    if (!q) return res.json([])

    const embedding = await getEmbedding(q)

    if (embedding && Array.isArray(embedding) && embedding.length === 384) {
      const index   = getPineconeIndex()
      const results = await index.query({
        vector:          embedding,
        topK:            10,
        includeMetadata: true,
        filter:          { userId: req.user._id.toString() }
      })

      const ids = results.matches
        .filter(m => m.score > 0.3)
        .map(m => m.id)

      if (ids.length > 0) {
        const items = await Item.find({
          _id:  { $in: ids },
          user: req.user._id
        })
        return res.json(items)
      }
    }

    // Fallback — MongoDB search
    const items = await Item.find({
      user: req.user._id,
      $or: [
        { title:   { $regex: q, $options: 'i' } },
        { summary: { $regex: q, $options: 'i' } },
        { tags:    { $regex: q, $options: 'i' } },
      ]
    })

    res.json(items)
  } catch (err) {
    console.error('Search error:', err.message)
    res.status(500).json({ message: err.message })
  }
})

export default router