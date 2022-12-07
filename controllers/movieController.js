let { User, Movie, Cart } = require('../models/');

const midtransClient = require('midtrans-client');
let axios = require('axios');

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
    static async getDetailMovie(req, res, next) {
        try {
            let { id } = req.params
            let movieAPI = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.APIkey}&language=en-US&append_to_response=videos`
            let { data } = await axios({
                url: movieAPI,
                method: "GET",
            })
            // console.log(data)
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getGenre(req, res, next) {
        // let genreApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=c4d809a9cf31fcc2c4d624e115c02593`
        // console.log(genreApi)
        try {
            let genreApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.APIkey}&language=en-US`
            let { data } = await axios({
                url: genreApi,
                method: "GET",
            })
            // console.log(data)
            res.status(200).json(data.genres)
        } catch (error) {
            // console.log(error)
            next(error)
        } try {

        } catch (error) {

        }
    }

    static async payment(req, res, next) {
        console.log(process.env.MIDTRANS_SERVER_KEY_GENERATE)
        try {
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": Math.floor(1000 + Math.random()),
                    "gross_amount": 1000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": "Sat",
                    "last_name": "Set",
                    "email": "Laksonosatriyo@gmail.com",
                    "phone": "0813110997554"
                },
                "bca_va": {
                    "va_number": "12345678911",
                    "sub_company_code": "00000",
                    "free_text": {
                        "inquiry": [
                            {
                                "en": "text in English",
                                "id": "text in Bahasa Indonesia"
                            }
                        ],
                        "payment": [
                            {
                                "en": "text in English",
                                "id": "text in Bahasa Indonesia"
                            }
                        ]
                    }
                },
            };

            const midtransToken = await snap.createTransaction(parameter)
            console.log(midtransToken)
            res.status(200).json(midtransToken)

        } catch (error) {
            next(error)
        }
    }

    static async addCart(req, res, next) {
        try {
            let { belongs_to_collection: { name, id, poster_path }, } = req.body
            const [movie, created] = await Movie.findOrCreate({
                where: {
                    id_tmdb: id
                },
                defaults: {
                    title: name,
                    id_tmdb: id,
                    poster_path,
                    price: id * 100
                },
            });
            console.log(movie)
            await Cart.create({ UserId: req.user.id, MovieId: movie.id })
            res.status(201).json({ messagge: `Sucsess add ${movie.title} to cart` })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = movieController