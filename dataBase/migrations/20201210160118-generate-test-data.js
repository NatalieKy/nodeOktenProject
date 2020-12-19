const { passwordHasher } = require('../../utilities/password.hasher');

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('students', [
            {
                name: 'Viktor', age: 26, gender: 'male', email: 'viktor@gmail.com', password: await passwordHasher('Qwerty123')
            },
            {
                // eslint-disable-next-line max-len
                name: 'IronBird', age: 24, gender: 'female', email: 'ironbird@gmail.com', password: await passwordHasher('Qwerty321')
            },
            {
                name: 'Olga', age: 25, gender: 'female', email: 'olya@gmail.com', password: await passwordHasher('Qwerty132')
            },
        ]);
        await queryInterface.bulkInsert('cars', [
            { name: 'Volvo', price: 25000, student_id: 1, },
            { name: 'Tesla', price: 50000, student_id: 1 },
            { name: 'Audi', price: 40000, student_id: 3 },
        ]);
    },
    async down(queryInterface) {
        await queryInterface.bulkDelete('students', null, {});
        await queryInterface.bulkDelete('cars', null, {});
    },
};
