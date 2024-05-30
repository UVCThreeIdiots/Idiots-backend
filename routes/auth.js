import express from 'express';
import userService from '../services/userService.js'

const router = express.Router();

router.post('/login', (req, res) => {
  const params = {
    userId: req.body.userId,
    password:  req.body.password,
  }
  userService.login(params).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });
})



export default router;