import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
  getAll, create, update, remove,
  addItem, removeItem
} from '../controllers/collectionController.js'

const router = Router()

router.use(authMiddleware)

router.get('/',                        getAll)
router.post('/',                       create)
router.put('/:id',                     update)
router.delete('/:id',                  remove)
router.post('/:id/items',              addItem)
router.delete('/:id/items/:itemId',    removeItem)

export default router