const player = {
  name: "Player 1",
  chips: 145,
};
let cards = [];
let sum;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let cardsEL = document.getElementById("cards-el");
let messageEL = document.getElementById("message-el");
let sumEL = document.querySelector("#sum-el");

let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let tempCard = Math.floor(Math.random() * 13) + 1;
  if (tempCard === 1) {
    return 11;
  } else if (tempCard > 10) {
    return 10;
  } else {
    return tempCard;
  }
}

function startGame() {
  isAlive = true;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  sum = firstCard + secondCard;
  cards = [firstCard, secondCard];
  console.log(firstCard + " yay " + secondCard);
  cardsEL.textContent = "Cards: " + cards[0] + " " + cards[1] + " ";
  renderGame();
}

function renderGame() {
  cardsEL.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEL.textContent += cards[i] + " ";
  }

  sumEL.textContent = "Sum: " + sum;

  if (sum < 21) {
    message = "Do you want to draw another card?";
  } else if (sum === 21) {
    message = "BlackJack!";
    hasBlackJack = true;
  } else {
    message = "Busted!";
    isAlive = false;
  }
  messageEL.textContent = message;
}
function newCard() {
  let newCard = getRandomCard();
  if (isAlive && !hasBlackJack) {
    sum += newCard;
    cards.push(newCard);
    renderGame();
    console.log(cards);
  }
}
