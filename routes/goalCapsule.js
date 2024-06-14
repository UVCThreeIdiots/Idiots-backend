import express from 'express';
import goalCapsuleService from '../services/goalCapsuleService.js';
import logger from '../lib/logger.js';
import time from '../lib/timeUtil.js';
import { isAuthenticated, isAuthorization } from '../lib/middleware.js';

const router = express.Router();


router.post('/', isAuthenticated, async (req, res) => {
  logger.info('[POST] /goal/ ', req.body);
  try {
    const params = {
      userId: req.user.id,  //user pk
      title: req.body.title,
      body: req.body.body || null,
      expired:  req.body.expired || time.getNow(),
      goalCount: req.body.goalCount || 0,
      goalTerm: req.body.goalTerm || 0,
      nowCount: req.body.nowCount || 0,
      dailyCheck: req.body.dailyCheck || false,
      isFailed: req.body.isFailed || false,
      isSuccess: req.body.isSuccess || false,
      otherId: req.body.otherId || 0,
      otherEmail: req.body.otherEmail || '',
    }
    
    const result = await goalCapsuleService.createCapsule(params);
    res.status(200).json(result);
  } catch (error) {
    logger.error('[POST] /goal/ res error', error);
    res.status(400).json({ message: error.message });
  }
});

router.get('/all', isAuthenticated, isAuthorization, async (req, res) => {
  logger.info("[GET] /goal/all ", req.url);

  try {
    const result = await goalCapsuleService.getAllCapsule();
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[GET] /goal/all res error', error);
    res.status(400).json({message: error.message})
  }

});

router.get('/user/', isAuthenticated , async (req, res) => {
  logger.info("[GET] /goal/user/ ", req.url);

  try {
    const params = {
      userId: req.user.id,
    }

    const result = await goalCapsuleService.getAllByUserIdCapsule(params);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[GET] /goal/user/ res error', error);
    res.status(400).json({message: error.message});
  }
});
router.get('/:id', isAuthenticated, async (req, res) => {
  logger.info("[GET] /goal/:id ", req.url);

  try {
    const params = {
      id: req.params.id,
    }

    const result = await goalCapsuleService.getOneCapsule(params);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[GET] /goal/:id res error', error);
    res.status(400).json({message: error.message});
  }
});

router.put('/:id', isAuthenticated, async (req, res) => {
  logger.info("[PUT] /goal/:id ");

  try {
    const params = {
      id: req.params.id,
      userId: req.user.id,  //user pk
      title: req.body.title,
      goalCount: req.body.goalCount,
      goalTerm: req.body.goalTerm,
      nowCount: req.body.nowCount,
      dailyCheck: req.body.dailyCheck,
    }

    const result = await goalCapsuleService.updateCapsule(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[PUT] /goal/:id res error', error);
    res.status(400).json({message: error.message});
    
  }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
  logger.info("[DELETE] /goal/:id ");

  try {
    const params = {
      id: req.params.id,
    }

    const result = await goalCapsuleService.deleteCapsule(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[DELETE] /goal/:id res error', error);
    res.status(400).json({message: error.message});
    
  }
});



export default router;