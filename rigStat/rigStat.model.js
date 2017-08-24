const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const _chunk = require('lodash').chunk;
const _map = require('lodash').map;

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
}, { collection: 'rigstatmodels' });

function extractHashrates(rigStatModel) {
    return rigStatModel.gpuHashrates.split(';');
}

function extractTempAndFanSpeed(rigStatModel) {
    const tempAndFanSpeeds = _chunk(rigStatModel.gpuTempsAndFanSpeeds.split(';'), 2);

    return _map(tempAndFanSpeeds, (tempAndFan) => ({
        temp: tempAndFan[0],
        fanSpeed: tempAndFan[1]
    }));
}

rigStatSchema.methods.translateToGpuStatProps = function translateToGpuStatProps() {
    const hashRates = extractHashrates(this);
    const tempAndFanSpeeds = extractTempAndFanSpeed(this);

    return _map(hashRates, (hashRate, i) => ({
        hashRate: hashRate === 'off' ? 0 : hashRate,
        temp: tempAndFanSpeeds[i].temp,
        fanSpeed: tempAndFanSpeeds[i].fanSpeed
    }));
};

const RigStatModel = mongoose.model('RigStatModel', rigStatSchema);

module.exports = RigStatModel;
