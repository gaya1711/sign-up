const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { url } = require('inspector');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('papa'));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  const firstName = req.body.fname;
  const lastName =req.body.lname;
  const email = req.body.email;
  const data = {
    memebers : [
      {
        email_address: email,
        status : "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  }
  const jsonData = JSON.stringify(data)
  const url = "https://us21.api.mailchimp.com/3.0/lists/3e6a13e2d3"
  const options = {
    method: "POST",
    auth: "gaya:4a9a5d11bb77860e9c13ba0d625728e2-us21"
  }

  const request = https.request(url, options, function(response) {
    response.on("data",function(data){
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData);
  request.end();

})



app.listen(3000, function() {
  console.log('Server is running at port 3000');
});

// api key
// 4a9a5d11bb77860e9c13ba0d625728e2-us21
// 3e6a13e2d3