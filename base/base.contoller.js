function getItemlist(req, res, Model, listKey, sortOrder = '') {

    return Model.find(sortOrder).exec((error, itemList) => {
        if (error) {
            res.status(500).send(error);
        }

        res.json({
            [listKey]: itemList
        });
    });
}

function createItem(req, res, Model) {
    const modelToSave = new Model(req.body);

    return modelToSave.save()
        .then((item) => res.status(200).send(item))
        .catch((error) => res.status(500).send(error));
}

function getItem(req, res, Model) {
    return Model.findById(req.params.id)
        .then((item) => res.status(200).json(item))
        .catch((error) => res.status(500).send(error));
}

function updateItem(req, res, Model) {
    return Model.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec()
        .then((item) => res.status(200).json(item))
        .catch((error) => res.status(500).send(error));
}

function deleteItem(req, res, Model) {
    return Model.findOne({ _id: req.params.id }).exec((error, item) => {
        if (error) {
            res.status(500).send(error);
        }

        return item.remove(() => {
            res.status(200).end();
        });
    });
}

module.exports = {
    getItemlist: getItemlist,
    createItem: createItem,
    getItem: getItem,
    updateItem: updateItem,
    deleteItem: deleteItem
};
