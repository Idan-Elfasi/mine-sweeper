'use strict'

const LOSE = '😢 Lose'
const NORMAL = '😄 Normal'
const WIN = '🥳 Win!'
const Flag = '🚩'
const Mine = '🧨'
// const One='1️⃣'
// const Two='2️⃣'
// const Three='3️⃣'
// const Four='4️⃣'
const press = '🔒'
const EMPTY = ''
const LIFE='🥑'
const HINT='💡'

var board
 var gLives=3
 var gHints=3


const gLevel = {
    SIZE: 4,
    MINES: 4
}


const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function oninit() {
    board = bulidBoard()
    renderBoard(board, '.board-container')
    gGame.isOn = true
    window.addEventListener("contextmenu", e => e.preventDefault())
    gGame.markedCount = 0
    gGame.shownCount=0
    gLives =3
    const elh5 = document.querySelector('h5 span')
    elh5.innerText = `${gLevel.MINES}`
    gHints=3
}

function bulidBoard() {
    // var countMine=gLevel.MINES
    const board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]) // board[i] = []

        for (var j = 0; j < gLevel.SIZE; j++) {
           
            // console.log(countMine)

            board[i][j]={
                minesAroundCount: null,
                isShown: false,
                isMine: false,
                isMarked: false
            }


    }
}
for (var i = 0; i < gLevel.MINES; i++) {
    // update model
    var mine = getRandomMine(board)
    board[mine.i][mine.j].isMine = true
  }

 
    return board
}

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            
            const className = (mat[i][j].isMine)? 'cell Mine':'cell'

            strHTML += `<td onclick="onCellClicked(this,${i},${j}) " onclick="modeMines(this,${i},${j})" oncontextmenu="onCellMarked(this,${i},${j})" class="${className} cell-${i}-${j}">${press}</td>`

            var  countAround=(!mat[i][j].isMine)?setMinesNegsCount(mat,i,j):null
            mat[i][j].minesAroundCount=countAround
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'


    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

//  function checkGameOver() {  
// if(gGame.markedCount===gLevel.MINES)
// }
