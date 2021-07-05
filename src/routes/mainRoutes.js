const express = require('express');
const router = new express.Router();
const Bcrypt = require('bcryptjs');
const Login = require("../database/models/login");

router.post("/login", function (req, res) {
    let login = req.body.login;
    let password = req.body.password;
    
    Login.findOne({
        where: {
            login: login,
        }
    }).then((user) => {
        if (user != undefined){
            let correct = Bcrypt.compareSync(password, user.password);
            if (correct){
                req.session.user = {
                    id: user.id,
                    login: user.login,
                    name: user.name
                };
                res.redirect("/?msg=6");
            } else {
                res.redirect("/login?msg=7");
            }
        } else {
            res.redirect("/login?msg=7");
        }
    }).catch((error) => {
        console.log("Erro: " + error)
    })
});

router.get("/login", function (req, res) {
    res.render("login",{
        query: req.query,
    });
});

router.get("*", function (request, response) {
    response.status(404).render("404");
});

module.exports = router;