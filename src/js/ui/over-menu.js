
/**
 * GAME OVER MENU:
 */

class GameOverMenu {

    //html element reference
    gameOverMenu;

    //game object reference - brauchen wir, weil wir vom menu aus
    //den Spiel Fluss steuern wollen.
    game;

    constructor(game) {
        this.game = game;

        //suche nach html tag mit Id "overMenu" in index.html.
        this.gameOverMenu = document.getElementById("overMenu");

        //show game over menu, when this class is created...
        this.showGameOverMenu();

        //event handling... binde button click von restart button auf funktion handleRestartBtnClick...
        document.getElementById("overMenuRestartBtn").addEventListener("click", (e) => this.handleRestartBtnClick(e));
    }

    /**
    * GAME OVER MENU HELPER FUNCTIONS
    */

    showGameOverMenu() {
        showUiBackground();

        //zeige Game Over Menü an, indem wir die ui-hide klasse entfernen.
        //diese css Klasse sorgt dafür, dass das element in den Hintergrund gestellt wird...
        this.gameOverMenu.classList.remove("ui-hide");
    }

    hideGameOverMenu() {
        hideUiBackground();
        this.gameOverMenu.classList.add("ui-hide");
    }


    /**
     * Behandle Restart Button Klick...
     * @param {*} e Event was wir bei Button Klick übergeben...
     */
    handleRestartBtnClick(e) {
        e.preventDefault();
        
        //starte spiel neu...
        this.game.resetGame();
    }
 }