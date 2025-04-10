import prisma from '../db/db.config.js';
import bcrypt from 'bcryptjs';

//  ********************************
//  USERS REPOSITORY
//  ********************************

const userRepository = {

   userSearchRepository: async (email) => {
      try {
          const userSearched = await prisma.user.findFirst({
              where: { user_email: email.toLowerCase() },
              include: { user_badge: true }
            });
            return userSearched;
      }
      catch(error) {
          throw "(userSearchRepositoiry) Error: erreur interne: " + error;
      }
  },

  userCreateRepository: async (body) => {
    try {
        const originalPassword = body.password;
        
        const hashedPassword = await bcrypt.hash(originalPassword, 10); //SALT 10
        const user = await prisma.user.create({
            data: {
              user_first_name: body.first_name,
              user_name: body.name,
              user_email: body.email.toLowerCase(),
              user_password: hashedPassword,
            }
          });
        return user;
    }
    catch(error) {
        throw "(userCreateRepository) Error: erreur interne: " + error;
    }
  }
};

export default userRepository;