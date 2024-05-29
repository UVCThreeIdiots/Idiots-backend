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
    console.log("🚀 ~ this is route/user.js/post:", body)
    res.status(200).json(result);
  } catch (error) {
    console.log("🚀 ~ route/user.js/post ~ error:", error)
  }
});


export default router;