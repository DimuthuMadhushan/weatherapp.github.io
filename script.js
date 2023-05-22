const apiKey="f3373d156860410a8d683135231405";
const apiurl="http://api.weatherapi.com/v1/current.json?key=f3373d156860410a8d683135231405&q=";

function sendCurrentLocation(){
    var searchedLocation=document.getElementById("search-bar").value;
    checkCurrentWeather(searchedLocation);
}
async function checkCurrentWeather(cityName){
    var response =await fetch(apiurl+cityName);
    var data=await response.json();

    console.log(data);
    var temp=Math.round(data.current.temp_c);
    document.getElementById("city-name").innerHTML=data.location.name;
    document.getElementById("ctemp").innerHTML=temp;
    document.getElementById("status").innerHTML=data.current.condition.text;
    document.getElementById("humid-value").innerHTML=data.current.humidity+"%";
    document.getElementById("wind-speed-value").innerHTML=data.current.wind_kph;
}
checkCurrentWeather("Neluwa");