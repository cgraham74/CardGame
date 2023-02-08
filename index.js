const player = {
  name: "Player",
  chips: 100,
};

player.name = prompt('Enter name...','Player');
alert(`Welcome ${player.name}, you have been given $100 in credits`)

const cardType = ["Club", "Diamond", "Spade", "Heart"];
const faceCard = ["King", "Queen", "Jack"];

const startGameEl = document.getElementById("start-game-el");
const messageEl = document.getElementById("message-el");
const playerSumEl = document.getElementById("player-sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const playerCardsDisplayEl = document.querySelector(".player-card-container");
const dealerCardDisplayEl = document.querySelector(".dealer-card-container");
const playerHold = document.getElementById("player-hold-btn");
const newCardEl = document.getElementById("newcard-el");
const dealerSumEl = document.getElementById("dealer-sum-el");

let playerCards = [];
let dealerCards = [];
let cards = [];
let playerSum;
let dealerSum;
let hasBlackJack = false;
let isAlive = false;
let isHold = false;
let message = "";
let cardImage;

if (player.name === null){
  player.name = "Player";
}
playerEl.textContent = player.name + ": $" + player.chips;


/**
 * Begins game when Start Game button is clicked
 * Player's bet is deducted from sum
 * Player's name and new chip balance is displayed
 * Cards are generated and stored in player (2 cards) and dealer (1 card) arrays
 * Card sum is calculated for both player and dealer
 * Game is rendered
 */
startGameEl.addEventListener("click", function(){
  isAlive = true;
  hasBlackJack = false;
  isHold = false;
  player.chips -= betMoney();
  playerEl.textContent = player.name + ": $" + player.chips;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  playerSum = firstCard[0] + secondCard[0];

  let firstDealerCard = getRandomCard();
  dealerCards = [firstDealerCard];
  dealerSum = firstDealerCard[0];

  renderGame("Do you want to draw another card?");
})


function betMoney(){
  return 5;
}

/**
 * A button click event that will allow
 * a player to hold if they do not want another card
 */
playerHold.addEventListener("click", function(){
  isHold = true
  dealerTurn(); 
})

/**
 * Generates a random number between 1 and 13
 * Assigns card images to the value of the generated number
 * Aces are assigned value of 11 if the generated value is 1
 * Face cards are assigned the value of 10 for any generated number 11 - 13
 * @returns An Array containing the random number to use for score keeing 
 * and the assigned card image
 */
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

function displayCards(){
  playerCardsDisplayEl.innerHTML = ""; 
  for (let i = 0; i < cards.length; i++) {
    playerCardsDisplayEl.innerHTML +=
      "<img src='images/cards/" + cards[i][1] + ".png' class='card' id='card"+i+"'/>";
      rotateCards("card"+i);
  }
  dealerCardDisplayEl.innerHTML ="";
  for(let j = 0; j < dealerCards.length; j++){
    dealerCardDisplayEl.innerHTML +=
  "<img src='images/cards/" + dealerCards[j][1] + ".png' class='card' id='card"+j+"'/>";
  rotateCards("card"+j);
  }
}


/**
 * Renders the game
 */
function renderGame(message) {

  cardsEl.textContent = "Your cards: ";
  displayCards();
  dealerSumEl.textContent = "Dealers Points: " + dealerSum;
  playerSumEl.textContent = "Points: " + playerSum;
  messageEl.textContent = message;
}

newCardEl.addEventListener("click", function(){
   let newCard = getRandomCard();
   if (playerSum < 21){
    if (isAlive && !hasBlackJack && !isHold ) {
    playerSum += newCard[0];
    cards.push(newCard);
    renderGame();
    }
   }
   playersTurn();
});

function playersTurn(){
  message = "Do you want to draw another card?";
  if (playerSum > 21) {
    message = "Busted!";
    isAlive = false;
  } 
   if (playerSum === 21) {
    message = "BlackJack!";
    player.chips += betMoney() * 2;
    playerEl.textContent = player.name + ": $" + player.chips;
    hasBlackJack = true;
  } 
   renderGame(message);

}
/**
 * 
 */
function dealerTurn(){
  dealerSumEl.textContent = "Dealers Points: " + dealerSum;
  let newDealerCard;
  if (isHold){
  while (dealerSum < 21 ){
    newDealerCard = getRandomCard();
    dealerCards.push(newDealerCard);
    dealerSum += newDealerCard[0];
  if (dealerSum > playerSum && dealerSum <= 21){
    message = "Dealer Wins!"
    break;
  } else {
    player.chips += betMoney() * 2;
    message = player.name + " Wins!"
  }
  } 
    renderGame(message);
  }

}

function randomNum(min, max){
return Math.random() * (max - min) + min;

}
function rotateCards(cardId){
  let deg = Math.floor(randomNum(-20, 20));
  const card = document.getElementById(cardId).style.transform = 'rotate(' + deg + 'deg)';
}

