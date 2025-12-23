import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
export const prisma = new PrismaClient();

import chatRoutes from './routes';

app.use(cors());
app.use(express.json());

app.use('/api', chatRoutes);

app.get('/', (req, res) => {
    res.send('Spur Chat Agent API');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
