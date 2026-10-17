// QuizVerse - JavaScript

// Quiz Questions
const questions = [
    {
        question: "1. Which language is used to create the structure of a website?",
        options: ["Python", "HTML", "C++", "Java"],
        answer: "HTML"
    },
    {
        question: "2. Which language is used to style a website?",
        options: ["CSS", "C", "Python", "SQL"],
        answer: "CSS"
    },
    {
        question: "3. What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: "Central Processing Unit"
    },
    {
        question: "4. Which company developed Java?",
        options: ["Microsoft", "Google", "Sun Microsystems", "Apple"],
        answer: "Sun Microsystems"
    },
    {
        question: "5. Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "##", "**"],
        answer: "//"
    },
    {
        question: "6. Which one is a programming language?",
        options: ["HTML", "CSS", "Java", "HTTP"],
        answer: "Java"
    },
    {
        question: "7. What does RAM stand for?",
        options: [
            "Read Access Memory",
            "Random Access Memory",
            "Run Access Module",
            "Rapid Action Machine"
        ],
        answer: "Random Access Memory"
    },
    {
        question: "8. Which data type stores true or false?",
        options: ["String", "Integer", "Boolean", "Float"],
        answer: "Boolean"
    },
    {
        question: "9. Which HTML tag creates a paragraph?",
        options: ["<h1>", "<p>", "<div>", "<img>"],
        answer: "<p>"
    },
    {
        question: "10. Which operator checks strict equality in JavaScript?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    }
];

// Get HTML Elements
const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const resultText = document.getElementById("resultText");

// Quiz Variables
let currentQuestion = 0;
let score = 0;
let answered = false;

// Start Quiz
startBtn.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;

    quizBox.hidden = false;
    startBtn.hidden = true;
    resultText.textContent = "";

    showQuestion();
});

// Display Question
function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    questionText.textContent = current.question;

    optionsContainer.innerHTML = "";
    resultText.textContent = "";
    nextBtn.hidden = true;

    current.options.forEach(function (option) {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-button");

        button.addEventListener("click", function () {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });
}

// Check Answer
function checkAnswer(selectedButton, selectedOption) {
    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;
    const allOptions = optionsContainer.querySelectorAll("button");

    allOptions.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        resultText.textContent = "🎉 Correct Answer!";
    } else {
        selectedButton.classList.add("incorrect");
        resultText.textContent =
            "❌ Incorrect! Correct answer: " + correctAnswer;
    }

    nextBtn.hidden = false;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "See Final Score 🏆";
    } else {
        nextBtn.textContent = "Next Question →";
    }
}

// Next Question
nextBtn.addEventListener("click", function () {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Final Result
function showResult() {
    questionNumber.textContent = "Quiz Completed! 🎉";

    questionText.textContent =
        "You scored " + score + " out of " + questions.length + "!";

    optionsContainer.innerHTML = "";

    const percentage = (score / questions.length) * 100;

    if (percentage >= 80) {
        resultText.textContent = "🌟 Excellent! You're a Quiz Champion!";
    } else if (percentage >= 50) {
        resultText.textContent = "👏 Good job! Keep learning!";
    } else {
        resultText.textContent = "💪 Keep practising! You can do it!";
    }

    nextBtn.hidden = true;

    startBtn.textContent = "Play Again 🔄";
    startBtn.hidden = false;
}