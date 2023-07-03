const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let timer = null;
let startTime = null;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // First card flip
    hasFlippedCard = true;
    firstCard = this;
    startTimer(); // Start the timer when the first card is flipped
    return;
  }

  // Second card flip
  secondCard = this;

  // Check for a match
  checkForMatch();

  // Increment moves
  incrementMoves();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();

  if (document.querySelectorAll('.flip').length === cards.length) {
    stopTimer();
    displayGameResult();
}
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

(function initializeGame() {
  shuffleCards();
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });
})();

function startTimer() {
  if (timer) return; // Don't start a new timer if one is already running

  startTime = Date.now();

  timer = setInterval(() => {
    let elapsedTime = Date.now() - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.querySelector('.timer').textContent = `Time: ${formattedTime}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null; // Reset the timer variable
}

function incrementMoves() {
  moves++;
  document.querySelector('.move-count').textContent = `Moves: ${moves}`;
}

function resetGame() {
  stopTimer();
  moves = 0;
  document.querySelector('.move-count').textContent = 'Moves: 0';
  document.querySelector('.timer').textContent = 'Time: 0:00';
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  resetBoard();
  shuffleCards();
}

function formatTime(time) {
  let minutes = Math.floor(time / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Event listeners

resetButton.addEventListener('click', resetGame);

// Get the modal element
const modal = document.getElementById('howToPlayModal');

// Get the button that opens the modal
const howToPlayButton = document.getElementById('howToPlayButton');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Event listeners for modal
howToPlayButton.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', function (event) {
  if (event.target == modal) {
    closeModal();
  }
});

function displayGameResult() {
  let elapsedTime = Date.now() - startTime;
  let formattedTime = formatTime(elapsedTime);

  let modal = document.getElementById('winModal');
  let movesText = document.getElementById('winMoves');
  let timeText = document.getElementById('winTime');

  movesText.textContent = `Moves: ${moves}`;
  timeText.textContent = `Time: ${formattedTime}`;

  modal.style.display = 'block';

  const closeBtn = modal.querySelector('.close');

  function closeModal() {
    modal.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModal();
    }
  });
}
