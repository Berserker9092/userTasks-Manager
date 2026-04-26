const Add = document.getElementById('btn-add-task');
const select = document.getElementById('user-select');
const title = document.getElementById('task-title');
const displayArea = document.getElementById("tasks-display-area");
const btnFilter = document.getElementById("btn-filter");

// 1. Remplir le menu déroulant
const actualiserListe = () => {
    const listeUsers = JSON.parse(localStorage.getItem('utilisateurs')) || [];
    select.innerHTML = '<option value="">-- Choisir un utilisateur --</option>';
    listeUsers.forEach(u => { 
        if(!u.isArchived){
            const option = document.createElement('option');
            option.value = u.id;
            option.textContent = u.username;
            select.appendChild(option);
        }
    });
}
actualiserListe();

// 2. FONCTION OUTIL : Générer le HTML (Pour éviter la répétition)
const genererHtmlTaches = (listeDeTaches, listeDUsers) => {
    displayArea.innerHTML = "<h3>Liste des Tâches</h3>";
    const ul = document.createElement("ul");

    listeDeTaches.forEach(t => {
        const li = document.createElement("li");
        const proprioObj = listeDUsers.find(u => u.id == t.proprio);
        const nomProprio = proprioObj ? proprioObj.username : "Inconnu";

        const barre = t.estTerminee ? 'style="text-decoration: line-through; color: gray;"' : '';
        const boutonTexte = t.estTerminee ? "Annuler" : "Terminer";

        li.innerHTML = `
            <span ${barre}>
                <strong>${t.titre}</strong> 
                <small>(Assigné à : ${nomProprio})</small>
            </span>
            <button onclick="basculerTache(${t.idTache})">${boutonTexte}</button>
            <button onclick="supprimerTache(${t.idTache})">Supprimer</button>
        `;
        ul.appendChild(li);
    });
    displayArea.appendChild(ul);
};

// 3. Afficher TOUTES les tâches
const afficherTaches = () => {
    //if (displayArea.innerHTML !== "") {
    //    displayArea.innerHTML = "";
    //    return;
    //}
    const taches = JSON.parse(localStorage.getItem('taches')) || [];
    const users = JSON.parse(localStorage.getItem('utilisateurs')) || [];

    if (taches.length === 0) {
        displayArea.innerHTML = "<p>Aucune tâche pour le moment.</p>";
        return;
    }
    genererHtmlTaches(taches, users);
};

// 4. Filtrer les tâches par utilisateur
const filtrerTachesParUtilisateur = () => {
    const inputRecherche = document.getElementById("search-user");
    const nomRecherche = inputRecherche.value.toLowerCase().trim();
    
    if (nomRecherche === "") {
        alert("Entrez un nom pour filtrer.");
        return;
    }

    const taches = JSON.parse(localStorage.getItem('taches')) || [];
    const users = JSON.parse(localStorage.getItem('utilisateurs')) || [];

    const utilisateurTrouve = users.find(u => u.username.toLowerCase() === nomRecherche);

    if (!utilisateurTrouve) {
        alert("Cet utilisateur n'existe pas.");
        return;
    }

    const tachesFiltrees = taches.filter(t => t.proprio == utilisateurTrouve.id);

    if (tachesFiltrees.length === 0) {
        displayArea.innerHTML = `<p>Aucune tâche trouvée pour <strong>${utilisateurTrouve.username}</strong>.</p>`;
    } else {
        genererHtmlTaches(tachesFiltrees, users);
    }
};


const ajouter = () => {
    const titreSaisi = title.value;
    const userId = select.value;
    if(titreSaisi.trim() === "" || userId === ""){
        alert("Veuillez saisir les deux champs.");
        return;
    }
    const listeTaches = JSON.parse(localStorage.getItem('taches')) || [];
    const nouvelleTache = {
        idTache: Date.now(),
        titre: titreSaisi,
        proprio: userId,
        estTerminee: false
    };
    listeTaches.push(nouvelleTache);
    localStorage.setItem('taches', JSON.stringify(listeTaches));
    alert(`Tâche "${titreSaisi}" ajoutée`);
    title.value = "";
    actualiserListe(); // Optionnel : rafraîchir le menu
    afficherTaches(); 
}

window.basculerTache = (id) => {
    let taches = JSON.parse(localStorage.getItem('taches')) || [];
    taches = taches.map(t => {
        if (t.idTache === id) {
            return { ...t, estTerminee: !t.estTerminee };
        }
        return t;
    });
    localStorage.setItem('taches', JSON.stringify(taches));
    afficherTaches();
};

window.supprimerTache = (id) => {
    let taches = JSON.parse(localStorage.getItem('taches')) || [];
    taches = taches.filter(t => t.idTache !== id);
    localStorage.setItem('taches', JSON.stringify(taches));
    afficherTaches();
};

Add.addEventListener('click', ajouter);
btnFilter.addEventListener("click", filtrerTachesParUtilisateur);
document.getElementById("show").addEventListener('click', afficherTaches);