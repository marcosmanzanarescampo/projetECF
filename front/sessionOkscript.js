function logout() {
  // Exemple simple : retour à la page d’accueil
  window.location.assign('/');
}

listEvents();

const welcomeMessage = document.getElementById('welcome_message');
const userName = document.getElementById("userName");
const userBadge = document.getElementById("userBadge");
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
    
    const response = await fetch('http://localhost:3000/api/event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.ok) {     
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
  card.className = 'Eventcard';
  card.id = `event_${event.event_id}`;

  // Icône flottante (par exemple une croix pour fermer ou autre)
  const icon = document.createElement('span');
  icon.className = 'heart-icon';
  icon.innerHTML = '🤍'; // Tu peux mettre une icône SVG ou Font Awesome ici
  icon.style.cursor = 'pointer';
  icon.title = 'Fermer';
  icon.addEventListener('click', (e) => {
    if (e.target.innerHTML === '🤍') {
      e.target.innerHTML = '❤️';
    } else {
      e.target.innerHTML = '🤍';
    }
  }); 

  // Titre de l'evenement
  const cardTitle = document.createElement('p');
  cardTitle.innerHTML = `<span style="color: black; font-size: 2rem;">Titre:</span> <span style="color: green; font-size: 1.6rem;">${event.event_titre}</span>`;

  // Description de l'venement
  const cardDescription = document.createElement('p');
  cardDescription.innerHTML = `<span style="color: black; font-size: 1.5rem;">Description:</span> ${event.event_description}`;

  // ville de l'evenement
  const cardCity = document.createElement('p');
  cardCity.innerHTML = `<span style="color: black; font-size: 1.5rem;">Ville:</span> ${event.event_city}`;

  // type de places de l'evenement
  const cardPlaces = document.createElement('p');
  cardPlaces.innerHTML = `<span style="color: black; font-size: 1.5rem;">Type de places:</span> ${event.event_places}`;

  // Nombre de places de l'evenement
  const cardPlacesNumber = document.createElement('p');
  cardPlacesNumber.innerHTML = `<span style="color: black; font-size: 1.5rem;">Nombre de places:</span> ${event.event_places_number}`;

  // Date/Heure de l'evenement
  const cardDateHour = document.createElement('p');
  cardDateHour.innerHTML = `<span style="color: black; font-size: 1.5rem;">Date et heure:</span> ${event.event_date_hour}`;

  // Données créateur de l'evenement
  const cardCreatedBy = document.createElement('p');
  cardCreatedBy.innerHTML = `<span style="color: black; font-size: 1.5rem;">Créated by:</span> ${event.createdByUser.user_first_name} ${event.createdByUser.user_name} (${event.event_created_at})`;

  // Ajout des éléments à la carte
  card.appendChild(icon);
  card.appendChild(cardTitle);
  card.appendChild(cardDescription);
  card.appendChild(cardCity);
  card.appendChild(cardPlaces);
  card.appendChild(cardPlacesNumber);
  card.appendChild(cardDateHour);
  card.appendChild(cardCreatedBy);

  // Ajout de la carte au container
  const container = document.getElementById('eventContainer'); // Assurez-vous d'avoir un container avec cet ID
  container.appendChild(card);
}