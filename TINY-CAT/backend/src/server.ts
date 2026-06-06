import dotenv from 'dotenv';
dotenv.config();
import app from './app.ts';
import { connectDB } from './config/db.ts';

connectDB();

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});