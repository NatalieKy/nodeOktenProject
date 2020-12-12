module.exports = (client, DataTypes) => {
    const Student = client.define('Student', {
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
            min: 1,
        },
        gender: {
            type: DataTypes.STRING,
            isIn: [['male',
                'female']],
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
        }
    }, {
        tableName: 'students',
        timestamps: false
    });

    const Car = require('./Car')(client, DataTypes);
    Student.hasMany(Car, {
        foreignKey: 'student_id',
        onDelete: 'cascade'
    });

    return Student;
};
