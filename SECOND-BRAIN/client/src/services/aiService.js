import api from './api'

export const analyzeContent = async (content) => {
  const { data } = await api.post('/ai/analyze', { content })
  return data
}