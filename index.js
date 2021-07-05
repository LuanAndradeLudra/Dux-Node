const venom = require('venom-bot');
const spamDue = require('./src/robot/spamDue');
const start = require('./src/robot/start');
const express = require('express');
const app = new express();
const session = require("express-session");

//View engine
app.set("view engine", "ejs");

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Arquivos estáticos
app.use(express.static('src'));

// Sessions
app.use(session({
    secret: "SESSION_SECRET",
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 60000 * 24,
    },
}));

//Rotas
const adminRoutes = require("./src/routes/adminRoutes");
app.use(adminRoutes);

const mainRoutes = require("./src/routes/mainRoutes");
app.use(mainRoutes);

venom
    .create()
    .then((client) => {
        spamDue(client);
        //start(client);
    })
    .catch((erro) => {
        console.log(erro);
    });

app.listen(8080, () => {
    console.log("Servidor iniciado");
});