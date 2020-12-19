module.exports = (client, DataTypes) => {
    const OAuth = client.define('OAuth', {
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
            foreignKey: true
        },
    }, {
        tableName: 'o_auth',
        timestamps: false
    });

    return OAuth;
};
