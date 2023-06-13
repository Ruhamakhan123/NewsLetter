const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const http = require("https")
const request  = require("request");
//const { request } = require("http");
require('dotenv').config();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){
    const email = req.body.email
    const fname = req.body.fname
    const lname = req.body.lname
    const data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                } 
            }
        ]
    }

    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/66a5ad8316" 
    
    const options={
        method:"POST",
        auth: `ruhama:${process.env.MAILCHIMP_API_KEY}`

    }
    const re=http.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data))

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        })
        console.log(response.statusCode);
    })
    re.write(jsonData);
    re.end()
    
})


app.post("/failure",function(req,res){
    res.redirect("/")
})
app.post("/success",function(req,res){
    res.redirect("/")
})



app.listen(process.env.PORT || 3000,function(){
    console.log("Server is up and running");
})

