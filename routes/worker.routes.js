const express = require('express');
const router = express.Router();
const WorkerController = require('../controllers/worker.controller');

router.route('/worker').get(WorkerController.getWorkerStats);

module.exports = router;
