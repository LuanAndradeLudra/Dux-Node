const Sequelize = require("sequelize");
const Connection = require("../database");

const Login = Connection.define('tbl_login', {
    login: {
        type: Sequelize.STRING,
        allownull: false,
    },
    password: {
        type: Sequelize.STRING,
        allownull: false,
    },
    name: {
        type: Sequelize.STRING,
        allownull: false,
    }
});

Login.sync({ force: false });

module.exports = Login;