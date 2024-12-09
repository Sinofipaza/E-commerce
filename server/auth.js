import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {}, (err, data) => {
    }
    );
  
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
