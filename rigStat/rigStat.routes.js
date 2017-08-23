const express = require('express');
const RigStatController = require('./rigStat.controller');

const router = express.Router();

router.route('/rigStats').get(RigStatController.getRigStatList);

module.exports = router;
