const usuario = require("../models/usuarioModel");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);

const usuarioController = {

    regrasValidacaoFormLogin: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 })
            .withMessage("O nome de usuário/e-mail deve ter de 8 a 45 caracteres"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],

    regrasValidacaoFormCad: [
        body("nome_usu")
            .isLength({ min: 3, max: 45 }).withMessage("Mínimo de 3 letras e máximo de 45!"),
        body("nomeusu_usu")
            .isLength({ min: 4, max: 45 }).withMessage("Nome de usuário deve ter de 4 a 45 caracteres!"),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],

    logar: (req, res) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.render("pages/login", { listaErros: erros })
        }
        if (req.session.autenticado != null) {
            res.redirect("/");
        } else {
            res.render("pages/login", { listaErros: erros })
        }
    },

    cadastrar: (req, res) => {
        const erros = validationResult(req);
        console.log(erros);
        var dadosForm = {
            user_usuario: req.body.nomeusu_usu,
            senha_usuario: bcrypt.hashSync(req.body.senha_usu, salt),
            nome_usuario: req.body.nome_usu,
            email_usuario: req.body.email_usu,
        };
        if (!erros.isEmpty()) {
            console.log(erros);
            return res.render("pages/cadastro", { listaErros: erros, valores: req.body })
        }
        try {
            let create = usuario.create(dadosForm);
            res.redirect("/")
        } catch (e) {
            console.log(e);
            res.render("pages/cadastro", { listaErros: erros, valores: req.body })
        }
    }
}

module.exports = usuarioController
