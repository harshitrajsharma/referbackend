import express from 'express';
import { PrismaClient } from '@prisma/client';
import referralRoutes from './routes/referralRoutes';
import cors from 'cors';

const app = express();

const prisma = new PrismaClient();

app.use(cors())
app.use(express.json())

app.use('/api/referrals', referralRoutes)




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export { app, prisma }