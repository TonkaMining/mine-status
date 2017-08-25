const express = require('express');
const GpuStatController = require('./gpuStat.controller');

const router = express.Router();

router.route('/gpuStats').get(GpuStatController.getGpuStatList);
router.route('/gpuStats/current').get(GpuStatController.getCurrentGpuStat);

module.exports = router;
