const productModel = require('../../models/Product')

exports.createProduct = async (req, res) => {
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
}