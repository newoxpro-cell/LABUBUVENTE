// === CONFIGURATION ===
// Tu peux changer les chansons ici (met tes propres URLs)
const songs = [
    { name: "😘​", url: "SexyBack.mp3" },
];

// Tu peux changer le GIF ici
const celebrationGif = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2JrODFwZmdnb2xvZWJvbGptbDYxeG93eGdlY2RyNmFtb2JzcDMzbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SvJKSPxHuhDv0FVKXQ/giphy.gif";

// Messages quand on clique sur Non
const rejectMessages = [
    "APPUIE SUR OUI",
    "ta pas trop le choix..​😢",
    "j'ai pris tu tmps fait pas bleh stp..",
    "tjr pas le bon hyn.. 🙏",
    "ca devient long..😢",
    "appuie sinon lvrt tu vas casser le bouton..​😵‍💫",
    "bon bah je t'avais prevenu..​🤯​"
];

// === VARIABLES ===
let rejectCount = 0;
let yesScale = 1;
let noScale = 1;
let currentSong = 0;
let isPlaying = false;

// === ELEMENTS ===
const envelopeScreen = document.getElementById('envelopeScreen');
const questionScreen = document.getElementById('questionScreen');
const celebrationScreen = document.getElementById('celebrationScreen');
const envelope = document.getElementById('envelope');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const message = document.getElementById('message');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const songName = document.getElementById('songName');
const floatingHearts = document.getElementById('floatingHearts');
const fallingHearts = document.getElementById('fallingHearts');

// === INIT ===
createFloatingHearts();

// === FLOATING HEARTS ===
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '😇', '🌹', '😼​'];
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (20 + Math.random() * 30) + 'px';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.animationDuration = (5 + Math.random() * 5) + 's';
        floatingHearts.appendChild(heart);
    }
}

// === FALLING HEARTS ===
function createFallingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '❤️', '💝'];
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (15 + Math.random() * 25) + 'px';
        heart.style.animationDuration = (3 + Math.random() * 4) + 's';
        heart.style.animationDelay = Math.random() * 3 + 's';
        fallingHearts.appendChild(heart);
    }
}

// === ENVELOPE CLICK ===
envelope.addEventListener('click', () => {
    envelopeScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
});

// === YES BUTTON ===
btnYes.addEventListener('click', () => {
    questionScreen.classList.add('hidden');
    celebrationScreen.classList.remove('hidden');
    createFallingHearts();
    
    // Start music
    audio.src = songs[currentSong].url;
    songName.textContent = songs[currentSong].name;
    audio.volume = 0.3;
    audio.play().then(() => {
        isPlaying = true;
        playBtn.textContent = '⏸';
    }).catch(() => {});
});

// === NO BUTTON ===
btnNo.addEventListener('click', () => {
    if (btnNo.classList.contains('breaking')) return;
    
    rejectCount++;
    
    // Grow yes button
    yesScale = Math.min(yesScale + 0.2, 2.5);
    btnYes.style.transform = `scale(${yesScale})`;
    
    // Shrink no button
    noScale = Math.max(noScale - 0.1, 0.4);
    btnNo.style.transform = `scale(${noScale})`;
    
    // Show message
    if (rejectCount <= rejectMessages.length) {
        message.textContent = rejectMessages[rejectCount - 1];
    }
    
    // Break button after 7 clicks
    if (rejectCount >= 7) {
        btnNo.classList.add('breaking');
        setTimeout(() => {
            btnNo.style.display = 'none';
            message.textContent = "TA CASSÉ LE BOUTON 😵‍💫";
        }, 1500);
    }
});

// === MUSIC CONTROLS ===
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶';
    } else {
        audio.play();
        playBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    playSong();
});

function playSong() {
    audio.src = songs[currentSong].url;
    songName.textContent = songs[currentSong].name;
    audio.play();
    isPlaying = true;
    playBtn.textContent = '⏸';

}
