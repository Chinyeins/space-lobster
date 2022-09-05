/**
 * GAME FINISHED UI:
 */

class GameFinishedMenu {

    //reference to Game class
    game;

    //last rocket reference
    rocket;

    constructor(game, rocket) {
        this.game = game;
        this.rocket = rocket;

        //show menu when object is created
        this.showMenu();
    }


    showMenu() {
        console.log("Game Finished Menu opened");
        
        showUiBackground();
        this.mainMenu.classList.remove("ui-hide");
    }


    hideMenu() {
        console.log("Game Finished Menu closed");

        hideUiBackground();
        this.mainMenu.classList.add("ui-hide");
    }
}