### How to setup a typescript project

```
npm i -D typescript ts-node-dev @types/express
tsc --init
npm i express body-parser
```

### How starter code looks like

```
import express from 'express';
import { json } from 'body-parser';

let app = express();
app.use(json());

app.listen(3001,()=>{
    console.log('Listening on port 3001')
})
```

Add the below start script in package.json
```
"start": "ts-node-dev src/index.ts"
```

### Next step is to create routes
For creating routes use express.Router() and export the router
like ```export { router as xyzRouter }```

### Use express validator for adding validations to the input
Other alternative is using Joi 
There are multiple validators present for validating the inputs
