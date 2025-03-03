const router = require('express').Router();

const { getAll, getPrice } = require('../controller/boxController');

router.get('/getAll', getAll);
router.get('/getPrice', getPrice);

module.exports = router;