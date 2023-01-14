### what is the flow

1. In main file throw the custom error for example if error is request validation then throw request validation error and pass correct arguments
2. Request validation should extend to abstract class and create generic structure of message.
3. Since abstract class is extending Error class it will go to error handling middleware
4. Error handling middleware will check if the instance of error is abstract class then get status code and message from error and respond back to the request

### why do we need centralized error handling

Since in microservices architecture, there should be some standards
where all microservices should return error in similar structure so that
they can be handled properly in clients.

### Why we need to create error-handling.ts

Error handling is a middle ware express provides by default as it contains error and next as input
parameters. This middleware will handle the error and sends the response approprately.

```
import { NextFunction, Request, Response } from "express";
import { CustomError } from "./custom-error";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send(error.serializeErrors());
  }

  res.status(400).send([{ message: "Something went wrong" }]);
};

```

### Why need a abstract class

We need to define the structure of error for example it should have a status code and return 
message and optional field. We need to make abstract class so that we dont have to write multiple 
if else condition in error-handling middleware. 

Remember - We need to define structure of error message in abstract class

```
export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message:string){
        super(message)
    }

    abstract serializeErrors():{message:string, field?:string}[];
}
```

### Custom error files

There can be multiple error types such as request validation, not found, database error etc. We need to create
saperate class to handle error of specific type. It should extend abstract class so that TS will automatically force
custom error class to add the neccessary fields and method.

```
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode: number = 404;
    constructor(){
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{message: 'Route not found'}]
    }
}
```

### What about async errors?

When we add async to not found middleware(*). The reason is when we add async keyword it will not return value immediately
rather return a promise that will be resolved in future. To resolve this we can use another package

##### Before
```
app.all("*", async () => {
    throw new NotFoundError();
});
```
##### After

```
app.all("*", async (req,res,next) => {
    next(new NotFoundError());
});
```

Or we can use ```express-async-errors```