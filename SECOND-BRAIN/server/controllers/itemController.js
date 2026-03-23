import Item from '../models/Item.js'
import getPineconeIndex from '../config/pinecone.js'
import { getEmbedding } from '../utils/embeddings.js'

const upsertToPinecone = async (id, embedding, metadata) => {
  const index = getPineconeIndex()
  await index.upsert([
    {
      id:       String(id),
      values:   Array.from(embedding),
      metadata: metadata,
    }
  ])
}

export const getAll = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id }).sort({ savedAt: -1 })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getOne = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, user: req.user._id })
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const create = async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, user: req.user._id })

    try {
      const text      = `${item.title} ${item.summary} ${item.tags.join(' ')}`
      const embedding = await getEmbedding(text)

      console.log('Embedding length:', embedding?.length)
      console.log('Is Array:', Array.isArray(embedding))
      console.log('First value:', embedding?.[0])

      if (embedding && Array.isArray(embedding) && embedding.length === 384) {
        await upsertToPinecone(
          item._id.toString(),
          embedding,
          {
            title:  item.title,
            type:   item.type,
            tags:   item.tags.join(','),
            userId: req.user._id.toString(),
          }
        )
        console.log('✅ Pinecone upsert successful')
      }
    } catch (pineconeErr) {
      console.error('❌ Pinecone error:', pineconeErr.message)
      console.error('❌ Full error:', pineconeErr)
    }

    res.status(201).json(item)
  } catch (err) {
    console.error('❌ Create error:', err.message)
    res.status(500).json({ message: err.message })
  }
}

export const update = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body, { new: true }
    )
    if (!item) return res.status(404).json({ message: 'Not found' })

    try {
      const text      = `${item.title} ${item.summary} ${item.tags.join(' ')}`
      const embedding = await getEmbedding(text)
      if (embedding && Array.isArray(embedding) && embedding.length === 384) {
        await upsertToPinecone(
          item._id.toString(),
          embedding,
          {
            title:  item.title,
            type:   item.type,
            tags:   item.tags.join(','),
            userId: req.user._id.toString(),
          }
        )
      }
    } catch (pineconeErr) {
      console.error('❌ Pinecone update error:', pineconeErr.message)
    }

    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const remove = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({
      _id:  req.params.id,
      user: req.user._id
    })

    if (item && req.params.id) {
      try {
        const index = getPineconeIndex()
        await index.deleteOne(req.params.id.toString())
        console.log('✅ Pinecone delete successful')
      } catch (pineconeErr) {
        console.error('❌ Pinecone delete error:', pineconeErr.message)
      }
    }

    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}