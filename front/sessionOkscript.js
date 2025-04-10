function logout() {
  // Exemple simple : retour à la page d’accueil
  window.location.assign('/');
}

listEvents();

const welcomeMessage = document.getElementById('welcome_message');
const userName = document.getElementById("userName");
const userBadge = document.getElementById("userBadge");
const eventContainer = document.getElementById('eventContainer');
const loggedUser = {
  name: localStorage.getItem('loggedUserName'),
  firstName: localStorage.getItem('loggedUserFirstName'),
  email: localStorage.getItem('loggedUserEmail'),
  badge: localStorage.getItem('loggedUserBadge')
};

welcomeMessage.innerText = `Bienvenue(e) dans votre space,Vous êtes connecté avec succès.`;
userName.innerText =`${loggedUser.firstName} ${loggedUser.name}`;
userBadge.innerText = 'Badge: ';
userBadge.innerHTML += `<span style="color: red;">${ loggedUser.badge }</span`;

async function listEvents(){
  try {
    console.log('**********************here');
    
    const response = await fetch('http://localhost:3000/api/event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.ok) {
      // console.log("evenements: " + JSON.stringify(data.data));
      for (const event of data.data){
        createEventCard(event);
      }
    }
  }
  catch(err) {
    console.error('Erreur lors de la requête:', err);
  }
};

function createEventCard(event) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `${event.event_id}`;

  // Titre de l'evenement
  const cardTitle = document.createElement('h3');
  cardTitle.textContent = `Titre: ${event.event_titre}`;

  // Description de l'venement
  const cardDescription = document.createElement('p');
  cardDescription.textContent = `Description: ${event.event_description}`;

  // ville de l'evenement
  const cardCity = document.createElement('p');
  cardDescription.textContent = `Ville: ${event.event_city}`;

  // type de places de l'evenement
  const cardPlaces = document.createElement('p');
  cardDescription.textContent = `Type de places: ${event.event_places}`;

  // Nombre de places de l'evenement
  const cardPlacesNumber = document.createElement('p');
  cardDescription.textContent = `Type de places: ${event.event_places_number}`;

  // Date/Heure de l'evenement
  const cardDateHour = document.createElement('p');
  cardDescription.textContent = `Date et heure: ${event.event_date_hour}`;

  // Date/Heure de le la création de l'evenement
  const cardDateHeur = document.createElement('p');
  cardDescription.textContent = `Date et heure: ${event.event_date_hour}`;

  // Données créateur de l'evenement
  const cardCreatedBy = document.createElement('p');
  cardDescription.textContent = `Créated by: ${event.event_createdByUser.user_firstName} ${event.event_createdByUser.user_name}`;

  // Ajout des éléments à la carte
  card.appendChild(cardTitle);
  card.appendChild(cardDescription);

  // Ajout de la carte au container
  const container = document.getElementById('container'); // Assurez-vous d'avoir un container avec cet ID
  container.appendChild(card);
}