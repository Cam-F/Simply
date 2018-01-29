module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                allowNull: false,
                len: [4, 20]
            }
        }
    });
    return User;
};