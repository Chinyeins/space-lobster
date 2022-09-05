/**
 * User Interface Klasse:
 * Kümmert sich um die Darstellung der verschiedenen Anzeigen / Views. z.B. Start Game, Game Over etc.
 */

class MainMenu {

    //Hauptmenu Referenz
    mainMenu;

    //container tag, für alle user interfaces
    userInterface;

    //game reference - used to alter game "state".
    game;

    //reference to audio Komponente
    audio;

    //Standard Konstruktor. Sobald Objekt erzeugt wird, wird der Inhalt im Konstruktor ausgeführt.
    //Wir nutzen den Konstruktor um die Klasse zu initialisieren mit Standard Werten. z.B. finde mainMenu Refernz aus HTML (Dom).
    //see: was ist ein DOM -> https://www.w3.org/TR/WD-DOM/introduction.html#:~:text=Introduction,document%20is%20accessed%20and%20manipulated.
    constructor(audio) {
        this.audio = audio;

        this.userInterface = document.getElementById("userInterface");

        this.mainMenu = document.getElementById("mainMenu");
        document.getElementById("mainMenuStart").addEventListener("click", (e) =>  this.mainMenuStartButtonClicked(e, this));
        document.getElementById("mainMenuCredits").addEventListener("click", (e) =>  this.mainMenuCreditsButtonClicked(e, this));
    }

    /**
     * Set Game Class Reference. So we can use it to alter the games behaviour, like start the game...
     */
    setGameRef(game) {
        this.game = game;
    }


    /**
     * MAIN MENU BUTTON HANDLING
     */

    mainMenuStartButtonClicked(e, button) {
        e.preventDefault();
        
        console.log("Main Menu Start btn clicked...");

        //rufe generelle funktion auf, die in ui-utils.js liegt...
        //in der index.html werden alle scripte inmportiert, d.h. wenn wir hier auf diese Funktion zugreifen wollen, können wir das machen, weil die Datei global dort geladen wurde.
        //wir könnten diese Funktion nun in jeder js datei benutzen.
        hideUiBackground();//macht den code so aber etwas unübersichtig, weil man nicht direkt, sieht woher die funktion kommt... 
        //besser wäre sich Vererbung zunutze zu machen. D.h. man erstellt eine Klasse UserInterface, die diese Funktion beinhaltet.
        //Nun leitet man in jeder UI Klasse, wie main-menu.js von der UserInterface Klasse ab.
        //das Gleiche tut man in allen weiteren UI Klassen, die diese Funktion haben soll....
        
        this.hideMainMenu();

        //start the game
        this.game.startGame();

        //play music - will be muted, if controlls says its mute...
        this.audio.playMusic();
    }

    mainMenuCreditsButtonClicked(e, button) {
        e.preventDefault();

        console.log("Main Menu Credits btn clicked...");
    }


    /**
     * MAIN MENU HELPER FUNCTIONS
    */


    showMainMenu() {
        //entferne css klasse, ui-hide von mainMenu element. Sorgt dafür, dass Tag sichtbar wird.
        this.mainMenu.classList.remove("ui-hide");
    }

    hideMainMenu() {
        //füge klasse: ui-hide zu element hinzu. Sorgt dafür, dass Tag unsichtbar wird.
        this.mainMenu.classList.add("ui-hide");
    }

    
}