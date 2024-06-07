
import timeCapsuleDao from '../dao/timeCapsuleDao.js';
import logger from '../lib/logger.js';
import time from '../lib/timeUtil.js';
import boss from '../config/pgBoss.js';
import moment from 'moment-timezone';
import userDao from '../dao/userDao.js';
const TCapsuleService = {
  async createCapsule(params) {
    logger.info('TCapsuleService createCapsule');
    try {
      const newExpired = time.changeFormat(params.expired);
      const newParams = {
        ...params,
        expired: newExpired,
      };
      const scheduleTime = moment.tz(newParams.expired, 'Asia/Seoul').toDate();
      
      const newCapsule = await timeCapsuleDao.insert(newParams);
      // job queque
      const jobId = await boss.send('time-capsule',
        { 
          userId: newParams.userId,
          title: newParams.title,
          body: newParams.body,
          expired: newParams.expired,
          status: newParams.status,
          capsuleId: newCapsule.id,
          otherId: newParams.otherId,
          otherEmail: newParams.otherEmail,
        },
        { startAfter: 5 });
        
        if (!jobId || jobId.length === 0) {
          console.error('Failed to schedule job: Job ID is empty');
          return res.status(500).json({ error: 'Failed to schedule job' });
        }
        console.log("🚀 ~ createCapsule ~ jobId:", jobId)
      
      return newCapsule;
    } catch (error) {
      logger.error('TCapsuleService.createCapsule error:', error);
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
  // 타임 캡슐 조회
  // 1. 타임 캡슐 전체 조회
  async getAllTCapsules() {
    try {
      const allTCapsules = await timeCapsuleDao.findAllTCapsules();
      logger.info(`timeCapsuleService.getAllTCapsules run successfully`);
      return allTCapsules;
    } catch (error) {
      logger.error(`[timeCapsuleService.getAllTCapsules's error] ${error.toString()}`);
      throw error;
    }
  },
  // 2. id값에 따른 타임 캡슐 조회
  async getTCapsuleById(params) {
    try {
      const getTCapsuleById = await timeCapsuleDao.findByIdTCapsule(params);
      logger.info('timeCapsuleService.getTCapsuleById run successfully');
      return getTCapsuleById;
    } catch (error) {
      logger.error(`!!timeCapsuleService.getTCapsuleById's error ${error.toString()}`);
      throw error;
    }
  },
  // 타임캡슐수정
  async updateTCapsuleById(params) {
    try {
      const updateTCapsuleById = await timeCapsuleDao.updateTCapsuleById(params);
      logger.info('timeCapsuleService.updateTCapsuleById run successfully');
      return updateTCapsuleById;
    } catch (error) {
      logger.error(`!!updateTCapsuleService.updateTCapsuleById's error: ${error.toString()}`);
      throw error;
    }
  },
  // 타임캡슐삭제
  async deleteTCapsuleById(params) {
    try {
      const deleteTCapsuleById = await timeCapsuleDao.deleteTCapsuleById(params);
      logger.info('timeCapsuleService.deleteTCapsuleById run successfully');
      return deleteTCapsuleById;
    }catch(error) {
      logger.error(`!!deleteTCapsuleService.deleteTCapsuleById's error: ${error.toString()}`);
      throw error;
    }
  }
}

export default TCapsuleService;
