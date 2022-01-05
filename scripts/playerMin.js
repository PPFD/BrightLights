const playerMin = document.querySelector("#player"),
      audioMin = playerMin.querySelector("#audio"),
      playBtnMin = playerMin.querySelector("#playBtn"),
      playPauseMin = playerMin.querySelector("#playPause"),
      progressAreaMin = playerMin.querySelector("#progressArea"),
      progressBarMin = playerMin.querySelector("#progressBar"),
      currTimeMin = playerMin.querySelector("#currentTime"),
      songList = document.querySelector(".music__content__list"),
      durationMin = playerMin.querySelector("#duration");

let musicIndex = 0;
    audioMin.volume = 0.2;
    
 

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);  //calling load function when load document
    playingNow();
});



// load music function 
function loadMusic(indexNumb){
    audioMin.src = `media/audio/${allMusic[indexNumb].src}.mp3`;
};

// play music function
function playMusic(){
    playerMin.classList.add("playing");
    playPauseMin.src = "media/images/btn-stop.svg";
    audioMin.play();
};
// pause music function
function pauseMusic(){
    playerMin.classList.remove("playing");
    playPauseMin.src = "media/images/btn-play.svg";
    audioMin.pause();
};

// active music function
function active(){
    song[musicIndex].classList.add("music__content__list__element__container-active");
};

// passive music function
function passive(){
    if (musicIndex == 0){
        song[length - 1].classList.remove("music__content__list__element__container-active");
    }
    else{
        song[musicIndex - 1].classList.remove("music__content__list__element__container-active");
    }
};


playBtnMin.addEventListener("click", ()=>{
    pauseSong();
    const isMusicActive = song[musicIndex].classList.contains("playing");
    // if isMusicActive is true then call passive else call active
    isMusicActive ? passive() : active();
});

playBtnMin.addEventListener("click", ()=>{
    pauseSong();
    const isMusicPause =  playerMin.classList.contains("playing");
    // if isMusicPause is true then call pauseMusic else call playMusic
    isMusicPause ? pauseMusic() : playMusic();
});

// Progress bar

function UpdateProgressMin(e) {
    const duration = audioMin.duration
    const currentTime = audioMin.currentTime
    const progressPercent = (currentTime / duration) * 100;
    progressBarMin.style.width = `${progressPercent}%`;
}

audioMin.addEventListener('timeupdate', UpdateProgressMin);

// SET progress

function setProgressMin(e) {
    const width = this.clientWidth
    const duration = audioMin.duration
    const clickX = e.offsetX

    audioMin.currentTime = (clickX / width) * duration
}

progressAreaMin.addEventListener('click', setProgressMin);

// Next music function

function nextMusic(){
    musicIndex++;
    if(musicIndex == allMusic.length){
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}

// Time

audioMin.onloadedmetadata = function durationTimeMin() {
    
    const duration = audioMin.duration

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
    durationMin.innerText = durationTime;
}

function currentTimeMin(){
    const duration = audioMin.duration
    const currentTime = audioMin.currentTime
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

    currTimeMin.innerText = currentTimeVal;

    if (currentTime == duration)
    {
        nextMusic();
        active();
        passive();
    }
}

audioMin.addEventListener('timeupdate', currentTimeMin)


for(let i = 0; i < allMusic.length ; i++ )
    {
        let songElement = `<div index="${i}" id="songEl" class="music__content__list__element">
                                <span class="music__content__list__element__number">0${i+1}</span>
                                <div id="song" class="music__content__list__element__container">
                                    <p class="music__content__list__element__artist">${allMusic[i].artist}</p>
                                    <span class="space">-</span>
                                    <p class="music__content__list__element__name">${allMusic[i].name}</p>
                                </div>
                                <audio id="${allMusic[i].src}" src="media/audio/${allMusic[i].src}.mp3" class="audio" preload="metadata"></audio>
                            </div>`; 
        songList.insertAdjacentHTML("beforeend", songElement);

        let songAudioTag = songList.querySelector(`#${allMusic[i].src}`);
    };

const songElement = songList.querySelectorAll("#songEl"),
song = songList.querySelectorAll("#song");
let lengthEl = songElement.length,
    length = song.length;



function playingNow(){
    for(let j = 0; j < songElement.length ; j++ )
    {
        if(song[j].classList.contains("music__content__list__element__container-active"))
        {
            song[j].classList.remove("music__content__list__element__container-active");
        }
        if(songElement[j].getAttribute("index") == musicIndex){
            song[j].classList.add("music__content__list__element__container-active");
        }

        songElement[j].setAttribute("onclick", "clicked(this)");
    };
}

function clicked(element){
    let getIndex = element.getAttribute("index");
    musicIndex = getIndex;
    pauseSong();
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}