import prisma from '../db/db.config.js';
import bcrypt from 'bcryptjs';

//  ********************************
//  USERS REPOSITORY
//  ********************************

const userRepository = {

    userSearchRepository: async (email) => {
      try {
          const userSearched = await prisma.user.findFirst({
              where: { user_email: email },
            });
            return userSearched;
      }
      catch(error) {
          throw "Error: erreur interne: " + error;
      }
  },

  userCreateRepository: async (body) => {
    try {
        const originalPassword = body.user_password;
        
        const hashedPassword = await bcrypt.hash(originalPassword, 10); //SALT 10
        const user = await prisma.user.create({
            data: {
              user_first_name: body.user_first_name,
              user_name: body.user_name,
              user_email: body.user_email,
              user_password: hashedPassword,
            }
          });
        return user;
    }
    catch(error) {
        throw "Error: erreur interne (userRepositoryGetPasswordByEmail): " + error;
    }
  }
};

export default userRepository;