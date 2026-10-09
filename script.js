const music = document.getElementById("backgroundMusic");
const video = document.getElementById("birthdayVideo");

const questions = [
  {
    question: "Who is your favourite person?",
    options: ["Golu", "Golu", "Golu", "Golu"],
    answer: "Golu"
  },
  {
    question: "Who do we wanna stay with always?",
    options: ["Golu", "dustbin", "big dustbin", "lone pair"],
    answer: "Golu"
  },
 
  {
    question: "What's the best plan for today?",
    options: [
      "Celebrate together",
      "Do homework forever",
      "Ignore the cake",
      "Sleep through everything"
    ],
    answer: "Celebrate together"
  }
];

let questionIndex = 0;
let heartsCaught = 0;
let timeLeft = 15;
let gameTimer = null;
let heartSpawner = null;
let gameFinished = false;
let gameTransition = null;

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startMusic() {
  music.volume = 0.15;

  music.play().catch(() => {
    // Music may need a user interaction before playing.
  });
}

function startQuiz() {
  startMusic();
  questionIndex = 0;
  showScreen("quizScreen");
  showQuestion();
}

function showQuestion() {
  const q = questions[questionIndex];

  document.getElementById("questionCount").textContent =
    `QUESTION ${questionIndex + 1} OF ${questions.length}`;

  document.getElementById("questionText").textContent = q.question;
  document.getElementById("quizFeedback").textContent = "";

  const optionsBox = document.getElementById("answerOptions");
  optionsBox.innerHTML = "";

  q.options.forEach(optionText => {
    const button = document.createElement("button");

    button.className = "option";
    button.textContent = optionText;

    button.addEventListener("click", () => {
      checkAnswer(optionText);
    });

    optionsBox.appendChild(button);
  });
}

function checkAnswer(selected) {
  const feedback = document.getElementById("quizFeedback");

  if (selected !== questions[questionIndex].answer) {
    feedback.textContent = "Not quite! Try again 💗";
    return;
  }

  questionIndex++;

  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    music.pause();
    showScreen("videoScreen");
    video.currentTime = 0;
    video.volume = 1;
  }
}

video.addEventListener("play", () => {
  video.volume = 1;
});

video.addEventListener("ended", () => {
  music.play().catch(() => {});
});

function goToGameIntro() {
  video.pause();
  music.play().catch(() => {});
  showScreen("gameIntroScreen");
}

function startGame() {
  clearInterval(gameTimer);
  clearInterval(heartSpawner);
  clearTimeout(gameTransition);

  heartsCaught = 0;
  timeLeft = 15;
  gameFinished = false;

  document.getElementById("heartCount").textContent = heartsCaught;
  document.getElementById("timeLeft").textContent = timeLeft;
  document.getElementById("gameMessage").textContent = "";
  document.getElementById("heartField").innerHTML = "";

  showScreen("gameScreen");

  spawnHeart();

  heartSpawner = setInterval(spawnHeart, 650);

  gameTimer = setInterval(() => {
    timeLeft--;

    document.getElementById("timeLeft").textContent = timeLeft;

    if (timeLeft <= 0) {
      finishGame();
    }
  }, 1000);
}

function spawnHeart() {
  if (gameFinished) return;

  const field = document.getElementById("heartField");
  const heart = document.createElement("button");

  heart.className = "heart";
  heart.type = "button";

  heart.textContent = ["💗", "💖", "💕", "💘"][
    Math.floor(Math.random() * 4)
  ];

  heart.setAttribute("aria-label", "Catch heart");

  const maxX = Math.max(0, field.clientWidth - 45);
  const maxY = Math.max(0, field.clientHeight - 45);

  heart.style.left = Math.floor(Math.random() * maxX) + "px";
  heart.style.top = Math.floor(Math.random() * maxY) + "px";

  heart.addEventListener("click", () => {
    if (gameFinished) return;

    heartsCaught++;

    document.getElementById("heartCount").textContent = heartsCaught;

    heart.remove();

    if (heartsCaught >= 10) {
      finishGame();
    }
  });

  field.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1400);
}

function finishGame() {
  if (gameFinished) return;

  gameFinished = true;

  clearInterval(gameTimer);
  clearInterval(heartSpawner);

  document.getElementById("heartField").innerHTML = "";

  const message = document.getElementById("gameMessage");

  if (heartsCaught >= 10) {
    message.textContent =
      "You caught them all! You're a heart-catching champion! 💗";
  } else {
    message.textContent =
      `Time's up! You caught ${heartsCaught} hearts. That's still a win from me 💗`;
  }

  gameTransition = setTimeout(() => {
    showScreen("finalScreen");
  }, 1800);
}

function showBirthdayMessage() {
  document.getElementById("finalMain").classList.add("hidden");
  document.getElementById("birthdayMessage").classList.remove("hidden");
  document.getElementById("certificateSection").classList.add("hidden");
  document.getElementById("certificateEnding").classList.add("hidden");
}

function showCertificate() {
  document.getElementById("birthdayMessage").classList.add("hidden");
  document.getElementById("certificateSection").classList.remove("hidden");
}

function acceptCertificate() {
  document.getElementById("certificateSection").classList.add("hidden");
  document.getElementById("certificateEnding").classList.remove("hidden");
}
