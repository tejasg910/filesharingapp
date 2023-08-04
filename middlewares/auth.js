import jwt from "jsonwebtoken";

// middleware to check if req is authenticated
export const isLoggedIn = (req, res, next) => {
  const token = req.headers["authorization"];

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.json({ success: false, messaage: err.message });
  }
};
