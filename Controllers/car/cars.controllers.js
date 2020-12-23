const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid');

const { carService } = require('../../Services/car');
const { CREATED, OK, NO_CONTENT } = require('../../configs/httpStatusCodes');

module.exports = {
    createNewCar: async (req, res, next) => {
        try {
            const car = req.body;
            const { student_id } = req.params;
            const { photos, documents } = req;

            Object.assign(car, { student_id });

            const newCar = await carService.createCar(car);

            if (photos) {
                const photosPathWithoutPublic = path.join('users', `${student_id}`, `car ${newCar.dataValues.id}`, 'car photos');
                const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);

                await fs.mkdir(photosFullPath, { recursive: true });

                photos.map(async (photo) => {
                    const photoExtension = photo.name.split('.').pop();
                    const newPhotoName = `${uuid.v1()}.${photoExtension}`;
                    await photo.mv(path.join(photosFullPath, newPhotoName));
                    const file_type = 'dddd';
                    const file_path = await path.join(photosFullPath, newPhotoName);
                    await carService.updateSingleCarPhotos({ file_type, file_path }, newCar.dataValues.id);
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
                    const file_type = 'ggggg';
                    const file_path = await path.join(documentsFullPath, newDocumentName);
                    await carService.updateSingleCarDocuments({ file_type, file_path }, newCar.dataValues.id);
                });
            }

            res.status(CREATED).json(newCar);
        } catch (e) {
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
        try {
            const { car_id } = req.params;
            // const { student_id } = req.params;
            const dataToUpdate = req.body;
            // const { photos, documents } = req;

            await carService.updateSingleCar(dataToUpdate, car_id);

            // if (photos) {
            //     const photosPathWithoutPublic = path.join('users', `${student_id}`, 'car photos');
            //     const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);
            //
            //     for (const photo of photos) {
            //         const photoExtension = photo.name.split('.').pop();
            //         const newPhotoName = `${uuid.v1()}.${photoExtension}`;
            //         try {
            //             photo.mv(path.join(photosFullPath, newPhotoName));
            //         } catch (e) {
            //             console.log(e);
            //         }
            //     }
            // }
            //
            // if (documents) {
            //     const documentsFullPath = path.join(process.cwd(), 'public', 'users', `${student_id}`, 'car documents');
            //
            //     for (const document of documents) {
            //         const documentExtension = document.name.split('.').pop();
            //         const newDocumentName = `${uuid.v1()}.${documentExtension}`;
            //         try {
            //             document.mv(path.join(documentsFullPath, newDocumentName));
            //         } catch (e) {
            //             console.log(e);
            //         }
            //     }
            // }

            res.sendStatus(OK);
        } catch (e) {
            next(e);
        }
    },

    deleteSingleCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const { student_id } = req.params;
            const pathToCarData = path.join(process.cwd(), 'public', 'cars', `user ${student_id}`);

            await carService.deleteCar(car_id);
            await fs.rmdir(pathToCarData, { recursive: true });

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
