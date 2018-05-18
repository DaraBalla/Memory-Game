// Create a list that holds all cards

var cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 
'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 
'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
 

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method above
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/


function newCards () {
    shuffle(cards); // Make cards array shuffled
    const docFragment = document.createDocumentFragment();
    for (let card of cards) {    // Loop through each card and create its HTML and add each card's HTML to the docFragment
        var newLi = document.createElement('li');
        var newI = document.createElement('i');
        newLi.classList.add('card');
        newI.classList.add('fa');
        newI.classList.add(card);
        docFragment.appendChild(newLi).appendChild(newI);
    }
    var deck = document.querySelector('.deck');
    deck.appendChild(docFragment);  // Add a docFragment to .deck (to the page HTML)
}

window.onload = newCards();


/* set up the event listener for a card. If a card is clicked:
- display the card's symbol (put this functionality in another function that you call from this one)
- add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/


let deck = document.querySelector('.deck');
deck.addEventListener('click', showCard);

let openedCards = [];

function showCard (card) {
    if (event.target.nodeName === 'LI' && event.target.classList.contains('open') === false) { // click on the card, but not on the open one
        event.target.classList.add('show', 'open');
        if (openedCards.length < 2) {   // if there are less than two cards in openedCards array, add the clicked one to this array
            openedCards.push(event.target);
        }
        if (openedCards.length >= 2) {  // if there are two cards or more, remove the eventListener
            deck.removeEventListener('click', showCard);
            matchCard();
        } 
    }
}


/*  
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*/


let matchedCards = [];

function matchCard () {
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) { // if the cards in the openedCards array are the same
        for (let opCard of openedCards) {   // for each card
            opCard.classList.remove('show', 'open'); // add and remove given classes
            opCard.classList.add('match');
            matchedCards.push(opCard);  // and push it to new matchedCards array
            closeCards ();
        }
    }
    else {  // if the cards in the openedCards array are NOT the same
        for (let opCard of openedCards) {   // for each card
            setTimeout(function() {
            opCard.classList.remove('show', 'open');    // remove given classes
            closeCards();
            }, 500);
        }
    }
    moveCounter ();
    rating ();
}

function closeCards () { //close UNMATCHED cards
    openedCards = [];   // empty the array
    deck.addEventListener('click', showCard); //add eventListener again 
}



//
// TIMER - inspired by https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/
//



window.onload = startTimer();

var minutes = 00; 
var seconds = 00; 
var appendSeconds = document.getElementById("seconds")
var appendMinutes = document.getElementById("minutes")
var interval;


function startTimer () {
  
    let classCards = document.querySelectorAll('.card');
    
    for (let classCard of classCards) {
        classCard.addEventListener('click', start);
        
    }
}
  

function start () {
    if (!interval) { // run timer only on first click = if Interval is not defined
        interval = setInterval(timer, 1000);
    }
}


function timer () {
      seconds++; 
      
      if (seconds < 9) {
        appendSeconds.innerHTML = "0" + seconds;
        }
      
      if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
        } 
      
      if (seconds > 59) {
        console.log("minutes");
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
        }
      
      if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
        }
}


function resetTimer() {
    clearInterval(interval);
    seconds = "00";
    minutes = "00";
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
    interval = undefined;
}
    
function stopTimer () {
        clearInterval(interval);
}



//
// RESTART BUTTON
//


let restart = document.querySelector('.restart');
restart.addEventListener('click', newGame);

function newGame () {
    let classCards = document.querySelectorAll('.card');
    for (let classCard of classCards) {
        classCard.remove(); // remove all cards
    };
    newCards(); // shuffle and display new cards
    openedCards = []; //aby pred resetem nezustala otevrena jedna karta a po resetu by se nova karta hned zavrela
    matchedCards = []; //empty matchedCards
    resetTimer (); //vynuluj časovač - ok
    startTimer (); //nove spusteni casovace po restartu az po dalsim kliku - OK
    resetCounter ();//vynuluj počet moves
    resetRating ();//naplň hvězdičky ratings
    popModal ();
    closeModal(); //zavři modal, jestli je otevřený;
}

/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/



//
// MOVE COUNTER
//

var counter = document.getElementById('counter');
let moves = 0

function moveCounter(){
    moves++;
    counter.innerHTML = moves;
}

function resetCounter () {
    moves = 0;
    counter.innerHTML = moves;
}


//
// STAR RATINGS
//

var two = document.getElementById('two');
var three = document.getElementById('three');

function rating () {
    if (moves > 15) {
        emptyStar (three);
    }
    if (moves > 20) {
        emptyStar (two);
    }
}

function emptyStar (star) {
    star.classList.remove('fa-star');
    star.classList.add('fa-star-o');
}

function resetRating () {
    fillStar (two);
    fillStar (three);
}

function fillStar (star) {
    star.classList.remove('fa-star-o');
    star.classList.add('fa-star');
}


//
// FINAL MODAL - THE END OF THE GAME
//



var modal = document.getElementById("winModal");
var captionText = document.getElementById("caption");
var closex = document.getElementsByClassName("x")[0];


function popModal () {
    if (matchedCards.length >= 14 && openedCards.length >=1) {
        setTimeout(function() {
        getModal ();  
        }, 500)
        
    }
}

deck.addEventListener('click', popModal);

function getModal (){
modal.style.display = "block";
captionText.innerHTML
endgame();
stopTimer();
}

var cgMoves = document.getElementById("cg_moves");
var cgTime = document.getElementById("cg_time");
var cgStar = document.getElementById("cg_star");

function endgame () {
    cgMoves.innerHTML = moves;
    cgTime.innerHTML = minutes + " minutes and " + seconds + " seconds ";
    endRating();
}


closex.addEventListener('click', closeModal);

function closeModal () { 
modal.style.display = "none";
}


function endRating () {
    if (moves > 0) {
        cgStar.innerHTML = "<i class='fa fa-star'><i class='fa fa-star'><i class='fa fa-star'>"
    }
    if (moves > 15) {
        cgStar.innerHTML = "<i class='fa fa-star'><i class='fa fa-star'>";
    }
    if (moves > 20) {
        cgStar.innerHTML = "<i class='fa fa-star'>";
    }
}

var newButton = document.getElementById("new_button");
newButton.addEventListener('click', newGame)




/* KDE JSEM SKONČILA/NA ČEM PRACUJU:
*   -vyskocit modal pri konci hry
*/



//Only for trying functions    
var button = document.getElementById("button");
button.addEventListener('click', popModal)


