const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { MAIL, PASSWORD_TO_MAIL, TYPE_OF_MAIL } = require('../configs/config');
const { ErrorHandler, errorTypes: { WRONG_TEMPLATE } } = require('../Errors');
const pugs = require('../email_templates');

const transporter = nodemailer.createTransport({
    service: TYPE_OF_MAIL,
    auth: {
        pass: PASSWORD_TO_MAIL,
        user: MAIL,
    },
    host: 'localhost',
    secure: false,
    tls: {
        // do not fail on invalid certs
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
            from: 'NO REPLY',
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
