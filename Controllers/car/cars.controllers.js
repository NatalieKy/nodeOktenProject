const path = require('path');
const uuid = require('uuid');

const { carService } = require('../../Services/car');
const { CREATED, OK, NO_CONTENT } = require('../../configs/httpStatusCodes');

module.exports = {
    createNewCar: async (req, res, next) => {
        try {
            const car = req.body;
            const { student_id } = req.params;
            const { photos } = req;

            Object.assign(car, { student_id });

            const newCar = await carService.createCar(car);

            if (photos) {
                photos.forEach((photo) => {
                    const photoExtension = photo.name.split('.').pop();
                    const newPhotoName = `${uuid}.${photoExtension}`;
                    const photosPathWithoutPublic = path.join('cars', `${student_id}`, 'car_photos');
                    const photosFullPath = path.join(process.cwd(), 'public', photosPathWithoutPublic);
                    photo.mv(path.join(photosFullPath, newPhotoName));
                });
            }

            res.status(CREATED).json(newCar);
            res.status(CREATED).end();
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
            const dataToUpdate = req.body;

            await carService.updateSingleCar(dataToUpdate, car_id);

            res.sendStatus(OK);
        } catch (e) {
            next(e);
        }
    },

    deleteSingleCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carService.deleteCar(car_id);

            res.sendStatus(NO_CONTENT);
        } catch (e) {
            next(e);
        }
    }
};
