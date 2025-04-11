import likeServices from '../services/likeServices.js';

const likeController = {

    likeSearchController: async (req, res) => {
    try {
      const result = await likeServices.likeSearchService();

      if(!result.ok) { //-->like not created
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "like search succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (liketRegisterController): " + error.message }); //not authorisation
    }
  },

  likeEmailSearchController: async (req, res) => {
    try {
      const email = req.params.id;
      const result = await likeServices.likeEmailSearchService(email);

      if(!result.ok) { //-->like not created
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "like search succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (liketRegisterController): " + error.message }); //not authorisation
    }
  },
  
  likeCreateController: async (req, res) => {
    try {    
      const user = req.body.user;
      const event = req.body.event;
      const result = await likeServices.likeCreateService(user, event);

      if(!result.ok) { //-->like not created
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "like registration succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (likeRegisterController): " + error.message }); //not authorisation
    }
  }
};

export default likeController;