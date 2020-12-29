const { NO_CONTENT } = require('../../configs/httpStatusCodes');
const tokensCreator = require('../../utilities/tokensCreator');
const { tokenService } = require('../../Services/tokens');
const { transactionInstance } = require('../../dataBase').getInstance();

module.exports = {
    logination: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { id } = req.student;
            const tokens = tokensCreator();

            Object.assign(tokens, { studentID: id });

            await tokenService.createTokens(tokens, transaction);
            await transaction.commit();

            res.json(tokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    logout: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { accessToken } = req;

            await tokenService.deleteTokensByTokenBody(accessToken, transaction);
            await transaction.commit();

            res.json(NO_CONTENT);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    useRefreshToken: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { student_id } = req;

            await tokenService.deleteTokens(student_id);

            const newTokens = tokensCreator();

            Object.assign(newTokens, { studentID: student_id });

            await tokenService.createTokens(newTokens, transaction);
            await transaction.commit();

            res.json(newTokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
