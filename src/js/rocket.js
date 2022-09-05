
/**
 * Rocket:
 * Die Rackete halt...
 */
class Rocket {
    id = -1;
    hasBomb = false;
    isTerminated = false;

    constructor() {
        //
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setHasBomb(hasBomb) {
        this.hasBomb = hasBomb;
    }

    getHasBomb() {
        return this.hasBomb;
    }

    setIsTerminated(isTerminated) {
        this.isTerminated = isTerminated;
    }

    getIsTerminated() {
        return this.isTerminated;
    }


    /**
     * Rackete zerstört sich selber, bzw. deaktiviert sich.
     */
    terminate(e) {
        console.log("Rocket: " + this.getId() + " was terminated....");
        
        this.setIsTerminated(true);

        //hier könnte man nun einen sound effekt abspielen etc...
        //oder Aussehen d. Rakete verändern. Dazu ist weiterer code nötig...
        
        let rocketBtn = e.target;
        rocketBtn.classList.add("rocket-terminated");
    }
}