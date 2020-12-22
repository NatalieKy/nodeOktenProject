const {
    PHOTOS_MIMETYPES,
    DOCUMENTS_MIMETYPES,
    PHOTOS_MAX_SIZE,
    DOCUMENTS_MAX_SIZE
} = require('../../configs/constants/Constants');
const { ErrorHandler,
    errorTypes: {
        WRONG_FILE_FORMAT,
        TOO_BIG_FILE,
        TOO_BIG_PHOTO,
        TOO_MANY_STUDENT_PHOTOS,
        TOO_MANY_CARS_PHOTOS,
    } } = require('../../Errors');

module.exports = {
    filesTypesCheckAndDivision: (req, res, next) => {
        try {
            const { files } = req;
            if (files) {
                const photos = [];
                const documents = [];
                const filesPackage = Object.values(files);

                if (filesPackage) {
                    for (let file = 0; file < filesPackage.length; file++) {
                        const { mimetype, size } = filesPackage[file];

                        if (PHOTOS_MIMETYPES.includes(mimetype)) {
                            if (size > PHOTOS_MAX_SIZE) {
                                throw new ErrorHandler(TOO_BIG_PHOTO.message, TOO_BIG_PHOTO.code);
                            }

                            photos.push(filesPackage[file]);
                        } else if (DOCUMENTS_MIMETYPES.includes(mimetype)) {
                            if (size > DOCUMENTS_MAX_SIZE) {
                                throw new ErrorHandler(TOO_BIG_FILE.message, TOO_BIG_FILE.code);
                            }

                            documents.push(filesPackage[file]);
                        } else {
                            throw new ErrorHandler(WRONG_FILE_FORMAT.message, WRONG_FILE_FORMAT.code);
                        }
                    }

                    req.documents = documents;
                    req.photos = photos;
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isStudentPhotoSingle: (req, res, next) => {
        try {
            if (req.photos) {
                if (req.photos.length > 1) {
                    throw new ErrorHandler(TOO_MANY_STUDENT_PHOTOS.message, TOO_MANY_STUDENT_PHOTOS.code);
                }

                [req.studentsPhoto] = req.photos;
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkMaximumQuantityCarPhotos: (req, res, next) => {
        try {
            if (req.photos.length > 10) {
                throw new ErrorHandler(TOO_MANY_CARS_PHOTOS.message, TOO_MANY_CARS_PHOTOS.code);
            }

            [req.carsPhotos] = req.photos;
            next();
        } catch (e) {
            next(e);
        }
    },
};
