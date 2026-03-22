import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import Item from '../models/Item.js'

const router = Router()

router.get('/', authMiddleware, async (req, res) => {
  try {
    const items = await Item.find({
      user: req.user._id,
      $text: { $search: req.query.q }
    })
    res.json(items)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router