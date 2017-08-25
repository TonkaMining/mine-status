const BaseController = require('../base/base.contoller');
const GpuStatModel = require('./gpuStat.model');

function getGpuStatList(req, res) {
    return BaseController.getItemlist(req, res, GpuStatModel, 'gpuStatList');
}

function getCurrentGpuStat(req, res) {
    return GpuStatModel.findOne({})
        .then((gpuStat) => res.send({ gpuStat }))
        .catch((error) => res.status(500).send(error));
}

function createGpuStat(req, res) {
    return BaseController.createItem(req, res, GpuStatModel);
}

module.exports = {
    getGpuStatList: getGpuStatList,
    getCurrentGpuStat: getCurrentGpuStat,
    createGpuStat: createGpuStat
};
