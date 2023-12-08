const Ecole = require('./ecole.js');
const Fichier = require('./gestionFichier.js');
//const readlineSync = require('readline-sync');
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

    menuDisponibiliteDuneSalle(){
        
        
    }

    menuVisualisationTauxOccupationSalles(){
    }

    importationDonneEtCreationObjets(){
        const fichier = new Fichier('./Data/data.txt');
        this.universite = fichier.creationEcoleParLectureFichier();
    }

// -----------------------------------------------------------------------------------------------------

    // node .\main.js

    async menuSalleLibrePourUnCreaneau(){

        // Déclaration des tableaux

        let sallesDispo = new Array(6).fill(null).map(() => 
            new Array(24).fill(null).map(() => new Array(200).fill(null))
        );
        let listeCreneaux = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", 
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
        "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00" ];
        let listeJours = ["L", "M", "ME", "J", "V", "S"];
        let sallesDispoMobile = new Array(200);
        
        // Déclaration des variables

        let i; 
        let i2;
        let j; 
        let k;
        let kMobile;
        let iChoix;
        let jChoix;
        let j2Choix;
        let kChoix;
        let infoValide;
        let creneauValide;
        let sallePresente;
        let nSallesDispo=0;

        // -----------------------------------------------------------

        const fs = require('fs');

        const filePath = './Data/data.txt';
        
        const texte = fs.readFileSync(filePath, 'utf8');
            
        /*const texte = `
        +AP03
        1,D1,P=24,H=V 9:00-12:00,F1,S=B103//
        1,D2,P=25,H=V 13:00-16:00,F1,S=B103//
        +BI01
        1,C1,P=25,H=ME 8:00-10:00,F1,S=P101//
        1,D1,P=49,H=ME 10:00-12:00,F1,S=P104//
        +BI02
        1,C1,P=35,H=J 8:00-10:00,F1,S=B103//
        1,D1,P=25,H=J 10:00-12:00,F1,S=B102//
        `;*/

        // Transformer la chaîne en tableau de caractères
        
        const caracteres = Array.from(texte);
        console.log(texte);
        console.log (caracteres);


        let infos = new Array(4).fill(null);
        for (i2 = 0; i2 < caracteres.length; i2++){
            if (caracteres[i2]=='H'){
                infos[0]=caracteres[i2+2];
                if ((caracteres[i2+2]=='M')&&(caracteres[i2+3]=='E')){
                    infos[0]='ME'
                }
            }
            if (caracteres[i2]=='-'){
                if (caracteres[i2-5]==' '){
                    infos[1]=caracteres[i2-4]+caracteres[i2-3]+caracteres[i2-2]+caracteres[i2-1];
                }else{
                    infos[1]=caracteres[i2-5]+caracteres[i2-4]+caracteres[i2-3]+caracteres[i2-2]+caracteres[i2-1];
                }
                if (caracteres[i2+5]==','){
                    infos[2]=caracteres[i2+1]+caracteres[i2+2]+caracteres[i2+3]+caracteres[i2+4];
                }else{
                    infos[2]=caracteres[i2+1]+caracteres[i2+2]+caracteres[i2+3]+caracteres[i2+4]+caracteres[i2+5];
                }
            }
            if ((caracteres[i2]=='S')&&(caracteres[i2+1]=='=')){
                infos[3]=caracteres[i2+2]+caracteres[i2+3]+caracteres[i2+4]+caracteres[i2+5]
            }
            if ((caracteres[i2]=='/')&&(infos[0]!=null)&&(infos[1]!=null)&&(infos[2]!=null)&&(infos[3]!=null)){
                infoValide=0;
                for (i = 0; i < 6; i++){
                    if (infos[0]==listeJours[i]){
                        infoValide=infoValide+1;
                        iChoix=i;
                    }
                }
                for (i = 0; i < 24; i++){
                    if (infos[1]==listeCreneaux[i]){
                        infoValide=infoValide+1;
                        jChoix=i;
                    }
                }
                for (i = 0; i < 25; i++){
                    if (infos[2]==listeCreneaux[i]){
                        infoValide=infoValide+1;
                        j2Choix=i;
                    }
                }
                if (infoValide==3){
                    k=0;
                    for (i = jChoix; i < j2Choix; i++){
                        while (sallesDispo[iChoix][i][k]!=null){
                            k=k+1
                        }
                        sallesDispo[iChoix][i][k]=infos[3];
                    }
                }
                for (j = 0; j < 4; j++){
                    infos[j]=null
                }
            }
        }









        // -----------------------------------------------------------

        // On demande le jour et les heures de début et de fin du créneau
        // On stocke leur rang dans les tableaux listeJours et listeCreneaux dans des variables iChoix, jChoix et j2choix
        // Par exemple, si le jour saisi est L, iChoix prend la valeur 0

        console.log(`Veuillez renseigner un créneau `);
        infoValide=0;
        while (infoValide==0){
            const choixJour = await this.questionAsync("Quel jour ? (L pour Lundi, M pour Mardi, ME pour Mercredi...) ");
            for (i = 0; i < 6; i++){
                if (choixJour==listeJours[i]){
                    infoValide=1;
                    iChoix=i;
                }
            }
            if (infoValide==0){
                console.log(`Jour non valide`);
            }
        }
        creneauValide=0;
        while (creneauValide==0){
            infoValide=0;
            while (infoValide==0){
                const choixHeureDebut = await this.questionAsync("Quelle heure de début ? (8:00, 8:30, 9:00...) ");
                for (i = 0; i < 24; i++){
                    if (choixHeureDebut==listeCreneaux[i]){
                        infoValide=1;
                        jChoix=i;
                    }
                }
                if (infoValide==0){
                    console.log(`Horaire non valide`);
                }
            }

            infoValide=0;
            while (infoValide==0){
                const choixHeureFin = await this.questionAsync("Quelle heure de fin ? (8:00, 8:30, 9:00...) ");
                for (i = 1; i < 25; i++){
                    if (choixHeureFin==listeCreneaux[i]){
                        infoValide=1;
                        j2Choix=i-1;
                    }
                }
                if (infoValide==0){
                    console.log(`Horaire non valide`);
                }
            }
            if(jChoix>j2Choix){
                console.log(`Créneau non valide : durée du créneau nulle ou négative`);
            }else{
                creneauValide=1;
            }

        }
        console.log(`Les informations sont valides`);

        // On "copie-colle" le tableau sallesDispo pour un jour et un créneau donné dans le tableau sallesDispoMobile
       
        k=0;
        while (sallesDispo[iChoix][jChoix][k] != null){
            sallesDispoMobile[k]=sallesDispo[iChoix][jChoix][k];
            k=k+1;
        }

        // On vérifie pour chaque salle si elle est présente dans chacune des demi-heures du créneau
        // Si ce n'est pas le cas, on remplace sa valeur par la valeur "non" dans le tableau sallesDispoMobile

        i=iChoix;
        for (j = jChoix+1; j < j2Choix+1; j++){
            kMobile=0;
            while (sallesDispoMobile[kMobile] != null){
                sallePresente=0;
                k=0;
                while (sallesDispo[i][j][k] != null){
                    if (sallesDispoMobile[kMobile]==sallesDispo[i][j][k]){
                        sallePresente=1;
                    }
                    k=k+1;
                }
                if (sallePresente==0){
                    sallesDispoMobile[kMobile]="non"
                }
                kMobile=kMobile+1;
            }
            
        }

        // Affichage des salles disponibles

        console.log(`Recherche des salles disponibles... `);

        kMobile=0;
        while (sallesDispoMobile[kMobile] != null){
            if (sallesDispoMobile[kMobile] != "non"){
                console.log(`${sallesDispoMobile[kMobile]}`);
                nSallesDispo=nSallesDispo+1;
            }
            kMobile=kMobile+1;
        }
        if (nSallesDispo==0){
            console.log(`Aucune salle n'est disponible.`);
        }

    }

// -----------------------------------------------------------------------------------------------------

    menuClasseAssocieCours(){

        
        
    }
    // Méthode pour vérifier la disponibilité pour une salle donnée 
    async menuDisponibiliteDuneSalle(){
        const SalleDemander = await this.questionAsync("ecrire le nom de la salle !")
         console.log(SalleDemander);
         // On compare les crénaux occupé de la salle avec le crénaux test
         // On retourne faux si correspondance sinon vrai  
         }    
    questionAsync(prompt) {
    return new Promise((resolve) => {
    rl.question(prompt, resolve);
     });     
}
}
const main = new Main();


module.exports = Main;

