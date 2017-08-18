const express = require('express');
const router = express.Router();
const GpuController = require('../controllers/gpu.controller');

router.route('/gpu').get(GpuController.getGpuList);
router.route('/gpu/:id').get(GpuController.getGpu);
router.route('/gpu/create').post(GpuController.createGpu);
router.route('/gpu/:id/edit').put(GpuController.updateGpu);
router.route('/gpu/:id/delete').delete(GpuController.deleteGpu);

module.exports = router;
