const { passwordHasher } = require('../../utilities/password.hasher');
const { CARS, STUDENTS } = require('../../configs/constants/names.enums');

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(STUDENTS, [
            {
                name: 'Viktor',
                age: 26,
                gender: 'male',
                email: 'viktor@gmail.com',
                password: await passwordHasher('Qwerty123'),
                avatar: null
            },
            {
                name: 'IronBird',
                age: 24,
                gender: 'female',
                email: 'ironbird@gmail.com',
                password: await passwordHasher('Qwerty321'),
                avatar: null
            },
            {
                name: 'Olga',
                age: 25,
                gender: 'female',
                email: 'olya@gmail.com',
                password: await passwordHasher('Qwerty132'),
                avatar: null
            },
        ]);
        await queryInterface.bulkInsert(CARS, [
            { name: 'Volvo', price: 25000, student_id: 1, },
            { name: 'Tesla', price: 50000, student_id: 1 },
            { name: 'Audi', price: 40000, student_id: 3 },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete(STUDENTS, null, {});
        await queryInterface.bulkDelete(CARS, null, {});
    },
};
