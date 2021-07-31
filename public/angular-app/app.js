angular.module("jobSearch", ['ngRoute']).config(config);

function config($routeProvider) {

    $routeProvider.when("/", {

        templateUrl: "angular-app/welcome/welcome.html",
    }).when("/jobs", {
        templateUrl: "angular-app/jobList/jobList.html",
        controller: "jobList-Controller",
        controllerAs: "vm",
    }).when("/jobs/:jobId", {
        templateUrl: "angular-app/singlejob/singlejob.html",
        controller: "singlejobController",
        controllerAs: "vm",
    }).when("/job/add", {
        templateUrl: "angular-app/addnewjob/addnewjob.html",
        controller: "addnewjobController",
        controllerAs: "vm",
    }).when("/jobUpdate/:id/update",{
        templateUrl: "angular-app/fullUpdate/fullUpdate.html",
        controller: "fullUpdateController",
        controllerAs: "vm",
    // }).when("/job/:id/edit"),{
    //     templateUrl: "angular-app/partialUpdate/updateJob.html",
    //     controller: "updatejobController",
    //     controllerAs: "vm",
    //  }).when("/loginpage"),{
    //     templateUrl: "angular-app/addnewjob/addnewjob.html",
    //     controller: "addnewjobController",
    //     controllerAs: "vm",
    //  }
    })
}

