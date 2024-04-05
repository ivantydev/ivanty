var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("pages/index");
});

router.get("/artists", function (req, res) {
    res.render("pages/artists");
});

router.get("/about", function (req, res) {
    res.render("pages/about");
});

router.get("/profile", function (req, res) {
    res.render("pages/profile");
});

router.get('/adm', function (req, res) {
    res.render("pages/admin/index_adm.ejs")
})

module.exports = router;
