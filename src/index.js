import setupServer from './server.js';
import { connectDB } from './db/initMongoDB.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const PORT = Number(process.env.PORT) || 3000;

const startApp = async () => {
  // 1. Önce veritabanına bağlan
  await connectDB();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  // 2. Veritabanı başarılıysa Express'i dinlemeye al
  setupServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Uygulamayı başlat
startApp();
