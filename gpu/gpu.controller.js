const GpuModel = require('./gpu.model');

function getGpuList(req, res) {
    GpuModel.find().sort('name').exec((error, gpuList) => {
        if (error) {
            res.status(500).send(error);
        }

        res.json({ gpuList });
    });
}

function createGpu(req, res) {
    const gpuModelToSave = new GpuModel(req.body);

    gpuModelToSave.save()
        .then((record) => res.status(200).send(record))
        .catch((error) => res.status(500).send(error));
}

function getGpu(req, res) {
    GpuModel.findById(req.params.id)
        .then((gpu) => res.status(200).json(gpu))
        .catch((error) => res.status(500).send(error));
}

function updateGpu(req, res) {
    GpuModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        .then((gpu) => res.status(200).json(gpu))
        .catch((error) => res.status(500).send(error));
}

function deleteGpu(req, res) {
    GpuModel.findOne({ _id: req.params.id }).exec((error, gpu) => {
        if (error) {
            res.status(500).send(error);
        }

        gpu.remove(() => {
            res.status(200).end();
        });
    });
}

module.exports = {
    getGpuList: getGpuList,
    createGpu: createGpu,
    getGpu: getGpu,
    updateGpu: updateGpu,
    deleteGpu: deleteGpu
};
