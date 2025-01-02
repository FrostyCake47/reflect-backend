import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({ 
  region: process.env.AWS_REGION || '', // Replace with your region
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID || '', // Replace with your AWS Access Key
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY || '', // Replace with your secret access key
  },
});

export default s3;