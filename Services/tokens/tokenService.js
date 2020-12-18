const dataBase = require('../../dataBase').getInstance();

module.exports = {
    createTokens: (tokens) => {
        const OAuth = dataBase.getModel('OAuth');

        return OAuth.create(tokens);
    },

    getAccessTokenAndStudent: (accessToken) => {
        const OAuth = dataBase.getModel('OAuth');
        const Student = dataBase.getModel('Student');

        return Student.findOne({
            include: {
                model: OAuth,
                where: { accessToken }
            }
        });
    },

    getRefreshToken: (refreshToken) => {
        const OAuth = dataBase.getModel('OAuth');

        return OAuth.findOne({
            where: { refreshToken }
        });
    },

    getRefreshTokenAndStudent: (refreshToken) => {
        const OAuth = dataBase.getModel('OAuth');
        const Student = dataBase.getModel('Student');

        return Student.findOne({
            include: {
                model: OAuth,
                where: { refreshToken }
            }
        });
    },

    deleteTokens: (studentID) => {
        const OAuth = dataBase.getModel('OAuth');

        return OAuth.destroy({
            where: { studentID }
        });
    }

};
