import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode: number = 400;
    constructor(private errors: ValidationError[]){
        super('Invalid input parameters');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return this.errors.map((error:ValidationError)=>{
            return { message: error.msg, field: error.param }
        })
    }
}