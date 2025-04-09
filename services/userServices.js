import userRepository from "../repository/userRepository.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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

  return password.length > 3; //password plus long de 3 characters
}

const userServices = {

    userRegisterService: async (user) => {
      console.log("userRegisterService");
      
      const user_email = user.email;
      const user_password = user.password;

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
      const email = user.email;
      const password = user.password;

      // start of data validation
      const emailIsOk = validerEmail(email);
      const passwordIsOk = validerPassword(password);

      if (!emailIsOk) {
        return { ok: 0, message: "invalid email" };
      };

      if (!passwordIsOk) {
        return { ok: 0, message: "invalid password" };
      };
      // end of data validation

      const userSearched = await userRepository.userSearchRepository(email);

      if (!userSearched) {
        return { ok: 0, message: "Signin error: user does not exist" };
      };

      let loginValide = bcrypt.compareSync(password, userSearched.user_password); // validation du password

      if (!loginValide) {
        return { ok: 0, message: "Signin error" };
      };

  //  Signin success:
      const secret = process.env.JWT_SECRET;
      const payload = {
        email: email,
        password: password
      }

      // bonus:
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });  //token expires en 1 heure!
      return { ok: 1, user: payload, token: token };
    }
};

export default userServices;