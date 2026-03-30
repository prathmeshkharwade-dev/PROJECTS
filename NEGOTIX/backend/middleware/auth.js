import jwt from "jsonwebtoken";

// We use "export const" so we can import it with { verifyToken }
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Decoded usually contains { id, username }
    req.user = decoded; 
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};