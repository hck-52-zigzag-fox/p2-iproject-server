const axios = require("axios")

class ControllerWeather{
    static async getWeather(req,res,next){
        try{

            // let {city} = req.query

             const data = await axios({
                url:`https://api.openweathermap.org/data/2.5/weather?q=jakarta&units=metric&appid=014d1aae63e4952b4eb008f7e62594b8`,
                method:"get"
            })

    //   const temps = weatherData.main.temp;
    //   const weather = weatherData.weather[0].description;
    //   const icon = weatherData.weather[0].icon;
    //   const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    //   console.log("The Weather is " + weather + ", while The Temperature is " + temps);
    //   res.write('<head><meta charset="utf-8"></head>')
    //   res.write("<img src=" + imageURL + ">")
    //   res.write("<p>The temperature in " + req.body.cityName + " is " + temps + " degree celsius.</p>")
    //   res.write("<h1>The weather is currently " + weather + "</h1")

            // console.log(data.data.weather[0].icon);
            let weather = {}
            let imageUrl = `http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`

            // console.log(imageUrl);
            weather.imageUrl = imageUrl
            weather.name = data.data.name
            weather.wind = data.data.wind
            weather.main = data.data.main
            weather.weatherInfo = data.data.weather[0]
            res.status(200).json(weather)
        }catch(error){
            next(error)
        }
    }
    
}



module.exports = ControllerWeather