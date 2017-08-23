const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rigStatSchema = Schema({
    time: { type: Number, index: true, unique: true },
    version: String,
    runningTime: String,
    hashrateWithShares: String,
    gpuHashrates: String,
    dcrHashrateWithShares: String,
    dcrHashrate: String,
    gpuTempsAndFanSpeeds: String,
    pools: String,
    invalidSharesAndPoolSwitches: String
});

const RigStatModel = mongoose.model('RigStatModel', rigStatSchema);

module.exports = RigStatModel;
