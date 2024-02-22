const jwt = require("jsonwebtoken");

const Protected = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access token is required");
  }

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid access token" });
    }
    req.verifyUserId = user.id;
    req.user = user;
    next();
  });
};
module.exports = { Protected };
