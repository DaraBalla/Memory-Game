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
deck.addEventListener('click', showCard)

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
}

function closeCards () {
    openedCards = [];   // empty the array
    deck.addEventListener('click', showCard) //add eventListener again 
}







/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


