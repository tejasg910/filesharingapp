import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/User.js";
export const signup = (req, res) => {
  const { name, email, password } = req.body;
  // check data validity
  if (name == undefined || email == undefined || password == undefined) {
    return res.json({ success: false, message: "Invalid Data" });
  }
  // check password
  if (password.length < 8) {
    return res.json({ success: false, message: "Password is not strong" });
  }
  // check if account already exists with given email
  User.findOne({ email: email })
    .then((user) => {
      // if user already exits

      if (user) {
        return res.json({ success: false, message: "Email Already in use" });
      }
      // if not we have to create
      let newUser = new User({ name: name, email: email });

      bcrypt.hash(password, 10, (err, codedPassword) => {
        if (err) {
          return res.json({ success: false, message: "Something Went Wrong!" });
        }
        // if no erro set passord
        newUser.password = codedPassword;
        newUser
          .save()
          .then((user) => {
            return res.json({
              success: true,
              message: "Account Created",
              user: newUser,
            });
          })
          .catch((err) =>
            res.json({ success: false, message: "Something Went Wrong!" })
          );
      });
    })
    .catch(() =>
      res.json({ success: false, message: "Something Went Wrong!" })
    );
};

export const login = (req, res) => {
  const { email, password } = req.body;
  // chekc if values are valid
  if (email == undefined || password == undefined) {
    return res.json({ success: false, message: "Invalid Credentials" });
  }
  // check if adcount exits
  User.findOne({ email: email })
    .then((user) => {
      // if email not exits
      if (!user) {
        return res.json({ success: false, message: "Email not Found" });
      }
      // else check the password
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result == true) {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            "5678ABC",
            { expiresIn: "1h" }
          );

          return res.json({ success: true, token: token });
        } else {
          return res.json({ success: false, message: "Invalid Password" });
        }
      });
    })
    .catch(() =>
      res.json({ success: false, message: "Something Went Wrong!" })
    );
};
