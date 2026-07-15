let questions = [];
let currentQuiz = [];
let currentIndex = 0;
let score = 0;

// Fetch questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => questions = data);

// DOM Elements
const setupScreen = document.getElementById('setup-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const optionsContainer = document.getElementById('options-container');

// Fisher-Yates Shuffle
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

startBtn.addEventListener('click', () => {
    const count = parseInt(document.getElementById('question-count').value);
    
    // Create a shuffled pool of questions based on user input
    let shuffledBank = shuffle([...questions]);
    currentQuiz = shuffledBank.slice(0, Math.min(count, questions.length));
    
    currentIndex = 0;
    score = 0;
    
    setupScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
});

function loadQuestion() {
    const q = currentQuiz[currentIndex];
    document.getElementById('progress').innerText = `Question ${currentIndex + 1} of ${currentQuiz.length}`;
    document.getElementById('question-text').innerText = q.question;
    
    optionsContainer.innerHTML = '';
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    // Shuffle options so the correct answer isn't always in the same spot
    const shuffledOptions = shuffle([...q.options]);

    shuffledOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(option, q.answer, q.explanation, btn);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selected, correct, explanation, selectedBtn) {
    // Disable all buttons
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hidden');

    if (selected === correct) {
        selectedBtn.classList.add('correct');
        score++;
        feedback.innerHTML = `<strong>Correct!</strong> ${explanation}`;
    } else {
        selectedBtn.classList.add('wrong');
        feedback.innerHTML = `<strong>Incorrect.</strong> The answer is ${correct}.<br>${explanation}`;
    }

    document.getElementById('next-btn').classList.remove('hidden');
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < currentQuiz.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    document.getElementById('score-display').innerText = `${score} / ${currentQuiz.length}`;
}

document.getElementById('restart-btn').addEventListener('click', () => {
    resultsScreen.classList.add('hidden');
    setupScreen.classList.remove('hidden');
});
