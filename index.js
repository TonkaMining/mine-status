const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').load();

const minerRoutes = require('./miner/miner.routes');
const workerRoutes = require('./worker/worker.routes');
const gpuRoutes = require('./gpu/gpu.routes');
const psuRoutes = require('./psu/psu.routes');
const rigRoutes = require('./rig/rig.routes');

const mongoUri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3006;

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(mongoUri, { useMongoClient: true }, (err, res) => {
    if (err) {
        console.log (`ERROR connecting to: ${mongoUri} - ${err}`);

        return;
    }

    console.log (`Successfully connected to: ${mongoUri}`);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', minerRoutes);
app.use('/api', workerRoutes);
app.use('/api', gpuRoutes);
app.use('/api', psuRoutes);
app.use('/api', rigRoutes);

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Server started on port: ${PORT}`);
});
