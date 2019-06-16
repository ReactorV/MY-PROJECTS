const apiUrl = 'http://localhost:3000/api';
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;//блокировка ответа до загрузки вопроса
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch(apiUrl + '/questions')
  .then(res => {
    return res.json();
  })
  .then(setOfQuestions => {
    questions = setOfQuestions;
    startGame();
  })
  .catch( err => {
    console.log(err);
  })


//Добавляет бонусное число к счету(правильному ответу)
const bonus = 10;
//Cколько вопросов получит игрок 
const maxQuestions = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();

  //задержка и переключение loader
  setTimeout( () => {
    game.classList.remove('hidden');
    loader.classList.add('hidden');
  }, 1000);

};

//Вывод рандомных доступных вопросов

//Запись результата в localstorage
getNewQuestion = () => {
  if(availableQuestions == 0 || questionCounter >= maxQuestions) {
    localStorage.setItem('lastScore', score);
    //адресация на конечную страницу
    return window.location.assign('/frontend/pages/end.html');
  }
  questionCounter++;

  //Вывод счетчика вопросов
  progressText.innerHTML = `Вопрос ${questionCounter}/${maxQuestions}`;
  //Заполнение progress bar
  progressBarFull.style.width = `${(questionCounter/maxQuestions) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  //Вывод варианта ответа по data атрибуту
  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion[`choice${number}`];
  });

  //Удаляем уже показанный вопрос
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
}; 

//Получение выбранного игроком варианта(номера) ответа 
choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = true;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    //Сравнение выбранного ответа и верного варианта
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply == 'correct') {
      installScore(bonus);
    }

    selectedChoice.parentNode.classList.add(classToApply);
    
    //установка задержки перед удалением цвет. выделения и вызов следующего вопроса
    setTimeout( () => {
      selectedChoice.parentNode.classList.remove(classToApply);
      getNewQuestion();
    }, 500);      
  })
});

installScore = num => {
  score += num;
  scoreText.innerText = score;
}
