const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
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

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// Get the modal element
const modal = document.getElementById('howToPlayModal');

// Get the button that opens the modal
const howToPlayButton = document.getElementById('howToPlayButton');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];

// Get the reset button
const resetButton = document.getElementById('resetButton');

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Function to reset the game
function resetGame() {
  // Reset any game-related logic or data here
  // For example, you can reset card positions, scores, timers, etc.
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  resetBoard();
  shuffleCards();
}

// Event listener for how to play button click
howToPlayButton.addEventListener('click', openModal);

// Event listener for close button click
closeBtn.addEventListener('click', closeModal);

// Event listener for reset button click
resetButton.addEventListener('click', resetGame);
