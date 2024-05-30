import express from 'express';
import capsuleService from '../services/capsuleService.js';

const router = express.Router();

router.post('/createCapsule', async(req, res) => {
 

  try{
    const params = {
      userId: req.body.userId,
      title: req.body.title,
      body: req.body.body,
    }
    
    const result = await capsuleService.createCapsule(params);
    res.status(200).json(result);
  } catch(err){
    console.log('라우터에서 에러가 발생함 : ', err);
    res.status(400).json(err.message);
  }
})

export default router;