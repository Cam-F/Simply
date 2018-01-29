module.exports = function(sequelize, DataTypes){
    var Item = sequelize.define("Item", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.INTEGER
        }
    });
};