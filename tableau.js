function generationCalendrier(){
    // appel à la balise "body"
    var body = document.getElementsByTagName("body")[0];

      //  creation de <table> et <tbody>
    var tbl = document.getElementById("calendrier");
    var tblBody = document.createElement("tbody"); 
    
    //  Suppression des lignes existantes
    var totalLigneCalendrier = tbl.rows.length;
    if(totalLigneCalendrier>1){
       for(var compteurLigne = 1; compteurLigne <totalLigneCalendrier ;compteurLigne++){
           tbl.deleteRow(totalLigneCalendrier-compteurLigne);
       }
    }
    
    var tabLibelMois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var compteurJour = 0;
    var compteurHorsMois = 0;
    // var finMois = false;
    var moisSuivant = false;
    var moisCourant = false;
    
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
    if(moisSaisi = 1){
        moisSaisi = 13
    }
    var nbJoursPrecedent = nbJoursDuMois[moisSaisi - 1];

    document.getElementById('moisReserv').innerHTML = 'Réservation du mois de ' + tabLibelMois[moisSaisi - 1];
    // Creation du tableau
    for (var compteurLigne = 0;compteurLigne < 6; compteurLigne++){
        // creation des lignes du tableau
        var row = document.createElement("tr");

        for (var CompteurCell=0; CompteurCell < 7; CompteurCell++){
                //  Création du corps du calendrier
                var cell = document.createElement("td");
                var idCell = `${compteurLigne}${CompteurCell}`;
                //  Affectation de l'id et de la class
                cell.setAttribute("id", idCell);
                cell.setAttribute("class", "moisEnCours");
                cell.className = "moisEnCours";
                
                //  Renseigne les jours précédant le 1er  du mois
                if(compteurHorsMois != jourSem -1){
                    //  Bascule le dimanche en fin de semaine
                    if(jourSem == 0){
                        jourSem = 7;
                    }
                    //  Colorie le fond de la cellule en bleu
                    cell.classList.replace("moisEnCours","horsMois");
                    //  Ecrit le quantième du jour
                    var cellText = document.createTextNode(nbJoursPrecedent - ((jourSem - 2) - compteurHorsMois));
                    compteurHorsMois ++;
                    if (compteurHorsMois == jourSem - 1){
                        moisCourant=true;
                    }
                // Renseigne les jours du mois
                }else if (compteurHorsMois == jourSem - 1 && compteurJour == 0){
                    compteurJour = 1
                    //  Affecte la class et écrit le quantième du jour

                    var cellText = document.createTextNode(compteurJour);
                    compteurJour ++;
                    //  Renseigne les cellules vides pour compléter le calendrier apres le dernier jour du mois
                }else{
                    if (compteurJour == nbJoursEnCours){
                        compteurJour = 1;            
                        moisCourant =false;
                        moisSuivant = true
                        cell.classList.replace("moisEnCours","horsMois");
                        }else {
                            if(moisCourant == false && moisSuivant == true){
                                cell.classList.replace("moisEnCours","horsMois");
                                compteurJour++;
                            }else{
                                compteurJour++;
                            }
                            //  Ecrit le quantième du jour
                        }
                    var cellText = document.createTextNode(compteurJour);
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
