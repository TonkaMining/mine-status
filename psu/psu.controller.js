const BaseController = require('../base/base.contoller');
const PsuModel = require('./psu.model');

function getPsuList(req, res) {
    return BaseController.getItemlist(req, res, PsuModel, 'psuList');
}

function createPsu(req, res) {
    return BaseController.createItem(req, res, PsuModel);
}

function getPsu(req, res) {
    return BaseController.getItem(req, res, PsuModel);
}

function updatePsu(req, res) {
    return BaseController.updateItem(req, res, PsuModel);
}

function deletePsu(req, res) {
    return BaseController.deleteItem(req, res, PsuModel);
}

module.exports = {
    getPsuList: getPsuList,
    createPsu: createPsu,
    getPsu: getPsu,
    updatePsu: updatePsu,
    deletePsu: deletePsu
};
