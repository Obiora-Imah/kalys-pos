import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config(); 

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB ?? 'kalys_pos';
declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: any, promise: Promise<any> | null } | undefined;
}

if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
  throw new Error('Please define the MONGO_URL environment variable inside .env.local')
}

let cached: any = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName,
      maxPoolSize: 10,        // connection pool
      autoIndex: false,       // turn off in prod for speed
      serverSelectionTimeoutMS: 30000,
    }).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default connect
