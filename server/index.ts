import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { connectDB } from './db/connect';
import { authRoutes, userRoutes } from './routes';

dotenv.config();
const app = express();
const port = 5000 || process.env.PORT;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello, world!');
});
connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});