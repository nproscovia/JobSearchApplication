angular.module("jobSearch").controller("jobList-Controller", jobListController);

function jobListController (dataFactory, $location){
    const vm = this;
    
    let search="";
    dataFactory.getAll(search).then(function(response){
        vm.jobs = response;
    })


    vm.searchJobs= function(){
        console.log("my text="+vm.stext);
         
        dataFactory.getAll(vm.stext).then(function(response){
            vm.jobs = response;

        })
    }

    vm.GeosearchJobs=function(){

              
        dataFactory.searchLocation(vm.longitude, vm.latitude, vm.distance).then(function(response){
            vm.jobs = response;

        })
        
    }
    
}


