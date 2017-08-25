const dotenv = require('dotenv').load();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _map = require('lodash').map;
const RigStatModel = require('../rigStat/rigStat.model');
const gpuStatItemSchema = require('../gpuStat/gpuStatItem.schema');
const GpuModel = require('../gpu/gpu.model');
const GpuStatModel = require('../gpuStat/gpuStat.model');

const mongoUri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3007;

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongoUri, { useMongoClient: true }, (err, res) => {
    if (err) {
        console.log (`ERROR connecting to: ${mongoUri} - ${err}`);

        return;
    }

    console.log (`Successfully connected to: ${mongoUri}`);
});

function createGpuStatPropsFromRigStatAndGpuModel(rigStatProps, gpuModel) {
    const gpuStatModel = {};

    gpuStatModel.time = rigStatProps.time;
    gpuStatModel.hashRate = rigStatProps.hashRate;
    gpuStatModel.temperature = rigStatProps.temp;
    gpuStatModel.fanSpeed = rigStatProps.fanSpeed;
    gpuStatModel.cardId = gpuModel.cardId;
    gpuStatModel.rigPosition = gpuModel.rigPosition;
    gpuStatModel.rigName = gpuModel.rig;

    return gpuStatModel;
}

function generateGpuStatModelList(rigStatModelList, gpuList) {
    const gpuStatModelList = [];

    if (rigStatModelList.length === 0 || gpuList.length === 0) {
        return;
    }

    for (let i = 0; i < rigStatModelList.length; i++) {
        const rigStatModel = new RigStatModel(rigStatModelList[i]);
        const translatedRigStatModel = rigStatModel.translateToGpuStatProps();
        const gpuStatModel = new GpuStatModel({
            time: rigStatModel.time,
            rig: rigStatModel.rig,
            items: []
        });

        if (translatedRigStatModel.length !== gpuList.length) {
            throw Error(`Model length mismatch. translatedRigStatModel: ${translatedRigStatModel.length} does not ` +
                `contain the same number or elements as gpuList: ${gpuList.length}`);
        }

        for (let j = 0; j < gpuList.length; j++) {
            const gpuModel = gpuList[j];
            const gpuStatProps = createGpuStatPropsFromRigStatAndGpuModel(translatedRigStatModel[j], gpuModel);

            gpuStatModel.items.push(gpuStatProps);
        }

        gpuStatModelList.push(gpuStatModel);
    }

    return gpuStatModelList;
}

/**
 *
 * @param {*} gpuStatModelList
 * @return {Promise}
 */
function saveGpuStatModelList(gpuStatModelList) {
    if (!gpuStatModelList || gpuStatModelList.length === 0) {
        return Promise.reject('No Items to Save');
    }

    const modelListToSave = _map(gpuStatModelList, (gpuStatModel) => {
        return new Promise((resolve, reject) => {
            gpuStatModel.save((error, model) => {
                if (error) {
                    return reject(error);
                }

                return resolve(model);
            });
        });
    });

    return Promise.all(modelListToSave);
}

/**
 * @return {Promise}
 */
function assembleRigStatsForGpuStatHydration() {
    let gpuList;
    let lastGpuStatRecordTime;
    let lastGpuStatRecordUnixTimestamp;
    let rigStatModelList;
    let gpuStatModelList;

    return new Promise((resolve, reject) => {
        return GpuModel.find().exec()
            .then((gpuListResponse) => {
                gpuList = gpuListResponse;

                return GpuStatModel.find().limit(1).sort({ time: -1 }).exec()
            })
            .then((gpuStatResponse) => {
                lastGpuStatRecordTime = gpuStatResponse.length > 0 ? gpuStatResponse[0].time : 0;
                lastGpuStatRecordUnixTimestamp = Math.round(new Date(lastGpuStatRecordTime).getTime() / 1000);

                if (gpuStatResponse.length === 0) {
                    return RigStatModel.find().sort({ time: -1 }).exec();
                }

                return RigStatModel.find({ 'time': { $gt: lastGpuStatRecordUnixTimestamp } }).exec();
            })
            .then((rigStatModelListResponse) => {
                rigStatModelList = rigStatModelListResponse;
                gpuStatModelList = generateGpuStatModelList(rigStatModelList, gpuList);

                return resolve(saveGpuStatModelList(gpuStatModelList));
            })
            .catch((error) => {
                return reject(error);
            });
    });
};

assembleRigStatsForGpuStatHydration()
    .then(() => {
        mongoose.disconnect();
    })
    .catch((error) => {
        console.error('\n::: Error', error.message);

        throw error;
    });
