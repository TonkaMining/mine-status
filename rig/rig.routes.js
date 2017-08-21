const express = require('express');
const RigController = require('./rig.controller');

const router = express.Router();

router.route('/rig').get(RigController.getRigList);
router.route('/rig/:id').get(RigController.getRig);
router.route('/rig/create').post(RigController.createRig);
router.route('/rig/:id/edit').put(RigController.updateRig);
router.route('/rig/:id/delete').delete(RigController.deleteRig);

module.exports = router;
