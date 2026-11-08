/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    document.body.innerHTML = `
        <form id="formulaire">
            <input type="text" id="prenom">
            <button type="submit">Voir les tâches</button>
        </form>
    `;

    localStorage.clear();
    jest.resetModules();

    require("../public/script.js");
});

test("Affiche une alerte si le prénom est vide", () => {
    window.alert = jest.fn();

    const formulaire = document.querySelector("#formulaire");

    formulaire.dispatchEvent(
        new Event("submit", {
            bubbles: true,
            cancelable: true
        })
    );

    expect(window.alert).toHaveBeenCalledWith(
        "Veuillez entrez votre prénom"
    );
});

test("Enregistre le prénom dans localStorage", () => {
    document.querySelector("#prenom").value = "Denis";

    const formulaire = document.querySelector("#formulaire");

    formulaire.dispatchEvent(
        new Event("submit", {
            bubbles: true,
            cancelable: true
        })
    );

    expect(localStorage.getItem("prenom")).toBe("Denis");
});