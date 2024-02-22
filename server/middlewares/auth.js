const jwt = require("jsonwebtoken");

const Protected = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (verify) {
      req.verifyUserId = verify.id;
      next();
    } else {
      throw new Error("Unauthorized User");
    }
  } catch (err) {
    res.status(401).send({ msg: "Unauthorized User" });
    console.log(err);
  }
};

module.exports = { Protected };
