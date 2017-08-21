const BaseController = require('../base/base.contoller');
const RigModel = require('./rig.model');

function getRigList(req, res) {
    return BaseController.getItemlist(req, res, RigModel, 'rigList');
}

function createRig(req, res) {
    return BaseController.createItem(req, res, RigModel);
}

function getRig(req, res) {
    return BaseController.getItem(req, res, RigModel);
}

function updateRig(req, res) {
    return BaseController.updateItem(req, res, RigModel);
}

function deleteRig(req, res) {
    return BaseController.deleteItem(req, res, RigModel);
}

module.exports = {
    getRigList: getRigList,
    createRig: createRig,
    getRig: getRig,
    updateRig: updateRig,
    deleteRig: deleteRig
};
