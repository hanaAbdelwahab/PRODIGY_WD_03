const cell = document.querySelectorAll('.cell');
const player1scorespan = document.querySelector('.player1score');
const player2scorespan = document.querySelector('.player2score');
const restartbtn = document.querySelector('.restart');
const playerIcon = document.getElementById('playerIcon');
const tooltip = document.getElementById('tooltip');
const winSound = document.getElementById('winsound');
const failsound = document.getElementById('failsound');

function toggleDarkMode() {
    const body = document.body;
    const icons = document.querySelector(".icons");
    const score = document.querySelector(".score"); 
    icons.classList.toggle("dark-mode-h");
    body.classList.toggle("dark-mode-b");
    score.classList.toggle("shine"); 
}

function toggleFullScreen() {
    const doc = document.documentElement;
    const requestFullScreen = doc.requestFullscreen || doc.webkitRequestFullScreen || doc.mozRequestFullScreen || doc.msRequestFullscreen;
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  
    if (!document.fullscreenElement) {
      requestFullScreen.call(document.documentElement);
    } else {
      exitFullscreen.call(document);
    }
  }
  
const wincombinations = [
    [0,1,2],
    [0,3,6],
    [6,7,8],
    [2,5,8],
    [1,4,7],
    [3,4,5],
    [0,4,8],
    [2,4,6],
];

let player1 = [];
let player2 = [];

let score = {
    player1: 0,
    player2: 0,
};
let flag = true;

updateTooltip(); 

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', () => {
        if (flag === true) {
            addcellsplayer1(i);
            if (!playerIcon.classList.contains('fa-user-group')) {
                computerMove(); 
            }
        } else if (playerIcon.classList.contains('fa-user-group')) {
            addcellsplayer2(i); 
            if (!playerIcon.classList.contains('fa-user-group')) {
                computerMove(); 
            }
        }
        checkwinner();
    });
}

function addcellsplayer1(i) {
    cell[i].innerHTML = "X";
    player1.push(i);
    flag = false;
}

function addcellsplayer2(i) {
    cell[i].innerHTML = "O";
    player2.push(i);
    flag = true;
}

function computerMove() {
    let emptyCells = [];
    for (let i = 0; i < cell.length; i++) {
        if (cell[i].innerHTML === "") {
            emptyCells.push(i);
        }
    }
    if (emptyCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let cellIndex = emptyCells[randomIndex];
        cell[cellIndex].innerHTML = "O";
        player2.push(cellIndex);
        flag = true;
    }
}

function checkwinner() {
    let draw = true;
    for (let i = 0; i < wincombinations.length; i++) {
        const [a, b, c] = wincombinations[i];
        if (player1.includes(a) && player1.includes(b) && player1.includes(c)) {
            showNotification("Player 1 won!");
            winSound.play();
            score.player1++;
            drawscore();
            clearfield();
            return;
        } else if (player2.includes(a) && player2.includes(b) && player2.includes(c)) {
            if (playerIcon.classList.contains('fa-user-group')) {
                showNotification("Player 2 won!"); 
                winSound.play();
            } else {
                showNotification("Computer won!"); 
                failsound.play();
            }
            score.player2++;
            drawscore();
            clearfield();
            return;
        }
        
    }

    // Check for draw
    if (player1.length + player2.length === 9) {
        showNotification("It's a draw!");
        clearfield();
        return;
    }
}

function drawscore() {
    if (playerIcon.classList.contains('fa-robot')) {
        player1scorespan.innerHTML = "Player 1: " + score.player1;
        player2scorespan.innerHTML = "Computer: " + score.player2;
    } else {
        player1scorespan.innerHTML = "Player 1: " + score.player1;
        player2scorespan.innerHTML = "Player 2: " + score.player2;
    }
}

function clearfield() {
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = "";
    }
    player1 = [];
    player2 = [];
    flag = true;
}

restartbtn.addEventListener('click', () => {
    clearfield();
    score.player1 = 0; 
    score.player2 = 0; 
    drawscore(); 
});
drawscore();
playerIcon.addEventListener('click', () => {
    playerIcon.classList.toggle('fa-robot');
    playerIcon.classList.toggle('fa-user-group');
    updateTooltip();
    // Reset scores
    score.player1 = 0;
    score.player2 = 0;
    drawscore();

    if (playerIcon.classList.contains('fa-robot')) {
        wincombinations = [
            [0,1,2],
            [0,3,6],
            [6,7,8],
            [2,5,8],
            [1,4,7],
            [3,4,5],
            [0,4,8],
            [2,4,6],
        ];
    } else {
        wincombinations = [
            [0,1,2],
            [0,3,6],
            [6,7,8],
            [2,5,8],
            [1,4,7],
            [3,4,5],
            [0,4,8],
            [2,4,6],
        ];
    }
    clearfield();
});

function updateTooltip() {
    if (playerIcon.classList.contains('fa-robot')) {
        playerIcon.title = 'With the computer';
    } else {
        playerIcon.title = 'Two players';
    }
}
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000); 
}