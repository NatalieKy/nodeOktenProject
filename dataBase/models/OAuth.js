const { STUDENTS_PRIMARY_KEY } = require('../../configs/constants/Constants');
const { OAUTH, O_AUTH, STUDENTS } = require('../../configs/constants/names.enums');

module.exports = (client, DataTypes) => {
    const OAuth = client.define(OAUTH, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: client.NOW
        },
        studentID: {
            type: DataTypes.NUMBER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: STUDENTS,
                key: STUDENTS_PRIMARY_KEY
            }
        },
    }, {
        tableName: O_AUTH,
        timestamps: false
    });

    return OAuth;
};
