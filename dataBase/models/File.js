const { CARS_PRIMARY_KEY } = require('../../configs/constants/Constants');
const { FILE, FILES, CARS } = require('../../configs/constants/names.enums');

module.exports = (client, DataTypes) => {
    const File = client.define(FILE, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        carID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true,
            references: {
                model: CARS,
                key: CARS_PRIMARY_KEY
            }
        },
        file_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        file_path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: client.fn('NOW'),
            allowNull: false
        },
    }, {
        tableName: FILES,
        timestamps: false
    });

    return File;
};
