const player = {
  name: "Player",
  chips: 0,
};

player.name = prompt('What is your name?');

const cardType = ["Club", "Diamond", "Spade", "Heart"];
const faceCard = ["King", "Queen", "Jack"];

const startGameEl = document.getElementById("start-game-el");
const messageEl = document.getElementById("message-el");
const playerSumEl = document.getElementById("player-sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const playerCardsDisplayEl = document.querySelector(".player-card-container");
const dealerDisplayEl = document.querySelector(".dealer-card-container");
const playerHold = document.getElementById("player-hold-btn");
const newCardEl = document.getElementById("newcard-el");

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

playerEl.textContent = player.name + ": $" + player.chips;


startGameEl.addEventListener("click", function(){
 isAlive = true;
  player.chips -= betMoney();
  playerEl.textContent = player.name + ": $" + player.chips;
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  playerSum = firstCard[0] + secondCard[0];

  let firstDealerCard = getRandomCard();
  dealerCards = [firstDealerCard];
  dealerSum = dealerCards[0];
  renderGame();

})

function getPlayerName(){
// Create input box to get players Name
}

function betMoney(){
// Bets in increments of 5
// if user wins - increase player's chips by 5
// TODO allow user option to bet more
  return 5;
}

/**
 * A button click event that will allow
 * a player to hold if they do not want another card
 */
playerHold.addEventListener("click", function(){
  isHold = true
  console.log({isHold})
  return isHold
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
  dealerDisplayEl.innerHTML ="";
  for(let j = 0; j < dealerCards.length; j++){
     dealerDisplayEl.innerHTML +=
  "<img src='images/cards/" + dealerCards[j][1] + ".png' class='card' id='card"+j+"'/>";
  rotateCards("card"+j);
  }
}

function renderGame() {
  cardsEl.textContent = "Your cards: ";
  displayCards();
  playerSumEl.textContent = "Points: " + playerSum;
    message = "Do you want to draw another card?";
  if (playerSum > 21) {
    message = "Busted!";
    isAlive = false;
  } else if (playerSum === 21) {
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

newCardEl.addEventListener("click", function(){
   let newCard = getRandomCard();
  if (isAlive && !hasBlackJack && !isHold) {
    playerSum += newCard[0];
    cards.push(newCard);
    renderGame();
  }
  if (isAlive && isHold){
    //if is alive and ishold - dealers turn
    dealerCards.push(newCard);
    renderGame();
  }
});


function dealerTurn(){
//Deal cards to dealer until the dealers score is above player's score or at 21. 
//if dealers score above 21 - player wins.
//if dealers score is 21 - dealer wins.
//if dealers score is above players score and less than 21 - Dealer wins

//render game
}

function randomNum(min, max){
return Math.random() * (max - min) + min;

}
function rotateCards(cardId){
  let deg = Math.floor(randomNum(-20, 20));
  const card = document.getElementById(cardId).style.transform = 'rotate(' + deg + 'deg)';
}
