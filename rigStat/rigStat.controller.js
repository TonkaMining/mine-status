const RigStatModel = require('./rigStat.model');

/**
 * Expects a response in the shape of:
 * ```javascript
 * {
 *     "id": 0,
 *     "error": null,
 *     "result": [
 *         "9.7 - ETH",
 *         "1489",
 *         "78471;1657;2",
 *         "12390;31306;12456;12178;10139",
 *         "0;0;0",
 *         "off;off;off;off;off",
 *         "71;100;67;32;65;45;66;45;66;33",
 *         "us2.ethermine.org:4444",
 *         "0;30;0;0"
 *     ]
 * };
 * ```
 *
 * @param response {object}
 */
function saveRigStat(response) {
    const parsedResponse = JSON.parse(response);

    if (!parsedResponse.result) {
        console.log('No data to parse');

        return;
    }

    const currentStats = parsedResponse.result;
    const model = new RigStatModel();

    model.time = new Date().getTime();
    model.version = currentStats[0];
    model.runningTime = currentStats[1];
    model.hashrateWithShares = currentStats[2];
    model.gpuHashrates = currentStats[3];
    model.dcrHashrateWithShares = currentStats[4];
    model.dcrHashrate = currentStats[5];
    model.gpuTempsAndFanSpeeds = currentStats[6];
    model.pools = currentStats[7];
    model.invalidSharesAndPoolSwitches = currentStats[8];

    model.save()
        .then((response) => {
            console.log('RigStatModel saved!', model);
        })
        .catch((error) => {
            throw new Error(`Something went terribly wrong::: ${error}`);
        });
}

module.exports = {
    saveRigStat: saveRigStat
};
