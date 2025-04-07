import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

//  ********************************
//  USERS REPOSITORY
//  ********************************

const userRepository = {

    userRepositoryGetPasswordByEmail: async (body) => {
        try {
            console.log("body: " + body);
            
            const user_email = body.user_email;
            const user = await prisma.user.findFirst({
                where: { email: user_email },
              });

              if(user) {
                return { success: 1, data: user.user_password};
              }
              else {
                return { success: 0, error: 'user not found'};
              }
        }
        catch(error) {
            throw "Error: erreur interne (userRepositoryGetPasswordByEmail): " + error;
        }
    }
}

export default userRepository;