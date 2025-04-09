document.addEventListener('DOMContentLoaded', () => {
  
  const loginForm = document.getElementById('signInForm');
  const signInLien = document.getElementById("signInLink");
  const welcome = document.getElementById('welcome');

  signInLien.addEventListener('click', () => {
    // Le formulaire de signIn disparaît et apparaît celui d'enregistremente
    loginForm.style.display = 'none';
    creerFormulaireInscription();
  });
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
  
      const email = loginForm.email.value;
      const password = loginForm.password.value;
  
      try {
        const response = await fetch('http://localhost:3000/api/user/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
        });
 
        const data = await response.json();

        console.log("reponse reçue: " + data.ok);
        
        
        if (data.ok) {
          welcome.textContent = `Bienvenu(e) ${data.user }`;
        } else {
          console.error(`Erreur: ${data.message || 'Échec de la connexion'}`);
        }
      } catch (err) {
        console.error('Erreur lors de la requête:', err);
      }
  });
});

function creerFormulaireInscription() {
  const container = document.getElementById('form-container');

  const form = document.createElement('form');
  form.id = 'registrationForm';

  // Fonction pour créer un champ (label + input)
  function creerChamp(labelText, inputType, inputId, inputName) {
    const div = document.createElement('div');
    div.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', inputId);

    const input = document.createElement('input');
    input.type = inputType;
    input.id = inputId;
    input.name = inputName;
    input.required = true;

    div.appendChild(label);
    div.appendChild(input);
    return div;
  }

  // Ajout des champs
  form.appendChild(creerChamp('Nom :', 'text', 'name', 'name'));
  form.appendChild(creerChamp('Prénom :', 'text', 'first_name', 'first_name'));
  form.appendChild(creerChamp('Email :', 'email', 'email', 'email'));
  form.appendChild(creerChamp('Mot de passe :', 'password', 'password', 'password'));

  // Bouton de soumission
  const bouton = document.createElement('button');
  bouton.type = 'submit';
  bouton.textContent = "S'inscrire";
  form.appendChild(bouton);

  // Ajout du formulaire au container
  container.appendChild(form);
};