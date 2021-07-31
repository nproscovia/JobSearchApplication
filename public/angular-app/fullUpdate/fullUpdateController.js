angular.module("jobSearch").controller("fullUpdateController", fullupdatejobController);


function fullupdatejobController(dataFactory, $routeParams) {

    let id = $routeParams.id;
    const vm = this;

    vm.err = false;
    vm.success=false;
    vm.error = "";
    vm.message="";
    vm.updated=false;
    

    dataFactory.getOne(id).then(function(response) {

        vm.job = response;
        //why like this
        vm.myskills = vm.job.skills.toString();
       
        console.log("jobdata", response)

    })


    vm.fullupdateJob = function(id, title, description, salary, experience,lng,lat, skills) {
        
        const job = {
            title: vm.title,
            salary: vm.salary,
            description: vm.description,
            skills: vm.skills,
            experience: vm.experience,
            lng: vm.lng,
            lat:vm.lat,
    }
    console.log("submitted json", job);

    dataFactory.fullUpdateJob(id,job).then(function(response) {
        vm.success=true;
        vm.message= "Full job update sucessful sucessfully"
        vm.err= false;
        vm.error="";
        vm.updated=true;
        
        console.log("submited response", response);

    }).catch(function(error) {

        vm.success=false;
        vm.message= ""
        vm.err= true;
        vm.error="Unable to update job details, try again later";
        console.log("error occured during job update", error);

    })

    }
    


}