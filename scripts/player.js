const player = document.querySelector(".titlesAndPlayer__player"),
      audio = player.querySelector(".audio"),
      playBtn = player.querySelector(".titlesAndPlayer__player__play"),
      playPause = player.querySelector(".titlesAndPlayer__player__play__play-stop"),
      progressContainer = player.querySelector(".titlesAndPlayer__player__progress__container"),
      progress = player.querySelector(".titlesAndPlayer__player__progress__container__progress"),
      currTime = player.querySelector(".titlesAndPlayer__player__time__currTime"),
      durat = player.querySelector(".titlesAndPlayer__player__time__durat");

const songs = ['shit','dark','light','good','night','shelter'];

// default song
let songIndex = 1;
    audio.volume = 0.2;

// Init
function loadSong (song) {
    audio.src = `media/audio/${song}.mp3`
}

loadSong(songs[songIndex]);

//Play
function playSong() {
    player.classList.add("playing")
    playPause.src = "media/images/btn-stop.svg"
    audio.play();
    pauseMusic();
}

//Pause
function pauseSong() {
    player.classList.remove("playing")
    playPause.src = "media/images/btn-play.svg"
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains("playing")
    if (isPlaying){
        pauseSong();
    }
    else {
        playSong();
    }
})

// Progress bar

function Updateprogress(e) {
    const duration = audio.duration
    const currentTime = audio.currentTime
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

audio.addEventListener('timeupdate', Updateprogress)


// SET progress

function setProgress(e) {
    const width = this.clientWidth
    const duration = audio.duration
    const clickX = e.offsetX

    audio.currentTime = (clickX / width) * duration
}


progressContainer.addEventListener('click', setProgress)


// Time

audio.onloadedmetadata = function durationTime() {
    
    const duration = audio.duration

    const minutesD = Math.floor(duration / 60) 
    const secondsD = Math.floor(duration - minutesD * 60)
    
    let minutesValD = minutesD
    let secondsValD = secondsD
    
    
    if (minutesD < 10)
    {
        minutesValD = '0' + minutesD
    }

    if (secondsD < 10)
    {
        secondsValD = '0' + secondsD
    }

    

    let durationTime = minutesValD + ':' + secondsValD
    


 
        durat.innerText = durationTime;
}

function currentTime(){
    const currentTime = audio.currentTime
    const minutesC = Math.floor(currentTime / 60) 
    const secondsC = Math.floor(currentTime - minutesC * 60)
    let minutesValC = minutesC
    let secondsValC = secondsC
    if (minutesC < 10)
    {
        minutesValC = '0' + minutesC
    }

    if (secondsC < 10)
    {
        secondsValC = '0' + secondsC
    }
    let currentTimeVal = minutesValC + ':' + secondsValC

    currTime.innerText = currentTimeVal;
}

audio.addEventListener('timeupdate', currentTime)

