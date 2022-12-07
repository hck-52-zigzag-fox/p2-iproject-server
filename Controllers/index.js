const { User } = require('../models/index')
const { compareHashPassword, createToken, sendEmail } = require("../helpers/index");

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const register = await User.create({
                email,
                password,
                status: "regular",
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

            res.status(200).json({ access_token, status: user.status });
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

            const user = await User.update({
                status
            }, { where: { id } });

            res.status(200).json({ message: `${foundUser.email} success updated status into ${status}` });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller