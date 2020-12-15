module.exports = {
    userMiddleware: require('./user/user.middeware'),
    validationMiddleware: require('../Middleware/user/Validation'),
    userAuthMiddleware: require('./user/user.auth.middleware')
};
