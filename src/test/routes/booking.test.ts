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