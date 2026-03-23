import dotenv from 'dotenv'
dotenv.config()

export const getEmbedding = async (text) => {
  try {
    const response = await fetch(
      'https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text.slice(0, 512),
        }),
      }
    )

    if (!response.ok) {
      console.error('HF HTTP error:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    console.log('HF data sample:', JSON.stringify(data).slice(0, 100))

    // Flat array of numbers
    if (Array.isArray(data) && typeof data[0] === 'number') {
      console.log('✅ Got flat embedding, length:', data.length)
      return data
    }

    // Array of arrays — take first
    if (Array.isArray(data) && Array.isArray(data[0])) {
      console.log('✅ Got nested embedding, length:', data[0].length)
      return data[0]
    }

    // Object — try to extract values
    if (typeof data === 'object' && !Array.isArray(data)) {
      const values = Object.values(data)
      if (values.length > 0 && typeof values[0] === 'number') {
        console.log('✅ Got object embedding, length:', values.length)
        return values
      }
      // Nested object
      const first = values[0]
      if (Array.isArray(first)) {
        console.log('✅ Got nested object embedding, length:', first.length)
        return first
      }
    }

    console.error('❌ Cannot parse HF response:', JSON.stringify(data).slice(0, 300))
    return null

  } catch (err) {
    console.error('Embedding error:', err.message)
    return null
  }
}