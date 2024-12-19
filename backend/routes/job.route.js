const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const { getAdminJobs, getAllJobs, getJobById, postJob ,updateJob} = require("../controller/job.controller");

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.put("/update/:id", isAuthenticated, updateJob);

module.exports = router;


