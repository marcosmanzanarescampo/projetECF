import prisma from '../db/db.config.js';

//  ********************************
//  LIKES REPOSITORY
//  ********************************

const likeRepository = {

  likeSearchRepository: async () => {
    try {
        const likeSearched = await prisma.like.findMany({
            include: { userUser: true, eventEvent: true}
        });

        console.log('likes: ' + JSON.stringify(likeSearched));
        return likeSearched;
    }
    catch(error) {
        throw "(likeRepository) Error: erreur interne: " + error;
    }
  },

  likeEmailSearchRepository: async (email) => {
    try {     
      const likeSearched = await prisma.like.findMany({
        include: { userUser: true, eventEvent: true },
        where: { userUser: { user_email: email } }
      });
     
      return likeSearched;
    }
    catch(error) {
        throw "(likeRepository) Error: erreur interne: " + error;
    }
  },

  likeCreateRepository: async (user, event) => {
    try {
        console.log("user: " + user + " event: " + event);

        const like = await prisma.like.create({
            data: {
              user: parseInt(user),
              event: parseInt(event)
            }
          });
        return like;
    }
    catch(error) {
        throw "(likeCreateRepository) Error: erreur interne: " + error;
    }
  }
};

export default likeRepository;