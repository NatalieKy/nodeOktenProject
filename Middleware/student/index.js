module.exports = {
    studentMiddleware: require('./student.middeware'),
    studentAuthMiddleware: require('../auth/areCredentialsTrue.middleware'),
};
