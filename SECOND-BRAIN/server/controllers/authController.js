import jwt  from 'jsonwebtoken'
import User from '../models/User.js'

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ message: 'Email already exists' })
    const user = await User.create({ name, email, password })
    res.status(201).json({
      token: genToken(user._id),
      user: { id: user._id, name, email }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' })
    res.json({
      token: genToken(user._id),
      user: { id: user._id, name: user.name, email }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMe = async (req, res) => {
  try {
    res.json({ name: req.user.name, email: req.user.email })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}