import mongoose from 'mongoose';

enum BookingType {
    FINANCE,
    GAS
}

interface BookingAttrs {
    accountName: string,
    amount: number,
    type: BookingType
}

interface BookingModel extends mongoose.Model<BookingDoc> {
    build(attrs: BookingAttrs): BookingDoc
}

interface BookingDoc extends mongoose.Document {
    accountName: string,
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