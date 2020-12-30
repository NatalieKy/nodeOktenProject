const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid');

const { carService } = require('../../Services/car');
const { CREATED, OK, NO_CONTENT } = require('../../configs/httpStatusCodes');
const { PHOTO_TYPE, DOCUMENT_TYPE } = require('../../configs/constants/names.enums');
const { transactionInstance } = require('../../dataBase').getInstance();

module.exports = {
    createNewCar: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const car = req.body;
            const { student_id } = req.params;
            const { photos, documents } = req;

            Object.assign(car, { student_id });

            const newCar = await carService.createCar(car, transaction);

            if (photos) {
                // eslint-disable-next-line max-len
                const photosPathWithoutPublic = path.join('users', `${student_id}`, `car ${newCar.dataValues.id}`, 'car photos');
                const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

                await fs.mkdir(photosFullPath, { recursive: true });

                photos.map(async (photo) => {
                    const photoExtension = photo.name.split('.').pop();
                    const newPhotoName = `${uuid.v1()}.${photoExtension}`;

                    await photo.mv(path.join(photosFullPath, newPhotoName));

                    const file_type = PHOTO_TYPE;
                    const file_path = await path.join(photosFullPath, newPhotoName);

                    await carService.updateSingleCarPhotos({ file_type, file_path }, newCar.dataValues.id, transaction);
                    await transaction.commit();
                });
            }

            if (documents) {
                // eslint-disable-next-line max-len
                const documentsPathWithoutPublic = path.join('users', `${student_id}`, `car ${newCar.dataValues.id}`, 'car documents');
                const documentsFullPath = path.join(process.cwd(), 'public', documentsPathWithoutPublic);

                await fs.mkdir(documentsFullPath, { recursive: true });

                documents.map(async (document) => {
                    const photoExtension = document.name.split('.').pop();
                    const newDocumentName = `${uuid.v1()}.${photoExtension}`;

                    await document.mv(path.join(documentsFullPath, newDocumentName));

                    const file_type = DOCUMENT_TYPE;
                    const file_path = await path.join(documentsFullPath, newDocumentName);

                    await carService.updateSingleCarDocuments({ file_type, file_path }, newCar.dataValues.id, transaction);
                    await transaction.commit();
                });
            }

            res.status(CREATED).json(newCar);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const cars = await carService.getAllCars();

            res.status(OK).json(cars);
        } catch (e) {
            next(e);
        }
    },

    getSingleCar: (req, res, next) => {
        try {
            const { car } = req;

            res.sendStatus(OK).json(car);
        } catch (e) {
            next(e);
        }
    },

    updateSingleCar: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { car_id } = req.params;
            const { student_id } = req.params;
            const dataToUpdate = req.body;
            const { photos, documents } = req;

            await carService.updateSingleCar(dataToUpdate, car_id, transaction);

            if (photos) {
                    const photosPathWithoutPublic = path.join('users', `${student_id}`, `car ${car_id}`, 'car photos');
                    const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

                    await fs.mkdir(photosFullPath, { recursive: true });

                    photos.map(async (photo) => {
                        const photoExtension = photo.name.split('.').pop();
                        const newPhotoName = `${uuid.v1()}.${photoExtension}`;

                        await photo.mv(path.join(photosFullPath, newPhotoName));

                        const file_type = PHOTO_TYPE;
                        const file_path = await path.join(photosFullPath, newPhotoName);

                        await carService.updateSingleCarPhotos({ file_type, file_path }, car_id, transaction);
                        await transaction.commit();
                    });
            }

            if (documents) {
                try {
                    const documentsPathWithoutPublic = path.join('users', `${student_id}`, `car ${car_id}`, 'car documents');
                    const documentsFullPath = path.join(process.cwd(), 'public', documentsPathWithoutPublic);

                    await fs.mkdir(documentsFullPath, { recursive: true });

                    documents.map(async (photo) => {
                        const documentExtension = photo.name.split('.').pop();
                        const newDocumentName = `${uuid.v1()}.${documentExtension}`;

                        await photo.mv(path.join(documentsFullPath, newDocumentName));

                        const file_type = DOCUMENT_TYPE;
                        const file_path = await path.join(documentsFullPath, newDocumentName);

                        await carService.updateSingleCarDocuments({ file_type, file_path }, car_id, transaction);
                        await transaction.commit();
                    });
                } catch (e) {
                    await transaction.rollback();
                }
            }

            res.sendStatus(OK);
        } catch (e) {
            next(e);
        }
    },

    deleteSingleCar: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { car_id } = req.params;
            const { student_id } = req.params;
            const pathToCarData = path.join(process.cwd(), 'public', 'cars', `user ${student_id}`);

            await carService.deleteCar(car_id, transaction);
            await fs.rmdir(pathToCarData, { recursive: true });
            await transaction.commit();

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
