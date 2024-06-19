import express from 'express';
import { isAuthenticated, isAuthorization } from '../lib/middleware.js'
import userService from '../services/userService.js';
import capsuleService from '../services/capsuleService.js';
import logger from '../lib/logger.js';

const router = express.Router();

router.get('/user/chart', isAuthenticated, isAuthorization ,async (req, res) => {

  try {
    const result = await userService.chartList();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});
router.get('/user/list', isAuthenticated, isAuthorization ,async (req, res) => {

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


router.put('/user/:id', isAuthenticated, isAuthorization , async (req, res) => {
  logger.info("[PUT] admin/user/:id ");

  try {
    const params = {

      id: req.params.id,
      name: req.body.name,
      age: req.body.age,
      userId: req.body.userId,
      password:  req.body.password,
      email: req.body.email,
      mode: req.body.mode,
      role: req.body.role,
    }

    const result = await userService.updateUser(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[PUT] /user/ res error', error);
    res.status(400).json({message: error.message});
    
  }
});

router.delete('/user/:id', isAuthenticated, isAuthorization , async (req, res) => {
  logger.info("[DELETE] admin/user/:id ");

  try {
    const params = {
      id: req.params.id,
    }

    const result = await userService.deleteUser(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[DELETE] /user/ res error', error);
    res.status(400).json({message: error.message});
    
  }
});
export default router;
