const Worker = require('../models/WorkerModel');

function getWorkerStats(req, res) {
    Worker.find().exec((error, workerList) => {
        if (error) {
            res.status(500).send(error);
        }

        res.json({ workerList });
    });
}

module.exports = {
    getWorkerStats: getWorkerStats
};
