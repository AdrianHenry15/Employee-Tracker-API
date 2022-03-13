// Express
const express = require('express');
const db = require('../../db/connection');
const router = express.Router();

// Router
router.use(require('./department'));
router.use(require('./roles'));
router.use(require('./employee'));



module.exports = router;