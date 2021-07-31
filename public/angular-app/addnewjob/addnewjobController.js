angular.module("jobSearch").controller("addnewjobController", addnewjobController);
function addnewjobController(dataFactory) {
    const vm = this;

    vm.err = false;
    vm.success=false;
    vm.error = "";
    vm.message="";



    vm.addJobOpening = function() {


        const newjob = {
            title: vm.title,
            salary: vm.salary,
            description: vm.description,
            skills: vm.skills,
            experience: vm.experience,
            lng: vm.lng,
            lat: vm.lat
        

    }
    console.log("submitted");

    dataFactory.addnewJob(newjob).then(function(response) {
        vm.success=true;
        vm.message= "New Job Posted sucessfully"
        vm.err= false;
        vm.error="";
        console.log("submited res", response);

    }).catch(function(error) {

        vm.success=false;
        vm.message= ""
        vm.err= true;
        vm.error="Unable to save new Job details, try again later";
        console.log("error occured during job post", error);

    })



    }



}