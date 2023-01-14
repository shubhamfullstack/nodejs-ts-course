# Lets learn now how to connect to mongodb using typescript

### Installation

```
npm i mongoose
npm i -D @types/mongoose
```

### Usage

Create a start function and call connect() method. Call start function after express is listen and server is started.

```
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
```

## Creating a model

Building a model in mongoose is very straight forward. But with typescript there is some issues. 
1. Mongoose model types are not same as typescript types
2. It will not give intelli sense as they are not typescript types. 
3. For adding ts types we need to explicitly create a build function.

```
const bookingSchema = new mongoose.Schema({
    accountName:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: String
})
```

4. Lets create a custom types that are required when we create a new model document
```
enum BookingType {
    FINANCE,
    GAS
}

interface BookingAttrs {
    accounName: string,
    amount: number,
    type: BookingType
}
```

5. Now lets create a method that will be used to create a new Booking. Lets add that method as ```schema.statics.build```

```
import mongoose from 'mongoose';

enum BookingType {
    FINANCE,
    GAS
}

interface BookingAttrs {
    accounName: string,
    amount: number,
    type: BookingType
}

interface BookingModel extends mongoose.Model<BookingDoc> {
    build(attrs: BookingAttrs): BookingDoc
}

interface BookingDoc extends mongoose.Document {
    accounName: string,
    amount: number,
    type: BookingType
  }

const bookingSchema = new mongoose.Schema({
    accountName:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: String
})

bookingSchema.statics.build = (attrs: BookingAttrs) => {
    return new Booking(attrs);
}

const Booking = mongoose.model<BookingDoc, BookingModel>('Booking', bookingSchema)

export { Booking }
```