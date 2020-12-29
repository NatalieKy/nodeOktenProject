const { Op } = require('sequelize');

const dataBase = require('../../dataBase').getInstance();
const { OAUTH, STUDENT } = require('../../configs/constants/names.enums');
const { THIRTY_DAYS } = require('../../configs/constants/Constants');

module.exports = {
    createTokens: (tokens, transaction) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.create(tokens, { transaction });
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

    JWTRefreshDelete: () => {
        const OAuth = dataBase.getModel(OAUTH);
        return OAuth.destroy({
            where: {
                created_at: {
                    [Op.gt]: new Date(new Date() - THIRTY_DAYS)
                }
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

    deleteTokensByTokenBody: (accessToken, transaction) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.destroy({
            where: { accessToken },
            transaction
        });
    },

    checkRefreshToken: (refreshToken) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.findOne({
            where: { refreshToken }
        });
    },

    deleteTokens: (studentID, transaction) => {
        const OAuth = dataBase.getModel(OAUTH);

        return OAuth.destroy({
            where: { studentID },
            transaction
        });
    }

};
