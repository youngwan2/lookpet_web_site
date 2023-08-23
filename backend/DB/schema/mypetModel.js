const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mypetSchema = new Schema({
  petname: {
    type: String,
    required: true,
  },
  breeds: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  introduce:{
    type:String,
    required: true,
  }
});

module.exports = mongoose.model("mypet", mypetSchema, "mypet");
