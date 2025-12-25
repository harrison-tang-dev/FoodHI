import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken,verifyJWT } from "../utils/helpers/generateToken.js";
import { Gusers, userdb } from "../models/users/userSchema.js";

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY =  process.env.REFRESH_TOKEN_SECRET

export const RefreshToken = async (req, res) => {
  // Retrieve the refresh token from cookies or request body
  const incomingRefreshToken =  req.body.refreshtoken;

  // If no refresh token is present, deny access with a 401 Unauthorized status
  if (!incomingRefreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    // Verify the incoming refresh token using the secret key
 
    const decodedToken = jwt.verify(incomingRefreshToken, SECRET_KEY);

    // Find the user associated with the refresh token
    let user = await userdb.findById(decodedToken?.id);
    if(!user){
      user = await Gusers.findById(decodedToken?.id);
    }
    if(!user){
      user = await Admin.findById(decodedToken?.id);
    }

    // If the user isn't found, deny access with a 404 Not Found status
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.refreshtoken.indexOf(incomingRefreshToken);

    if (index === -1) {
        // Remove the matched rftoken from the array
        return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = {
      id: user._id,
      role: user.roles,
      disabled: user.disabled,
    };

    // Set the options for the token
    const options = {
      expiresIn: "25d",
    };
    // Generate new access and refresh tokens for the user
    const access_token = await generateAccessToken(
      payload,
      process.env.SECRET_KEY,
      options
    );
    //token is greater than the access token
    const refreshoptions = {
      expiresIn: "30d",
    };

    const refreshtoken = await generateRefreshToken(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      refreshoptions
    );

    user.refreshtoken.push(refreshtoken);
    await user.save();

    // Set the new tokens in cookies
    return res
      .status(200)
      .json({ access_token, refreshtoken, message: "Access token refreshed" });
  } catch (error) {
    // Handle any errors during token refresh with a 500 Internal Server Error status
    return res.status(500).json({ message: error.message });
  }
};