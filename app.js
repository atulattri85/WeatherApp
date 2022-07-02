const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended:true})); 

// https -- take data from some,one other server to console using on
// express -- show data from console to website
app.use(express.static("public"));
app.get("/",function(req,res){
     
     
     res.sendFile(__dirname+"/index.html");
    //res.send("server is at 3000 port");
});

app.post("/",function(req,res)
{
    const query=req.body.placeName;
    const space ="................";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=ccdc410e841ff2879eea29b495eea9c0";
    https.get(url , function(response){
        console.log(response);        // instead of response we can take as response.statuscode or anything that comes in consolle

        response.on("data",function(data){
          console.log(data);       // hexadecimal code is shown of json format

          const weatherData =JSON.parse(data); // convert json into html;
          console.log(weatherData)               // json.stringfy convert html to json
           const tempe=weatherData.main.temp;
           console.log(tempe);  
           const weatherDescription =weatherData.weather[0].description;
           const number=weatherData.weather[0].icon;
           const imagee="http://openweathermap.org/img/wn/"+number+"@2x.png";
           //res.send("<h1> now temperature is"+tempe+" degree celcius </h1> <br> <h2> "+weatherDescription+"</h2>");        
           res.write(" <br> <br> <br> <br> <br> <br> <h1>"+ space+" now temperature in"+query+" is"+tempe+" degree celcius </h1>");
           res.write(" <br> <br> <br> <h2>"+space+weatherDescription+"</h2>");
           res.write(" <br> <br> <br>"+space+" <img src="+imagee+">");
           res.send();                      
        });                               
    });                            // only send 1 res in one app.get method


    
   console.log("hiiiii");
});


app.listen(3000,function(){
    console.log("server is fine at 3000 port");
});


// install npm body-parser to take input from clientans look through body of post request 