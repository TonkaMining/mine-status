const express = require('express');
const router = express.Router();
const PsuController = require('./psu.controller');

router.route('/psu').get(PsuController.getPsuList);
router.route('/psu/:id').get(PsuController.getPsu);
router.route('/psu/create').post(PsuController.createPsu);
router.route('/psu/:id/edit').put(PsuController.updatePsu);
router.route('/psu/:id/delete').delete(PsuController.deletePsu);

module.exports = router;
