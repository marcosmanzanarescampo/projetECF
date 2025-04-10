function logout() {
  // Exemple simple : retour à la page d’accueil
  window.location.assign('/');
}

const welcomeMessage = document.getElementById('welcome_message');
const userName = document.getElementById("userName");
const userBadge = document.getElementById("userBadge")
const loggedUser = {
  name: localStorage.getItem('loggedUserName'),
  firstName: localStorage.getItem('loggedUserFirstName'),
  email: localStorage.getItem('loggedUserEmal'),
  badge: localStorage.getItem('loggedUserBadge')
};

welcomeMessage.innerText = `Bienvenue(e) dans votre space,Vous êtes connecté avec succès.`;
userName.innerText =`${loggedUser.firstName} ${loggedUser.name}`;
userBadge.innerText = `Badge: ${loggedUser.badge}`;