const fs = require('fs')



fs.readFile(__dirname+ '/cat.json',(err,data)=>{
    let json = data.toString()

    let trans = JSON.parse(json)

    

})