const productController = require('../../controller/v1/products')
const productModel = require('../../models/Product')

const httpMock = require('node-mocks-http');

const newProduct = require('../data/new-product');
const allProducts = require('../data/all-products');

const Product = require('../../models/Product');
// const req = require('express/lib/request');

productModel.create = jest.fn(); // Spy 함수 호출 여부를 파악
productModel.find = jest.fn(); // Spy 함수 호출 여부를 파악
productModel.findById = jest.fn(); // Spy 함수 호출 여부를 파악

let req = null;
let res = null;
let next = null;

// beforEach 하위 구조 테스트 케이스에서 동일한 작업이 필요할 경우 작성함 
beforeEach(() => {// 모든 케이스에 적용함
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    next = jest.fn(); // Spy 함수 호출 여부를 파악
})

// describe 여러 관련 테스트를 그룹화 하는 블록을 만든다
// it 개별 테스트를 수행하는 곳.
describe('Product Controller Create', () => {  // ProductContoller 의 테스트 케이스 작성
    
    beforeEach(() => { // create 관련 describe 에만 적용함
        req.body = newProduct;
    })

    // expect : 값을 테스트 할 때마다 테스트. matcher와 함께 사용함.
    it("Should have a createProduct Function ", () => { 
        // createProduct 라는 함수를 가지고 있어야 한다.
        expect(typeof productController.createProduct).toBe("function");
    }); 

    it("Should call ProductModel.create ", async () => {
        // createProduct 함수에서는 ProductModel의 create 함수를 호출 해야 한다.
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalled();
    })

    it("should return 201 response Code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should return json body in response", async () => {
        Product.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })

    it("should handle errors", async() => {
        const errorMesasge = {message: "description property missing"};
        const rejectedPromise = Promise.reject(errorMesasge);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMesasge);
    })
})


describe("Product Controller Get List", () => {
    it("should have a getProducts function", () => {
        expect(typeof productController.getProducts).toBe("function");
    })

    it("should call ProductModel.find({})", async () => {
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    });
    
    it("should return 200 response ", async () => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    });

    it("should return json body in response", async () => {
        // await productController.getProducts()
        productModel.find.mockReturnValue(allProducts);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts);
    })

    it("should handle errors", async () => {
        const errorMesasge = {message: "Error finding product data"};
        const rejectedPromise = Promise.reject(errorMesasge);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        console.log(res);
        expect(next).toBeCalledWith(errorMesasge);
    })

})


describe("Product Contoller GetById", () => {
    it("shoud have a getProductById", () => {
        expect(typeof productController.getProductById).toBe("function");
    })

    it("should called productModel.findById", async () => {
        req.params.id = "627337c82748612de3af3890";
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(req.params.id);
    })

    it("should return json body and response code 200", async () => {
        // req.params.id = "627337c82748612de3af3890";
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    })
    
    it("should return 404 error when item dosen't exist", async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled).toBeTruthy();
    })

    it("should handle errors", async() => {
        req.params.id = "";
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        // expect(next).toHaveBeenCalledWith()
    })
})