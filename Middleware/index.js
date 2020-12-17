module.exports = {
    studentMiddleware: require('./student'),
    validationMiddleware: require('./student/Validation'),
    authMiddleware: require('./auth')
};
