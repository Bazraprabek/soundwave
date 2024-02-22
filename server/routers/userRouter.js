const express = require("express");
const {
  userLogin,
  userSignup,
  getData,
  fetchData,
  userDelete,
  userDeleteByID,
  adduserReview,
  removeuserReview,
} = require("../controllers/userController");
const { Protected } = require("../middlewares/auth");
const router = express();

router.route("/").get(Protected, getData);
router.route("/fetch").get(fetchData);
router.route("/login").post(userLogin);
router.route("/signup").post(userSignup);
router.route("/delete").get(userDelete);
router.route("/delete/:id").get(userDeleteByID);
router.route("/review/add").post(Protected, adduserReview);
router.route("/review/remove").post(Protected, removeuserReview);

module.exports = router;
