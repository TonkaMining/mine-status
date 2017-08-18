const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').load();

const minerRoutes = require('./routes/miner.routes');
const workerRoutes = require('./routes/worker.routes');

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

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/api', minerRoutes);
app.use('/api', workerRoutes);

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Server started on port: ${PORT}`);
});
