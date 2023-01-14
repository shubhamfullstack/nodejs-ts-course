# use of express validator project
```
[
    body("accountName")
      .isString()
      .withMessage("Provide a valid account name"),
    body("amount").isNumeric().withMessage("Provide a valid amount"),
  ]
```

### Listen for errors like this

```
 const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send(errors.array())
    }
```