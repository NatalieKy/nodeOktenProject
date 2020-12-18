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
            isIn: [[
                'male',
                'female'
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
        }
    }, {
        tableName: 'students',
        timestamps: false,
        scopes: {
            noPassword: {
                attributes: { exclude: ['password'] },
            }
        }
    });

    const Car = require('./Car')(client, DataTypes);
    const OAuth = require('./OAuth')(client, DataTypes);
    Student.hasMany(Car, {
        foreignKey: 'student_id',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });
    Student.hasOne(OAuth, {
        foreignKey: 'studentID',
        onDelete: 'cascade',
        onUpdate: 'cascade'
    });

    return Student;
};
