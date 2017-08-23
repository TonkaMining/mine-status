const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpuStatSchema = Schema({
    time: { type: Date, default: Date.now },
    cardId: String,
    hashRate: Number,
    temperature: Number,
    fanSpeed: Number,
    rigPosition: Number,
    rigName: String
}, { collection: 'gpuStats'});

const GpuStatModel = mongoose.model('GpuStatModel', gpuStatSchema);

module.exports = GpuStatModel;
