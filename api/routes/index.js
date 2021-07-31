const express = require("express");
const jobsController = require("../controllers/job-Controller");


const router = express.Router();

router.route("/jobs")
     .get(jobsController.getAllJobs )
     .post(jobsController.addOneJob)

router.route("/jobs/:jobId")
     .get(jobsController.GetOneJob)
     .delete(jobsController.deleteOneJob)
     .patch(jobsController.jobPartialUpdateOne)
     .put(jobsController.jobFullUpdateOne)

     router.route("/joblocation")
           .get(jobsController.locationserch)
     
     
     
     module.exports = router 