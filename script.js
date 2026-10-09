/* ================= MUSIC ================= */


/* ================= MUSIC ================= */

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");


function startMusic() {

    if (!bgMusic) return;

    bgMusic.volume = 0.15;

    bgMusic.play().then(function() {

        if (musicBtn) {
            musicBtn.textContent = "🎵";
        }

    }).catch(function() {
        console.log("Music could not start.");
    });

}


function toggleMusic() {

    if (!bgMusic) return;

    if (bgMusic.paused) {

        bgMusic.play().then(function() {

            if (musicBtn) {
                musicBtn.textContent = "🎵";
            }

        }).catch(function() {
            console.log("Music could not start.");
        });

    } else {

        bgMusic.pause();

        if (musicBtn) {
            musicBtn.textContent = "🔇";
        }

    }

}



/* ================= SCREEN ================= */

function showScreen(id) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen) {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(id);

    if (selectedScreen) {

        selectedScreen.classList.add("active");

    } else {

        console.error("Screen not found:", id);

    }

}



/* ================= QUIZ QUESTIONS ================= */

const questions = [

    {
        question: "Who is your favourite person? 👀",

        answers: [
            "GOLU",
            "GOLU",
            "GOLU",
            "GOLU"
        ],

        correct: [0, 1, 2, 3]
    },

    {
        question: "Who do we wanna stay with always? 🫶",

        answers: [
            "AVOCADO",
            "COWDUNG",
            "BIG DUSTBIN",
            "GOLU"
        ],

        correct: [3]
    },

    {
        question: "Who is clearly the cooler person? 😌",

        answers: [
            "The birthday person",
            "Their bestie",
            "Obviously both",
            "The website"
        ],

        correct: [2]
    },

    {
        question: "What does this birthday person deserve? 🎂",

        answers: [
            "Happiness",
            "Good memories",
            "Lots of cake",
            "ALL OF IT"
        ],

        correct: [3]
    }

];


let currentQuestion = 0;
let score = 0;



/* ================= START QUIZ ================= */

function startQuiz() {

    score = 0;
    currentQuestion = 0;

    startMusic();

    showScreen("quizScreen");

    loadQuestion();

}



/* ================= LOAD QUESTION ================= */

function loadQuestion() {

    const q = questions[currentQuestion];

    if (!q) return;

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    document.getElementById("question").textContent =
        q.question;

    document.getElementById("scoreText").textContent =
        score;

    document.getElementById("roundText").textContent =
        "ROUND " + (currentQuestion + 1);

    const progress =
        (currentQuestion / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";

    document.getElementById("feedback").textContent = "";

    document.getElementById("nextBtn").style.display = "none";

    q.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.onclick = function() {
            checkAnswer(index, button);
        };

        answersContainer.appendChild(button);

    });

}



/* ================= CHECK ANSWER ================= */

function checkAnswer(selected, button) {

    const q = questions[currentQuestion];

    const allButtons =
        document.querySelectorAll(".answer-btn");

    if (q.correct.includes(selected)) {

        button.classList.add("correct");

        score++;

        document.getElementById("feedback").textContent =
            "YAYYY! You got it right! 💗✨";

        document.getElementById("scoreText").textContent =
            score;

        allButtons.forEach(function(btn) {
            btn.disabled = true;
        });

        document.getElementById("nextBtn").style.display =
            "block";

    } else {

        button.classList.add("wrong");

        document.getElementById("feedback").textContent =
            "NOPE! 😭 Try again!";

        setTimeout(function() {
            button.classList.remove("wrong");
        }, 700);

    }

}



/* ================= NEXT QUESTION ================= */

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showScreen("videoScreen");

    }

}



/* ================= VIDEO ================= */

function setVideoVolume() {

    const video =
        document.getElementById("birthdayVideo");

    if (video) {
        video.volume = 1.0;
    }

}


// Make the video loud when it starts playing.

const birthdayVideo =
    document.getElementById("birthdayVideo");

if (birthdayVideo) {
    birthdayVideo.addEventListener("play", setVideoVolume);
}


function continueFromVideo() {

    const video =
        document.getElementById("birthdayVideo");

    if (video) {
        video.pause();
        video.currentTime = 0;
    }

    if (bgMusic) {
        bgMusic.volume = 0.15;
    }

    showScreen("gameIntro");

}



/* ================= NO BUTTON ================= */

const noBtn = document.getElementById("noBtn");


function moveNoButton() {

    if (!noBtn) return;

    const maxX = Math.max(0, window.innerWidth - 160);
    const maxY = Math.max(0, window.innerHeight - 100);

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";

}


if (noBtn) {

    noBtn.addEventListener("mouseover", moveNoButton);
    noBtn.addEventListener("click", moveNoButton);

}



/* ================= HEART GAME ================= */

let heartsCaught = 0;
let gameTimer = 15;
let timerInterval = null;



/* ================= START GAME ================= */

function startGame() {

    heartsCaught = 0;
    gameTimer = 15;

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    document.getElementById("heartScore").textContent = "0";
    document.getElementById("timer").textContent = "15";

    showScreen("gameScreen");

    spawnHeart();

    timerInterval = setInterval(function() {

        gameTimer--;

        document.getElementById("timer").textContent =
            gameTimer;

        if (gameTimer <= 0) {

            clearInterval(timerInterval);
            timerInterval = null;

            finishGame();

        }

    }, 1000);

}



/* ================= SPAWN HEART ================= */

function spawnHeart() {

    const gameArea = document.getElementById("gameArea");

    if (!gameArea) return;

    gameArea.innerHTML = "";

    const heart = document.createElement("div");

    heart.className = "game-heart";
    heart.textContent = "♥";

    const maxX = Math.max(0, gameArea.clientWidth - 50);
    const maxY = Math.max(0, gameArea.clientHeight - 50);

    heart.style.left = Math.random() * maxX + "px";
    heart.style.top = Math.random() * maxY + "px";

    heart.onclick = function() {

        heartsCaught++;

        document.getElementById("heartScore").textContent =
            heartsCaught;

        if (heartsCaught >= 10) {

            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
            }

            finishGame();

        } else {

            spawnHeart();

        }

    };

    gameArea.appendChild(heart);

}



/* ================= FINISH GAME ================= */

function finishGame() {

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    document.getElementById("finalScore").textContent = score;

    document.getElementById("finalHearts").textContent =
        heartsCaught;

    showScreen("finalScreen");

    createConfetti(100);

}



/* ================= BIRTHDAY LETTER ================= */

function showBirthdayMessage() {

    const message =
        document.getElementById("birthdayMessage");

    const certificate =
        document.getElementById("certificateSection");

    if (message) {
        message.style.display = "block";
    }

    if (certificate) {

        certificate.style.display = "block";

        setTimeout(function() {

            certificate.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 500);

    }

}



/* ================= FRIENDSHIP CERTIFICATE ================= */

function acceptCertificate() {

    const message =
        document.getElementById("birthdayMessage");

    const certificate =
        document.getElementById("certificateSection");

    const ending =
        document.getElementById("certificateEnding");

    // Hide the letter and certificate.

    if (message) {
        message.style.display = "none";
    }

    if (certificate) {
        certificate.style.display = "none";
    }

    // Show the final goodbye inside the final screen.

    if (ending) {

        ending.style.display = "flex";

        createConfetti(120);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        console.error(
            "Final goodbye not found. Check the certificateEnding ID."
        );

    }

}



/* ================= CONFETTI ================= */

function createConfetti(amount) {

    const container =
        document.getElementById("confetti-container");

    if (!container) return;

    container.innerHTML = "";

    for (let i = 0; i < amount; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.animationDuration =
            (2 + Math.random() * 3) + "s";

        confetti.style.animationDelay =
            Math.random() * 2 + "s";

        confetti.style.transform =
            "rotate(" + Math.random() * 360 + "deg)";

        container.appendChild(confetti);

    }

}