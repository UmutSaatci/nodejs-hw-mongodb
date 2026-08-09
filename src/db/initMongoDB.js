import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables!');
    }

    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB via Mongoose!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Bağlantı olmazsa uygulamayı güvenli kapat
  }
};
