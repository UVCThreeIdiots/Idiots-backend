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

//회원정보 수정 접근 pw체크 api
router.post('/info/:id', (req, res) => {
  const params = {
    id: req.params.id,
    password: req.body.password,
  }
  userService.infoPasswordCheck(params).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });
})




export default router;