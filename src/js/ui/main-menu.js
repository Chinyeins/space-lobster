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

    //Standard Konstruktor. Sobald Objekt erzeugt wird, wird der Inhalt im Konstruktor ausgeführt.
    //Wir nutzen den Konstruktor um die Klasse zu initialisieren mit Standard Werten. z.B. finde mainMenu Refernz aus HTML (Dom).
    //see: was ist ein DOM -> https://www.w3.org/TR/WD-DOM/introduction.html#:~:text=Introduction,document%20is%20accessed%20and%20manipulated.
    constructor() {
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


    mainMenuStartButtonClicked(e, button) {
        e.preventDefault();
        
        console.log("Main Menu Start btn clicked...");

        this.hideUiBackground();
        this.hideMainMenu();

        //start the game
        this.game.startGame();
    }

    mainMenuCreditsButtonClicked(e, button) {
        e.preventDefault();

        console.log("Main Menu Credits btn clicked...");
    }

    showMainMenu() {
        //entferne css klasse, ui-hide von mainMenu element. Sorgt dafür, dass Tag sichtbar wird.
        this.mainMenu.classList.remove("ui-hide");
    }

    hideMainMenu() {
        //füge klasse: ui-hide zu element hinzu. Sorgt dafür, dass Tag unsichtbar wird.
        this.mainMenu.classList.add("ui-hide");
    }


    hideUiBackground() {
        this.userInterface.classList.add("ui-background-hide");
    }

    showUiBackground() {
        this.userInterface.classList.remove("ui-background-hide");
    }
}