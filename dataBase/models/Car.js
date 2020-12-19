module.exports = (client, DataTypes) => {
    const Car = client.define('Car', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        student_id: {
            type: DataTypes.INTEGER,
            foreignKey: true,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }, {
        tableName: 'cars',
        timestamps: false
    });

    return Car;
};
