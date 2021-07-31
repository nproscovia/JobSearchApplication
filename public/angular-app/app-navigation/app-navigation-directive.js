angular.module("jobSearch").directive("appNavigation", appNavigation);

function appNavigation() {

    return {
        restrict: "E",
        templateUrl:"angular-app/app-navigation/app-navigation.html"
    }
}