import setupServer from './server.js';
import { connectDB } from './db/initMongoDB.js';

const PORT = Number(process.env.PORT) || 3000;

const startApp = async () => {
  // 1. Önce veritabanına bağlan
  await connectDB();

  // 2. Veritabanı başarılıysa Express'i dinlemeye al
  setupServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Uygulamayı başlat
startApp();
