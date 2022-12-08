const { User } = require('../models/index')
const axios = require("axios");
const { compareHashPassword, createToken, sendEmail } = require("../helpers/index");
const { OAuth2Client } = require("google-auth-library");

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const register = await User.create({
                email,
                password,
                status: "Regular",
            });
            sendEmail(email)
            res.status(201).json(register);
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                throw { name: "Invalid_Credential" };
            }

            const validatePassword = compareHashPassword(password, user.password);

            if (!validatePassword) {
                throw { name: "Invalid_Credential" };
            }

            let payload = { id: user.id };
            const access_token = createToken(payload);

            res.status(200).json({ access_token, email: user.email, status: user.status });
        } catch (err) {
            next(err);
        }
    }

    static async loginUserGoogle(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const googlePayload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {
                    email: googlePayload.email,
                },
                defaults: {
                    email: googlePayload.email,
                    password: "rahasiasekali",
                    status: "Regular",
                },
                hooks: false,
            });

            let payload = { id: user.id };
            const access_token = createToken(payload);

            res.status(200).json({ access_token, status: user.status, email: user.email });
        } catch (err) {
            next(err);
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const { id } = req.user;
            const { status = "VIP" } = req.body;

            const foundUser = await User.findByPk(id);

            if (!foundUser) {
                throw { name: "Not Found" };
            }

            await User.update({
                status
            }, { where: { id } });

            res.status(200).json({ message: `${foundUser.email} success updated status into ${status}` });
        } catch (err) {
            next(err);
        }
    }

    static async showTeams(req, res, next) {
        try {
            const { data } = await axios({
                method: "GET",
                url: 'https://free-nba.p.rapidapi.com/teams',
                headers: {
                    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async showPlayer(req, res, next) {
        try {
            const { data } = await axios({
                method: "GET",
                url: 'https://free-nba.p.rapidapi.com/players',
                headers: {
                    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async showMatches(req, res, next) {
        try {
            const { data } = await axios({
                method: "GET",
                url: 'https://free-nba.p.rapidapi.com/games',
                headers: {
                    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
                    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller