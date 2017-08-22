const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gpuSchema = Schema({
    cardId: { type: String, index: true, unique: true },
    manufacturer: String,
    model: String,
    memory: Number,
    rig: String,
    rigPosition: { type: Number, default: -1 },
    mhs: { type: Number, default: 10 },
    coreVoltage: { type: Number, default: -1 },
    coreClock: { type: Number, default: -1 },
    memoryClock: { type: Number, default: -1 },
    cost: Number,
    power: { type: Number, default: 100 },
    purchaseDate: Date
}, { collection: 'gpus' });

const GpuModel = mongoose.model('GpuModel', gpuSchema);

module.exports = GpuModel;
