const axios = require("axios");

class NewsController {
  static async handleNews(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: {
          category: "Sports",
          mkt: "en-US",
          safeSearch: "Off",
          textFormat: "Raw",
        },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "95ad05f38amsh93fc34b9f12faf3p16041bjsn5baf9e9c8c00",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      });
      res.status(200).json(data.value);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NewsController;
