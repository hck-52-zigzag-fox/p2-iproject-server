const axios = require("axios");

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
}

module.exports = GameController;
