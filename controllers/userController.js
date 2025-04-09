import userServices from '../services/userServices.js';
import dotenv from "dotenv";

dotenv.config();

const userController = {

  userSignInController: async (req, res) => {
    try {
      const user = req.body;
      const result = await userServices.userSignInService(user);

      if (!result.ok) {
        return res.json({ ok: 0, message: result.message }).status(201);      
      }

      return res.json({ ok: 1, message: "SignIn ok", token: result.token }).status(201);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  userRegisterController: async (req, res) => {
    try {
      const user = req.body;
      const result = await userServices.userRegisterService(user);

      if(!result.ok) { //-->user not created
        return res.status(200).json({ success: 0, message: result.message });
      }
      // ok
      return res.status(200).json({ success: 1, message: "user registered", data: result.data });
    }
    catch(error) {
      throw new Error("internal error:" + error);
    }
  }
}

export default userController;