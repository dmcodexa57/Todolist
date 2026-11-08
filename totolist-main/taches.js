
// =====================================
// RÉCUPÉRER LE PRÉNOM
// =====================================

let prenom = localStorage.getItem("prenom");

let bienvenue = document.querySelector("#bienvenue");

if (bienvenue) {
    bienvenue.textContent = "Bonjour " + (prenom || "");
}


// =====================================
// RÉCUPÉRER LA LISTE DES TÂCHES
// =====================================

const listeTaches = document.getElementById("taches");


// =====================================
// FONCTION POUR AFFICHER UNE TÂCHE
// =====================================

function afficherTache(tache) {

    const ligne = document.createElement("li");
    ligne.classList.add("ligne-tache");

    // CARTE BLANCHE

    const element = document.createElement("div");
    element.classList.add("carte-tache");

    // TITRE

    const titre = document.createElement("strong");
    titre.textContent = tache.text;

    // STATUT

    const statut = document.createElement("p");

    const labelStatut = document.createElement("span");
    labelStatut.textContent = "Statut : ";

    const valeurStatut = document.createElement("span");

    if (tache.is_complete) {

        valeurStatut.textContent = "Terminée";
        valeurStatut.className = "statut-termine";

    } else {

        valeurStatut.textContent = "À faire";
        valeurStatut.className = "statut-encours";

    }

    statut.appendChild(labelStatut);
    statut.appendChild(valeurStatut);

    element.appendChild(titre);
    element.appendChild(statut);


    // BOUTON VOIR LES DÉTAILS

    const bouton = document.createElement("button");

    bouton.textContent = "Voir les détails";

    bouton.addEventListener("click", function() {

       localStorage.setItem(
    "tacheSelectionnee",
    JSON.stringify(tache)
);

window.location.href = "details.html?id=" + tache.id;

    });


    // AJOUTER LES ÉLÉMENTS

    ligne.appendChild(element);
    ligne.appendChild(bouton);

    listeTaches.appendChild(ligne);

}


// =====================================
// RÉCUPÉRER LES TÂCHES DEPUIS L'API
// =====================================

fetch("http://localhost:3000/todos")

    .then(response => {

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des tâches");
        }

        return response.json();

    })

    .then(data => {

        console.log("Données récupérées :", data);

        listeTaches.innerHTML = "";

        data[0].todolist.forEach(tache => {

            afficherTache(tache);

        });

    })

    .catch(error => {

        console.log("Erreur :", error);

    });


// =====================================
// AJOUTER UNE NOUVELLE TÂCHE
// =====================================

const formulaire = document.getElementById("formulaire-tache");

const nouvelleTache = document.getElementById("nouvelle-tache");

formulaire.addEventListener("submit", function(event) {

    event.preventDefault();

    const texte = nouvelleTache.value.trim();

    if (texte === "") {

        alert("Veuillez saisir une tâche");
        return;

    }

    // CRÉER LA TÂCHE

    const tache = {

        text: texte,
        Tags: [],
        is_complete: false

    };


    // ENVOYER LA TÂCHE À L'API

    fetch("http://localhost:3000/todos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(tache)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Erreur lors de l'enregistrement");
        }

        return response.json();

    })

    .then(data => {

        console.log("Tâche enregistrée :", data);

        // AFFICHER LA TÂCHE ENREGISTRÉE

        afficherTache(data);

        // VIDER LE CHAMP

        nouvelleTache.value = "";

    })

    .catch(error => {

        console.log("Erreur :", error);

        alert("Impossible d'enregistrer la tâche.");

    });

});


// BOUTON STATISTIQUES


const boutonStatistiques = document.getElementById("voir-statistiques");

boutonStatistiques.addEventListener("click", function() {

    window.location.href = "statistiques.html";

});
