import express from 'express';
import { createReferral } from '../controllers/referralController';

const router = express.Router();

router.post('/', createReferral)


export default router;