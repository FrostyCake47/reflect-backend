import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI! || 'mongodb+srv://awesomeakash47:9iF2QL34gr9ZO2sy@reflect.3b4ai.mongodb.net/');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;