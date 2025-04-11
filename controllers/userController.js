import userServices from '../services/userServices.js';
import dotenv from "dotenv";

dotenv.config();

const userController = {

  userSignInController: async (req, res) => {
    try {
      const user = req.body;

      const result = await userServices.userSignInService(user);

      if (!result.ok) {
        return res.json({ ok: 0, message: result.message }).status(200); //not authorisation      
      }

      // signIn is ok
      return res.json({ ok: 1, user: result, message: result.message, token: result.token }).status(201);
    } catch (error) {
      res.status(200).json({ error: error.message }); //not authorisation
    }
  },

  userUpgradeController: async (req, res) => {
    try {
      await userServices.userUpgradeService();
      return res.status(200).json();
    }
    catch(error) {
      res.status(500).json({ error: "Error: (useUpgradeController): " + error.message }); //not authorisation
    }
  },

  userRegisterController: async (req, res) => {
    try {
      const user = req.body;
  
      const result = await userServices.userRegisterService(user);
  
      if (!result.ok) {
        return res.status(200).json({ ok: 0, message: result.message }); // registration failed
      }
  
      // registration successful
      return res.status(201).json({
        ok: 1,
        user: result.data,
        message: "User successfully registered"
      });
  
    } catch (error) {
      return res.status(500).json({ ok: 0, error: error.message }); // server error
    }
  }  
}

export default userController;