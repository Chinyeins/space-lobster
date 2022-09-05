
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

const NUMBER_ROCKETS = 3;
class Game {
    // Variablen Definiton - Eigenschaften von Spiel

    //Audio Komponente
    audio = null;

    //User Interface Komponente
    mainMenu = null;

    //User Interface Komponente
    gameOverMenu = null;

    //User Interface Komponente
    finishMenu = null;

    rockets = [];

    //all div > html > Rocket Button tags as array
    rocketButtons = [];

    /**
     * Spiele Konstruktor. Braucht Argumente, wie Audio und UI.
     * @param {Audio} audio Sound Klasse
     * @param {UI} user UserInterface Klasse
     */
    constructor(audio, mainMenu) {

        //initialisiere audio Komponente, sodass wir innerhalb klasse, audio funktionen nutzen können.
        this.audio = audio;

        //initialisiere ui Komponente
        this.mainMenu = mainMenu;

        //get reference of all rocket buttons...
        this.rocketsBtn = document.getElementById("rocketsBtn");
    }

    /*************************************************
    * GAME LOGIC - Steuerung des Spielflusses
    **************************************************/

    // initialisiere Spiel das erste Mal
    initGame() {
        //reagiere auf button Klicks. Leite Click Event, an handleClick(button) Funktion weiter. 
        //Übergebe das Event Objekt (Click Event) und this (geklicktes Objekt selber bzw "button")
        document.getElementById("btn1").addEventListener('click', (e) => this.handleClick(e, 0));
        document.getElementById("btn2").addEventListener('click', (e) => this.handleClick(e, 1));
        document.getElementById("btn3").addEventListener('click', (e) => this.handleClick(e, 2));

        //zurzeit haben wir nur 3 feste buttons. Man könnte auch Logik implementieren das in einem div, 
        //nach buttons sucht und so dynamisch viele Raketen hinzufügen...
        //weitere code, wäre dafür nötig.
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

        //erstelle Game Over Menu... übergebe dem Menü eine Referenz auf diese Game Klasse,
        //damit wir vom Menu aus den Spielfluss steuern können, e.g. on btn click...
        this.gameOverMenu = new GameOverMenu(this);
    }

    /**
     * Reset the game completely.
     */
    resetGame() {
        console.log("Resetting game....");

        if(this.gameOverMenu) {
            this.gameOverMenu.hideGameOverMenu();
        }

        if(this.finishMenu) {
            this.finishMenu.hideMenu();
        }

        //destroy rockets data
        this.rockets = [];

        //create new rockets
        this.initRockets();

        //reset visual state of buttons
        this.resetRocketButtons();
    }

    /**
     * Player won the game.
     */
    finishGame() {
        console.log("Game finished. Player won.");

        //hole Rakete mit bombe...
        let rocketWithBomb = this.getLastRocketWithBomb();

        //erstelle Spiel Gewonnen UI mit allen Daten...
        this.finishMenu = new GameFinishedMenu(this, rocketWithBomb);
    }

    /**
     * Finishing Game Rule:
     *  Checks if the player won the game
     * @returns true | false
     */
    isGameFinishedRule() {
        //is only bomb left?
        let checkedRocketsCount = 0;

        this.rockets.forEach((rocket) => {
            if(rocket.getIsTerminated()) {
                //rock was terminated and ...

                //has no bomb
                if(!rocket.getHasBomb()) {
                    checkedRocketsCount++; //increment rocket checked counter....
                }
            }
        });

        //RULE: if every rocket except the one with the bomb was checked, the game is finished
        
        let totalRocketsInGame = this.rockets.length;

        if(totalRocketsInGame <= 1) {
            console.error("Fehler: Es sollten immer mindestens 2 Raketen existieren");
            //da stimmt was nicht!...
            return false;
        }

        //wenn alle Raketen, bis auf eine, geprüft wurden und die letzte Rakte die Bombe ist....
        if((totalRocketsInGame - checkedRocketsCount) <= 1) {
            return true;
        }

        return false;
    }



    /*************************************************
    * EVENT HANDLING - ON ROCKET CLICK
    **************************************************/

    /**
     * Verarbeitet Button Click. Bekommt geklicktes ELEMENT übergeben.
     * @param {*} button
     * @see <a href="https://www.w3schools.com/js/js_htmldom_eventlistener.asp">Events Doku</a>
     */
    handleClick(e, btnClickedIndex) {
        //see: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
        e.preventDefault();
        console.log("Button " + btnClickedIndex + " wurde geklickt...");

        //wir nutzen den übergebenen btnClickedIndex, um eine Zuordnung von Button click zu Rackete zu erhalten.
        /**
         * Beispiel: Btn 1 wird geklickt und übergibt index 0.
         * CheckForBomb(0) wird ausgeführt...
         * Die Funktion prüft nun, ob die Rakete an der Position 0 im rockets Array, eine Bombe hat (Eigenschaft: hasBomb() -> true )
         * 
         * ... Anmerkung: Nach der Logik stand jetzt:
         * - Muss jeder Button einen Index, beim Click Event übergeben bekommen (passiert bereits, siehe Zeile 46, 48)
         * - Müssen genau 3 Raketen erstellt werden und dem Array rockets hinzugefügt werden (passiert bereits).
         * 
         * ... Probleme:
         * - Es gibt nur 3 Feste Buttons, wenn ein neuer Buttin hinzukommt, muss auch eine Rackete mehr erstellt werden in initRockets().
         * - Besser wäre, Buttons und Rackent Initialisierung, dynamisch zu machen und auch dynamisch viele Raketen auf dem Bildschirm anzuzeigen.
         * ... weitere code wäre dafür nötig...
         */
        this.checkForBomb(e, btnClickedIndex);
    }

    /**
     * Get HTML Tag that holds all rocket buttons
     */
    getRocketsButtons() {
        return document.getElementsByClassName("rocket");
    }


    /*************************************************
    * GAMEPLAY LOGIC - ROCKETS
    **************************************************/

    /**
     * Create Rockets and assign bomb to random rocket
     */
    initRockets(rocketCount) {
        //size is fixed to 3 Rockets in game for now...
        console.log("Initializing rockets... hiding bomb!");
        if (!rocketCount) {
            //rocketCount ist keine Zahl oder ungültiger Wert...
            rocketCount = NUMBER_ROCKETS; // default to 3 rockets, if weired value is passed
        }

        for (let i = rocketCount; i > 0; i--) {
            //create new rocket
            let newRocket = new Rocket();

            //use index as rocket id...
            newRocket.setId(i);

            //add rocket to rockets array / Liste der Racketen im Spiel.
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

    /**
     * Check if Rocket with Index (rocketIndex) has BOMB.
     * @param {e} event Event was vom btn click mitgeliefert wurde.
     * @param {rocketIndexClicked} index An welcher Stelle im rockets array, wir nachschauen wolle, ob eine Bombe versteckt ist.
     */
    checkForBomb(e, rocketIndexClicked) {
        let clickedRocket = this.rockets[rocketIndexClicked];

        //prüfe, ob der index überhaupt in rockets.length range liegt...
        if (rocketIndexClicked > this.rockets.length || rocketIndexClicked < 0) {
            //dieser Fehler darf nicht passieren...
            console.error("Fehler: Btn Click Index nicht in range des rockets arrays...");
            return;
        }

        //Wurde gewünschte rackete überhaupt gefunden?
        if(!clickedRocket) {
            console.error("Fehler: Rakete nicht gefunden...");
            return;
        }

        if (clickedRocket.getHasBomb()) {
            //Rackete hat Bombe!

            //Abbruch Bedingung -> Spiel vorbei.
            this.gameOver();
            return; //terminate this call...
        } else {
            //Rackete hat nicht die Bombe!

            //Da wir uns hier in der GAME.JS, also Spiele Logik Klasse befinden, sollten wir
            //nicht hier die Logik der Terminierung der Rakete implementieren.
            //Dies machen wir in der Rakete selber. Jedes Objekt, 
            //sollte nur Dinge tun, die sie auch selber betreffen... quasi wie im echten Leben :D.

            //wir wollen in unserem Array von Raketen, die Rakete mit dem rocketIndexClicked, terminieren...
            //wir aktualisieren, also auf dem Array, die Eigenschaften der Rakete und lassen die Rakete selber
            //die Terminierungslogik ausführen...
            this.rockets[rocketIndexClicked].terminate(e);
        }

        if(this.isGameFinishedRule()) {
            this.finishGame();
            return; // terminate this call...
        }
    }

    /**
     * Return the rocket with the Bomb.
     * @returns Rocket
     */
    getLastRocketWithBomb() {
        return this.rockets.forEach((rocket) => {
            if(rocket.getHasBomb()) {
                return rocket;
            }
        });
    }

    /**
     * 
     * @returns 
     */
    resetRocketButtons() {
        const buttons = this.getRocketsButtons();

        for(let button of buttons) {
            button.classList.remove("rocket-terminated");
        }
           
        return;
    }

    /**
     * Get Random Number in Range. Helper function. 
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
        rand = Math.floor(rand * difference);

        // add with min value 
        rand = rand + min;

        return rand;
    }
}

