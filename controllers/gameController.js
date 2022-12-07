const axios = require("axios");

// untuk memilih spesifik game berdasarkan steam app id
// steamAppID: '268500,2019630',

class GameController {
  static async getGamesList(req, res, next) {
    try {
      let { page, search } = req.query;
      let params = {
        lowerPrice: "0",
        steamRating: "0",
        desc: "0",
        output: "json",
        steamworks: "true",
        sortBy: "Deal Rating",
        AAA: "0",
        pageSize: "8",
        exact: "0",
        upperPrice: "50",
        pageNumber: "0",
        onSale: "0",
        metacritic: "0",
        "storeID[0]": "1",
      };
      if (page) {
        params.pageNumber = page - 1;
      }
      if (search) {
        params.title = search;
      }
      const { data } = await axios({
        method: "GET",
        url: "https://cheapshark-game-deals.p.rapidapi.com/deals",
        params,
        headers: {
          "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "cheapshark-game-deals.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getGameFromSteam(req, res, next) {
    try {
      let { steamAppID } = req.params;
      const { data } = await axios({
        method: "GET",
        url: `https://steam2.p.rapidapi.com/appDetail/${steamAppID}`,
        headers: {
          "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "steam2.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getGameFromCheapShark(req, res, next) {
    try {
      let { gameID } = req.params;
      const { data } = await axios({
        method: "GET",
        url: "https://cheapshark-game-deals.p.rapidapi.com/games",
        params: { id: gameID },
        headers: {
          "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "cheapshark-game-deals.p.rapidapi.com",
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GameController;
