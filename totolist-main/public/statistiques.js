
// =====================================
// ADRESSE DE L'API VERCEL
// =====================================

const API_URL = "https://todolist-pied-alpha-78.vercel.app";

// =====================================
// RÉCUPÉRER LES ÉLÉMENTS HTML
// =====================================

const totalTaches = document.getElementById("total-taches");
const tachesTerminees = document.getElementById("taches-terminees");
const tachesAFaire = document.getElementById("taches-a-faire");

// =====================================
// RÉCUPÉRER LES TÂCHES DEPUIS L'API
// =====================================

fetch(API_URL + "/todos")

    .then(response => {

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des tâches");
        }

        return response.json();

    })

    .then(data => {

        console.log("Données récupérées :", data);

        const taches = data[0].todolist;

        // CALCULER LE TOTAL

        const total = taches.length;

        // CALCULER LES TÂCHES TERMINÉES

        const terminees = taches.filter(tache => {
            return tache.is_complete === true;
        }).length;

        // CALCULER LES TÂCHES À FAIRE

        const aFaire = total - terminees;

        // AFFICHER LES RÉSULTATS

        totalTaches.textContent = total;
        tachesTerminees.textContent = terminees;
        tachesAFaire.textContent = aFaire;

    })

    .catch(error => {

        console.log("Erreur :", error);

        totalTaches.textContent = "-";
        tachesTerminees.textContent = "-";
        tachesAFaire.textContent = "-";

    });

// =====================================
// BOUTON RETOUR
// =====================================

const retour = document.getElementById("retour-statistiques");

retour.addEventListener("click", function() {

    window.location.href = "taches.html";

});
