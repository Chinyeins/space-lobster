/**
 * GAME FINISHED UI:
 */

class GameFinishedMenu {

    //reference to Game class
    game;

    //last rocket reference
    rocket;

    //menu reference
    finishMenu;

    //play again btn ref
    playAgainBtn;


    constructor(game, rocket) {
        this.game = game;
        this.rocket = rocket;

        this.finishMenu = document.getElementById("finishMenu");
        this.playAgainBtn = document.getElementById("finishPlayAgainBtn").addEventListener('click', (e) => this.handlePlayAgainClickBtn(e));

        //show menu when object is created
        this.showMenu();
    }


    showMenu() {
        console.log("Game Finished Menu opened");

        showUiBackground();
        this.finishMenu.classList.remove("ui-hide");
    }


    hideMenu() {
        console.log("Game Finished Menu closed");

        hideUiBackground();
        this.finishMenu.classList.add("ui-hide");
    }

    handlePlayAgainClickBtn(e) {
        e.preventDefault();
        console.log("PLay Again Button pressed");
        
        this.game.resetGame();
    }
}