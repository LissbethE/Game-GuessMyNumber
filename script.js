'use strict';

const containerSuelo = document.querySelector('.container-suelo');
const hielo = Array.from(document.querySelectorAll('.hielo'));
const btnCheck = document.querySelector('.btn-check');
const btnAgain = document.querySelector('.btn-again');
const numero = document.querySelector('.number');
const oso = document.querySelector('.oso');
const b1 = document.querySelector(`.hielo-1`);
const b2 = document.querySelector(`.hielo-2`);
const game = document.querySelector('.game');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let scoreHighscore = 0;

// prettier-ignore
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  ranNums = [],
  i = nums.length,
  j = 0;

while (i--) {
  j = Math.trunc(Math.random() * (i + 1));
  ranNums.push(nums[j]);
  nums.splice(j, 1);
}

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

// B T N -- C H E C K

btnCheck.addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('No Number!');
  }
  // when player wins
  else if (guess === secretNumber) {
    displayMessage('Correct Number!');
    numero.textContent = secretNumber;
    numero.style.width = '30rem';
    game.classList.replace('styleGame-1', 'styleGame-2');

    if (score > scoreHighscore) {
      scoreHighscore = score;
      document.querySelector('.highscore').textContent = scoreHighscore;
    }
  }
  // When guss is  wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too  high!' : '📉 Too  low!');
      score = score - 1;
      document.querySelector('.score').textContent = score;

      // bloque de hielo
      document
        .querySelector(`.hielo-${ranNums[score]}`)
        .classList.add('active');

      if (b1.classList.contains('active') || b2.classList.contains('active')) {
        displayMessage('You lost the game!!');
        document.querySelector('.score').textContent = 0;
        document.querySelector('.highscore').textContent = 0;
        numero.textContent = secretNumber;

        oso.classList.add('active');
      }
    }
  }
});

// B T N -- A G A I N

btnAgain.addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  displayMessage('Start guessing...');
  game.classList.replace('styleGame-2', 'styleGame-1');
  numero.style.width = '15rem';

  // bloque de hielo
  hielo.forEach(r => r.classList.remove('active'));
  oso.classList.remove('active');
});
