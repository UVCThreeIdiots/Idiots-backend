import express from 'express';
import { isAuthenticated, isAuthorization } from '../lib/middleware.js';
import TCapsuleService from '../services/timeCapsuleService.js';
import logger from '../lib/logger.js';
import uploadToS3 from '../lib/multer.js';

const router = express.Router();

router.post('/', isAuthenticated, uploadToS3, async(req, res) => {
  try{
    const params = {
      userId: req.user.id,
      title: req.body.title || "empty",
      body: req.body.body,
      expired: req.body.expired,
      status: req.body.status || false,
      otherId: req.body.otherId || 0,
      otherEmail: req.body.otherEmail || '',
      files: req.files,
    }
    const result = await TCapsuleService.createCapsule(params);
    logger.info('TCapsule.routes run success');
    res.status(200).json(result);
  } catch(err){
    logger.error(`[timeCapsuleRoute.TCapsulePost error] ${err.toString()}`);
    res.status(400).json(err.message);
  }
});

// 타임캡슐 전체 조회 ( 어드민 권한 )
router.get('/allTCapsules', isAuthenticated, isAuthorization, async(req, res) => {
  try {
    const timeCapsules = await TCapsuleService.getAllTCapsules();
    logger.info('TCapsules.routes/getAllTCapsules run successfully');
    res.status(200).json(timeCapsules);
  } catch (error) {
    logger.error(`getAllTCapsules.router's error: ${error.message}`); 
    res.status(400).json({ message: error.message });
  }
});

// 특정 id 타임캡슐 조회
router.get('/TCapsule/:id', isAuthenticated, async(req, res) => {
  try {
    const params = {
      id: req.params.id,
      userId: req.user.id,
      userRole: req.user.role,
    }
    const timeCapsuleById = await TCapsuleService.getTCapsuleById(params);
    logger.info('TCapsuleById.router is run successfully')
    res.status(200).json(timeCapsuleById);
  } catch(error){
    logger.error(`getTCapsuleById.router's error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});

// 타임캡슐 수정 요청 ( 어드민 권한 )
router.put('/updateTCapsule/:id', isAuthenticated, isAuthorization, async(req, res) => {
  try {
    const params = {
      id: req.params.id,
      userId: req.user.id,
      userRole: req.user.role,
      title: req.body.title,
      body: req.body.body,
      status: req.body.status || null,
    };
    const updateTCapsuleById = await TCapsuleService.updateTCapsuleById(params);
    logger.info('updateTCapsuleById.router is run successfully');
    res.status(200).json(updateTCapsuleById);
  } catch(error) {
    logger.error(`updateTCapsule.router's error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});
// 타임캡슐 삭제 ( 어드민 권한 )
router.delete('/deleteTCapsule/:id', isAuthenticated, isAuthorization, async(req, res) => {
  try{
    const params = {
      id: req.params.id,
      userId: req.user.id,
      userRole: req.user.role,
    };
    const deleteTCapsuleById = await TCapsuleService.deleteTCapsuleById(params);
    logger.info('deleteTCapsuleById.router is run successfully');
    res.status(200).json(deleteTCapsuleById);
  }catch(error) {
    logger.error(`deleteTCapsule.router's error: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
});
export default router;
