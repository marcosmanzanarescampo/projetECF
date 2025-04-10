import prisma from '../db/db.config.js';

//  ********************************
//  LIKES REPOSITORY
//  ********************************

const likeRepository = {

  likeSearchRepository: async () => {
    try {
        console.log('likeRepository');
        
        const likeSearched = await prisma.like.findMany();

        console.log('likes: ' + JSON.stringify(likeSearched));
        return likeSearched;
    }
    catch(error) {
        throw "(likeRepository) Error: erreur interne: " + error;
    }
  },

//   likeSearchRepository: async (userEmail) => {
//     try {
//         const likeSearched = await prisma.like.findMany( {
//             where: { userUser.user_email: userEmail },
//             include: { 
//                 userUser: true,
//                 eventEvent: true 
//             }
//         });

//         console.log('likes: ' + JSON.stringify(likeSearched));
//         return likeSearched.event;
//     }
//     catch(error) {
//         throw "(likeRepository) Error: erreur interne: " + error;
//     }
//   }
};

export default likeRepository;