const apiKey="f3373d156860410a8d683135231405";
const apiurl="http://api.weatherapi.com/v1/current.json?key=f3373d156860410a8d683135231405&q=";

checkCurrentWeather("Kalutara");
function sendCurrentLocation(){
    var searchedLocation=document.getElementById("search-bar").value;
    checkCurrentWeather(searchedLocation);
}
const myLocationButton =document.getElementById("my-location-button");
myLocationButton.addEventListener('click',async()=>{
    navigator.geolocation.getCurrentPosition(gotLocation,faildLocation);
    document.getElementById("search-bar").value="";
});
async function gotLocation(position){
    checkLocationWeather(position.coords.latitude,position.coords.longitude);
}
function faildLocation(){
    document.getElementById("invalid-city").innerHTML="Couldn't find your location";
    document.getElementById("invalid-city").style.backgroundColor = "red";
}

async function checkCurrentWeather(cityName){
    var response =await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f3373d156860410a8d683135231405&q=${cityName}&days=4`);
    if(response.status==400){
        document.getElementById("invalid-city").innerHTML="Invalid city name..!";
        document.getElementById("invalid-city").style.backgroundColor = "red";
    }else{
        document.getElementById("celcius-button").innerHTML="°C";
        document.getElementById("speed-unit-button").innerHTML="kph";
        document.getElementById("invalid-city").innerHTML="Plan your day";
        document.getElementById("invalid-city").style.removeProperty("background-color");
        var data=await response.json();
        var weatherCode=data.current.condition.icon;
        var temp=Math.round(data.current.temp_c);
        document.getElementById("city-name").innerHTML=data.location.name;
        document.getElementById("ctemp").innerHTML=temp;
        document.getElementById("status").innerHTML=data.current.condition.text;
        document.getElementById("humid-value").innerHTML=data.current.humidity+"%";
        document.getElementById("wind-speed-value").innerHTML=data.current.wind_kph;
        document.getElementById("statusImage").src=weatherCode;
        document.getElementById("date-time").innerHTML=data.current.last_updated;

        for(var i=1;i<4;i++){
            document.getElementById("day"+i).innerHTML=data.forecast.forecastday[i].date;
            document.getElementById("f"+i+"temperature").innerHTML=Math.round(data.forecast.forecastday[i].day.mintemp_c)+"°";
            document.getElementById("f"+i+"temperaturef").innerHTML=Math.round(data.forecast.forecastday[i].day.maxtemp_c)+"°";
            document.getElementById("f"+i+"status").innerHTML=data.forecast.forecastday[i].day.condition.text;
            document.getElementById("f"+i+"hum-value").innerHTML=data.forecast.forecastday[i].day.avghumidity+"%";
            document.getElementById("f"+i+"weather-image").src=data.forecast.forecastday[i].day.condition.icon;
            document.getElementById("f"+i+"speed-value").innerHTML=data.forecast.forecastday[i].day.maxwind_kph;
        }
        for(var i=0;i<24;i++){
            document.getElementById("n"+(i+1)+"temp").innerHTML=Math.round(data.forecast.forecastday[0].hour[i].temp_c)+"°";
            document.getElementById("n"+(i+1)+"image").src=data.forecast.forecastday[0].hour[i].condition.icon;
            document.getElementById("n"+(i+1)+"time").innerHTML=i<10?"0"+i+":00":i+":00";
        }
        checkHistory(cityName);
    }  

} 
function convertToFaranhite(tempc){
    var tempInC=tempc*9/5+32;
    return Math.round(tempInC);
}
function convertToCelcious(tempf){
    var tempInF=(tempf-32)*5/9;
    return Math.round(tempInF);
}
function convertTokph(mph){
    var kph=mph*1.60934;
    return kph.toFixed(1);
}
function convertTomph(kph){
    var mph=kph*0.621371;
    return mph.toFixed(1);
}
const kphButton=document.getElementById("speed-unit-button");
kphButton.addEventListener('click',async()=>{
    if(document.getElementById("speed-unit-button").innerHTML=="kph"){
        document.getElementById("speed-unit-button").innerHTML="mph";
        document.getElementById("wind-speed-value").innerHTML=convertTomph(document.getElementById("wind-speed-value").innerHTML);
        console.log(document.getElementById("f1speed-value"));
        for(var i=1;1<4;i++){
            document.getElementById("f"+i+"speed-value").innerHTML=convertTomph(parseFloat(document.getElementById("f"+i+"speed-value").innerHTML));
        }

        for(var i=1;i<8;i++){
            document.getElementById("h"+i+"speed-value").innerHTML=convertTomph(parseFloat(document.getElementById("h"+i+"speed-value").innerHTML));
        }
    }else if(document.getElementById("speed-unit-button").innerHTML=="mph"){
        document.getElementById("speed-unit-button").innerHTML="kph";
        document.getElementById("wind-speed-value").innerHTML=convertTokph(parseFloat(document.getElementById("wind-speed-value").innerHTML));

        for(var i=1;1<4;i++){
            document.getElementById("f"+i+"speed-value").innerHTML=convertTokph(parseFloat(document.getElementById("f"+i+"speed-value").innerHTML));
        }
        console.log(document.getElementById("f"+i+"speed-value").innerHTML);
        for(var i=1;i<8;i++){
            document.getElementById("h"+i+"speed-value").innerHTML=convertTokph(parseFloat(document.getElementById("h"+i+"speed-value").innerHTML));
        }
    }

});

const unitButton=document.getElementById("celcius-button");
unitButton.addEventListener('click',async()=>{
var unit=document.getElementById("celcius-button").innerHTML;
if(unit=="°C"){
    document.getElementById("celcius-button").innerHTML="°F";
    document.getElementById("ctemp").innerHTML=convertToFaranhite(parseInt(document.getElementById("ctemp").innerHTML));

    for(var i=1;i<8;i++){
        document.getElementById("h"+i+"temperature").innerHTML=convertToFaranhite(parseInt(document.getElementById("h"+i+"temperature").innerHTML))+"°";
        document.getElementById("h"+i+"temperaturef").innerHTML=convertToFaranhite(parseInt(document.getElementById("h"+i+"temperaturef").innerHTML))+"°";
    }

    for(var i=1;i<4;i++){        
        document.getElementById("f"+i+"temperature").innerHTML=convertToFaranhite(parseInt(document.getElementById("f"+i+"temperature").innerHTML))+"°";
        document.getElementById("f"+i+"temperaturef").innerHTML=convertToFaranhite(parseInt(document.getElementById("f"+i+"temperaturef").innerHTML))+"°";
    }   
    for(var i=1;i<25;i++){
        document.getElementById("n"+i+"temp").innerHTML=convertToFaranhite(parseInt(document.getElementById("n"+i+"temp").innerHTML))+"°";
    }
}else if(unit=="°F"){
    document.getElementById("celcius-button").innerHTML="°C";
    document.getElementById("ctemp").innerHTML=convertToCelcious(parseInt(document.getElementById("ctemp").innerHTML));
    
    for(var i=1;i<4;i++){
        document.getElementById("f"+i+"temperature").innerHTML=convertToCelcious(parseInt(document.getElementById("f"+i+"temperature").innerHTML))+"°";
        document.getElementById("f"+i+"temperaturef").innerHTML=convertToCelcious(parseInt(document.getElementById("f"+i+"temperaturef").innerHTML))+"°";
        
    }
    for(var i=1;i<8;i++){
        document.getElementById("h"+i+"temperature").innerHTML=convertToCelcious(parseInt(document.getElementById("h"+i+"temperature").innerHTML))+"°";
        document.getElementById("h"+i+"temperaturef").innerHTML=convertToCelcious(parseInt(document.getElementById("h"+i+"temperaturef").innerHTML))+"°";
    }
    for(var i=1;i<25;i++){
        document.getElementById("n"+i+"temp").innerHTML=convertToCelcious(parseInt(document.getElementById("n"+i+"temp").innerHTML))+"°";
    }
}
 });
function checkHistory(cityName){
    for(var i=0;i<7;i++){
        var today = new Date();
        today.setDate(today.getDate() -(i+1));
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy+'/'+mm+'/'+dd  ;
        var idc="h"+(i+1)+"temperature";
        var idf="h"+(i+1)+"temperaturef";
        var hstatus ="h"+(i+1)+"status";
        var wimage="h"+(i+1)+"weather-image";
        var hhumid="h"+(i+1)+"hum-value";
        var wspeed="h"+(i+1)+"speed-value"

        fetchLoop(idc,idf,hstatus,wimage,hhumid,wspeed,cityName,today);
        

      document.getElementById("hday"+(i+1)).innerHTML=today;
    }
}
function fetchLoop(idc,idf,hstatus,wimage,hhumid,wspeed,cityName,today){
    fetch(`http://api.weatherapi.com/v1/history.json?key=f3373d156860410a8d683135231405&q=${cityName}&dt=${today}`)
    .then(response=>response.json())
    .then(json=>{
        var maxtemp=Math.round(json.forecast.forecastday[0].day.maxtemp_c);
        var mintemp=Math.round(json.forecast.forecastday[0].day.mintemp_c);
        console.log(mintemp);
        document.getElementById(idc).innerHTML=mintemp+"°";
        document.getElementById(idf).innerHTML=maxtemp+"°";
        document.getElementById(hstatus).innerHTML=json.forecast.forecastday[0].day.condition.text;
        document.getElementById(wimage).src=json.forecast.forecastday[0].day.condition.icon;
        document.getElementById(hhumid).innerHTML=json.forecast.forecastday[0].day.avghumidity+"%";
        document.getElementById(wspeed).innerHTML=json.forecast.forecastday[0].day.maxwind_kph;
    });
}
 async function checkLocationWeather(lang,longt){
    var response =await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f3373d156860410a8d683135231405&q=${lang},${longt}&days=4`);
    if(response.status==400){
        document.getElementById("invalid-city").innerHTML="Invalid city name..!";
        document.getElementById("invalid-city").style.backgroundColor = "red";
    }else{
        document.getElementById("invalid-city").innerHTML="Plan your day";
        document.getElementById("invalid-city").style.removeProperty("background-color");
        var data=await response.json();
        checkCurrentWeather(data.location.name);
    }
} 
