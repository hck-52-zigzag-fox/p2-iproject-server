const ItemController = require("../controllers/itemController");

const itemRouter = require("express").Router();

itemRouter.get("/", ItemController.fetchItems);

module.exports = itemRouter;
