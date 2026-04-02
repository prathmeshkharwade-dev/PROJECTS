import express from 'express';
import rungraph from './ai/graph.ai.js';

const app = express();

app.get('/', async (req, res) => {
    const result = await rungraph(" write a code for factorial functiopn in javascript")

    res.json(result);
})



export default app;