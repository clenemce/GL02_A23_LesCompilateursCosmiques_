const Ecole = require('./ecole.js');
const Fichier = require('./gestionFichier.js');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });


class Main{
    universite;

    constructor(){
        this.importationDonneEtCreationObjets();
        this.afficherMenu();
    }

    afficherMenu(){
        console.log("**************************************************");
        console.log("Bienvenue sur ce programme de gestion d'universite");
        console.log("");
        rl.question('1 - Recherche de classe associée à un cours\n2 - Recherche de capacite dune salle\n3- Recherche disponibilite dune salle \n4- Recherche de salle libre pour un creneau \n5- Export de lemploi du temps \n6 - Visualisation des taux des salles \n7 - Generer le classement des salles par capacite daccueil \nChoix --> ', (answer) => {
            if(answer=='1'){
                this.menuClasseAssocieCours();
            }
            else if(answer=='2'){
                this.menuCapaciteSalle();
            }
            else if(answer=='3'){
                this.menuDisponibiliteDuneSalle();
            }
            else if(answer=='4'){
                this.menuSalleLibrePourUnCreaneau();
            }
            else if(answer=='5'){
                this.menuExportEmploiDuTemps();
            }
            else if(answer=='6'){
                this.menuVisualisationTauxOccupationSalles();
            }else if(answer=='7'){
                this.menuClassementSalleParCapaciteDoccupation();
            }

            rl.question('\n\nVeux tu continuer? \nChoix --> ', (answer) => {
                console.log(`${answer}`);
                if(answer=="oui"){
                    console.clear();
                    this.afficherMenu();
                }else{
                    rl.close();
                }
            });
            
          });
    }

    importationDonneEtCreationObjets(){
        const fichier = new Fichier('./Data/data.txt');
        this.universite = fichier.creationEcole();
        this.universite.afficherEcole();

    }

    static menuClasseAssocieCours(){
        //Fichier.ouvrirLeFichier('./Data/data.txt');
        const fichier = new Fichier('./Data/data.txt');
        //console.log("Affichage du menu de recherche d'une classe avec un cours...");
        
    }
}

const main = new Main();


module.exports = Main;
