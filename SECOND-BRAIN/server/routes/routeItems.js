import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getAll, getOne, create, update, remove } from '../controllers/itemController.js'

const router = Router()

router.use(authMiddleware)

router.get('/',       getAll)
router.get('/:id',    getOne)
router.post('/',      create)
router.put('/:id',    update)
router.delete('/:id', remove)

export default router