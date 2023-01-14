import express from 'express';
import { json } from 'body-parser';

import 'express-async-errors';

import { bookingRouter } from './routes/booking';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

let app = express();
app.use(json());

app.use(bookingRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };