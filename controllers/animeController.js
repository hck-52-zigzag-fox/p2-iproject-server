const axios = require("axios");

let jikanUrl = "https://api.jikan.moe/v4";

class Controller {
  static async getTop10Alltime(req, res, next) {
    try {
      let params = {
        limit: 10,
      };
      let { page, type } = req.query;
      if (page) {
        params = {
          ...params,
          page: page,
        };
      }
      if (type) {
        params = {
          ...params,
          type: type,
        };
      }
      let { data } = await axios.get(jikanUrl + "/top/anime", { params });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getTop10Current(req, res, next) {
    try {
      let params = {
        limit: 10,
        filter: "airing",
      };
      let { page, type } = req.query;
      if (page) {
        params = {
          ...params,
          page: page,
        };
      }
      if (type) {
        params = {
          ...params,
          type: type,
        };
      }
      let { data } = await axios.get(jikanUrl + "/top/anime", { params });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async upcoming(req, res, next) {
    try {
      let params = {
        limit: 10,
      };
      let { filter } = req.query;
      if (filter) {
        params = {
          ...params,
          filter: filter,
        };
      }
      let { data } = await axios.get(jikanUrl + "/seasons/upcoming", {
        params,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getRandomImage(req, res, next) {
    try {
      // console.log('hai');
      let { data } = await axios({
        method: 'get',
        url: 'https://api.waifu.pics/sfw/waifu'
      });
      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getAllAnime(req, res, next) {
    try {
      let params = {
        order_by: "score",
        sort: "desc",
        sfw: true,
        limit: 20,
      };
      let { page, type, status, order_by } = req.query;
      if (page) {
        params = {
          ...params,
          page: page,
        };
      }
      if (type) {
        params = {
          ...params,
          type: type,
        };
      }
      if (status) {
        params = {
          ...params,
          status: status,
        };
      }
      if (order_by) {
        params.order_by = order_by;
      }
      // console.log(params);
      let { data } = await axios.get("https://api.jikan.moe/v4/anime", { params });
      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getAnimeById(req, res, next) {
    try {
      // console.log(req.params);
      let { animeId } = req.params;
      let { data } = await axios.get(
        "https://api.jikan.moe/v4/anime/" + animeId + "/full"
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
