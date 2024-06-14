import express from 'express';
import userService from '../services/userService.js'
import logger from '../lib/logger.js';
import { isAuthenticated, isAuthorization } from '../lib/middleware.js';

const router = express.Router();


router.post('/', async (req, res) => {
  logger.info("[POST] /user ")

  console.log(req)
  try {
    const params = {
      role: req.body.role || 'user',
      name: req.body.name,
      age: req.body.age,
      userId: req.body.userId,
      password:  req.body.password,
      email: req.body.email,
      mode: req.body.mode || 'normal',
    }
    
    const result = await userService.reg(params);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/all', isAuthenticated, isAuthorization, async (req, res) => {
  logger.info("[GET] /user/all ")
  try {
    const result = await userService.list();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});
router.get('/', async (req, res) => {
  logger.info("[GET] /user/ ", req.url);

  try {
    const params = {
      id: req.user.id,
    }

    const result = await userService.getOneUser(params);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[GET] /user/ res error', error);
    res.status(400).json({message: error.message});
  }
});

router.put('/', async (req, res) => {
  logger.info("[PUT] /user/ ");

  try {
    const params = {
      id: req.user.id,
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

router.delete('/', async (req, res) => {
  logger.info("[DELETE] /user/ ");

  try {
    const params = {
      id: req.user.id,
    }

    const result = await userService.deleteUser(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[DELETE] /user/ res error', error);
    res.status(400).json({message: error.message});
    
  }
});
router.delete('/:id', async (req, res) => {
  logger.info("[DELETE] /user/ ");

  try {
    const params = {
      id: req.user.id,
      targetId: req.params.id,
    }

    const result = await userService.deleteUser(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[DELETE] /user/ res error', error);
    res.status(400).json({message: error.message});
    
  }
});


export default router;