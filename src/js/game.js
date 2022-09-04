
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

    rockets = [];

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
        this.initRockets();
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


    /**
     * Create Rockets and assign bomb to random rocket
     */
    initRockets(rocketCount) {
        //size is fixed to 3 Rockets in game for now...
        console.log("Initializing rockets... hiding bomb!");
        if(!rocketCount) {
            rocketCount = 3; // default to 3 rockets, if weired value is passed
        }

        for(let i = rocketCount; i > 0; i--) {
            let newRocket = new Rocket();
            this.rockets.push(newRocket);
        }

        //get random number in range between 0 and length of total rockets added, e.g. "3"
        let randomIndex = this.getRandomNumberInRange(0, this.rockets.length);

        //now we use the randomIndex to access a random rocket from the rockets array.
        //we then set the hasBomb Property to true; 
        //the result will be, that we have a random bomb assigned to one of the rockets...
        this.rockets[randomIndex].setHasBomb(true);

        console.log("Created: " + this.rockets.length + " rockets. The bomb was assigned to rocket number: " + randomIndex);
    }

    checkForBomb() {

    }


    /**
     * Get Random Number in Range
     * See: https://www.educative.io/answers/how-to-generate-a-random-number-between-a-range-in-javascript
     * @param {*} min 
     * @param {*} max 
     */
    getRandomNumberInRange(min = 0, max) {
        // find diff
        let difference = max - min;

        // generate random number 
        let rand = Math.random();

        // multiply with difference 
        rand = Math.floor( rand * difference);

        // add with min value 
        rand = rand + min;

        return rand;
    }
}

