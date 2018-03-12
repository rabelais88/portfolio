const express = require("express")
const fs = require("fs")

const app = express()
const http = require('http').Server(app)

http.listen(process.env.PORT || 3000, function(){
  console.log("server is up at " + this.address().port)
  console.log("mode:" + process.env.NODE_ENV)
})

app.use('/dist',express.static(__dirname + '/dist'))

app.get('/',(req,res)=>{
  fs.readFile('index.html','utf8',(err,data)=>{
    res.send(data)
  })
})