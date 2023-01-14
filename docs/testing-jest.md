# Unit testing using JEST

We will use two modules to test our code

1. JEST
    * It will start in memory mongo instance
    * Start express app
    * setup supertest for fake requests
    * run assertions
2. Supertest(For dummy requests)


### changes in code

1. Saperate app.js and index.js -> Index will only contain code to listen and connecting to mongodb
2. install dependencies

```
npm i -D @types/jest jest @types/supertest supertest mongodb-memory-server ts-jest
```

### Make changes in package.json file

```
"scripts": {
    "start": "ts-node-dev src/index.ts",
    "test":"jest --watchAll --no-cache"
  },
  "jest":{
    "preset":"ts-jest",
    "testEnvironment":"node",
    "setupFilesAfterEnv":["./src/test/setup.ts"]
  },
```

### Lets write setup ts file to setup some before and after tasks
```
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { app } from "../app";

let mongo: any;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

```

### Sample test

```
import request from "supertest";

import { app } from "../../app";

it('return 201 on successful creation of bookings', ()=>{
    return request(app)
    .post('/api/booking')
    .send({
        accountName:'test',
        amount:20,
        type:'GAS'
    })
    .expect(201)
})
```