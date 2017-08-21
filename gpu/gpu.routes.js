const express = require('express');
const GpuController = require('./gpu.controller');

const router = express.Router();

router.route('/gpu').get(GpuController.getGpuList);
router.route('/gpu/:id').get(GpuController.getGpu);
router.route('/gpu/create').post(GpuController.createGpu);
router.route('/gpu/:id/edit').put(GpuController.updateGpu);
router.route('/gpu/:id/delete').delete(GpuController.deleteGpu);

module.exports = router;
