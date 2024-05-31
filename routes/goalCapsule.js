import express from 'express';
import goalCapsuleService from '../services/goalCapsuleService.js';
import logger from '../lib/logger.js';

const router = express.Router();


router.post('/', async (req, res) => {
  logger.info('[POST] /goal/ ', req.body);
  try {
    const params = {
      title: req.body.title,
      tag: req.body.tag,
      body: req.body.body,
      expired:  req.body.expired || null,
      goalCount: req.body.goalCount || null,
      numInterval: req.body.numInterval || null,
      goalReps: req.body.goalReps || null,
      nowCount: req.body.nowCount || null,
      isFailed: req.body.isFailed,
      isSuccess: req.body.isSuccess,
      userId: req.body.userId,  //user pk
    }
    
    const result = await goalCapsuleService.createCapsule(params);
    res.status(200).json(result);
  } catch (error) {
    logger.error('[POST] /goal/ res error', error);
    res.status(400).json({ message: error.message });
  }
});

router.get('/all', async (req, res) => {
  logger.info("[GET] /goal/all ", req.url);

  try {
    const result = await goalCapsuleService.getAllCapsule();
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[GET] /goal/all res error', error);
    res.status(400).json({message: error.message})
  }

});

router.get('/:id', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  logger.info("[PUT] /goal/:id ");

  try {
    const params = {
      id: req.params.id,
      title: req.body.title,
      tag: req.body.tag,
      body: req.body.body,
      expired:  req.body.expired,
      goalCount: req.body.goalCount,
      numInterval: req.body.numInterval,
      goalReps: req.body.goalReps,
      nowCount: req.body.nowCount,
      isFailed: req.body.isFailed,
      isSuccess: req.body.isSuccess,
    }

    const result = await goalCapsuleService.updateCapsule(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[PUT] /goal/:id res error', error);
    res.status(400).json({message: error.message});
    
  }
});

router.delete('/:id', async (req, res) => {
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