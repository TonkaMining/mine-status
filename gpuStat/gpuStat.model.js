const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gpuStatItemSchema = require('./gpuStatItem.schema');

// const gpuStatItemSchema = Schema({
//     cardId: String,
//     hashRate: Number,
//     temperature: Number,
//     fanSpeed: Number,
//     rigPosition: Number
// });

const gpuStatModel = Schema({
    time: { type: Number, index: true, unique: true },
    rig: String,
    items: [gpuStatItemSchema]
}, { collection: 'gpustats'});

const GpuStatModel = mongoose.model('GpuStatModel', gpuStatModel);

module.exports = GpuStatModel;
