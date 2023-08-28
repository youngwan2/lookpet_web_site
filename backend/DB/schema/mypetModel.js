const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mypetSchema = new Schema({
  petId: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  petimage: {
    type: String,
    required: true
  },
  petname: {
    type: String,
    required: true
  },
  breeds: {
    type: String,
    required: true
  },
  gender: {
    type: Array,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  introduce: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Mypet', mypetSchema, 'Mypet')
