let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressBar');
let songContainer = document.querySelector('.songitemcontainer');

let songs = [
    { 
        songname: "Apne sfal par",
        cover: "covers/1.jpg",
        file: "songs/1.mp3",
        duration: "5:50"
    },
    {
        songname: "Let Me Love You",
        cover: "covers/2.jpg",
        file: "songs/2.mp3",
        duration: "5:50"
    }
];

// Render song list
let songListHTML = '';
songs.forEach((song, idx) => {
    songListHTML += `
        <div class="songItem" data-index="${idx}">
            <img src="${song.cover}" alt="">
            <span>${song.songname}</span>
            <span class="songlistplay">
                <span class="timespan">${song.duration} <i class="fa-solid fa-circle-play fa-lg playSongBtn" data-index="${idx}"></i></span>
            </span>
        </div>
    `;
});
if (songContainer) {
    songContainer.innerHTML = songListHTML;
}

// Play/Pause main button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.remove('fa-circle-play');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-circle-play');
    }
});

// Play song from list
function playSongAtIndex(idx) {
    songIndex = idx;
    audioElement.src = songs[songIndex].file;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-pause');
    masterPlay.classList.remove('fa-circle-play');
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('playSongBtn')) {
        let idx = parseInt(e.target.getAttribute('data-index'));
        playSongAtIndex(idx);
    }
});

// Update progress bar as song plays
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = percent;
    }
});

// Seek song when progress bar changes
myProgressBar.addEventListener('input', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    }
});