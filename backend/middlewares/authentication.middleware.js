import jwt from "jsonwebtoken";

const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // Check if token is present
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token not provided" });
    }

    // Verify token and extract its payload
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming the token payload includes the `id` field; adjust according to your token structure.
    req.user = decodedToken.id || decodedToken._id;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authenticationMiddleware;
