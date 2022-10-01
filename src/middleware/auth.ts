const _jwt = require("jsonwebtoken");
const config = require("config");
const Users = require("../service/user/User");

const auth = async (req:any, res:any, next:any) => {
  try {
    const token = req.header("Authorization");
    const decode = _jwt.verify(token, "secretcode");
    const user = await Users.findOne({ _id: decode._id, "tokens.token": token });
    if (!user) {
      throw new Error("Please Authenticate");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error:any) {
    res.status(401).send({ message: error.message });
    console.log(error.message);
  }
};

module.exports = auth;