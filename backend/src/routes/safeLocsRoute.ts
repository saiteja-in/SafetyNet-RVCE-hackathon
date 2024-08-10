import express from 'express'
import { getSafeLocs,insertSafeLocs } from '../controllers/safeLocController';

const router=express.Router();

router.get('/',getSafeLocs)
router.post('/insert',insertSafeLocs)

export default router;