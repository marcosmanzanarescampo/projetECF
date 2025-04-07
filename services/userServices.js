import userRepository from "../repository/userRepository.js";

const userServices = {
    userLoginService: async (body) => {
        try {
           const result = await userRepository.userRepositoryGetPasswordByEmail(body);
           return result;
        }
        catch(error) {
            throw "Error: erreur de login (userLoginService): " + error;
        }
    }
}

export default userServices;