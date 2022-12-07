const { User } = require('../models/index')
const axios = require("axios");
const { compareHashPassword, createToken, sendEmail } = require("../helpers/index");

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

    static async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
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
                    'X-RapidAPI-Key': 'e1eba056a8mshdb43c782b6c0609p1e7846jsn2de07ec09145',
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
                    'X-RapidAPI-Key': 'e1eba056a8mshdb43c782b6c0609p1e7846jsn2de07ec09145',
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