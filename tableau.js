function generationCalendrier(){
    //  Déclaration des variables
    var tabLibelMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    // var initJour = ['L', 'M', 'M', 'J','V', 'S', 'D'];
    var compteurJour = 0;
    var compteurVide = 0;
    var moisTermine = false;

    //  Récupération des données du Formulaire
    var moisSaisi = document.getElementById('moisConcerne').value;
    var anneeSaisie = document.getElementById('anneeConcernee').value;
    var dateConcernee = anneeSaisie + "/" + moisSaisi + "/01";

    //  Récupération des éléments de la date
    var premierJourMois = new Date(dateConcernee);
    var jourSem = premierJourMois.getDay();

    //  Création des class pour mise en forme des cellules
    // const cl_horsMois = document.createAttribute("class");
    // const cl_moisEnCours = document.createAttribute("class");
    // cl_horsMois.value = "horsMois";
    // cl_moisEnCours.value = "moisEnCours";

    //  Création du tableau des jours Max par mois
    if (anneeSaisie % 4 == 0){
        //  Année Bissextile
        var nbJoursDuMois = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }else{
        //  Année standard
        var nbJoursDuMois = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    //  Récupération du nombre de jours à traiter dans le calendrier
    var nbJoursEnCours = nbJoursDuMois[moisSaisi];
    var nbJoursPrecedent = nbJoursDuMois[moisSaisi - 1];

    document.getElementById('moisReserv').innerHTML = 'Réservation du mois de ' + tabLibelMois[moisSaisi - 1];
    // Creation du tableau
    for (var compteurLigne = 0;compteurLigne < 5; compteurLigne++){
        // creation des lignes du tableau
        for (var CompteurCell=0; CompteurCell < 7; CompteurCell++){
            //  Création du corps du calendrier
            //  Renseigne les jours précédent le 1er  du mois
            if(compteurVide != jourSem -1){
                // Colorie le fond de la cellule en gris
                    const td = document.getElementById("" + compteurLigne + CompteurCell);
                    td.classList.add("horsMois");
                    td.innerHTML = nbJoursPrecedent - ((jourSem - 2) - compteurVide);
                // document.getElementById("" + compteurJour + CompteurCell).innerHTML = nbJoursPrecedent - ((jourSem - 2) - compteurVide);
                compteurVide ++;
            // Renseigne les jours du mois
            }else if (compteurVide == jourSem - 1 && compteurJour == 0){
                compteurJour = 1
                const td = document.getElementById("" + compteurLigne + CompteurCell);
                    td.classList.add("moisEnCours");
                    td.innerHTML = compteurJour;
            //  Renseigne les cellules vides pour compléter le calendrier apres le dernier jour du mois
            }else{
                 const td = document.getElementById("" + compteurLigne + CompteurCell);
                 if (compteurJour == nbJoursEnCours){
                     moisTermine = true;
                    compteurJour = 1;
                }else {
                    compteurJour++;  
                }
                console.log(moisTermine);
                if (moisTermine == true){
                    var classeTd = ("horsMois");
                }else{
                    var classeTd = ("moisEnCours");
                }
                td.classList.add(classeTd);
                td.innerHTML = compteurJour;
            }
        }
    }
}
