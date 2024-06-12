import express from 'express';
import { isAuthorization } from '../lib/middleware.js'
import userService from '../services/userService.js';
import capsuleService from '../services/capsuleService.js';

const router = express.Router();

router.get('/user/:id', isAuthorization ,async (req, res) => {
  // console.log("🚀 ~ router.get ~ router.get('/all' header:", req.headers)
  // console.log("🚀 ~ router.get ~ router.get('/all' body:", req.body)
  // console.log("🚀 ~ router.get ~ router.get('/all' body:", req.user)

  try {
    const result = await userService.list();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

router.get('/capsule/:id', isAuthorization , async (req, res) => {
  // console.log(req.headers);
  // console.log(req.body);

  try {
    const result = await capsuleService.getAllForAdmin();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

export default router;
