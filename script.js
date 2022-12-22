'use strict';

//Element selection
const player0El = document.getElementById('player--0');
const player1El = document.getElementById('player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current-score--0');
const currentScore1El = document.getElementById('current-score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.new');
const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let diceNumber;
let playing = true;

//Initial State
function initialState(){
    activePlayer = 0;
    score = [0, 0];
    currentScore = 0;
    playing = true;
    score0El.textContent = score[0];
    score1El.textContent = score[1];
    currentScore0El.textContent = currentScore;
    currentScore1El.textContent = currentScore;
    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('winner');
    player1El.classList.remove('winner'); 
}

initialState();

function changePlayer(){ 
    activePlayer = activePlayer === 1 ? 0: 1; 
    currentScore = 0;
    if(activePlayer === 0){
        player0El.classList.add('player--active');
        player1El.classList.remove('player--active');
    }else {
        player1El.classList.add('player--active');
        player0El.classList.remove('player--active');
    }
}

function showCurrentScore(activePlayer, score){
    document.getElementById(`current-score--${activePlayer}`).textContent = score;
}

btnRoll.addEventListener('click', function(){
    if (playing){
            //Generate Dice Number
        diceNumber = Math.trunc(Math.random()*6)+1;
        console.log(diceNumber);

        //Show the dice if hidden with the dice number
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${diceNumber}.png`;

        if(diceNumber === 1){
            currentScore = 0;
            showCurrentScore(activePlayer, currentScore);
            changePlayer();
        }else {
            currentScore += diceNumber;
            showCurrentScore(activePlayer, currentScore);
        }
    }   
});


btnHold.addEventListener('click', function(){
   if(playing){
        //Store the value in overall score and display it
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        currentScore = 0;
        showCurrentScore(activePlayer, currentScore);
        if(score[activePlayer] >= 100){
            playing = false;
            document.getElementById(`player--${activePlayer}`).classList.add('winner');
            document.getElementById(`player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        }else {
            //Change the player
            changePlayer();
            console.log('Player changed!');
        }
    }
});

btnNew.addEventListener('click', initialState);