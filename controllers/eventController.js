import eventServices from '../services/eventServices.js';

const eventController = {

  eventRegisterController: async (req, res) => {
    try {
      const event = req.body;
      const userId = parseInt(req.params.id);
    
      const result = await eventServices.eventRegisterService(event, userId);

      if(!result.ok) { //-->event not created
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "event registration succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (eventRegisterController): " + error.message }); //not authorisation
    }
  },

  eventSearchController: async (req, res) => {
    try {
      const result = await eventServices.eventSearchService();

      if(!result.ok) { //-->event not created
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "event serch succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (eventRegisterController): " + error.message }); //not authorisation
    }
  },

  eventSearchLikedController: async (req, res) => {
    try {
      const userEmail = req.params.id;
      const result = await eventServices.eventSearchLikedService(userEmail);

      if(!result.ok) { //-->no results
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "event serch succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (eventRegisterController): " + error.message }); //not authorisation
    }
  },
  
  eventSearchByCityController: async (req, res) => {
    try {
      const city = req.params.id;
      const result = await eventServices.eventSearchByCityService(city);

      if(!result.ok) { //-->no results
        return res.status(200).json({ ok: 0, message: result.message });
      }

      // ok
      return res.status(200).json({ ok: 1, message: "event serch succesfully", data: result.data });
    }
    catch(error) {
      res.status(401).json({ error: "Error: (eventRegisterController): " + error.message }); //not authorisation
    }
  }  
}

export default eventController;