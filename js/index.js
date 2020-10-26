const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const cards = [];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper'); /* eslint-disable-line */
const selectedCardsWrapper = document.querySelector('.selected-cards'); /* eslint-disable-line */
const startBtnEl = document.getElementById('start-game');
const magicBtn = document.createElement('button');

function selectedCard(event) {
  // only allow user to select a card if none has already been selected
  if ([...cardsWrapper.children].length === 52) {
    event.target.style.left = '0px';
    selectedCardsWrapper.append(event.target);
    // remove the selected card from the cardsWrapper
    [...cardsWrapper.children].map((e) => {
      if (e.classList.value === event.target.classList.value) {
        e.remove();
      }
      btnWrapper.appendChild(magicBtn);
      return e;
    });
  }
}

// test
selectedCard('event');

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  if (cards.length !== 52) {
    for (let j = 0; j < suits.length; j += 1) {
      for (let i = 1; i <= 13; i += 1) {
        const cardObject = {
          value: i,
          suit: suits[j],
        };
        cards.push(cardObject);
      }
    }
  }
  // For each dataObject, create a new card and append it to the DOM
  cards.forEach((card, i) => {
    const positionFromLeft = i * 22;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.setAttribute('onclick', 'selectedCard(event)');
    cardElement.classList.add('card', `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
}

function hideCards() {
  cardsWrapper.classList.toggle('hidden');
}

function shuffleCards() {
  // only shuffle if a card has not yet been selected
  if (selectedCardsWrapper.children.length === 0) {
    cardsWrapper.innerHTML = '';
    let currentIndex = cards.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    createCards();
  }
}

function doMagic() {
  // find the data-value of the selected card
  const selectedDataValue = selectedCardsWrapper.children[0].getAttribute('data-value');
  let position = 0;
  // remove all cards in the cardsWrapper with the same data-value as the selected card
  [...cardsWrapper.children].map((e) => {
    if (e.getAttribute('data-value') === selectedDataValue) {
      position += 30;
      e.remove();
      e.style.left = `${position}px`;
      selectedCardsWrapper.append(e);
    }
    return e;
  });
}
// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  startBtnEl.remove();

  const shuffleBtn = document.createElement('button');
  shuffleBtn.innerHTML = 'Shuffle';
  shuffleBtn.id = 'shuffle';

  const showHideBtn = document.createElement('button');
  showHideBtn.innerHTML = 'Flip cards';
  showHideBtn.id = 'flip';

  magicBtn.innerHTML = 'Magic';
  magicBtn.id = 'magic';

  const buttons = [shuffleBtn, showHideBtn, magicBtn];
  buttons.forEach((button) => {
    button.classList.add('btn', 'btn-lg', 'btn-secondary', 'mx-1');
    button.type = 'button';
  });

  btnWrapper.appendChild(shuffleBtn);
  btnWrapper.appendChild(showHideBtn);

  shuffleBtn.addEventListener('click', shuffleCards);
  showHideBtn.addEventListener('click', hideCards);
  magicBtn.addEventListener('click', doMagic);
}
// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
