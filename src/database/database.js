const Sequelize = require("sequelize");

const Connection = new Sequelize(
    'db_dux',
    'root',
    '',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        timezone: "-03:00",
    }
);

module.exports = Connection;