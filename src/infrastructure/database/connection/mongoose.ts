import mongoose from 'mongoose'
import 'dotenv/config'
import { server } from '../../../adapter/server';

export const Mongo_URL = process.env.MONGO_URL!;

mongoose
  .connect(Mongo_URL)
  .then(() => {
    console.log('Connected to MongoDB')
 
    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`)
    })
    
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB: ', error)
  })