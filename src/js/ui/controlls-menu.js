

/**
 * ControllsMenu:
 * 
 * Handles Basic Controlls like Sound On/Off
 */
class ControllsMenu {

    audio;

    muteSound;

    toggleMuteMusicBtn;

    isMute = true;
    
    constructor(audio) {
        this.audio = audio;

        //setup mute/unmute controll button
        this.toggleMuteMusicBtn = document.getElementById("muteMusicBtn");
        this.toggleMuteMusicBtn.addEventListener("click", (e) => this.toggleMuteMusic(e));

        console.log("controlls initialized");
    }

    toggleMuteMusic(e) {
        e.preventDefault();

        let button = e.currentTarget;
        console.log(button);

        if(this.isMute) {
            console.log("Music Unmute");

            this.isMute = false;

            this.audio.unMuteMusic();
            
            button.firstElementChild.classList.add("ui-hide");
            button.lastElementChild.classList.remove("ui-hide");
        } else {
            console.log("Music Mute");

            this.isMute = true;

            this.audio.muteMusic();

            button.firstElementChild.classList.remove("ui-hide");
            button.lastElementChild.classList.add("ui-hide");
        }
    }

}