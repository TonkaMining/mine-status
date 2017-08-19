const express = require('express');
const router = express.Router();
const MinerController = require('./miner.controller');

router.route('/miner').get(MinerController.getMinerStats);

module.exports = router;
