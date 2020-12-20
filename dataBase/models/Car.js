const { STUDENTS_PRIMARY_KEY } = require('../../configs/constants/Constants');
const { CAR, CARS, STUDENTS } = require('../../configs/constants/names.enums');

module.exports = (client, DataTypes) => {
    const Car = client.define(CAR, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        student_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: STUDENTS,
                key: STUDENTS_PRIMARY_KEY
            }
        }
    }, {
        tableName: CARS,
        timestamps: false
    });

    return Car;
};
