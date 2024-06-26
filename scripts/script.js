/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span");
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}`;
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore;
}

function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition");
    zoneProposition.innerText = proposition;
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
    location.href = mailto;
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup();
    let score = 0;
    let i = 0;

    let btnValiderMot = document.getElementById("btnValiderMot");
    let inputEcriture = document.getElementById("inputEcriture");
    afficherProposition(listeMots[i]);
    btnValiderMot.addEventListener("click", () => {
        console.log(inputEcriture.value);
        if (inputEcriture.value === listeMots[i]) {
            score++;
        }
        i++;
        afficherResultat(score, i);
        inputEcriture.value = '';
        if (listeMots[i] === undefined) {
            afficherProposition("Le jeu est fini");
            btnValiderMot.disabled = true;
            // Appel de la fonction d'affichage de l'email après la fin du jeu
            envoyerEmail(score, i);
        } else {
            afficherProposition(listeMots[i]);
        }
    });

    afficherResultat(score, i);

    // Gestion de l'événement change sur les boutons radios. 
    let listeBtnRadio = document.querySelectorAll(".optionSource input");
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots;
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases;
            }
            // Réinitialisation du score et de l'index
            score = 0;
            i = 0;
            afficherResultat(score, i);
            afficherProposition(listeProposition[i]);
        });
    }

    afficherResultat(score, i);
}

/**
 * Cette fonction envoie un email avec le score du joueur
 * @param {number} score : le score du joueur
 * @param {number} nbMotsProposes : le nombre de mots proposés
 */
function envoyerEmail(score, nbMotsProposes) {
    let nom = document.getElementById("nom").value;
    let email = document.getElementById("email").value;

    if (validerNom(nom) && validerEmail(email)) {
        let scoreEmail = `${score} / ${nbMotsProposes}`;
        afficherEmail(nom, email, scoreEmail);
    } else {
        console.log("Erreur");
    }
}

/**
 * Cette fonction prend un nom en paramètre et valide qu'il est au bon format
 * ici : deux caractères au minimum
 * @param {string} nom 
 * @return {boolean}
 */
function validerNom(nom) {
    return nom.length >= 2;
}

/**
 * Cette fonction prend un email en paramètre et valide qu'il est au bon format. 
 * @param {string} email 
 * @return {boolean}
 */
function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    return emailRegExp.test(email);
}
