const mongoose = require("mongoose");
const Job = mongoose.model("Job");


module.exports.getAllJobs = function (req, res) {

  
  console.log("Get all jobs");
  console.log(req.query);

  let offset = 0;
  let count = 8;
  const maxCount = 10;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: "QueryString Offset and Count must be a number" });
    return;
  }
  if (count > maxCount) {
    res
      .status(400)
      .json({ message: "QueryString Count must not exceed " + maxCount });
  } else {

    console.log("search text="+req.query.search)

    if(req.query.search) {
      console.log("in search");
      Job.find({$text: {$search: req.query.search}}) .skip(offset)
      .limit(count)
      .exec(function (err, jobs) {
        if (err) {
          console.log("Error: ", err);
          res.status(500).json(err);
        } else {
          console.log("Found jobs", jobs.length);
          res.status(200).json(jobs);
        }
      });
    }else{
      console.log("no search");
      Job.find()
      .skip(offset)
      .limit(count)
      .exec(function (err, jobs) {
        if (err) {
          console.log("Error: ", err);
          res.status(500).json(err);
        } else {
          console.log("Found jobs", jobs.length);
          res.status(200).json(jobs);
        }
      });
    }
    
  }
};


module.exports.GetOneJob = function(req, res) {
  const jobId = req.params.jobId;

  if(!jobId || !(jobId.length ==24)) {


      console.log("jobid=", jobId);
      res.status(400).json({"message":"Job Id is invalid"})
  } else {

      Job.findById(jobId).exec(function(err, job) {
          const response = {
              status: 200,
              message:job
          }

          if(err) {
              response.status=500;
              response.message=err;
          } else if(!job) {
              response.status=401;
              response.message="Job not found"

          }

          res.status(response.status).json(response.message);
      })
  }
}

//NOT REALLY WORKING.
module.exports.addOneJob = function(req, res) {
  if(req.body && req.body.title ) {

      const newJob ={
          title: req.body.title,
          salary: parseInt(req.body.salary,0),
          description: req.body.description,
          skills: req.body.skills,
          experience:req.body.experience
      }
      console.log("long="+req.body.lng+"lat="+req.body.lat);

      if(req.body.lng && req.body.lat) {

          const location= {
              type: "Point",
              coordinates: [req.body.lng, req.body.lat]
          }
         
          newJob.location = location;
      }



      Job.create(newJob, function(err, job) {
          let response = {
              status:201,
              message:job
          }

          if(err) {
              response.status=500;
              response.message=err;
              console.log(err)
          }
          else if(!job) {
              response.status=400;
              response.message="Creation not sucessful";
          }

          res.status(response.status).json(response.message);
      })
  } else {

      res.status(401).json({"message": "please provide all fields required"});
  }
}

module.exports.deleteOneJob = function (req, res) {
  
  const jobId = req.params.jobId;

  Job.findByIdAndDelete(jobId).exec(function (err, deletedJob) {
    const response = {
      status: 200,
      message: deletedJob
    }
    
    if (err) {
      res.status = 500;
      response.message = error;
    } else if (!deletedJob) {
     
      response.status = 404;
      response.message = { "message": "job ID not found" };
    }
    res.status(response.status).json({message: "Delete successful"});
  });

}

module.exports.jobPartialUpdateOne = function (req, res) {

  console.log("found6")
  
  const jobId = req.params.jobId;

  console.log("found7")

  Job.findById(jobId).exec(function (err, job) {
      const response = {
          status: 201,
          message: job
      };

      console.log("found8")

      if (err) {

          response.status = 500;
          response.message = err;
      } 
     else if (!job) {
          response.status = 400;
          response.message = { "message": "Job ID not found" };

          console.log("found9")
      }

      if (response.status !== 201) {
          res.status(response.status).json(response.message);
          console.log("found10")
          
      } 
        else{

          if (req.body.title) {
              job.title = req.body.title;
          }
          console.log("found11")
          if (req.body.salary) {
              job.salary = req.body.salary;
          }
          console.log("found12")
          if (req.body.description) {
              job.description= req.body.description;
          }
          if (req.body.skills) {
            job.skills= req.body.skills;
          }
            

        const location= {
          type: "Point",
          coordinates: [req.body.lng, req.body.lat]
      }
      job.location = location;
     

          console.log("found")
          job.save(function (err, updatedJob) {
              console.log("found2")
              const response={
                  status:201,
                  message:updatedJob
              }
              console.log("found3")
              if (err) {
                  response.status = 500;
                  response.message = err;
                  res.status(500).json(err);
                  return;
              } 
              console.log("found4")

              res.status(response.status).json(response.message);
              console.log("found5")
          })

      }

  });
};

module.exports.locationserch = function(req, res){

  let lng = parseFloat(req.query.longitude,0);
        let lat = parseFloat(req.query.latitude,0)
        let dist = parseFloat(req.query.distance,0)
        let query ={};

        if(lng ==0 || lat==0) {
        query = {}

        } else {

         query=    {
                location: {
                   $near: {
                     $geometry: {
                        type: "Point" ,
                        coordinates: [ lng, lat ]
                     },
                    
                     $maxDistance: dist,
                     $minDistance: 0
                   }
                 }
              }

        }

        console.log("backend geo query=", query,"lng=",lng,"lat=",lat)
        Job.find(query).exec(function(error, job) {
            const response = {
                status:200,
                message:job,
            }
    
           console.log("in Geo Search", job)
            if(error) {
                response.status = 500;
                response.message=error;
            } else if(!job) {
                response.status= 400;
                response.message= "Job Openings not available";
            } 
    
            res.status(response.status).json(response.message);
           
        })

}

module.exports.jobFullUpdateOne = function (req, res) {
   
  const jobId = req.params.jobId;

  console.log("checking id")

  Job.findById(jobId).select("-ingredients").exec(function (err, job) {

    console.log("heyyyyyyyyyy")
      const response = {
          status: 204,
          
      };

      if (err) {
          
          response.status = 500;
          response.message = err;
       } 
       else if (!job) {
          response.status = 404;
          response.message = { "message": "job ID not found" };
      }

      if (response.status !== 204) {
          res.status(response.status).json(response.message);
          return
          console.log("statussssesss")
      } ;
      console.log("statussssesss yessssss")
           
        job.title= req.body.title;
        job.salary= req.body.salary;
        job.description= req.body.decription;

         console.log("body reading")
      
              console.log("created")
          job.save(function (err, updatedJob) {
              const response = {
                  status:204,
                  message:updatedJob
              };
              if (err) {
                  response.status = 500;
                  response.message = err;
                  res.status(500).json(err);
                  return;
              } 
              res.status(response.status).json(response.message);

              console.log("statussssesss created")
          });
          console.log("status end")
  });

  
};







