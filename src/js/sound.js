/**
 * Sound Komponente:
 * Kann Sounds abspielen. Nutzt dafür standard Audio-API.
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement">Audio API Javascript</a>
 */
class Sound {

    //music Object
    music = null;

    //soundEffect Object
    soundEffects = null;

    //musicMute Button - html
    musicMuteBtn;
    musicUnMuteBtn

    constructor() {
        this.music = new Audio('./../sound/8_bit_track.mp3');
        //this.music.muted = "muted";
        this.music.autoplay = false;
        this.music.volume = 0.0;
        this.music.loop = true;

        this.soundEffects = new Audio();
        this.soundEffects = 0.4;
        //default mute music
        this.muteMusic();
    }

    muteMusic() {
        this.music.volume = 0.0;
    }

    unMuteMusic() {
        this.music.volume = 0.25;
        this.music.play()
    }
}





/* <audio autoplay id="music" loop>
    <source src="8_bit_track.mp3">
  </audio>
  <script>
    var audio = document.getElementById("music");
    audio.volume = 0.2;
  </script>
 */