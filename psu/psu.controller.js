const PsuModel = require('./psu.model');

function getGpuList(req, res) {
    PsuModel.find().sort('name').exec((error, psuList) => {
        if (error) {
            res.status(500).send(error);
        }

        res.json({ psuList });
    });
}

function createGpu(req, res) {
    const psuModelToSave = new PsuModel(req.body);

    psuModelToSave.save()
        .then((record) => res.status(200).send(record))
        .catch((error) => res.status(500).send(error));
}

function getGpu(req, res) {
    PsuModel.findById(req.params.id)
        .then((psu) => res.status(200).json(psu))
        .catch((error) => res.status(500).send(error));
}

function updateGpu(req, res) {
    PsuModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        .then((psu) => res.status(200).json(psu))
        .catch((error) => res.status(500).send(error));
}

function deleteGpu(req, res) {
    PsuModel.findOne({ _id: req.params.id }).exec((error, psu) => {
        if (error) {
            res.status(500).send(error);
        }

        psu.remove(() => {
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
