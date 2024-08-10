import express from 'express'
import {deleteUser, getUser, getUsers, test, updateUser} from '../controllers/user.controller';
import { verifyUser } from '../utils/verifyUser';
import { signout } from '../controllers/auth.controller';
const router=express.Router();

router.get('/test',test)
router.put('/update/:userId',verifyUser,updateUser)
router.delete('/delete/:userId',verifyUser,deleteUser)
router.post('/signout',signout)
router.get('/getusers',verifyUser,getUsers)
router.get('/:userId', getUser);

export default router;