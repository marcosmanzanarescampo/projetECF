import prisma from '../db/db.config.js';

//  ********************************
//  EVENTS REPOSITORY
//  ********************************

const eventRepository = {

   eventSearchRepository: async () => {
      try {  
        console.log('here');

          const eventsSearched = await prisma.event.findMany({
          include: {
            createdByUser: true, // Inclut l'utilisateur qui a créé l'événement
            }
          });
          console.log("Events: " + eventsSearched);

          return eventsSearched;
      }
      catch(error) {
          throw "(eventSearchRepositoiry) Error: erreur interne: " + error;
      }
  },

  eventSearchByCityRepository: async (city) => {
    try {
        const eventSearched = await prisma.event.find( {
            where: { event_city: city },
            include: { event_createdBy: true } // Inclut l'utilisateur qui a créé l'événement
        });
        return eventSearched;
    }
    catch(error) {
        throw "(eventSearchByCityRepositoiry) Error: erreur interne: " + error;
    }
  },

  eventCreateRepository: async (body, user) => {
    try {          
        const eventCreated = await prisma.event.create({
            data: {
              event_titre: body.event_titre,
              event_description: body.event_description,
              event_city: body.event_city,
              event_places: body.event_places,
              event_places_number: body.event_places_number,
              event_date_hour: body.event_date_hour,
              event_createdBy: user
            }
          });
        return eventCreated;
    }
    catch(error) {
        throw "(eventCreateRepository) Error: erreur interne: " + error;
    }
  }
};

export default eventRepository;