const dataBase = require('../../dataBase').getInstance();

module.exports = {
    createTokens: (tokens) => {
        const OAuth = dataBase.getModel('OAuth');

        return OAuth.create(tokens);
    },

    getAccessToken: (accessToken) => {
        const OAuth = dataBase.getModel('OAuth');
        const Student = dataBase.getModel('Student');

        return Student.findOne({
            include: {
                model: OAuth,
                where: { accessToken }
            }
        });
    }

};
