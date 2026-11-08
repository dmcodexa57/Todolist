
// =====================================
// ADRESSE DE L'API VERCEL
// =====================================

const API_URL = "https://todolist-pied-alpha-78.vercel.app";

// =====================================
// RÉCUPÉRER L'IDENTIFIANT DANS L'URL
// =====================================

const parametres = new URLSearchParams(window.location.search);
const id = parametres.get("id");

// =====================================
// RÉCUPÉRER LES ÉLÉMENTS HTML
// =====================================

const titreDetail = document.getElementById("titre-detail");
const statutDetail = document.getElementById("statut-detail");
const terminer = document.getElementById("terminer-tache");
const supprimer = document.getElementById("supprimer-tache");
const retour = document.getElementById("retour-taches");

// =====================================
// VÉRIFIER SI UN IDENTIFIANT EXISTE
// =====================================

if (!id) {

    window.location.href = "taches.html";

} else {

    // =====================================
    // RÉCUPÉRER LA TÂCHE DEPUIS L'API
    // =====================================

    fetch(API_URL + "/todos/" + id)

        .then(response => {

            if (!response.ok) {
                throw new Error("Tâche introuvable");
            }

            return response.json();

        })

        .then(data => {

            tache = data;

            localStorage.setItem(
                "tacheSelectionnee",
                JSON.stringify(tache)
            );

            titreDetail.textContent = tache.text;

            actualiserDetail();

        })

        .catch(error => {

            console.log("Erreur :", error);

            alert("Impossible de récupérer cette tâche.");

            window.location.href = "taches.html";

        });

    // =====================================
    // ACTUALISER LE STATUT
    // =====================================

    let tache;

    function actualiserDetail() {

        if (tache.is_complete) {

            statutDetail.textContent = "Statut : Terminée";
            statutDetail.className = "statut-termine";

            terminer.textContent = "Réouvrir la tâche";

        } else {

            statutDetail.textContent = "Statut : À faire";
            statutDetail.className = "statut-encours";

            terminer.textContent = "Marquer comme terminée";

        }

        terminer.disabled = false;

    }

    // =====================================
    // BOUTON TERMINER / RÉOUVRIR
    // =====================================

    terminer.addEventListener("click", function() {

        const ancienStatut = tache.is_complete;

        tache.is_complete = !tache.is_complete;

        fetch(API_URL + "/todos/" + tache.id, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(tache)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Erreur lors de la modification");
            }

            return response.json();

        })

        .then(data => {

            tache = data;

            localStorage.setItem(
                "tacheSelectionnee",
                JSON.stringify(tache)
            );

            actualiserDetail();

        })

        .catch(error => {

            console.log("Erreur :", error);

            tache.is_complete = ancienStatut;

            actualiserDetail();

            alert("Impossible de modifier la tâche.");

        });

    });

    // =====================================
    // BOUTON SUPPRIMER
    // =====================================

    supprimer.addEventListener("click", function() {

        const confirmation = confirm(
            "Voulez-vous vraiment supprimer cette tâche ?"
        );

        if (confirmation) {

            fetch(API_URL + "/todos/" + id, {

                method: "DELETE"

            })

            .then(response => {

                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression");
                }

                localStorage.removeItem("tacheSelectionnee");

                window.location.href = "taches.html";

            })

            .catch(error => {

                console.log("Erreur :", error);

                alert("Impossible de supprimer la tâche.");

            });

        }

    });

    // =====================================
    // BOUTON RETOUR
    // =====================================

    retour.addEventListener("click", function() {

        window.location.href = "taches.html";

    });

}
