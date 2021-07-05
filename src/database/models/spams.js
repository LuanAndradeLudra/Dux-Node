const Sequelize = require("sequelize");
const Connection = require("../database");

const Spams = Connection.define('tbl_spams', {
    date: {
        type: Sequelize.STRING,
        allownull: false,
    },
});

Spams.sync({ force: false });

module.exports = Spams;