import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(403).json({ msg: "You don't have any access token !" }); // If no token, return Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, return Forbidden
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
};

export default authenticateToken;
