angular.module('jobSearch').factory("dataFactory", dataFactory);


function dataFactory($http) {

    return {
        getAll: GetAllJobs,
        getOne: GetOneJob,
        addnewJob:addNewJob,
        deleteOneJob:deleteOneJob,
         fullUpdateJob:fullUpdateJob,
        searchLocation:searchLocation,
        //partialUpdateJob:partialUpdateJob
        
    }

    function searchLocation(longitude, latitude, distance){
        return $http.get("/api/joblocation?longitude="+longitude+"&latitude="+latitude+"&distance="+distance).then(completed).catch(failed);
    }

    function fullUpdateJob(id, job){
        return $http.patch("/api/jobs/"+ id, job).then(completed).catch(failed);
    }
    function deleteOneJob(id) {

        return $http.delete("/api/jobs/"+id).then(completed).catch(failed);

    }

    function addNewJob(newjob) {

        return $http.post("/api/jobs/", newjob).then(completed).catch(failed);

    }

    function partialUpdateJob(job, id) {

        return $http.put("/api/jobs/"+id, job).then(completed).catch(failed);

    }

    function GetOneJob(id) {
        console.log("id=", id)
        return $http.get("/api/jobs/"+id).then(completed).catch(failed);

    }

    // function GetAllJobsGeo(offset, lng,lat) {
    
    //     return $http.get("/api/jobs?offset="+offset+"&count=4&lng="+lng+"&lat="+lat).then(completed).catch(failed);
    // }

    // function GetAllJobs(stext) {
        
    //     console.log("search="+search)
    //     return $http.get("/api/jobs?search=" + stext).then(completed).catch(failed);

    // }

    function GetAllJobs(search) {
        console.log("search="+search)

        return $http.get("/api/jobs?search="+search).then(completed).catch(failed);
    }

    
    function completed(response) {
        console.log(response.data);
        return response.data;

    }

    function failed(error) {
        console.log(error);
        return error;
    }
}