const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const http = require("https")
const request  = require("request");
//const { request } = require("http");

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
    //const apiKey ="dc2c76e4-72c6-499c-97fb-3f9f3fd02972"
    const options={
        method:"POST",
        auth:"ruhama:5ffcc0b0be983422b9dad8330e50afab-us21"
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
    })
    re.write(jsonData);
    re.end()
    
})


app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("Server is up and running");
})

