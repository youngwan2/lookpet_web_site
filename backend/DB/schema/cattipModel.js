const mongoose = require('mongoose');
const { Schema } = mongoose;

/* 
        "id": 1,
        "category": "health",
        "title": "고양이의 건강한 식사 습관",
        "content":
*/

const CattipSchema = new Schema({
    id:{
        type:String,
        required : true,
        unipue:true
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Cattip', CattipSchema, 'Cattip');
