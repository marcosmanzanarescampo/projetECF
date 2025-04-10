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
    console.log('**********************here');
    
    const response = await fetch('http://localhost:3000/api/event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (data.ok) {
      console.log("evenements: " + JSON.stringify(data.data));
    }
  }
  catch(err) {
    console.error('Erreur lors de la requête:', err);
  }
};