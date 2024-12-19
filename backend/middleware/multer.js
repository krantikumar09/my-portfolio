const multer = require("multer");

const storage = multer.diskStorage({
  // destination: (req, file, callback) => {
  //   callback(null, "./uploads");
  // },

  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload;
