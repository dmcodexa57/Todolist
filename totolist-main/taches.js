

let prenom = localStorage.getItem("prenom");

let bienvenue = document.querySelector("#bienvenue");

bienvenue.textContent = "Bonjour " + (prenom || "");



// RÉCUPÉRER LA LISTE DES TÂCHES


const listeTaches = document.getElementById("taches");

fetch("https://jsonplaceholder.typicode.com/todos")

    .then(response => {

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des tâches");
        }

        return response.json();

    })

    .then(data => {

        data.forEach(tache => {

            const ligne = document.createElement("li");
            ligne.classList.add("ligne-tache");

            // CARTE BLANCHE

            const element = document.createElement("div");
            element.classList.add("carte-tache");

            const titre = document.createElement("strong");
            titre.textContent = tache.title;

            const statut = document.createElement("p");

            const labelStatut = document.createElement("span");
            labelStatut.textContent = "Statut : ";

            const valeurStatut = document.createElement("span");

            function actualiserStatut() {

                if (tache.completed) {

                    valeurStatut.textContent = "Terminée";
                    valeurStatut.className = "statut-termine";

                } else {

                    valeurStatut.textContent = "À faire";
                    valeurStatut.className = "statut-encours";

                }

            }

            actualiserStatut();

            statut.appendChild(labelStatut);
            statut.appendChild(valeurStatut);

            element.appendChild(titre);
            element.appendChild(statut);

            // BOUTON VOIR LES DÉTAILS

            const bouton = document.createElement("button");
            bouton.textContent = "Voir les détails";

            bouton.addEventListener("click", function() {

                const details = document.getElementById("details-tache");
                const titreDetail = document.getElementById("titre-detail");
                const statutDetail = document.getElementById("statut-detail");

                details.hidden = false;

                titreDetail.textContent = tache.title;

                function actualiserDetail() {

                    statutDetail.textContent = tache.completed
                        ? "Statut : Terminée"
                        : "Statut : À faire";

                }

                actualiserDetail();

                // BOUTON TERMINER

                const terminer = document.getElementById("terminer-tache");

                terminer.onclick = function() {

                    tache.completed = true;

                    actualiserStatut();
                    actualiserDetail();

                };

                // BOUTON SUPPRIMER

                const supprimer = document.getElementById("supprimer-tache");

                supprimer.onclick = function() {

                    ligne.remove();
                    details.hidden = true;

                };

            });

            ligne.appendChild(element);
            ligne.appendChild(bouton);

            listeTaches.appendChild(ligne);

        });

    })

    .catch(error => {

        console.log("Erreur :", error);

    });



// BOUTON RETOUR AUX TÂCHES

const retour = document.getElementById("retour-taches");

retour.addEventListener("click", function() {

    const details = document.getElementById("details-tache");

    details.hidden = true;

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

    const ligne = document.createElement("li");
    ligne.classList.add("ligne-tache");

    // CARTE BLANCHE

    const element = document.createElement("div");
    element.classList.add("carte-tache");

    const titre = document.createElement("strong");
    titre.textContent = texte;

    const statut = document.createElement("p");

    const labelStatut = document.createElement("span");
    labelStatut.textContent = "Statut : ";

    const valeurStatut = document.createElement("span");
    valeurStatut.textContent = "À faire";
    valeurStatut.className = "statut-encours";

    statut.appendChild(labelStatut);
    statut.appendChild(valeurStatut);

    element.appendChild(titre);
    element.appendChild(statut);

    // BOUTON VOIR LES DÉTAILS

    const bouton = document.createElement("button");
    bouton.textContent = "Voir les détails";

    bouton.addEventListener("click", function() {

        const details = document.getElementById("details-tache");
        const titreDetail = document.getElementById("titre-detail");
        const statutDetail = document.getElementById("statut-detail");

        details.hidden = false;

        titreDetail.textContent = texte;

        function actualiserDetail() {

            statutDetail.textContent = valeurStatut.textContent === "Terminée"
                ? "Statut : Terminée"
                : "Statut : À faire";

        }

        actualiserDetail();

        // BOUTON TERMINER

        const terminer = document.getElementById("terminer-tache");

        terminer.onclick = function() {

            valeurStatut.textContent = "Terminée";

            valeurStatut.classList.remove("statut-encours");
            valeurStatut.classList.add("statut-termine");

            actualiserDetail();

        };

        // BOUTON SUPPRIMER

        const supprimer = document.getElementById("supprimer-tache");

        supprimer.onclick = function() {

            ligne.remove();
            details.hidden = true;

        };

    });

    // AJOUTER LES ÉLÉMENTS À LA LIGNE

    ligne.appendChild(element);
    ligne.appendChild(bouton);

    // AJOUTER LA LIGNE À LA LISTE

    listeTaches.appendChild(ligne);

    // VIDER LE CHAMP

    nouvelleTache.value = "";

});
