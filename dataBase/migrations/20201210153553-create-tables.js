module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('students', {
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
                min: 1,
            },
            gender: {
                type: Sequelize.DataTypes.STRING,
                isIn: [[
                    'male',
                    'female'
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
            }
        },);

        await queryInterface.createTable('cars', {
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
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'students',
                    key: 'id'
                },
            }
        },);

        await queryInterface.createTable('o_auth', {
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
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                references: {
                    model: 'students',
                    key: 'id'
                },
            },
            created_at: {
                type: Sequelize.DataTypes.DATE,
                defaultValue: Sequelize.fn('NOW')
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('students');
        await queryInterface.dropTable('cars');
        await queryInterface.dropTable('o_auth');
    }
};
