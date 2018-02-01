// INITIATES THE CONNECTION TO MYSQL

// Dependencies
const Sequelize = require('sequelize');

// Creates MySQL 
const sequelize = new Sequelize("simply", "root", "", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Export the connection
module.exports = sequelize;