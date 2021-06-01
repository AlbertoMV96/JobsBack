const express = require("express")
const router = express.Router()
const passport = require("../auth/auth");
const companyController = require("../controllers/company")
const jobController = require("../controllers/job")
const userController = require("../controllers/user")

router.get("/jobs", jobController.getJobs)
router.get("/jobs/query", jobController.getJobsQuery)
router.get("/job/:id", jobController.getJob)
router.post("/job", passport.auth,jobController.saveJob)
router.put("/job/:id",passport.company, jobController.updateJob)
router.delete("/job/:id", passport.company,jobController.deleteJob)
router.get("/company/jobs",passport.auth, companyController.getJobsCompany)
router.get("/jobs/applicants",passport.auth, companyController.getJobApplicants)
//**Obtener jobs de un user en concreto */
router.get("/user/jobs",passport.auth, userController.getUserJobs)

router.post("/user", userController.signup)
router.post("/login", userController.login)
router.post("/apply",passport.auth, userController.apply)

module.exports = router