const express = require('express');
const router = express.Router();
const productControllerV1 = require('../controller/v1/products')

router.get('/', productControllerV1.getProducts);
router.post('/', productControllerV1.createProduct);
router.get('/:id', productControllerV1.getProductById);

module.exports = router;
