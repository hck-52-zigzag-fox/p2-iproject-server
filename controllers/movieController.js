let { User, Movie, Cart } = require('../models/');
import axios from "axios"

class movieController {
    static async getMovie(req, res, next) {
        try {
            let movieAPI = `https://api.themoviedb.org/3/list/1?api_key=${process.env.APIkey}&language=en-US`
            let { data } = await axios({
                url: movieAPI,
                method: "GET",
            })
            res.status(200).json({ movies: data.items })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = movieController