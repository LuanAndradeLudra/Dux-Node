const express = require('express');
const router = new express.Router();
const adminAuth = require("../middlewares/adminAuth");
const Users = require("../database/models/users");
const StrReplace = require("../js_functions/str_replace");
const UserController = require("../controllers/userController");

router.get("/", adminAuth,  function (req, res) {
    Users.findAndCountAll().then((cli) => {
        let ina = UserController.getIna(cli.rows);
        ina = ina.length;
        dues = UserController.getDues(cli.rows);
        dues = dues.length;
        res.render("index",{
            query: req.query,
            user: req.session.user,
            cli: cli.count,
            ina: ina,
            dues: dues,
        })
    }).catch((erro) => "Erro " + erro);
});

router.get("/clientsc", adminAuth, function (req, res) {
    res.render("clientsc",{
        user: req.session.user
    });
});

router.post("/clientsc", adminAuth, function (req, res) {
    let day = req.body.due_date.substring(0,2);
    if (day == "31"){
        res.redirect("/?msg=5")
    } else {
        if (req.body.name != undefined) {
            Users.create({
                name: req.body.name,
                phone: StrReplace.phoneReplace(req.body.phone),
                email: req.body.email,
                due_date: StrReplace.dataReplace(req.body.due_date),
                cpf_or_cnpj: req.body.cpforcnpj,
                is_zap: req.body.isZap, 
                date_nasc: req.body.nasc_date,
                cep: req.body.cep,
                address: req.body.address,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                state: req.body.state,
                city: req.body.city,
                board: req.body.board,
                model: req.body.model,
                chip: req.body.chip,
                mei: req.body.mei,
            }).then(() => {
                res.status(201);
                res.redirect("/?msg=1");
            });
        } else {
            res.redirect("/");
        }
    }
});

router.get("/clientse/:id", adminAuth, function (req, res) {
    Users.findOne({
        where: {
            id: req.params.id,
        }
    }).then((cli) => {
        res.render("clientse", {
            cli: cli,
            user: req.session.user
        });
    });
});

router.post("/clientse/:id", adminAuth, function (req, res) {
    let day = req.body.due_date.substring(0,2);
    if (day == "31"){
        res.json({})
        res.redirect("/?msg=5")
    } else {
        Users.update({
            name: req.body.name,
                phone: StrReplace.phoneReplace(req.body.phone),
                email: req.body.email,
                due_date: StrReplace.dataReplace(req.body.due_date),
                cpf_or_cnpj: req.body.cpforcnpj,
                is_zap: req.body.isZap, 
                date_nasc: req.body.nasc_date,
                cep: req.body.cep,
                address: req.body.address,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                state: req.body.state,
                city: req.body.city,
                board: req.body.board,
                model: req.body.model,
                chip: req.body.chip,
                mei: req.body.mei,
        }, {
            where: {
                id: req.params.id,
            }
        }).then(() => {
            res.status(200);
            res.redirect("/?msg=4");
        });
    }
});

router.get("/clientsi", adminAuth, function (req, res) {
    Users.findAll().then((users) => {

    let ina = UserController.getIna(users);
    
    res.render("clientsi",{
        users: ina,
        user: req.session.user,
    })
    }).catch((error) => console.log("Erro " + error));
});

router.get("/clientsl", adminAuth, function (req, res) {
    Users.findAll().then((users) => {
        res.render("clientsl", {
            users: users,
            user: req.session.user,
        });
    });
});

router.post("/clientsd/:id", adminAuth, function (req, res) {
    if (req.params.id != undefined) {
        Users.destroy({
            where: {
                id: req.params.id,
            }
        }).then(() => {
            res.status(200);
            res.redirect("/?msg=3");
        });
    } else {
        res.redirect("/");
    }
});

router.get("/logout", adminAuth, function(req, res){
    req.session.user = undefined;
    res.redirect("/login?msg=8");
});

router.get("/ficha/:id", adminAuth, function(req, res){
    Users.findOne({
        where: {
            id: req.params.id,
        }
    }).then((cli) => {
        res.render("ficha",{
            cli: cli
        });
    });
});

module.exports = router;