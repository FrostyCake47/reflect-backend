import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID, // Replace with your AWS Access Key
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY, // Replace with your AWS Secret Key
  region: process.env.AWS_REGION, // Replace with your region
});

export default s3;