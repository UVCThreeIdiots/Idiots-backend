import express from 'express';
import userService from '../services/userService.js'

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const params = {
      name: req.body.name,
      age: req.body.age,
      userId: req.body.userId,
      password:  req.body.password,
      email: req.body.email,
    }
    
    const result = await userService.reg(params);
    console.log("🚀 ~ req.body : ", req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//이 요청은 개발단계에서 등록된 모든 사용자를 보기 위한 api입니다.
//후에 관리자가 이 api를 쓸 것으로 예상됩니다.
router.get('/all', async (req, res) => {

  try {
    const result = await userService.list();
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
});



export default router;