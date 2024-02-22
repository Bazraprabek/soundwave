const express = require("express");
const router = express();
const multer = require("multer");
const {
  createProduct,
  fetchProduct,
  getProduct,
  productDelete,
  fetchProductByEmail,
  fetchProductById,
} = require("../controllers/productController");
const { recommendation } = require("../controllers/recommend");
const { popular, related } = require("../controllers/popular");
const { Protected } = require("../middlewares/auth");
const {
  uploadSong,
  fetchSong,
  fetchSongById,
  fetchApi,
} = require("../controllers/explore");
const { explore } = require("../controllers/knn");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req);
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/fetch").get(fetchProduct);
router.route("/fetch/:email").get(fetchProductByEmail);
router.route("/get/:id").get(fetchProductById);
router.route("/delete").get(productDelete);
router.route("/recommend").get(Protected, recommendation);
router.route("/popular").get(Protected, popular);
router.route("/related").post(Protected, related);
router.route("/explore").post(explore);
router.route("/explore/upload").get(uploadSong);
router.route("/explore/fetch").get(fetchSong);
router.route("/explore/get/:id").get(fetchSongById);
router.route("/fetchapi").get(fetchApi);
router.route("/:id").get(getProduct);
// router.route("/create").post(upload.single("song"), createProduct);
router.route("/create").post(
  upload.fields([
    {
      name: "song",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createProduct
);

module.exports = router;
