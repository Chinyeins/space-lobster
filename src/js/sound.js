/**
 * Sound Komponente:
 * Kann Sounds abspielen. Nutzt dafür standard Audio-API.
 * @see <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement">Audio API Javascript</a>
 */
class Sound {

    music = null;
    soundEffects = null;

    constructor() {
        this.music = new Audio('./../sound/8_bit_track.mp3');
        this.music.muted = "muted";
        this.music.autoplay = true;
        this.music.volume = 0.2;

        this.soundEffects = new Audio();
        this.soundEffects = 0.4;
    }

    playThemeSong() { 
        console.log("Playing Theme Song.");
        this.music.play();
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