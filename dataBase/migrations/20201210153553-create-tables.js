const { MINIMUM_AGE, STUDENTS_PRIMARY_KEY, CARS_PRIMARY_KEY } = require('../../configs/constants/Constants');
const { CARS, CASCADE, FEMALE, MALE, O_AUTH, STUDENTS, FILES } = require('../../configs/constants/names.enums');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(STUDENTS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
                isAlpha: true,
            },
            age: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                isNumeric: true,
                min: MINIMUM_AGE,
            },
            gender: {
                type: Sequelize.DataTypes.STRING,
                isIn: [[
                    MALE,
                    FEMALE
                ]],
                allowNull: false
            },
            email: {
                type: Sequelize.DataTypes.STRING,
                isEmail: true,
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: Sequelize.DataTypes.STRING,
            }
        },);

        await queryInterface.createTable(CARS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: Sequelize.DataTypes.DECIMAL,
                allowNull: false
            },
            student_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: STUDENTS,
                    key: STUDENTS_PRIMARY_KEY
                },
            }
        },);

        await queryInterface.createTable(O_AUTH, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            accessToken: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            refreshToken: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            studentID: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                onDelete: CASCADE,
                onUpdate: CASCADE,
                references: {
                    model: STUDENTS,
                    key: STUDENTS_PRIMARY_KEY
                },
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        },);

        await queryInterface.createTable(FILES, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            carID: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: CARS,
                    key: CARS_PRIMARY_KEY
                }
            },
            file_type: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            file_path: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW'),
                allowNull: false
            }
        },);
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(STUDENTS);
        await queryInterface.dropTable(CARS);
        await queryInterface.dropTable(O_AUTH);
        await queryInterface.dropTable(FILES);
    }
};
