import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import userDao from '../dao/userDao.js';
import hashUtil from '../lib/hashUtil.js';
// 사용자 인증 로직
passport.use(new LocalStrategy(  { usernameField: 'userId' },async(userId, password, done) => {
  console.log("🚀 ~ passport.use ~ passport.use(new LocalStrategy((userId, password, done:", userId, password);
  const user = await userDao.loginUser({userId: userId});
  if (!user) {
    console.log("🚀 ~ passport.use ~ user:", user)
    return done({ message: 'Incorrect username.' }, false);
  }
	console.log(" user : ", user);
  const passwordCheck = await hashUtil.checkPasswordHash(password, user.password)
  if (!passwordCheck) {
    console.log("🚀 ~ passport.use ~ hashUtil:")
    return done({ message: 'Incorrect password.' }, false);
  }
  console.log("🚀 ~ passport.use ~ LocalStrategy:")
  return done(null, user);
}));

// 사용자 정보를 세션에 저장
passport.serializeUser((user, done) => {
  // console.log("🚀 ~ passport.serializeUser ~ user:", user)
  done(null, user.id);
});

// 세션에서 사용자 정보를 복원
passport.deserializeUser(async (id, done) => {
  console.log("🚀 ~ passport.deserializeUser ~ id:", id)
    try {
    
    const user = await userDao.selectUser({id: id});
	done(null, user);
  } catch (error) {
    console.log("🚀 ~ passport.deserializeUser ~ error:", error)
  }
  
});

export default passport;
