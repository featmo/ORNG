/**
Author: Moses Eribo
Date:   17/09/2017

api key bde333544ca0abe72303d5a6e83b30c2
test location api.openweathermap.org/data/2.5/weather?q=London,uk&appid=appid=bde333544ca0abe72303d5a6e83b30c2
**/
let fetch = require('node-fetch');
const cityList = require('./citylist.json')
const appCall = 'http://api.openweathermap.org/data/2.5/weather?q='
const api = '&appid=bde333544ca0abe72303d5a6e83b30c2'

//var data = appCall
var main;
function getCountry(path) {
  //promises are a bit of a mystery for me at the moment
  //please document this function thouroughly for futuree reference
  fetch(path).then(res => res.json())
  .then( (data) => {
      console.log(data)
  }).catch(err => console.error(err)) //prints an error if promises was not kept
}
/**
Gets the weather and prints as raw Jason to console...
future implementations will
**/

function getWeather(location, apiKey){
  let path = appCall + location + apiKey
  fetch(path)
  .then(res => res.json())
  .then((out,main) => {
    //console.log(out)
    //out.weather[0].main;
    console.log(out.weather[0].main);
    console.log(out.weather[0].description);
    console.log(Math.round(out.main.temp - 273.15));
    console.log(out.weather[0].icon)

  })
  .catch(err => console.error(err))
}

function getLocation(list){
  //traverse through json file
  for(var i = 0; i < list.length; i++){
    /**
    If we find dublin ireland, described as FDublin IE, then we
    return a concatenated string 'Dublin,IE'
    **/
    //////////////////////////////////////////////////////////var obj = list[i]
    if(list[i].country === 'IE' && list[i].name === 'Dublin'){
      //console.log(obj.name+", " + obj.country)
      return list[i].name+"," + list[i].country;
    }
  }
}

//console.log(main)
//console.log(getLocation(cityList))
//getWeather( getLocation(cityList) ,api)
