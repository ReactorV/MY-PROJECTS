const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const lastScore = localStorage.getItem('lastScore');
const STORAGE_FIELD = 'hightScores';


//максимальное количество результатов в списке
/*const maxNumberHighScores = 5;*/

finalScore.innerText = lastScore;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});


saveScore = e => {
  e.preventDefault();

  //массив для хранения счета игроков
  const hightScores = JSON.parse(localStorage.getItem(STORAGE_FIELD)) || [];

  let currentScore = [...hightScores];

  const score = {
    score: lastScore,
    name: username.value
  };

  currentScore.push(score);

  //сортировка по увеличению количества баллов
  currentScore.sort( (a,b) => b.score - a.score);

  //вывод не более 5 лучших результатов
  currentScore.splice(5);

  //сохранение результата в localStorage
  localStorage.setItem(STORAGE_FIELD, JSON.stringify(currentScore));
  window.location.assign('/frontend/Index.html');
};

