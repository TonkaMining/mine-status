const BaseController = require('../base/base.contoller');
const GpuStatModel = require('./gpuStat.model');

function getGpuStatList(req, res) {
    return BaseController.getItemlist(req, res, GpuStatModel, 'gpuStatList');
}

function createGpuStat(req, res) {
    return BaseController.createItem(req, res, GpuStatModel);
}

module.exports = {
    getGpuStatList: getGpuStatList,
    createGpuStat: createGpuStat
};
