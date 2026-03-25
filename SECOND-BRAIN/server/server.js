import express      from 'express'
import cors         from 'cors'
import dotenv       from 'dotenv'
import path         from 'path'
import { fileURLToPath } from 'url'
import connectDB    from './config/database.js'
import errorHandler from './middleware/errorHandler.js'
import routeAuth        from './routes/routeAuth.js'
import routeItems       from './routes/routeItems.js'
import routeAI          from './routes/routeAI.js'
import routeSearch      from './routes/routeSearch.js'
import routeCollections from './routes/routeCollections.js'
import routeUpload      from './routes/routeUpload.js'

dotenv.config()
connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth',        routeAuth)
app.use('/api/items',       routeItems)
app.use('/api/ai',          routeAI)
app.use('/api/search',      routeSearch)
app.use('/api/collections', routeCollections)
app.use('/api/upload',      routeUpload)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`))