const Sequelize = require("sequelize");
const Connection = require("../database");

const Users = Connection.define('tbl_users', {
    name: {
        type: Sequelize.STRING,
        allownull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allownull: false,
    },
    email: {
        type: Sequelize.STRING,
        allownull: false,
    },
    due_date: {
        type: Sequelize.STRING,
        allownull: false,
    },
    cpf_or_cnpj: {
        type: Sequelize.STRING,
        allownull: false,
    },
    is_zap: {
        type: Sequelize.STRING,
        allownull: false,
    },
    date_nasc: {
        type: Sequelize.STRING,
        allownull: false,
    },
    cep: {
        type: Sequelize.STRING,
        allownull: false,
    },
    address: {
        type: Sequelize.STRING,
        allownull: false,
    },
    number: {
        type: Sequelize.STRING,
        allownull: false,
    },
    complement: {
        type: Sequelize.STRING,
        allownull: false,
    },
    district: {
        type: Sequelize.STRING,
        allownull: false,
    },
    state: {
        type: Sequelize.STRING,
        allownull: false,
    },
    city: {
        type: Sequelize.STRING,
        allownull: false,
    },
    board: {
        type: Sequelize.STRING,
        allownull: false,
    },
    model: {
        type: Sequelize.STRING,
        allownull: false,
    },
    chip: {
        type: Sequelize.STRING,
        allownull: false,
    },
    mei: {
        type: Sequelize.STRING,
        allownull: false,
    },

});

Users.sync({ force: false });

module.exports = Users;