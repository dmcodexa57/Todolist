
// RÉCUPÉRER LE PRÉNOM

let prenom = localStorage.getItem("prenom");

let bienvenue = document.querySelector("#bienvenue");

bienvenue.textContent = "Bonjour " + (prenom || "");


// RÉCUPÉRER LA LISTE DES TÂCHES

const listeTaches = document.getElementById("taches");


// FONCTION POUR AFFICHER UNE TÂCHE

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

        window.location.href = "details.html";

    });


    // AJOUTER LES ÉLÉMENTS

    ligne.appendChild(element);
    ligne.appendChild(bouton);

    listeTaches.appendChild(ligne);

}


// RÉCUPÉRER LES TÂCHES DEPUIS L'API

fetch("http://localhost:3000/todos")

    .then(response => {

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des tâches");
        }

        return response.json();

    })

    .then(data => {

        console.log("Données récupérées :", data);

        data[0].todolist.forEach(tache => {

            afficherTache(tache);

        });

    })

    .catch(error => {

        console.log("Erreur :", error);

    });


// AJOUTER UNE NOUVELLE TÂCHE

const formulaire = document.getElementById("formulaire-tache");

const nouvelleTache = document.getElementById("nouvelle-tache");

formulaire.addEventListener("submit", function(event) {

    event.preventDefault();

    const texte = nouvelleTache.value.trim();

    if (texte === "") {

        alert("Veuillez saisir une tâche");
        return;

    }

    const tache = {

        text: texte,
        is_complete: false

    };

    afficherTache(tache);

    nouvelleTache.value = "";

});


// BOUTON STATISTIQUES

const boutonStatistiques = document.getElementById("voir-statistiques");

boutonStatistiques.addEventListener("click", function() {

    window.location.href = "statistiques.html";

});
