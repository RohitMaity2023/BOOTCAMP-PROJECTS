const questions = [
  {
    question: "Who sang the hit song 'Shape of You'?",
    options: ["Ed Sheeran", "Zayn Malik", "Shawn Mendes", "Justin Bieber"],
    answer: "Ed Sheeran"
  },
  {
    question: "Who is the singer of 'Tum Hi Ho'?",
    options: ["Arijit Singh", "Atif Aslam", "KK", "Armaan Malik"],
    answer: "Arijit Singh"
  },
  {
    question: "Which artist sang 'Blinding Lights'?",
    options: ["The Weeknd", "Drake", "Post Malone", "Khalid"],
    answer: "The Weeknd"
  },
  {
    question: "‘Tumi Jake Bhalobasho’ is sung by which artist?",
    options: ["Anupam Roy", "Arijit Singh", "Nachiketa", "Anjan Dutt"],
    answer: "Anupam Roy"
  },
  {
    question: "Which song includes the lyrics 'Let it go, let it go...’?",
    options: ["Frozen Heart", "Let It Go", "Into the Unknown", "Show Yourself"],
    answer: "Let It Go"
  },
  {
    question: "‘Kal Ho Naa Ho’ title song is sung by?",
    options: ["Sonu Nigam", "Udit Narayan", "Arijit Singh", "Abhijeet"],
    answer: "Sonu Nigam"
  },
  {
    question: "‘Paglu Dance’ is a song from which language film?",
    options: ["Bengali", "Hindi", "Tamil", "Telugu"],
    answer: "Bengali"
  },
  {
    question: "Who sang ‘Perfect’?",
    options: ["Ed Sheeran", "Charlie Puth", "Sam Smith", "Shawn Mendes"],
    answer: "Ed Sheeran"
  },
  {
    question: "‘Channa Mereya’ is a song from which movie?",
    options: ["Ae Dil Hai Mushkil", "Tamasha", "Yeh Jawaani Hai Deewani", "Kalank"],
    answer: "Ae Dil Hai Mushkil"
  },
  {
    question: "Which Bengali song became viral for its melody and lyrics in 2022?",
    options: ["Mon Majhi Re", "Tomake Chai", "Kacha Badam", "Tumi Robe Nirobe"],
    answer: "Kacha Badam"
  },
  {
    question: "‘Rolling in the Deep’ was sung by?",
    options: ["Adele", "Taylor Swift", "Lady Gaga", "Dua Lipa"],
    answer: "Adele"
  },
  {
    question: "Which artist sang 'Kesariya' from Brahmastra?",
    options: ["Arijit Singh", "KK", "Pritam", "Mohit Chauhan"],
    answer: "Arijit Singh"
  },
  {
    question: "Who is the singer of ‘Esho Maa Durga’?",
    options: ["Shreya Ghoshal", "Arijit Singh", "Rupankar Bagchi", "Lata Mangeshkar"],
    answer: "Rupankar Bagchi"
  },
  {
    question: "‘Senorita’ features which artist along with Shawn Mendes?",
    options: ["Camila Cabello", "Selena Gomez", "Billie Eilish", "Halsey"],
    answer: "Camila Cabello"
  },
  {
    question: "‘Zinda’ song is from which Bollywood movie?",
    options: ["Bhaag Milkha Bhaag", "Sultan", "Dangal", "Rock On!!"],
    answer: "Bhaag Milkha Bhaag"
  },
  {
    question: "Which Bengali song includes the lyric 'Amake Amar Moto Thakte Dao'?",
    options: ["Amake Amar Moto Thakte Dao", "Tumi Jake Bhalobasho", "Ekbar Bol", "Tomar Ghore Boshe Ami"],
    answer: "Amake Amar Moto Thakte Dao"
  },
  {
    question: "‘Levitating’ is a hit by which artist?",
    options: ["Dua Lipa", "Billie Eilish", "Doja Cat", "Rihanna"],
    answer: "Dua Lipa"
  },
  {
    question: "‘Gerua’ features which Bollywood couple?",
    options: ["Shah Rukh Khan & Kajol", "Ranbir & Deepika", "Salman & Katrina", "Varun & Alia"],
    answer: "Shah Rukh Khan & Kajol"
  },
  {
    question: "Who is the singer of ‘Tomar Ghore Boshe Ami’?",
    options: ["Rupankar Bagchi", "Lata Mangeshkar", "Anupam Roy", "Arijit Singh"],
    answer: "Rupankar Bagchi"
  },
  {
    question: "‘Peaches’ was sung by which international artist?",
    options: ["Justin Bieber", "The Weeknd", "Harry Styles", "Zayn Malik"],
    answer: "Justin Bieber"
  }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const questionBox = document.getElementById("question-box");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");

function loadQuestion() {
  const currentQuestion = questions[currentIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";
  nextBtn.disabled = true;
  progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

  currentQuestion.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectOption(btn, currentQuestion.answer);
    optionsEl.appendChild(btn);
  });
}

function selectOption(btn, correctAnswer) {
  const allBtns = document.querySelectorAll("#options button");
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.textContent === correctAnswer) {
      b.style.backgroundColor = "#74ebd5";
    } else if (b === btn) {
      b.style.backgroundColor = "#f28b82"; // wrong
    }
  });

  if (btn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
  confetti({
    particleCount: 100,
    angle: 60,
    spread: 100,
    origin: { x: 0, y: 0.6 }
  });

  confetti({
    particleCount: 100,
    angle: 120,
    spread: 100,
    origin: { x: 1, y: 0.6 }
  });
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  questionBox.classList.remove("hidden");
  resultBox.classList.add("hidden");
  loadQuestion();
}

loadQuestion();
