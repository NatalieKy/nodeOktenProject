const dataBase = require('../../dataBase').getInstance();
const { OAUTH, STUDENT } = require('../../configs/constants/names.enums');

module.exports = {
    createTokens: (tokens) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.create(tokens);
    },

    getAccessTokenAndStudent: (accessToken) => {
        const OAuth = dataBase.getModel(OAUTH);
        const Student = dataBase.getModel(STUDENT);

        return Student.findOne({
            include: {
                model: OAuth,
                where: { accessToken }
            }
        });
    },

    getRefreshTokenAndStudent: (refreshToken) => {
        const OAuth = dataBase.getModel(OAUTH);
        const Student = dataBase.getModel(STUDENT);

        return Student.findOne({
            include: {
                model: OAuth,
                where: { refreshToken }
            }
        });
    },

    getStudentWithTokens: (email) => {
        const OAuth = dataBase.getModel(OAUTH);
        const Student = dataBase.getModel(STUDENT);

        return Student.findOne({
            where: { email },
            include: {
                model: OAuth
            }
        });
    },

    getRefreshToken: (refreshToken) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.findOne({
            where: { refreshToken }
        });
    },

    deleteTokensByTokenBody: (accessToken) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.destroy({
            where: { accessToken }
        });
    },

    checkRefreshToken: (refreshToken) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.findOne({
            where: { refreshToken }
        });
    },

    deleteTokens: (studentID) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.destroy({
            where: { studentID }
        });
    }

};
