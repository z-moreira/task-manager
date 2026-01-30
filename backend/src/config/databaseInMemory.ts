import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

/**
 * Conectar ao MongoDB In-Memory
 */
export const connectInMemoryDatabase = async (): Promise<void> => {
  try {
    // Criar instância do MongoDB em memória
    mongoServer = await MongoMemoryServer.create();
    
    // Obter a URI da instância
    const mongoUri = mongoServer.getUri();
    
    // Conectar com Mongoose
    await mongoose.connect(mongoUri);
    
    console.log('MongoDB In-Memory conectado com sucesso!');
    console.log(`URI: ${mongoUri}`);
    console.log('Dados serão perdidos ao reiniciar o servidor');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB In-Memory:', error);
    process.exit(1);
  }
};

/**
 * Desconectar e parar o servidor
 */
export const disconnectInMemoryDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('MongoDB In-Memory desconectado');
  } catch (error) {
    console.error('Erro ao desconectar:', error);
  }
};

/**
 * Limpar toda a base de dados
 */
export const clearDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    console.log('Base de dados limpa');
  }
};