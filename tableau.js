function generationCalendrier(){
    // appel à la balise "body"
    var body = document.getElementsByTagName("body")[0];

      //  creation de <table> et <tbody>
    var tbl = document.getElementById("calendrier");
    var tblBody = document.createElement("tbody"); 
    
    //  Suppression des lignes existantes
    var totalLigneCalendrier = tbl.rows.length;
    if(totalLigneCalendrier>1){
        // var Parent = document.getElementById(tableID);
       for(var compteurLigne = 1; compteurLigne <totalLigneCalendrier ;compteurLigne++){
           tbl.deleteRow(totalLigneCalendrier-compteurLigne);
       }
    }

    
    var tabLibelMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    // var initJour = ['L', 'M', 'M', 'J','V', 'S', 'D'];
    var compteurJour = 0;
    var compteurVide = 0;

    //  Récupération des données du Formulaire
    var moisSaisi = document.getElementById('moisConcerne').value;
    var anneeSaisie = document.getElementById('anneeConcernee').value;
    var dateConcernee = anneeSaisie + "/" + moisSaisi + "/01";

    //  Récupération des éléments de la date
    var premierJourMois = new Date(dateConcernee);
    var jourSem = premierJourMois.getDay();

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
    for (var compteurLigne = 0;compteurLigne < 6; compteurLigne++){
        // creation des lignes du tableau
        var row = document.createElement("tr");

        for (var CompteurCell=0; CompteurCell < 7; CompteurCell++){
                //  Création du corps du calendrier
                var cell = document.createElement("td");
                var idCell = "" + compteurLigne + CompteurCell;
                cell.setAttribute("id", idCell);
                document.getElementById(idCell).classList.add("moisEnCours");

                //  Renseigne les jours précédant le 1er  du mois
                if(compteurVide != jourSem -1){
                    if(jourSem == 0){
                        jourSem = 7;
                    }
                    //  Colorie le fond de la cellule en gris
                    // document.getElementById(idCell).className = "horsMois";
                    //  Ecrit le quantième du jour
                    var cellText = document.createTextNode(nbJoursPrecedent - ((jourSem - 2) - compteurVide));
                    compteurVide ++;
                // Renseigne les jours du mois
                }else if (compteurVide == jourSem && compteurJour == 0){
                    compteurJour = 1
                    //  Ecrit le quantième du jour
                    var cellText = document.createTextNode(compteurJour);
                //  Renseigne les cellules vides pour compléter le calendrier apres le dernier jour du mois
                }else{
                    if (compteurJour == nbJoursEnCours){
                        compteurJour = 1;
                        // document.getElementById(idCell).className = ".horsMois";
                    }else {
                        compteurJour++;  
                        if (compteurJour < nbJoursEnCours){
                            // document.getElementById(idCell).className = ".horsMois";
                        }
                    }
                    //  Ecrit le quantième du jour
                    var cellText = document.createTextNode(compteurJour);
                // }
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
