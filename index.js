const player = {
  name: "Player",
  chips: 0,
};

const cardType = ["Club", "Diamond", "Spade", "Heart"];
const faceCard = ["King", "Queen", "Jack"];
let cards = [];
let sum;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let cardDisplayEl = document.querySelector(".cardDisplay");
let cardImage;


playerEl.textContent = player.name + ": $" + player.chips;

function getPlayerName(){
// Create input box to get players Name
}

function betMoney(){
// Bets in increments of 5
// if user wins - increase player's chips by 5
// TODO allow user option to bet more
  return 5;
}


function playerHold(){
//Allow player to hold if they do not want anymore cards
// and then pass the turn to the dealer
}

function dealerPlay(){
// Dealer deals 2 cards.
}


function getRandomCard() {
  let randomNum = Math.floor(Math.random() * 13) + 1;
  if (randomNum === 1) {
    cardImage = "Ace " + cardType[Math.floor(Math.random() * 4)];

    return [11, cardImage];
  } else if (randomNum > 10) {
    cardImage =
      faceCard[Math.floor(Math.random() * 3)] +
      " " +
      cardType[Math.floor(Math.random() * 4)];
    return [10, cardImage];
  } else {
    cardImage = randomNum + " " + cardType[Math.floor(Math.random() * 4)];

    return [randomNum, cardImage];
  }
}

function startGame() {
  isAlive = true;
  player.chips -= betMoney();
  playerEl.textContent = player.name + ": $" + player.chips;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard[0] + secondCard[0];
  renderGame();
}

function displayCards(){
  cardDisplayEl.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    cardDisplayEl.innerHTML +=
      "<img src='images/cards/" + cards[i][1] + ".png' class='card' />";
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  displayCards()
  sumEl.textContent = "Points: " + sum;
  if (sum <= 20) {
    message = "Do you want to draw another card?";
  } else if (sum === 21) {
    message = "BlackJack!";

    player.chips += betMoney() * 2;
    playerEl.textContent = player.name + ": $" + player.chips;
    hasBlackJack = true;
  } else {
    message = "Busted!";
    isAlive = false;
  }
  messageEl.textContent = message;
}

function newCard() {
  let newCard = getRandomCard();
  if (isAlive && !hasBlackJack) {
    sum += newCard[0];
    cards.push(newCard);
    renderGame();
  }
}
