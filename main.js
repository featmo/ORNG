const{app,BrowserWindow} = require("electron")
const path = require("path")
const url =  require("url")
ipc = require('electron').ipcMain

let fetch = require('node-fetch');
const appCall = 'http://api.openweathermap.org/data/2.5/weather?q=';
const api = '&appid=bde333544ca0abe72303d5a6e83b30c2';
var location = 'Dublin,IE';


//function to create main window (parent)
function getWeather(location, api){
  let path = appCall + location + api
  fetch(path)
  .then(res => res.json())
  .then((out,main) => {
    //console.log(out)
    //out.weather[0].main;
    var weatherObj = {
      0: location,
      1: out.weather[0].main,
      2: out.weather[0].description,
      3: Math.round(out.main.temp - 273.15),
      4: out.weather[0].icon
    }

    ipc.on('get-weather', (event, arg) => {
      event.sender.send('show-weather-main', weatherObj)
    })

  })
  .catch(err => console.error(err))
  //setTimeout(getWeather,1000)
}
function createParentWindow(){
  /**
  ** set parameters for the browser window
  ** show: false prevents window from being show... se win.on line 19
  **/
  win = new BrowserWindow({width:480,height:360,resizable:true, useContentSize:true, transparent:true, frame:false, show:false})
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }))
  //prevents incremental loading
  win.on("ready-to-show",() => {
    win.show()
  })
}
getWeather(location, api)
app.on("ready",createParentWindow)
