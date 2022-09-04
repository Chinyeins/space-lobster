
/**
 * Spiele "Engine" Klasse.
 * 
 * Steuer Spielablauf, wie z.B.:
 * - Starte Spiel
 * - Spiel Vorbei
 * - Spiel zurücksetzen etc...
 * 
 * Ist der Haupteinstiegspunkt vom Spiel. D.h. hier wird spiel gestartet und beendet. 
 * Alle weieteren JavaScript Dateien werden hier zusammengeführt und benutzt.
 */
class Game {
    // Variablen Definiton - Eigenschaften von Spiel

    //Audio Komponente
    audio = null;

    //User Interface Komponente
    ui = null;

    /**
     * Spiele Konstruktor. Braucht Argumente, wie Audio und UI.
     * @param {Audio} audio Sound Klasse
     * @param {UI} user UserInterface Klasse
     */
    constructor(audio, mainMenu) {

        //initialisiere audio Komponente, sodass wir innerhalb klasse, audio funktionen nutzen können.
        this.audio = audio;

        //initialisiere ui Komponente
        this.ui = mainMenu;
    }


    // initialisiere Spiel das erste Mal
    initGame() {
        //reagiere auf button Klicks. Leite Click Event, an handleClick(button) Funktion weiter. Übergebe das Event Objekt (Click Event) und this (geklicktes Objekt selber bzw "button")
        document.getElementById("btn1").addEventListener('click', (e) => this.handleClick(e, this));
        document.getElementById("btn2").addEventListener('click', (e) => this.handleClick(e, this));
        document.getElementById("btn3").addEventListener('click', (e) => this.handleClick(e, this));
    }

    /**
     * Starts Game
     */
    startGame() {
        console.log("Starting game....");
        this.audio.playThemeSong();

        //@TODO: starte Spiel
    }


    /**
     * Terminates the game, when player loses.
     */
    gameOver() {
        console.log("Game is over....");

        //@TODO: Zeige Spieler, game over Screen, etc..
    }

    /**
     * Reset the game completely.
     */
    resetGame() {
        console.log("Resetting game....");

        //@TODO: Setze Spiel zurück
    }



    /**
     * Verarbeitet Button Click. Bekommt geklicktes ELEMENT übergeben.
     * @param {*} button
     * @see <a href="https://www.w3schools.com/js/js_htmldom_eventlistener.asp">Events Doku</a>
     */
    handleClick(e, button) {
        //see: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        e.preventDefault();

        console.log("Button wurde geklickt", e, button);

        //@TODO: verarbeite button klick
    }

}

