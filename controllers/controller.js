const {
  Customer,
  Product,
  Category,
  Bookmark,
} = require("../models/index");
const { Op } = require("sequelize");
const { createToken } = require("../helpers/jwt");
const { hashedPassword } = require("../helpers/bcrypt")
const { comparePassword } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("775756423500-iqack5nfdtjq43tpii2nldmrc7tlrud0.apps.googleusercontent.com");

class ControllerPublic {
  static async register(req, res, next) {
    const { username, email, password, phoneNumber, address } = req.body;
    try {
      const publicRegister = await Customer.create({
        username,
        email,
        password:hashedPassword(password),
        role: "customer",
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: publicRegister.id,
        email: publicRegister.email,
      });
    } catch (error) {
      console.log(error, `<<<<<<<<<<`);
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      let data = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!email) {
        throw { name: "Invalid email / password" };
      } else if (!password) {
        throw { name: "Invalid email / password" };
      }

      if (!data) {
        throw { name: "Invalid email / password" };
      }

      let isValid = comparePassword(password, data.password);
      if (!isValid) {
        console.log(`ga Valid <<<<<<<`);
        throw { name: "Invalid Credential" };
      }

      let payload = {
        id: data.id,
      };

      let access_token = createToken(payload);

      res.status(200).json({
        access_token: access_token,
        id: data.id,
        username: data.username,
        role: data.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.access_token_google,
        audience: process.env.GOOGLE_CLIENT,
      });
      const payload = ticket.getPayload();

      let cust = await Customer.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "passWordGoogle",
          role: "customer",
          phoneNumber: "081299072424",
          address: "Jl. Jakarta Pusat all in",
        },
      });
      const token = createToken({ id: cust[0].id });
      res.status(200).json({
        access_token: token,
        username: payload.given_name,
        id: cust[0].id,
        role: cust[0].role,
        email: cust[0].email,
      });
    } catch (error) {
      console.log(error)
    }
  }

  static async findAll(req, res, next) {
    try {
      const allProduct = await Product.findAll(
        { where: { status: "Active" } },
        {
          order: [["id", "ASC"]],
        }
      );
      res.status(200).json({ allProduct });
    } catch (error) {
      next(error);
    }
  }

  static async showCategories(req, res, next) {
    try {
      const dataCategories = await Category.findAll();
      res.status(200).json({ dataCategories });
    } catch (error) {
      next(error);
    }
  }

  static async paginationAndFiltering(req, res, next) {
    const { search, filter, page } = req.query;
    let pagination = 0;
    let limit = 8;
    try {
      let options = {
        order: [["id", "ASC"]],
        limit,
        where: {},
      };

      if (page) {
        options.offset = (page - 1) * limit;
      }

      if (filter) {
        options.where.CategoryId = filter;
      }
      if (search) {
        options.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }
      const allProduct = await Product.findAndCountAll(options);
      const totalPage = Math.ceil(allProduct.count / limit);

      res.status(200).json({ allProduct, totalPage });
    } catch (error) {
      console.log(error, `<<<<< error`);
      next(error);
    }
  }

  static async findOne(req, res, next) {
    const { id } = req.params;
    try {
      const oneProduct = await Product.findByPk(id);
      if (!oneProduct) throw { name: "Not Found" };
      else res.status(200).json({ oneProduct });
    } catch (error) {
      next(error);
    }
  }

  static async addBookmark(req, res, next) {
    const { ProductId } = req.params;
    try {
      const checkProduct = await Bookmark.findOne({
        where: { ProductId,CustomerId:req.customer.id },
      });
      if (checkProduct) throw { name: "Already Bookmarked" };
      const marked = await Bookmark.create({
        ProductId,
        CustomerId: req.customer.id,
      });
      res.status(201).json({
        id: marked.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readBookmark(req, res, next) {
    try {
      const readBooked = await Bookmark.findAll({
        where: {
          CustomerId: req.customer.id,
        },
        include: Product,
      });
      res.status(200).json({
        readBooked,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookmark(req, res, next) {
    const { ProductId } = req.params;
    console.log(ProductId, `<<<<<<<<<<<`);
    try {
      const deleted = await Bookmark.destroy({
        where: {
          id: ProductId,
        },
      });
      console.log(deleted, `<<<< deleted`);
      res.status(200).json(`Success delete id : ${ProductId}`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerPublic;
