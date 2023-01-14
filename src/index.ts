import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect('mongodb://localhost:27017/bookings-db');
        console.log('Successfully connected to MongoDb');
    }catch(err){
        console.log(err)
    }
    app.listen(3001,()=>{
        console.log('Listening on port 3001')
    })
}

start()