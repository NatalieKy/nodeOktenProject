const { tokenService } = require('../tokens');

module.exports = {
    deleteRefreshTokenAfterExpiration: async () => {
        await tokenService.JWTRefreshDelete();
    }
};
