const express = require('express');
const router = express.Router();
const SaySomthingV1 = require('../controller/v1/say');

router.get('/', SaySomthingV1.hello);

module.exports = router;