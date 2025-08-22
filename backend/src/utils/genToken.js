import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' }  // valid for 7 days
  );
};

export default generateToken;
