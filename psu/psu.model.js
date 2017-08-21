const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const psuSchema = Schema({
    psuId: { type: String, index: true, unique: true},
    manufacturer: String,
    model: String,
    maxPower: Number,
    rigName: String,
    currentPowerDraw: { type: Number, default: -1 },
    cost: Number
}, { collection: 'psus' });

const PsuModel = mongoose.model('PsuModel', psuSchema);

module.exports = PsuModel;
