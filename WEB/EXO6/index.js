const user = document.getElementById("username");
const pass = document.getElementById("password");
const inscrire = document.getElementById("btn-register");

const enregistrement = () => {
    const nom = user.value;
    const mdp = pass.value;

    if(nom === "" || mdp === ""){
        alert("champs vides");
        return;
    }
    liste_user = JSON.parse(localStorage.getItem('utilisateurs')) || []
    const existe = liste_user.find(liste => liste.username === nom)
    if(existe){
        alert("ce nom existe deja ");
        return;
    }
    const nouvelUser={
        id : Date.now(),
        username: nom,
        password: mdp,
        isArchived: false
    };
    liste_user.push(nouvelUser)

    localStorage.setItem('utilisateurs', JSON.stringify(liste_user));
    alert("Compte créé avec succès !");
   //alert(JSON.stringify(liste_user, null, 2));

}
inscrire.addEventListener('click', enregistrement)

const Afficher = document.getElementById("btn-list-users");
const Affichage = document.getElementById("users-display-area");

const afficherUtilisateurs = () => {
    if (Affichage.innerHTML !== "") {
        Affichage.innerHTML = "";
        return;
    }
    // 1. On récupère les données
    const liste = JSON.parse(localStorage.getItem('utilisateurs')) || [];

    if (liste.length === 0) {
        Affichage.innerHTML = "<p>Aucun utilisateur enregistré.</p>";
        return;
    }
    Affichage.innerHTML = "<h3>Liste des membres :</h3>";
    
    const ul = document.createElement("ul");

    liste.forEach(u => {
        const li = document.createElement("li");
        li.textContent = `${u.username} (ID: ${u.id}) ${u.isArchived ? '[Archivé]' : ''}`;
        ul.appendChild(li);
    });

    Affichage.appendChild(ul);
};

Afficher.addEventListener('click', afficherUtilisateurs);

const modifier = document.getElementById("btn-update");
const zoneModif = document.querySelector('.modification');
const preparerModification = () => {
    if (zoneModif.innerHTML !== "") {
        zoneModif.innerHTML = "";
        return; 
    }
    const modif = document.querySelector('.modification')
    modif.innerHTML = `<p>Qui voulez-vous modifier ?</p>
        <input type="text" id="user-to-find" placeholder="Entrez le nom">
        <button id="btn-confirm-find">Chercher</button>`
        document.getElementById("btn-confirm-find").addEventListener("click", modifierCompte);
}
modifier.addEventListener('click', preparerModification);


const modifierCompte = () => {
    
    const nomRecherche = document.getElementById("user-to-find").value;
    if (nomRecherche === ""){
        alert("ce nom n'existe pas de la db")
        return;
    }
    let liste = JSON.parse(localStorage.getItem('utilisateurs')) || []
    const utilisateurTrouve = liste.find(u => u.username === nomRecherche);
    if (!utilisateurTrouve) {
        alert("Cet utilisateur n'existe pas, impossible de le modifier.");
        return;
    }
    const nouveauNom = prompt("Entrez le nouveau nom pour ce compte : ", nomRecherche)
    if (nouveauNom && nouveauNom.trim() !== "") {
        // 4. On met à jour le nom dans la liste
        utilisateurTrouve.username = nouveauNom;
        document.getElementById('user-to-find').value = nouveauNom;
        localStorage.setItem('utilisateurs', JSON.stringify(liste));
    }
    // 5. On ré-enregistre la liste complète
        alert(`Le nom ${nomRecherche} a été changé en ${nouveauNom}`);
}


