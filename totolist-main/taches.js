let prenom = localStorage.getItem("prenom");

let bienvenue = document.querySelector("#bienvenue");

bienvenue.textContent = "Bonjour " + prenom + " ! Organisons tes tâches.";