const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated.js");
const {
    getCompany,
    getCompanyById,
    registerCompany,
    updateCompany
} = require("../controller/company.controller.js");
const { singleUpload } = require("../middleware/mutler.js");

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

module.exports = router;


