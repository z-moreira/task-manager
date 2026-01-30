import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function startServer() {
  // Configuração do MongoDB em memória (já que tens no package.json)
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
  console.log('✅ Conectado ao MongoDB em memória');

  app.get('/', (req, res) => {
    res.send('Servidor TypeScript a correr com sucesso!');
  });

  app.listen(PORT, () => {
    console.log(`🚀 Servidor pronto em http://localhost:${PORT}`);
  });
}

startServer().catch(err => console.error('Erro ao iniciar:', err));