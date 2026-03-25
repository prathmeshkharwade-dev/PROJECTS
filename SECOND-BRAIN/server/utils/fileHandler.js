import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse')

export const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath)
    const data       = await pdfParse(dataBuffer)
    return data.text.slice(0, 3000)
  } catch (err) {
    console.error('PDF extract error:', err.message)
    return null
  }
}

export const getFileType = (mimetype) => {
  if (mimetype.includes('pdf'))   return 'pdf'
  if (mimetype.includes('image')) return 'image'
  return 'article'
}

export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  } catch (err) {
    console.error('Delete file error:', err.message)
  }
}