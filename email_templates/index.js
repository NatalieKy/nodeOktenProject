const { NEW_USER } = require('../configs/constants/email-events');

module.exports = {
    [NEW_USER]: {
        subject: 'Welcome letter',
        template: 'welcome-information'
    }
};
