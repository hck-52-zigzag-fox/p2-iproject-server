const express = require("express");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});
const upload = multer({
  storage,
  fileFilter: async function (req, file, next) {
    try {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        next(null, true);
      } else {
        throw { name: "FileFormatNotSupported" };
      }
    } catch (error) {
      next(error);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = { upload };
