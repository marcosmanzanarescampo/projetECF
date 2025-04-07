import userServices from '../services/userServices.js';

const userController = {
  userLoginController: async (req, res) => {
    try {
      console.log('serving /login');
      
      const body = req.body;
      console.log("userService/body: ", body);
      
      const result = await userServices.userLoginService(body);
      res.status(200).json({
        success: result.success,
        message: result.message
      });
    } catch (error) {
      console.error("Erreur login (userLoginController):", error);
      res.status(500).json({
        success: false,
        message: "Erreur login (userLoginController)",
        error: error.message || error
      });
    }
  }
};

export default userController;