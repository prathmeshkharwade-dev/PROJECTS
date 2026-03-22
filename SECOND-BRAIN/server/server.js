import express      from 'express'
import cors         from 'cors'
import dotenv       from 'dotenv'
import connectDB    from './config/database.js'
import errorHandler from './middleware/errorHandler.js'
import routeAuth        from './routes/routeAuth.js'
import routeItems       from './routes/routeItems.js'
import routeAI          from './routes/routeAI.js'
import routeSearch      from './routes/routeSearch.js'
import routeCollections from './routes/routeCollections.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth',        routeAuth)
app.use('/api/items',       routeItems)
app.use('/api/ai',          routeAI)
app.use('/api/search',      routeSearch)
app.use('/api/collections', routeCollections)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`))