
// RÉCUPÉRER LA TÂCHE SÉLECTIONNÉE

let tache = JSON.parse(
    localStorage.getItem("tacheSelectionnee")
);


// VÉRIFIER SI UNE TÂCHE EXISTE

if (!tache) {

    window.location.href = "taches.html";

} else {

    // RÉCUPÉRER LES ÉLÉMENTS HTML

    const titreDetail = document.getElementById("titre-detail");

    const statutDetail = document.getElementById("statut-detail");

    const terminer = document.getElementById("terminer-tache");

    const supprimer = document.getElementById("supprimer-tache");

    const retour = document.getElementById("retour-taches");


    // AFFICHER LE TITRE

    titreDetail.textContent = tache.text;


    // ACTUALISER LE STATUT

    function actualiserDetail() {

        if (tache.is_complete) {

            statutDetail.textContent = "Statut : Terminée";
            statutDetail.className = "statut-termine";

            terminer.disabled = true;

        } else {

            statutDetail.textContent = "Statut : À faire";
            statutDetail.className = "statut-encours";

            terminer.disabled = false;

        }

    }

    actualiserDetail();


    // BOUTON TERMINER

    terminer.addEventListener("click", function() {

        tache.is_complete = true;

        localStorage.setItem(
            "tacheSelectionnee",
            JSON.stringify(tache)
        );

        actualiserDetail();

    });


    // BOUTON SUPPRIMER

    supprimer.addEventListener("click", function() {

        const confirmation = confirm(
            "Voulez-vous vraiment supprimer cette tâche ?"
        );

        if (confirmation) {

            localStorage.removeItem("tacheSelectionnee");

            window.location.href = "taches.html";

        }

    });


    // BOUTON RETOUR

    retour.addEventListener("click", function() {

        window.location.href = "taches.html";

    });

}
