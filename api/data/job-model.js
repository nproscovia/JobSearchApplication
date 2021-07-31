const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  coordinates:{
      type:[Number]
  },
  type: {
    type: String, 
    enum: ['Point'], 
  }
});


const jobSchema = new mongoose.Schema({
  title: {
    type: String,
   required:true
  },
  salary: {
    type: Number,
    required: true
  },
description:{
    type: String,
    
},
  skills:{
    type: Array,
    
  },
  

  experience: {
  type: String,
    
  },

  postDate: {
    type: Date,
    required:false
    
  },
  location: locationSchema,
  

});

mongoose.model("Job", jobSchema);
