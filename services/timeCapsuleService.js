import TCapsuleDao from '../dao/timeCapsuleDao.js';
import logger from '../lib/logger.js';

const TCapsuleService = {
  async createCapsule(params) {
    try {
      const newCapsule = await TCapsuleDao.insert(params);
      return newCapsule;
    } catch (error) {
      logger.error('TCapsuleService.createCapsule error:', error);
    } 
  },
  // 타임 캡슐 조회
  // 1. 타임 캡슐 전체 조회
  async getAllTCapsules() {
    try {
      const allTCapsules = await TCapsuleDao.findAllTCapsules();
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
      console.log(params);
      const getTCapsuleById = await TCapsuleDao.findByIdTCapsule(params);
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
      const updateTCapsuleById = await TCapsuleDao.updateTCapsuleById(params);
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
      const deleteTCapsuleById = await TCapsuleDao.deleteTCapsuleById(params);
      logger.info('timeCapsuleService.deleteTCapsuleById run successfully');
      return deleteTCapsuleById;
    }catch(error) {
      logger.error(`!!deleteTCapsuleService.deleteTCapsuleById's error: ${error.toString()}`);
      throw error;
    }
  }


}

export default TCapsuleService;