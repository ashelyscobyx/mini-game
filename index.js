var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $gameTime = document.querySelector('#game-time');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');

var score = 0;
var isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}

function startGame() {
  score = 0;
  $gameTime.setAttribute('disabled', 'true');
  
  setGameTime();

  isGameStarted = true;

  $game.style.backgroundColor = '#ffffff';
  $start.classList.add('hide');

  var interval = setInterval(function () {
    var time = parseFloat($time.textContent);

    if (time <= 0) {
      // end game
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  var time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  show($start);
  hide($timeHeader);
  show($resultHeader);

  $game.innerHTML = '';
  $game.style.backgroundColor = "#ccc";

  $gameTime.removeAttribute('disabled');
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = '';

  var box = document.createElement('div');
  var boxSize = getRandom(30, 100);
  var gameSize = $game.getBoundingClientRect();
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;

  var red = getRandom(0, 255);
  var green = getRandom(0, 255);
  var blue = getRandom(0, 255);

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', true);

  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}