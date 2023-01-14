import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../middlewares/request-validation-error";

let router = express.Router();

router.post(
  "/api/booking",
  [
    body("accountName")
      .isString()
      .withMessage("Provide a valid account name"),
    body("amount").isNumeric().withMessage("Provide a valid amount"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }

    let { accountName, amount, type } = req.body;
    res.status(200).send({message:'done'})
  }
);

export { router as bookingRouter };
