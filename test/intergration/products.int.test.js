// 통합 테스트 파일

const request = require('supertest');
const app = require('../../server');

let newProduct = require('../data/new-product.json')
let allProducts = require('../data/all-products.json')

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


it("GET /product", async () => {
    const response = await request(app).get('/product');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
})

it("GET /product/:id", async() => {
    const response = await request(app).get("/product/"+"627337c82748612de3af3890");
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBeDefined();
    expect(response.body.description).toBeDefined();
});

