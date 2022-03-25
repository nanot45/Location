function generationCalendrier(){
    // appel à la balise "body"
    var body = document.getElementsByTagName("body")[0];
    //  creation de <table> et <tbody>
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var tabLibelMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var initJour = ['L', 'M', 'M', 'J','V', 'S', 'D'];
    var compteurJour = 0;
    var compteurVide = 0;

    //  Récupération des données du Formulaire
    var moisSaisi = document.getElementById('moisConcerne').value;
    var anneeSaisie = document.getElementById('anneeConcernee').value;
    var dateConcernee = anneeSaisie + "/" + moisSaisi + "/01";


    //  Récupération des éléments de la date
    var premierJourMois = new Date(dateConcernee);
    var jourSem = premierJourMois.getDay();
    var numMois = premierJourMois.getMonth() + 1 ;
    var numAnnee = premierJourMois.getFullYear();
    
    const cl_horsMois = document.createAttribute("class");
    const cl_moisEnCours = document.createAttribute("class");
    cl_horsMois.value = "horsMois";
    cl_moisEnCours.value = "moisEnCours";


    //  Création du tableau des jours Max par mois
    if (numAnnee % 4 == 0){
        //  Année Bissextile
        var nbJoursDuMois = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }else{
        //  Année standard
        var nbJoursDuMois = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    //  Récupération du nombre de jours à traiter dans le calendrier
    var nbJoursEnCours = nbJoursDuMois[numMois];
    var nbJoursPrecedent = nbJoursDuMois[numMois - 1];

    document.getElementById('moisReserv').innerHTML = 'Réservation du mois de ' + tabLibelMois[numMois - 1];
    // Creation du tableau
    for (var compteurLigne = 0;compteurLigne < 7; compteurLigne++){
        // creation des lignes du tableau
        var row = document.createElement("tr");

        for (var CompteurCell=0; CompteurCell < 7; CompteurCell++){
            //  Création de la ligne d'entete du calendrier
            if(compteurLigne == 0){
                var cell = document.createElement("th");
                var cellText = document.createTextNode(initJour[CompteurCell]);
            }else{
                //  Création du corps du calendrier
                var cell = document.createElement("td");
                //  Renseigne les jours précédent le 1er  du mois
                if(compteurVide != jourSem -1){
                    //  Colorie le fond de la cellule en gris
                    // const td = document.getElementsByTagName("td")[0];
                    // td.setAttributeNode(cl_horsMois);
                    //  Ecrit le quantième du jour
                    var cellText = document.createTextNode(nbJoursPrecedent - ((jourSem - 2) - compteurVide));
                    compteurVide ++;
                // Renseigne les jours du mois
                }else if (compteurVide == jourSem && compteurJour == 0){
                    compteurJour = 1
                    //  Coloirie le fond de la cellule en bleu
                    // const td = document.getElementsByTagName("td")[0];
                    // td.setAttributeNode(cl_moisEnCours);
                    //  Ecrit le quantième du jour
                    var cellText = document.createTextNode(compteurJour);
                //  Renseigne les cellules vides pour compléter le calendrier apres le dernier jour du mois
                }else{
                    if (compteurJour == nbJoursEnCours){
                        compteurJour = 1;
                    }else {
                        compteurJour++;  
                    }
                    //  Colorie le fond de la cellule en gris
                    // const td = document.getElementsByTagName("td")[0];
                    // td.setAttributeNode(cl_horsMois);
                    //  Ecrit le quantième du jour
                    var cellText = document.createTextNode(compteurJour);
                }
            }

            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
tbl.appendChild(tblBody);
body.appendChild(tbl);
tbl.setAttribute("border", "2");

}

// function getNbJours(date){
//     return new Date(date.getFullYear(), date.getMonth() + 1, -1).getDate() + 1;
// }
