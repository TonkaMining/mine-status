const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpuStatSchema = Schema({
    time: Number,
    cardId: String,
    hashRate: Number,
    temperature: Number,
    fanSpeed: Number,
    rigPosition: Number,
    rigName: String
}, { collection: 'gpustats'});

const GpuStatModel = mongoose.model('GpuStatModel', gpuStatSchema);

module.exports = GpuStatModel;
