import jwt from "jsonwebtoken";

const token = jwt.sign(
  { id: user._id }, 
  process.env.JWT_SECRET, 
  { expiresIn: "30d" }
);

// Option 1: return it in response
res.json({ token });

// Option 2: set it as cookie
res.cookie("token", token, { httpOnly: true }).json({ message: "Logged in" });
