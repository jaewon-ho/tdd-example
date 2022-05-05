const productModel = require('../../models/Product')

exports.createProduct = async (req, res, next) => {
    try{
        const createdProduct = await productModel.create(req.body);
        res.status(201).json(createdProduct);
    } catch(e) {
        console.error(e);
        next(e);
    }
}