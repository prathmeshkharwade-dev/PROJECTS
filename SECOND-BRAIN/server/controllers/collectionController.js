import Collection from '../models/Collection.js'

export const getAll = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(collections)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const create = async (req, res) => {
  try {
    const collection = await Collection.create({ ...req.body, user: req.user._id })
    res.status(201).json(collection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const update = async (req, res) => {
  try {
    const collection = await Collection.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body, { new: true }
    )
    if (!collection) return res.status(404).json({ message: 'Not found' })
    res.json(collection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const remove = async (req, res) => {
  try {
    await Collection.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const addItem = async (req, res) => {
  try {
    const collection = await Collection.findOne({ _id: req.params.id, user: req.user._id })
    if (!collection) return res.status(404).json({ message: 'Not found' })
    if (!collection.items.includes(req.body.itemId)) {
      collection.items.push(req.body.itemId)
      await collection.save()
    }
    res.json(collection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const removeItem = async (req, res) => {
  try {
    const collection = await Collection.findOne({ _id: req.params.id, user: req.user._id })
    if (!collection) return res.status(404).json({ message: 'Not found' })
    collection.items = collection.items.filter(i => i.toString() !== req.params.itemId)
    await collection.save()
    res.json(collection)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}