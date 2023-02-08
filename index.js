const player = {
  name: "Player",
  chips: 0,
};

const cardType = ["Club", "Diamond", "Spade", "Heart"];
const faceCard = ["King", "Queen", "Jack"];
let playerCards = [];
let dealerCards = [];
let cards = [];
let sum;
let hasBlackJack = false;
let isAlive = false;
let isHold = false;
let message = "";
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const playerCardsDisplayEl = document.querySelector(".player-card-container");
const dealerDisplayEl = document.querySelector(".dealer-card-container");
const playerHold = document.getElementById("player-hold-btn");
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

playerHold.addEventListener("click", function(){
  isHold = true
  console.log({isHold})
  return isHold
//Allow player to hold if they do not want anymore cards
// and then pass the turn to the dealer
})


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

  let firstDealerCard = getRandomCard();

  dealerCards = [firstDealerCard];
  cards = [firstCard, secondCard];
  sum = firstCard[0] + secondCard[0];
  renderGame();
}



function displayCards(){
  playerCardsDisplayEl.innerHTML = ""; 
  for (let i = 0; i < cards.length; i++) {
    playerCardsDisplayEl.innerHTML +=
      "<img src='images/cards/" + cards[i][1] + ".png' class='card' id='card"+i+"'/>";
      rotateCards("card"+i);
  }
  dealerDisplayEl.innerHTML ="";
  for(let j = 0; j < dealerCards.length; j++){
     dealerDisplayEl.innerHTML +=
  "<img src='images/cards/" + dealerCards[j][1] + ".png' class='card' id='card"+j+"'/>";
  rotateCards("card"+j);
  }
}

function renderGame() {
  cardsEl.textContent = "Cards: ";
  displayCards();
  sumEl.textContent = "Points: " + sum;
    message = "Do you want to draw another card?";
  if (sum > 21) {
    message = "Busted!";
    isAlive = false;
  } else if (sum === 21) {
    message = "BlackJack!";
    player.chips += betMoney() * 2;
    playerEl.textContent = player.name + ": $" + player.chips;
    hasBlackJack = true;
  } 
  messageEl.textContent = message;
}
//Deal new card function that handles only dealing a card depending on if its
//the player or dealer

//Then render the game.

//Check if Dealer or player for the RenderGame function. 
//Maybe take in a parameter ?  renderGame(opponent)  opponent = player?  Dealer?  If player - do the player stuff.  if dealer
//then score for dealer and dealer messages. 

function newCard() {
  let newCard = getRandomCard();
  if (isAlive && !hasBlackJack && !isHold) {
    sum += newCard[0];
    cards.push(newCard);
    renderGame();
  }
  if (isAlive && isHold){
    dealerCards.push(newCard);
    renderGame();
  }
}

function randomNum(min, max){
return Math.random() * (max - min) + min;

}
function rotateCards(cardId){
  let deg = Math.floor(randomNum(-20, 20));
  const card = document.getElementById(cardId).style.transform = 'rotate(' + deg + 'deg)';
}
