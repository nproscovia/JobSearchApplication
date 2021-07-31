angular.module("jobSearch").controller("singlejobController", singlejobController);


function singlejobController(dataFactory, $routeParams) {

    let id = $routeParams.jobId;

    const vm = this;
    vm.jobdeleted=false;
    vm.err=false;
    vm.error="";

    dataFactory.getOne(id).then(function(response) {

        vm.job = response;

    })

    vm.deleteJob =  function(id){

        dataFactory.deleteOneJob(id).then(function(response){

            console.log("job deleted");
            vm.jobdeleted = true;
            vm.err=true;
            vm.error="Job Deleted";

        })
    }

}