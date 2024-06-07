import express from 'express';
import capsuleService from '../services/capsuleService.js';
import logger from '../lib/logger.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  logger.info("[GET] /capsule/ ", req.url);

  try {
    const params = {
      userId: req.params.id
    }
    const result = await capsuleService.getAllByIdCapsule(params);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[GET] /capsule/ res error', error);
    res.status(400).json({message: error.message})
  }

});

export default router;