const { NEW_USER } = require('../configs/constants/email-events');
const { EMAIL_SUBJECT_WELCOME, EMAIL_TEMPLATE_WELCOME } = require('../configs/constants/Constants');

module.exports = {
    [NEW_USER]: {
        subject: EMAIL_SUBJECT_WELCOME,
        template: EMAIL_TEMPLATE_WELCOME
    }
};
