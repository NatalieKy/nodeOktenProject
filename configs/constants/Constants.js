module.exports = {
    DIALECT: 'mysql',
    STUDENTS_PRIMARY_KEY: 'id',
    MINIMUM_AGE: 1,
    ACCESS_TOKEN_LIFE: '1d',
    REFRESH_TOKEN_LIFE: '30d',
    STUDENT_PASSWORD: 'password',
    O_AUTH_FOREIGN_KEY: 'studentID',
    CARS_FOREIGN_KEY: 'student_id',
};
