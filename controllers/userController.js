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

  userRegisterController: async (req, res) => {
    try {    
      const user = req.body;
      const result = await userServices.userRegisterService(user);

      if(!result.ok) { //-->user not created
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "user registration succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (userRegisterController): " + error.message }); //not authorisation
    }
  }
}

export default userController;