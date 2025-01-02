import s3 from '../config/s3';

class ImageService{
    public async uploadImageToS3 (file: Express.Multer.File): Promise<string> {
        try {
          const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME || 'reflectimages', // Name of the bucket
            Key: file.originalname, // Use a unique key for each file, e.g., `${Date.now()}-${file.originalname}`
            Body: file.buffer, // File content
            ContentType: file.mimetype, // File MIME type
          };
      
          const uploadResult = await s3.upload(params).promise();
          console.log('File uploaded successfully:', uploadResult.Location);
          return uploadResult.Location; // Public URL of the uploaded file
        } catch (error) {
          console.error('Error uploading file to S3:', error);
          throw new Error('Error uploading file');
        }
      };
      
    public async deleteImageFromS3 (fileKey: string): Promise<void> {
        try {
            const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME || 'reflectimages',
            Key: fileKey,
            };
        
            await s3.deleteObject(params).promise();
            console.log(`File ${fileKey} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting file from S3:', error);
            throw new Error('Error deleting file');
        }
    };
}

export default new ImageService();