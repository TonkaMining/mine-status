const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpuStatItemSchema = Schema({
    cardId: String,
    hashRate: Number,
    temperature: Number,
    fanSpeed: Number,
    rigPosition: Number
});

// const GpuStatItemModel = mongoose.model('GpuStatItemModel', gpuStatItemSchema);

module.exports = gpuStatItemSchema;
