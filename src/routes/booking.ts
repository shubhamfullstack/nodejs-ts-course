import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { Booking } from "../models/booking";

let router = express.Router();

router.post(
  "/api/booking",
  [
    body("accountName")
      .isString()
      .withMessage("Provide a valid account name"),
    body("amount").isNumeric().withMessage("Provide a valid amount"),
    body("type").isIn(['FINANCE','GAS']).withMessage("Invalid booking types")
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }

    let { accountName, amount, type } = req.body;

    const existingBooking = await Booking.findOne({ accountName });

    if (existingBooking) {
      throw new BadRequestError('AccountName in use');
    }

    const booking = Booking.build({ accountName, amount, type });
    await booking.save();

    res.status(201).send(booking);
  }
);

router.get(
  "/api/booking",
  async (req: Request, res: Response) => {
    let bookings = await Booking.find();

    res.status(200).send(bookings);
  }
);

export { router as bookingRouter };
