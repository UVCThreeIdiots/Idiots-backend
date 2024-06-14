import express from 'express';
import otherService from '../services/otherService.js';
import logger from '../lib/logger.js';
import { isAuthenticated, isAuthorization } from '../lib/middleware.js';

const router = express.Router();


router.get('/capsules/', isAuthenticated, async (req, res) => {
  logger.info("[GET] /other/capsules/ ", req.params);

  try {
    const params = {
      userId: req.user.id,
    }
    const result = await otherService.getOtherCapsules(params);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[POST] /other/capsules/ res error', error);
    res.status(400).json({message: error.message})
  }

});

router.post('/email', isAuthenticated, async (req, res) => {
  logger.info("[POST] /other/email/ ", req.url);

  try {
    const params = {
      email: req.body.email
    }
    const result = await otherService.checkExistEmail(params);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[POST] /other/email/ res error', error);
    res.status(400).json({message: error.message})
  }

});


export default router;