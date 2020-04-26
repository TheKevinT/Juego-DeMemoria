/*Para voltear la tarjeta cuando se hace clic, 
se agregará un giro de clase al elemento. Para eso, seleccionamos
todos los elementos de la tarjeta de memoria con document.querySelectorAll*/
const cards = document.querySelectorAll('.memory-card');

/*Cuando hacemos clic en la primera tarjeta, debe esperar hasta que se voltee otra tarjeta. 
Las variables hasFlippedCard y flippedCard administrarán el estado invertido.*/

let hasFlippedCard = false;
let firstCard, secondCard;

/*Declaremos una variable lockBoard. Cuando el jugador hace clic en la segunda carta, lockBoard se establecerá en verdadero 
y la condición si (lockBoard) regresa; Evitará que se voltee cualquier carta antes de que las cartas estén ocultas o coincidan: */
let lockBoard = false;



//flipCard = volterar tarjeta
function flipCard() {

    if (lockBoard) return;

    /*Todavía existe el caso en el que el jugador puede hacer clic dos veces en la misma tarjeta. 

    Para evitarlo, verifiquemos si la tarjeta en la que se hizo clic es igual a la primera Tarjeta y regresemos si es positiva.*/
    if (this === firstCard) return;

    this.classList.add('flip');


    /*En caso de que no haya una tarjeta invertida, hasFlippedCard se establece en verdadero y flippedCard se establece en la tarjeta en la que se hizo clic. 
    Cambiemos también el método de alternar para agregar:*/
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    /*Así que ahora podemos verificar una coincidencia accediendo al conjunto de datos de ambas tarjetas. Extraigamos la 
    lógica coincidente con su propio método checkForMatch () y también establezcamos hasFlippedCard en falso. */


    /*En caso de una coincidencia, se invoca disableCards () y
      se separan los oyentes de eventos en ambas tarjetas, para evitar que se voltee. De lo contrario, unflipCards () 
      devolverá ambas tarjetas en un tiempo de espera de 1500 ms que elimina la clase .flip: */
    secondCard = this;

    // hasFlippedCard = false;

    checkForMatch();

}

//verificar coincidencia

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        return;
    }

    unflipCards();
}
//en caso de coincidir

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//si se equivoca se vuelven a voltear las cards

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // lockBoard = false;
        resetBoard();

    }, 1500);
}

/*Las variables firstCard y secondCard deben restablecerse después de cada ronda, así que extraigámoslas en un nuevo método resetBoard ()*/

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


//Barajear
/* se ejecutará solo después de su declaración */
(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));