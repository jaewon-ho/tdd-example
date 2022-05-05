// 통합 테스트 파일

const request = require('supertest');
const app = require('../../server');

let newProduct = require('../data/new-product.json')

it("POST /product", async() => {
    // console.log(request)
    const res = await request(app)
        .post("/product")
        .send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newProduct.name);
    expect(res.body.description).toBe(newProduct.description);
    expect(res.body.price).toBe(newProduct.price);
})


it ("should return 500 error on POST /product", async () => {
    const res = await request(app)
        .post("/product")
        .send({name:'phone'});
    
    expect(res.statusCode).toBe(500);
    expect(res.body).toStrictEqual({message: "Product validation failed: description: Path `description` is required."});
})