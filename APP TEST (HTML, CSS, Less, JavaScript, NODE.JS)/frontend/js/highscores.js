const highScoreList = document.getElementById('highScoreList');
const STORAGE_FIELD = 'hightScores';

const highScores = JSON.parse(localStorage.getItem(STORAGE_FIELD)) || [];

highScoreList.innerHTML = highScores.map(score => {
  return `<li class="highScoreList"> ${score.name}: ${score.score}</li>`;
}).join('');