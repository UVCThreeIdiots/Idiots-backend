import multer from 'multer';
import { Upload } from '@aws-sdk/lib-storage';
import s3Client from '../config/awsConfig.js';

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg','audio/webm', 'audio/wav', 'video/mp4', 'video/mpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, audio, and video files are allowed.'), false);
  }
};

const multerS3Config = multer.memoryStorage();

const upload = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
}).array('files', 12); // 한 번에 최대 12개의 파일을 업로드

const uploadToS3 = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    if (!req.files || req.files.length === 0) {
   	  return next();
    }
    try {
      const uploadPromises = req.files.map(async (file) => {
        let uploadPath = 'uploads/others';
        if (file.mimetype.startsWith('image/')) {
          uploadPath = 'uploads/images';
        } else if (file.mimetype.startsWith('audio/')) {
          uploadPath = 'uploads/audio';
        } else if (file.mimetype.startsWith('video/')) {
          uploadPath = 'uploads/video';
        }

	const s3Key = `${uploadPath}/${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;

        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: s3Key,
          Body: file.buffer,
          ACL: 'private',
          ContentType: file.mimetype,
        };
        const parallelUploads3 = new Upload({
          client: s3Client,
          params: uploadParams,
        });
       await parallelUploads3.done();
	
	      file.s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;


      });

      await Promise.all(uploadPromises);
      next();
    } catch (err) {
      return res.status(500).send({ message: `Error uploading files: ${err.message}` });
    }
  });
};

export default uploadToS3;
