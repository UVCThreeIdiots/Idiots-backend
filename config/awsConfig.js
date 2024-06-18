import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_ACCESS_KEY',
  region: 'AWS_REGION'
});

export default AWS;