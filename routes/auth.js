import express from 'express';
import userService from '../services/userService.js'
import passport from '../config/passport.js';
import { isAuthenticated, isAuthorization } from '../lib/middleware.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('Session init login:', req.session);

  console.log("🚀 ~ router.post ~ /login:", req.body)
  passport.authenticate('local', (err, user) => {
    console.log("🚀 ~ passport.authenticate ~ passport.authenticate:")
    if (err) {
      console.log("🚀 ~ passport.authenticate ~ err:", err.message)
      return res.status(400).json({ message: err.message });
    }
    
    if (!user) {
      console.log("🚀 ~ passport.authenticate ~ !user:", err.message)
      return res.status(400).json({ message: err.message });
    }
    console.log("🚀🚀🚀🚀🚀")

    console.log('Session before login:', req.session);

    // console.log("🚀 ~ req.logIn ~ logIn before: ", user)
    req.logIn(user, (err) => {
      // console.log("🚀 ~ req.logIn ~ logIn after : ", user)
      if (err) {
        console.log("🚀 ~ req.logIn ~ err:", err.message)
        return next(err);
      }
      console.log('Session after login:', req.session);
      // res.on('finish', () => {
      //   const setCookieHeader = res.getHeaders()['set-cookie'];
      //   console.log('Set-Cookie Header:', setCookieHeader);
      // });
      return res.status(200).json(user);
      
    });
  })(req, res, next);
})

//회원정보 수정 접근 pw체크 api
router.post('/info/', isAuthenticated, (req, res) => {
  const params = {
    id: req.user.id,
    password: req.body.password,
  }
  userService.infoPasswordCheck(params).then((result) => {
    res.status(200).json(result);
  }).catch((err) => {
    res.status(401).json({ message: err.message });
  });
})

//유저 아이디 중복체크
router.post('/duplicate', async (req, res) => {
  try {
    const params = {
      userId: req.body.userId,
    }
  
    const result = await userService.checkDuplicate(params);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/email', async (req, res) => {
  try {
    const params = {
      email: req.body.email,
    }
    
    const result = await userService.verificationEmail(params);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/find/id', async (req, res) => {
  try {
    const params = {
      email: req.body.email,
    }
    
    const result = await userService.findUserId(params);
    console.log("🚀 ~ router.post ~ result:", result)
    
    res.status(200).json(result);
  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error)
    res.status(400).json({ message: error.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const params = {
      email: req.body.email,
    }
    
    const result = await userService.findUserPw(params);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/reset-password/:token', async (req, res) => {
  try {
    const params = {
      token: req.params.token,
      password:  req.body.password,
    }
    
    const result = await userService.checkTokenFindPw(params);

    if (result) return res.status(200).json(result);
    else return res.status(404).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.post('/code', async (req, res) => {
  try {
    const params = {
      email: req.body.email,
      code: req.body.code,
    }
    
    const result = await userService.verificationCode(params);

    res.status(200).json(result.toString());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/logout', isAuthenticated, (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to destroy session' });
      }
      res.clearCookie('mySessionName');
      return res.json({ message: 'Logout successful' });
    });
  });
});





export default router;
