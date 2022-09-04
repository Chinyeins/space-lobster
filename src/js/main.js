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

    const controllsMenu = new ControllsMenu(audio);
    const mainMenu = new MainMenu()

    //Erstelle neues Spiel Objekt mit allen benötigten Komponenten..
    const game = new Game(audio, mainMenu);
    
    //führe StartGame Funktion auf Objekt aus.
    //startet das Spiel....
    game.initGame();
}