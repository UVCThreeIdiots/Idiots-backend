import express from 'express';
import userRouter from './user.js';
import authRouter from './auth.js';
import capsuleRouter from './capsule.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('this is index.js!');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/capsule', capsuleRouter);


export default router;