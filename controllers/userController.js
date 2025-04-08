import userServices from '../services/userServices.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const userController = {

  userSignInController: async (req, res) => {
    try {
      const user = req.body;
      const result = await userServices.userSignInService(user);

      return res.json( { success: result.success, message: result.message, token: result.data }).status(201);
    } catch (error) {
      console.error("Erreur interne (userLoginController):", error);
      res.status(500).json({
        success: 0,
        message: "Erreur interne (userLoginController)",
        error: error.message || error
      });
    }
  },

  userRegisterController: async (req, res) => {
    try {
      const body = req.body;
      const user_email = body.user_email;
      const userSearched = await userServices.userSearchService(user_email);

      if (!userSearched) {
        const userCreated = await userServices.userCreateService(req.body);
        return res.json( { success: 1, message: 'user created avec success', data: userCreated }).status(201);
      }

      console.log('User already exists');
      return res.json( { success: 0, message: "user already exists"}).status(400);
    }
    catch(error) {
      console.log(error);
      return res.json( { error: "Internal server error"}).status(500);
    }
  }
}

export default userController;