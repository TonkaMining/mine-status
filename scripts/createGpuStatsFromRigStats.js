const dotenv = require('dotenv').load();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const RigStatModel = require('../rigStat/rigStat.model');
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

function assembleRigStatsForGpuStatHydration() {
    let gpuList;
    let lastGpuStatRecordTime;
    let lastGpuStatRecordUnixTimestamp;
    let rigStatModelList;

    return new Promise((resolve, reject) => {
        return GpuModel.find().exec()
            .then((gpuListResponse) => {
                gpuList = gpuListResponse;

                return GpuStatModel.find().limit(1).sort({ time: -1 }).exec()
            })
            .then((gpuStatResponse) => {
                lastGpuStatRecordTime = gpuStatResponse[0].time;
                lastGpuStatRecordUnixTimestamp = Math.round(new Date(lastGpuStatRecordTime).getTime() / 1000);

                if (gpuStatResponse.length === 0) {
                    return RigStatModel.find().sort({ time: -1 }).exec();
                }

                return RigStatModel.find({ 'time': { $gt: lastGpuStatRecordUnixTimestamp } }).exec();
            })
            .then((rigStatModelListResponse) => {
                rigStatModelList = rigStatModelListResponse;

                console.log('---', gpuList.length);
                console.log('---', lastGpuStatRecordUnixTimestamp);
                console.log('--- rigStatModelList', rigStatModelList.length);
                console.log('::: rigStatModelList[0]', rigStatModelList[0]);

                mongoose.disconnect();
            })
            .catch((error) => {
                console.error('::: Error', error);

                mongoose.disconnect();

                throw error;
            });
    });
};

assembleRigStatsForGpuStatHydration();
