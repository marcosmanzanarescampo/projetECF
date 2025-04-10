import likeRepository from "../repository/likeRepository.js";

const likeServices = {

  likeSearchService: async () => {
    const likeSearched = await likeRepository.likeSearchRepository();
    return { ok: 1, data: likeSearched };
  }
};

export default likeServices;