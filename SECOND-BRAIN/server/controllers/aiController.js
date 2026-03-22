import groq from '../config/groq.js'

export const analyze = async (req, res) => {
  try {
    const { content } = req.body

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `Analyze this content and return ONLY valid JSON (no markdown, no backticks):
{"title":"max 70 chars","type":"article or tweet or video or pdf or image","tags":["3 to 5 relevant tags"],"summary":"one sentence summary"}

Content: ${content.slice(0, 2000)}`
        }
      ],
    })

    const text  = completion.choices[0].message.content
    const clean = text.replace(/```json|```/g, '').trim()

    res.json(JSON.parse(clean))
  } catch (err) {
    console.error('Groq Error:', err.message)
    res.status(500).json({ message: 'AI analysis failed' })
  }
}