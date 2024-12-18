const express = require("express");
const { login, logout, register, updateProfile } = require("../controller/user.controller.js");
const isAuthenticated = require("../middleware/isAuthenticated.js");
const { singleUpload } = require("../middleware/mutler.js");

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

module.exports = router;


