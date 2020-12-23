const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { MAIL, PASSWORD_TO_MAIL, TYPE_OF_MAIL } = require('../configs/config');
const { LOCALHOST, NO_REPLY } = require('../configs/constants/names.enums');
const { ErrorHandler, errorTypes: { WRONG_TEMPLATE } } = require('../Errors');
const pugs = require('../email_templates');

const transporter = nodemailer.createTransport({
    service: TYPE_OF_MAIL,
    auth: {
        pass: PASSWORD_TO_MAIL,
        user: MAIL,
    },
    host: LOCALHOST,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
});

const emailTemplates = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email_templates')
    }
});

const EmailSender = async (userMail, typeOfAction, info) => {
    try {
        const typeOfTemplate = pugs[typeOfAction];

        if (!typeOfTemplate) {
            throw new ErrorHandler(WRONG_TEMPLATE.message, WRONG_TEMPLATE.code);
        }

        const html = await emailTemplates.render(typeOfTemplate.template, info);

        return transporter.sendMail({
            from: NO_REPLY,
            to: userMail,
            subject: typeOfTemplate.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    EmailSender
};
