const { CARS_FOREIGN_KEY, MINIMUM_AGE, STUDENT_PASSWORD, O_AUTH_FOREIGN_KEY } = require('../../configs/constants/Constants');
const { CASCADE, FEMALE, MALE, STUDENT, STUDENTS, } = require('../../configs/constants/names.enums');

module.exports = (client, DataTypes) => {
    const Student = client.define(STUDENT, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlpha: true,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            isNumeric: true,
            min: MINIMUM_AGE,
        },
        gender: {
            type: DataTypes.STRING,
            isIn: [[
                MALE,
                FEMALE
            ]],
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: STUDENTS,
        timestamps: false,
        scopes: {
            noPassword: {
                attributes: { exclude: [STUDENT_PASSWORD] },
            }
        }
    });

    const Car = require('./Car')(client, DataTypes);
    const OAuth = require('./OAuth')(client, DataTypes);
    Student.hasMany(Car, {
        foreignKey: CARS_FOREIGN_KEY,
        onDelete: CASCADE,
        onUpdate: CASCADE
    });
    Student.hasOne(OAuth, {
        foreignKey: O_AUTH_FOREIGN_KEY,
        onDelete: CASCADE,
        onUpdate: CASCADE
    });

    return Student;
};
