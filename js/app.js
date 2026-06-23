
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const message = document.querySelector('#message')

/*-------------------------------- Constants --------------------------------*/
const board = [
    '', '', '',
    '', '', '',
    '', '', '']
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/

let turn = 'X'
let winner = false
let tie = false

/*-------------------------------- Functions --------------------------------*/
function updateBoard() {
    // loop through board varible using foreach
    board.forEach((cell, index) => {
        squareEls[index].textContent = cell
    })
}
function updateMessage() {
    if (!winner && tie === false)
        message.textContent = `game is in procsse ${turn} turn `
    else if (winner === false && tie === true) {

        message.textContent = 'its a tie '
    } 
    else {

        message.textContent = 'you won'
    }
}

function render() {
    updateBoard()
    updateMessage()
}

function init() {
    render()

}

function placePiece(index) {
    board[index] = turn
}

function checkForWinner() { 
    for(let wc of winningCombos){
        if(board[wc[0]] !== '' && board[wc[0]] === board[wc[1]] && board[wc[0]] === board[wc[2]]){
            winner = true
        }
    }
}

function checkForTie() {
    if (winner === true) {
        return
    }
    else {
        for (let oneCell of board) {
            if (oneCell === '') {
                tie = false
            }
            else {
                tie = true
            }

        }
    }
}

function switchPlayerTurn(){
    if(winner){
        return
    }
    else {
        if(turn === 'X'){turn = 'O'}
        else{turn = 'X'}
    }
}

function handleClick(event) {

    const squareIndex = event.target.id

    for (let i = 0; i < board.length; i++) {
        if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner === true)
            return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}

init()
/*----------------------------- Event Listeners -----------------------------*/
for (oneS of squareEls) {
    oneS.addEventListener('click', handleClick)
}


