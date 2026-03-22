import Item from '../models/Item.js'

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
    res.status(201).json(item)
  } catch (err) {
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
    res.json(item)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const remove = async (req, res) => {
  try {
    await Item.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}