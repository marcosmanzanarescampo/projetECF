function logout() {
  // Exemple simple : retour à la page d’accueil
  window.location.assign('/');
}

function createWelcomeCard(message) {
  const container = document.getElementById('headerContainer'); // Le conteneur doit exister dans ton HTML

  const card = document.createElement('div');
  card.className = 'card';

  const h3 = document.createElement('h3');
  h3.id = 'welcome_message';
  h3.textContent = message;

  card.appendChild(h3);
  container.appendChild(card);
};

function createFiltreCard() {
  const container = document.getElementById('headerContainer');

  const card = document.createElement('div');
  card.className = 'card';

  const h3 = document.createElement('h3');
  h3.id = 'filtreCard';
  h3.textContent = "Filtre par ville";

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Entrez votre ville ici';
  input.className = 'card-input';

  const filterBtn = document.createElement('button');
  filterBtn.className = 'btn';
  filterBtn.innerText = 'Filtrer';
  filterBtn.addEventListener('click', (e) => {
    const container = document.getElementById('eventContainer');
    container.innerHTML = "";
    const ville = input.value;
    listEventsParVille(ville);
  })

  card.appendChild(h3);
  card.appendChild(input);
  card.appendChild(filterBtn);
  container.appendChild(card);
};

function createUserInfoCard(username, badgeLabel) {
  const container = document.getElementById('headerContainer'); // Assure-toi que #container existe

  const card = document.createElement('div');
  card.className = 'card';
  card.id = 'userInfo';

  const userName = document.createElement('h5');
  userName.id = 'userName';
  userName.innerHTML = '<span style="color: black; font-size: 1rem;">User: </span>' + username;

  const userBadge = document.createElement('h5');
  userBadge.id = 'userBadge';
  userBadge.innerHTML = '<span style="color: black; font-size: 1rem;">Badge: </span>' + badgeLabel;

  // icon
  const icon = document.createElement('p');
  icon.innerHTML = '🤍'; // Tu peux mettre une icône SVG ou Font Awesome ici
  icon.style.cursor = 'pointer';
  icon.style.textAlign  = 'center';
  icon.title = 'like';
  icon.addEventListener('click', (e) => {
    if (e.target.innerHTML === '🤍') {
      e.target.innerHTML = '❤️';
      const container = document.getElementById('eventContainer');
      container.innerHTML = "";
      // filtrer les evenements
      listLikedEvents(loggedUser.email);
    } else {
      e.target.innerHTML = '🤍';
      // filtrer les evenements
      const container = document.getElementById('eventContainer');
      container.innerHTML = "";
      listEvents();
    }
  }); 

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'btn';
  logoutBtn.innerText = 'Se déconnecter';
  logoutBtn.onclick = logout; // Assure-toi que la fonction logout() existe

  card.appendChild(userName);
  card.appendChild(userBadge);
  card.appendChild(icon);
  card.appendChild(logoutBtn);

  container.appendChild(card);
}

const loggedUser = {
  name: localStorage.getItem('loggedUserName'),
  firstName: localStorage.getItem('loggedUserFirstName'),
  email: localStorage.getItem('loggedUserEmail'),
  badge: localStorage.getItem('loggedUserBadge')
};

// function qui liste toutes les evenements
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
        createEventCard(event.event_id, event.event_titre, event.event_description, event.event_city, event.event_places, event.event_num_places, event.event_data_hour, event.event_created_at, event.createdByUser.user_name, event.createdByUser.user_first_name);
      }
    }
  }
  catch(err) {
    console.error('Erreur lors de la requête:', err);
  }
};

async function listEventsParVille(ville){
  try {
    
    const response = await fetch(`http://localhost:3000/api/event/city/${ ville }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.ok) {
      for (const event of data.data){
        createEventCard(event.event_id, event.event_titre, event.event_description, event.event_city, event.event_places, event.event_num_places, event.event_data_hour, event.event_created_at, event.createdByUser.user_name, event.createdByUser.user_first_name);
      }
    }
  }
  catch(err) {
    console.error('Erreur lors de la requête:', err);
  }
};

// function qui liste toutes les evenements aimées
async function listLikedEvents(email){
  try {
    
    const response = await fetch(`http://localhost:3000/api/like/${ email }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (data.ok) {
      for (const event of data.data){
        // console.log('liked event: ' + JSON.stringify(event));        
        // console.log("*****like event-user: " + JSON.stringify(event.userUser.user_name));
        createEventCard(event.eventEvent.event_id, event.eventEvent.event_titre, event.eventEvent.event_description, event.eventEvent.event_city, event.eventEvent.event_places, event.eventEvent.event_num_places, event.eventEvent.event_data_hour, event.eventEvent.event_created_at, event.userUser.user_name, event.userUser.user_first_name);
      }
    }
  }
  catch(err) {
    console.error('Erreur lors de la requête:', err);
  }
};

function createEventCard(id, titre, description, city, places, numPlaces, dataHour, createdAt, userName, userFirstName) {
  const card = document.createElement('div');
  card.className = 'Eventcard';
  card.id = `event_${ id }`;

  // Icône flottante (par exemple une croix pour fermer ou autre)
  const icon = document.createElement('span');
  icon.className = 'heart-icon';
  icon.innerHTML = '🤍'; // Tu peux mettre une icône SVG ou Font Awesome ici
  icon.style.cursor = 'pointer';
  icon.title = 'like';
  icon.addEventListener('click', (e) => {
    if (e.target.innerHTML === '🤍') {
      e.target.innerHTML = '❤️';
    } else {
      e.target.innerHTML = '🤍';
    }
  }); 

  // Titre de l'evenement
  const cardTitle = document.createElement('p');
  cardTitle.innerHTML = `<span style="color: black; font-size: 2rem;">Titre:</span> <span style="color: green; font-size: 1.6rem;">${ titre }</span>`;

  // Description de l'venement
  const cardDescription = document.createElement('p');
  cardDescription.innerHTML = `<span style="color: black; font-size: 1.5rem;">Description:</span> ${ description }`;

  // ville de l'evenement
  const cardCity = document.createElement('p');
  cardCity.innerHTML = `<span style="color: black; font-size: 1.5rem;">Ville:</span> ${ city }`;

  // type de places de l'evenement
  const cardPlaces = document.createElement('p');
  cardPlaces.innerHTML = `<span style="color: black; font-size: 1.5rem;">Type de places:</span> ${ places }`;

  // Nombre de places de l'evenement
  const cardPlacesNumber = document.createElement('p');
  cardPlacesNumber.innerHTML = `<span style="color: black; font-size: 1.5rem;">Nombre de places:</span> ${ numPlaces }`;

  // Date/Heure de l'evenement
  const cardDateHour = document.createElement('p');
  cardDateHour.innerHTML = `<span style="color: black; font-size: 1.5rem;">Date et heure:</span> ${ dataHour }`;

  // Données créateur de l'evenement
  const cardCreatedBy = document.createElement('p');
  cardCreatedBy.innerHTML = `<span style="color: black; font-size: 1.5rem;">Créated by:</span> ${ userFirstName } ${ userName } (${ createdAt })`;

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
  const container = document.getElementById('eventContainer');
  container.appendChild(card);
};


// Création du site
createWelcomeCard("Bienvenue(e) dans votre space,Vous êtes connecté avec succès");
createUserInfoCard(`${loggedUser.firstName} ${loggedUser.name}`, `<span style="color: red;">${ loggedUser.badge }</span>`);
createFiltreCard()
listEvents();