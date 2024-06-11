import multer from 'multer';
import path from 'path';
import fs from 'fs';

try {
	fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 폴더 생성
}

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
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
  }),
  limits: {fileSize: 10 * 1024 * 1024},
  fileFilter : fileFilter,
})

export default upload;