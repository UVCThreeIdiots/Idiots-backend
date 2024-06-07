import express from 'express';
import userRouter from './user.js';
import authRouter from './auth.js';
import timeCapsuleRouter from './timeCapsule.js'
import goalCapsuleRouter from './goalCapsule.js'
import capsuleRouter from './capsule.js'
import otherRouter from './other.js'

const router = express.Router();


router.get('/', (req, res) => {
  res.send('this is index.js!');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/time', timeCapsuleRouter);
router.use('/goal', goalCapsuleRouter);
router.use('/capsule', capsuleRouter);
router.use('/other', otherRouter);


export default router;