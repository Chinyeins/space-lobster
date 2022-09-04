/**
 * Main: Baut Spiel zusammen und startet es.
 */


/**
 * Einstiegspunkt vom Spiel. Sobald Fenster geladen ist,
 * starte Spiel.
*/
window.onload = function (event) {
    console.log("Fenster geladen...");
    
    //Erstelle Audio Objekt
    const audio = new Sound();
    //Erstelle Controlls Menu
    const controllsMenu = new ControllsMenu(audio);
    //Erstelle HauptMenü
    const mainMenu = new MainMenu()
    //Erstelle neues Spiel Objekt mit allen benötigten Komponenten..
    const game = new Game(audio, mainMenu);

    //pass game class reference to main menu, so it can handle: start game, when button is pressed...
    mainMenu.setGameRef(game);
    
    //führe StartGame Funktion auf Objekt aus.
    //startet das Spiel....
    game.initGame();
}