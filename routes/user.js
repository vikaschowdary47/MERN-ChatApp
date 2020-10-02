const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRECT = "s1e2c3r4e5t6";

router.post("/user/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    let checkUser = await User.findOne({
      email: req.body.email,
    });
    if (!checkUser) {
      const addUser = await user.save();
      res.send("registraion successful");
    } else {
      res.send("email already exists");
      //   console.log(checkUser);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/user/login", async (req, res) => {
  email = req.body.email;
  password = req.body.password;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user) {
      res.send("no");
    } else {
      //   res.send("found");
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.send("incorrect password");
      } else {
        // res.send("correct password");
        const token = jwt.sign({ message: "Login" }, SECRECT, {
          expiresIn: "10m",
          noTimestamp: true,
        });
        const result = jwt.verify(token, SECRECT);
        res.end(JSON.stringify({ error: false, data: result }));
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = router;
