import express from 'express';
import userService from '../services/userService.js'
import logger from '../lib/logger.js';

const router = express.Router();


router.post('/', async (req, res) => {
  logger.info("[POST] /user ")

  console.log(req)
  try {
    const params = {
      name: req.body.name,
      age: req.body.age,
      userId: req.body.userId,
      password:  req.body.password,
      email: req.body.email,
    }
    
    const result = await userService.reg(params);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//이 요청은 개발단계에서 등록된 모든 사용자를 보기 위한 api입니다.
//후에 관리자가 이 api를 쓸 것으로 예상됩니다.
router.get('/all', async (req, res) => {
  logger.info("[GET] /user/all ")

  try {
    const result = await userService.list();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});
router.get('/:id', async (req, res) => {
  logger.info("[GET] /user/:id ", req.url);

  try {
    const params = {
      id: req.params.id,
    }

    const result = await userService.getOneUser(params);
    
    res.status(200).json(result);
  } catch (error) {
    logger.error('[GET] /user/:id res error', error);
    res.status(400).json({message: error.message});
  }
});

router.put('/:id', async (req, res) => {
  logger.info("[PUT] /user/:id ");

  try {
    const params = {
      id: req.params.id,
      name: req.body.name,
      age: req.body.age,
      userId: req.body.userId,
      password:  req.body.password,
      email: req.body.email,
    }

    const result = await userService.updateUser(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[PUT] /user/:id res error', error);
    res.status(400).json({message: error.message});
    
  }
});

router.delete('/:id', async (req, res) => {
  logger.info("[DELETE] /user/:id ");

  try {
    const params = {
      id: req.params.id,
    }

    const result = await userService.deleteUser(params);
    
    res.status(200).json(result);
    
  } catch (error) {
    logger.error('[DELETE] /user/:id res error', error);
    res.status(400).json({message: error.message});
    
  }
});


export default router;