const { NO_CONTENT } = require('../../configs/httpStatusCodes');
const tokensCreator = require('../../utilities/tokensCreator');
const { tokenService } = require('../../Services/tokens');

module.exports = {
    logination: async (req, res, next) => {
        try {
            const { id } = req.student;
            const tokens = tokensCreator();

            Object.assign(tokens, { studentID: id });

            await tokenService.createTokens(tokens);
            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { accessToken } = req;
            await tokenService.deleteTokensByTokenBody(accessToken);

            res.json(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    useRefreshToken: async (req, res, next) => {
        try {
            const { student_id } = req;

            await tokenService.deleteTokens(student_id);

            const newTokens = tokensCreator();

            Object.assign(newTokens, { studentID: student_id });

            await tokenService.createTokens(newTokens);

            res.json(newTokens);
        } catch (e) {
            next(e);
        }
    }
};
