import likeRepository from "../repository/likeRepository.js";

const likeServices = {

  likeSearchService: async () => {
    const likeSearched = await likeRepository.likeSearchRepository();
    return { ok: 1, data: likeSearched };
  },

  likeEmailSearchService: async (email) => {
    const likeSearched = await likeRepository.likeEmailSearchRepository(email);
    return { ok: 1, data: likeSearched };
  }, 

  likeCreateService: async (user, event) => {
    const likeCreated = await likeRepository.likeCreateRepository(user, event);
    return { ok: 1, data: likeCreated };
  }
};

export default likeServices;