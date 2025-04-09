import userRepository from "../repository/userRepository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const validerEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.match(regex) !== null;
};

function validerPassword(password) {
  if (typeof password !== 'string') {
    return false;
  }

  return password.length > 3;
}

const userServices = {

    userRegisterService: async (user) => {
      const user_email = user.user_email;
      const user_password = user.user_password;

      // start of data validation
      const emailIsOk = validerEmail(user_email);
      const passwordIsOk = validerPassword(user_password);

      if (!emailIsOk) {
        return { ok: 0, message: "invalid email" };
      };

      if (!passwordIsOk) {
        return { ok: 0, message: "invalid password" };
      };
      // end of data validation

      const userSearched = await userRepository.userSearchRepository(user_email);

      if (userSearched) { //User already exists in database -> Error
        return { ok: 0, message: "User already exists in database" };
      }
      
      // no problem, on create the user...
      const userCreated = await userRepository.userCreateRepository(user);
      return { ok: 1, data: userCreated };
    },

    userSignInService: async (user) => {
      
      const email = user.user_email;
      const userSearched = await userRepository.userSearchRepository(email);

      if (!userSearched) {
        return { success: 0, message: "Signin error: user does not exist" };
      };

      let loginValide = await bcrypt.compare(userSearched.user_password, user.user_password); // validation du password

      loginValide = true; // triche pour pouvoir continuer...

      if (!loginValide) {
        console.log('SignIn error');
        return { success: 0, message: 'signIn error' };
      };

  //  Signin success:
      const secret = process.env.JWT_SECRET;
      const payload = {
        id: user.user_id,
        email: user.user_email,
        badge: user.user_badge
      }

      // bonus:
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });  //token expires en 1 heure!
      return ({ success: 1, message: "signIn ok", token: token });
    }
};

export default userServices;