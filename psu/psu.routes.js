const express = require('express');
const router = express.Router();
const PsuController = require('./psu.controller');

router.route('/psu').get(PsuController.getGpuList);
router.route('/psu/:id').get(PsuController.getGpu);
router.route('/psu/create').post(PsuController.createGpu);
router.route('/psu/:id/edit').put(PsuController.updateGpu);
router.route('/psu/:id/delete').delete(PsuController.deleteGpu);

module.exports = router;
