import prisma from '../db/db.config.js';
import bcrypt from 'bcryptjs';
import eventRepository from './eventRepository.js';

//  ********************************
//  USERS REPOSITORY
//  ********************************

const userRepository = {

   userSearchRepository: async (email) => {
      try {
          const userSearched = await prisma.user.findFirst({
              where: { user_email: email.toLowerCase() },
            });
            
            return userSearched;
      }
      catch(error) {
          throw "(userSearchRepositoiry) Error: erreur interne: " + error;
      }
  },

  userSearchAllRepository: async () => {
    try {
        const usersSearched = await prisma.user.findMany();          
        return usersSearched;
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
  },

  userUpgradeRepository: async () => {
    try {
      const users = await prisma.user.findMany();
      for(const user of users) {
        if (user.user_badge === 'basic') { //seulement ceci qui a un badge basic
          const userEvents = await eventRepository.eventSearchByUserRepository(user.user_id);
          if (userEvents){//l'utilisateur ha posté des eventements... il faut le upgrader!
            await prisma.user.update( {
              where: {user_id: user.user_id},
              data: {user_badge: "advanced"}
            });
          }
        }
      }
    }
    catch(error) {
        throw "(userSearchRepositoiry) Error: erreur interne: " + error;
    }
}
};

export default userRepository;