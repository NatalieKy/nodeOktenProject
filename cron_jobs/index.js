const cron = require('node-cron');

const { CRONE_00_00_EVERY_DAY } = require('../configs/constants/Constants');
const { croneService } = require('../Services/crone');

module.exports = {
    deleteRefreshTokenAfter30Days: () => {
        cron.schedule(CRONE_00_00_EVERY_DAY, async () => {
            await croneService.deleteRefreshTokenAfterExpiration();
        });
    }
};
