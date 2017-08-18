const Miner = require('../models/MinerModel');

function getMinerStats(req, res) {
    Miner.find().sort('time').exec((error, minerList) => {
        if (error) {
            res.status(500).send(error);
        }

        res.json({ minerList });
    });
}

module.exports = {
    getMinerStats: getMinerStats
};
