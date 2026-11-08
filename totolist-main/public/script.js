let formulaire = document.querySelector("#formulaire");
let champ = document.querySelector("#prenom");
formulaire.addEventListener("submit", function (Event) {
    Event.preventDefault();
    if (champ.value === "") {
        alert("Veuillez entrez votre prénom");
    } else {
        localStorage.setItem("prenom", champ.value);
        window.location.href = "taches.html";
    }
});