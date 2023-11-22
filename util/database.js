const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

const sequelize = new Sequelize('socialmediadb', 'root', process.env.PASSWORD, {
    dialect: 'mysql',
    host:'localhost'
});


module.exports = sequelize;