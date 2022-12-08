const axios = require("axios");

class NewsController {
  static async readNews(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: { safeSearch: "Off", textFormat: "Raw" },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      });
      res.status(200).json(data)
    } catch (err) {
        next(err)
    }
  }
}

module.exports = NewsController