// // UNTUK SIMPEN DI SERVER
// const multer = require("multer");
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "./public/upload");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, `${new Date().getTime()}-${file.originalname}`);
// //   },
// // });
// // const upload = multer({
// //   storage,
// //   fileFilter: async function (req, file, next) {
// //     try {
// //       if (
// //         file.mimetype === "image/png" ||
// //         file.mimetype === "image/jpg" ||
// //         file.mimetype === "image/jpeg"
// //       ) {
// //         next(null, true);
// //       } else {
// //         throw { name: "FileFormatNotSupported" };
// //       }
// //     } catch (error) {
// //       next(error);
// //     }
// //   },
// //   limits: { fileSize: 1024 * 1024 * 5 },
// // });
// // module.exports = upload;

// // UNTUK SIMPEN KE CLOUDNINARY
// const Datauri = require("datauri");
// // const path = require("path");
// const storage = multer.memoryStorage();
// const multerUploads = multer({ storage }).single("profilePict");
// const dUri = new Datauri();
// const dataUri = (req) =>
//   dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
// module.exports = { multerUploads, dataUri };
