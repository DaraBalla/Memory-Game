// Create a list that holds all cards

var cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 
'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 
'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
 

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below = done
 *   - loop through each card and create its HTML = pomoci jednoho for of loopu
 *   - add each card's HTML to the page = pomoci doc.fragmentu, add to DOM
 */

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

/* set up the event listener for a card. If a card is clicked:*/


/* VAR 1
let card = document.querySelector('.card'); //THIS WORKS, BUT ONLY IF I SELECT ONLY THE ONE CLASS, DON'T WORK WITH querySelectorAll
card.addEventListener('click', showCard);
*/


/* VAR 2
for (let card of cards) {
    card.addEventListener('click', showCard); //app.js:59 Uncaught TypeError: card.addEventListener is not a function
}
*/

/* VAR 3 //addEventListener DOESN'T WORK
var divs = document.querySelector('.card');
for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', showCard);
}
*/

/* VAR 4 //app.js:79 Uncaught TypeError: Cannot read property 'add' of undefined
    at showCard (app.js:79)
showCard @ app.js:79
cards.forEach(function() {
    this.addEventListener('click', showCard);
});
*/

var divs = document.querySelectorAll('.card');

function showCard () {
    divs.classList.add('show');
}



 /*  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
