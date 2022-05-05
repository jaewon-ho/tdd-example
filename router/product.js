const express = require('express');
const router = express.Router();
const productControllerV1 = require('../controller/v1/products')

router.get('/', (req, res) => {
    res.send(`Router return : ${__dirname}`);
});

router.post('/', productControllerV1.createProduct);

module.exports = router;