import { userdb,Gusers } from "../models/users/userSchema.js";
import dotenv from "dotenv";
import { ERR_MESSAGES, USER } from "../utils/ErrorMessages/messages.js";
import jwt from 'jsonwebtoken'
import { Members } from "../models/users/members.js";

dotenv.config();

const keysecret = process.env.SECRET_KEY;


export const hasRoleCheck = (role) => async (req, res, next) => {
  try {
    // Get the rootUser from the req.user property
 

    // Check if the user has one of the specified roles
    if (!role.includes('admin')) {
      throw { status: 403, message: ERR_MESSAGES.ROLE_ACESS_BLOCK };
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const authenticate=async(req,res,next)=>{
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwt.verify(token, keysecret, (err, decodedToken) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new Error('Access token expired');
        } else {
          throw new Error('Invalid token');
        }
      }
      return decodedToken;
    });
 
    let rootUser = await userdb.findOne({ _id: decoded.id });


    if (!rootUser) {
      rootUser = await Gusers.findOne({ _id: decoded.id });
    }
    if (!rootUser) {
      
    }
    if (decoded.role === 'familymember') {
      rootUser = await Members.findOne({ _id: decoded.id });
      const data = {
        id: rootUser?.userId,
        role: decoded.role
      };
      req.user = data;
      req.user._id = data.id;
      req.role = data.role;
    } else {
      req.user = decoded;
      req.user._id = decoded.id;
      req.role = decoded.role;
    }
    next();
  } catch (error) {
    console.error(error)
    next(error)
  }
}
