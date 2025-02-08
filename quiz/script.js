const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;
let userAnswers = [];  // Store user responses

const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    userAnswers = [];

    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    resultBox.classList.remove('active');
    nextBtn.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    userAnswers = [];
};

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active');
    } else {
        sendAnswersToBackend();  // Send data to Flask API
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = '';
    questions[index].options.forEach(option => {
        optionTag += `<div class="option"><span>${option}</span></div>`;
    });

    optionList.innerHTML = optionTag;
    const optionElements = document.querySelectorAll('.option');
    optionElements.forEach(option => {
        option.onclick = () => optionSelected(option);
    });
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    userAnswers[questionCount] = userAnswer;  // Store answer
    answer.classList.add('selected');
    
    nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// function headerScore() {
//     const headerScoreText = document.querySelector('.header-score');
//     headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
// }

function sendAnswersToBackend() {
    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: userAnswers })
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function displayResults(data) {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.innerHTML = `
        <p><strong>Overall Score:</strong> ${data.overall_score}</p>
        <p><strong>Most Affected Area:</strong> ${data.most_affected}</p>
        <p><strong>Detailed Scores:</strong> Stress: ${data.detailed_scores.stress}, Anxiety: ${data.detailed_scores.anxiety}, Depression: ${data.detailed_scores.depression}</p>
    `;
}

function showResultBox() {
    quizBox.classList.remove("active");
    resultBox.classList.add("active");

    const scoreText = document.querySelector(".score-text");
    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");

    // Send answers to Flask backend for analysis
    fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: userAnswers }), // Send collected user answers
    })
    .then(response => response.json())
    .then(data => {
        let scorePercentage = (data.overall_score / (questions.length * 2)) * 100; // Normalize score

        // Update text
        scoreText.textContent = `Your Score: ${scorePercentage.toFixed(1)}%`;

        // Animate circular progress
        let progressStartValue = 0;
        let speed = 20; 

        let progress = setInterval(() => {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#AA2C86 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

            if (progressStartValue >= scorePercentage) {
                clearInterval(progress);
            }
        }, speed);
    })
    .catch(error => console.error("Error fetching score:", error));
}

