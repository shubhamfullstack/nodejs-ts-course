import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';

import 'express-async-errors';

import { bookingRouter } from './routes/booking';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './middlewares/not-found-error';

let app = express();
app.use(json());

app.use(bookingRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

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