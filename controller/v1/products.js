const productModel = require('../../models/Product')

exports.createProduct = async (req, res, next) => {
    try{
        const createdProduct = await productModel.create(req.body);
        res.status(201).json(createdProduct);
    } catch(e) {
        // console.log(e);
        next(e);
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const list = await productModel.find({});
        res.status(200).json(list);
    }catch(e) {
        next(e);
    }
}

exports.getProductById = async (req, res, next) => {
    try {
        const result = await productModel.findById(req.params.id);
        if(!result) throw new Error("not found");

        res.status(200).json(result);
    } catch(e) {
        if(e.message === 'not found') res.status(404);
        next(e);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedData = await productModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedData) throw new Error('not found');
        res.status(201).json(updatedData);
    }catch(e) {
        if(e.message === 'not found') res.status(404);
        else res.status(500)
        next(e);
    }
}