import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import fs from 'fs';
import AWS from '../config/awsConfig.js';
import dotenv from 'dotenv';

dotenv.config();
const s3 = new AWS.S3();
// 기본 폴더 설정
const baseDir = 'uploads';
const subDirs = ['audio', 'video', 'images']; // 이미지 폴더 이름을 `images`로 수정

// 기본 폴더 확인 및 생성
try {
  if (!fs.existsSync(baseDir)) {
    console.error(`${baseDir} 폴더가 없습니다. 폴더를 생성합니다.`);
    fs.mkdirSync(baseDir);
  }
} catch (err) {
  console.error(`${baseDir} 폴더를 생성하는 데 실패했습니다:`, err);
}

// 하위 폴더 확인 및 생성
subDirs.forEach(subDir => {
  const fullPath = path.join(baseDir, subDir);
  try {
    if (!fs.existsSync(fullPath)) {
      console.log(`${subDir} 폴더가 없습니다. 폴더를 생성합니다.`);
      fs.mkdirSync(fullPath);
    }
  } catch (err) {
    console.error(`${subDir} 폴더를 생성하는 데 실패했습니다:`, err);
  }
});

const fileFilter = (req, file, cb) => {
  // 허용할 파일 형식을 지정합니다.
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/wav', 'video/mp4', 'video/mpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // 허용된 파일 형식
  } else {
    cb(new Error('Invalid file type. Only images, audio, and video files are allowed.'), false); // 허용되지 않은 파일 형식
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, done) {
      let uploadPath = 'uploads/others';
      if (file.mimetype.startsWith('image/')) {
        uploadPath = 'uploads/images';
      } else if (file.mimetype.startsWith('audio/')) {
        uploadPath = 'uploads/audio';
      } else if (file.mimetype.startsWith('video/')) {
        uploadPath = 'uploads/video';
      }
      done(null, uploadPath);
    },
    filename(req, file, done){
      const ext = Date.now() + '-' + Math.round(Math.random() * 1E9);
      done(null, `${ext}-${file.originalname}`);
    }
  }),
  // limits: {fileSize: 10 * 1024 * 1024},
  fileFilter : fileFilter,
})

export default upload;
