const tokensCreator = require('../../utilities/tokensCreator');
const { tokenService: { createTokens } } = require('../../Services/tokens');

module.exports = {
    logination: async (req, res, next) => {
        try {
            const { id } = req.student;
            const tokens = tokensCreator();

            Object.assign(tokens, { studentID: id });

            await createTokens(tokens);
            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
