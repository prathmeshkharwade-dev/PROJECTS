import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { analyze } from '../controllers/aiController.js'

const router = Router()

router.post('/analyze', authMiddleware, analyze)

export default router