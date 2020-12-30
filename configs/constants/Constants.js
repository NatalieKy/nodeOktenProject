module.exports = {
    ACCESS_TOKEN_LIFE: '1d',
    ACTION_USER_CREATED: 'created',
    ACTION_USER_DELETED: 'deleted',
    ACTION_USER_UPDATED: 'updated',
    CARS_FOREIGN_KEY: 'student_id',
    CARS_PRIMARY_KEY: 'id',
    CRONE_00_00_EVERY_DAY: '0 0 * * *',
    FILES_FOREIGN_KEY: 'carID',
    DIALECT: 'mysql',
    DOCUMENTS_MIMETYPES: [
        'application/pdf',
        'application/msword',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',
        'application/vnd.oasis.opendocument.text',
        'application/vnd.oasis.opendocument.spreadsheet',
        'application/vnd.oasis.opendocument.presentation'
    ],
    DOCUMENTS_MAX_SIZE: (10 * 1024 * 1024),
    EMAIL_SUBJECT_WELCOME: 'Welcome letter',
    EMAIL_TEMPLATE_WELCOME: 'welcome-information',
    EMAIL_SUBJECT_BYE: 'Goodbye letter',
    EMAIL_TEMPLATE_BYE: 'byebye-information',
    MINIMUM_AGE: 1,
    O_AUTH_FOREIGN_KEY: 'studentID',
    PHOTOS_MIMETYPES: [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ],
    PHOTOS_MAX_SIZE: (5 * 1024 * 1024),
    REFRESH_TOKEN_LIFE: '30d',
    SCOPE_EXCLUDE_PASSWORD: 'noPassword',
    STUDENTS_PRIMARY_KEY: 'id',
    STUDENT_PASSWORD: 'password',
    THIRTY_DAYS: 30 * 24 * 60 * 60 * 1000
};
