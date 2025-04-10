import eventRepository from "../repository/eventRepository.js";

function validerText(texte) {
    if (typeof(texte) !== 'string' || texte.length <= 0) {
        return false;
    } else {
        return true;
    }
};

function validerNumber(number) {
    if (typeof(number) !== 'number' || !Number.isInteger(number)) {
        return false;
    } else {
        return true;
    }
}

function validerDateTime(date) {
    const parsedDate = new Date(date);

    // Vérifie si la date est valide
    return !isNaN(parsedDate.getTime());
}

const eventServices = {

  eventRegisterService: async (event, user) => {

    const event_title = event.event_titre;
    const event_description = event.event_description;
    const event_date_hour = event.event_date_hour;
    const event_city = event.event_city;
    const event_places = event.event_places;
    const event_places_number = event.event_places_number;

    // start of data validation
    const titleIsOk = validerText(event_title);      
    const descriptionIsOk = validerText(event_description);
    const dateTimeIsOk = validerDateTime(event_date_hour);
    const cityIsOk = validerText(event_city);
    const placesIsOk = validerText(event_places);
    const placesNumberIsOk = validerNumber(event_places_number);

    if (!titleIsOk) {
      return { ok: 0, message: "invalid event title" };
    };

    if (!descriptionIsOk) {
      return { ok: 0, message: "invalid event description" };
    };

    if (!cityIsOk) {
      return { ok: 0, message: "invalid event city" };
    };

    if (!placesIsOk) {
      return { ok: 0, message: "invalid event places type" };
    };
    if (!placesNumberIsOk) {
      return { ok: 0, message: "invalid event places number" };
    };

    if (!dateTimeIsOk) {
      return { ok: 0, message: "invalid event sdate/time" };
    };

    // end of data validation

    // no problem, on create the event...
    const eventCreated = await eventRepository.eventCreateRepository(event, user);
    return { ok: 1, data: eventCreated };
  },

  eventSearchService: async () => {
    const eventSearched = await eventRepository.eventSearchRepository();
    return { ok: 1, data: eventSearched };
  }
};

export default eventServices;