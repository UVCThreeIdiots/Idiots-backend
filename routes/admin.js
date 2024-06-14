import express from 'express';
import { isAuthenticated, isAuthorization } from '../lib/middleware.js'
import userService from '../services/userService.js';
import capsuleService from '../services/capsuleService.js';

const router = express.Router();

router.get('/user/', isAuthenticated, isAuthorization ,async (req, res) => {

  try {
    const result = await userService.list();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

router.get('/capsule/', isAuthenticated, isAuthorization , async (req, res) => {

  try {
    const result = await capsuleService.getAllForAdmin();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});

export default router;
