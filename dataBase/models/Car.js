const { STUDENTS_PRIMARY_KEY, FILES_FOREIGN_KEY } = require('../../configs/constants/Constants');
const { CAR, CARS, STUDENTS, CASCADE } = require('../../configs/constants/names.enums');

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
            allowNull: false,
            foreignKey: true,
            onDelete: CASCADE,
            onUpdate: CASCADE,
            references: {
                model: STUDENTS,
                key: STUDENTS_PRIMARY_KEY
            }
        }
    }, {
        tableName: CARS,
        timestamps: false
    });

    const File = require('./File')(client, DataTypes);

    Car.hasMany(File, {
        foreignKey: FILES_FOREIGN_KEY,
        onDelete: CASCADE,
        onUpdate: CASCADE
    });

    return Car;
};
