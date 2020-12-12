const bcrypt = require('bcrypt');

const { errorTypes: { NOT_VALID_CREDENTIALS }, ErrorHandler } = require('../Errors');

module.exports = {
    passwordHasher: (password) => bcrypt.hash(password, 10),
    passwordEqualityChecker: async (password, hash) => {
        const isPasswordTrue = await bcrypt.compare(password, hash);

        if (!isPasswordTrue) {
            throw new ErrorHandler(NOT_VALID_CREDENTIALS.message, NOT_VALID_CREDENTIALS.code);
        }
    }
};
