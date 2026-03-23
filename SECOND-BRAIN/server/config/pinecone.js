import { Pinecone } from '@pinecone-database/pinecone'

const getPineconeIndex = () => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  })
  return pinecone.index(process.env.PINECONE_INDEX)
}

export default getPineconeIndex