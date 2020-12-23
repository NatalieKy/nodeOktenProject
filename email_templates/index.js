const { NEW_USER, DELETED_USER } = require('../configs/constants/email-events');
const {
    EMAIL_SUBJECT_WELCOME,
    EMAIL_TEMPLATE_WELCOME,
    EMAIL_SUBJECT_BYE,
    EMAIL_TEMPLATE_BYE
} = require('../configs/constants/Constants');

module.exports = {
    [NEW_USER]: {
        subject: EMAIL_SUBJECT_WELCOME,
        template: EMAIL_TEMPLATE_WELCOME
    },

    [DELETED_USER]: {
        subject: EMAIL_SUBJECT_BYE,
        template: EMAIL_TEMPLATE_BYE
    }
};
