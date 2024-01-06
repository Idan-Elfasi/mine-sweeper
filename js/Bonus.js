'use strict'
var gSafeclicks = 3
var gIsfind = false
var isMega = false
var glocationLastRend = []
var glocationsLastRenders = []


function hintTime() {
    gHints--
    var rowIdx = gi
    var colIdx = gj
    const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
    if (elCell.innerText === EMPTY) return
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j].isMarked) continue
            const negCell = document.querySelector(`.cell-${i}-${j}`)
            if (board[i][j].isMine) {
                negCell.innerText = Mine
            }
            else if (board[i][j].minesAroundCount === 0) {
                negCell.innerText = EMPTY
            }
            else { negCell.innerText = board[i][j].minesAroundCount }
        }
    }
    setTimeout(() => {
        removeNeg(rowIdx, colIdx)
    }, 1000)

    //LtR
    const elHint1 = document.querySelector('.hint .hint1')
    if (gHints === 2) elHint1.style.display = 'none'

    const elHint2 = document.querySelector('.hint .hint2')
    if (gHints === 1) elHint2.style.display = 'none'

    const elHint3 = document.querySelector('.hint .hint3')
    if (gHints === 0) elHint3.style.display = 'none'

}

function removeNeg(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j].isMarked) continue
            const negCell = document.querySelector(`.cell-${i}-${j}`)
            console.log(negCell.isShown)
            if ((board[i][j].isShown) || isMineRend) continue
            else negCell.innerText = press
        }
    }
}

function safeClick() {
    if (gGame.isOn) {
        if (!gSafeclicks) return
        while (!gIsfind) {
            const randI = (getRandomInt(0, gLevel.SIZE))
            const randJ = (getRandomInt(0, gLevel.SIZE))
            console.log('i:' + randI + ' ' + 'j:' + randJ)
            const elCell = document.querySelector(`.cell-${randI}-${randJ}`)
            if (elCell.innerText === press) {
                if (!board[randI][randJ].isMine) {
                    elCell.classList.add('markSafe')
                    setTimeout(() => {
                        elCell.classList.remove('markSafe')
                    }, 1500)
                    gSafeclicks--
                    const elClicks = document.querySelector('.safeCount')
                    elClicks.innerText = `${gSafeclicks} cliks available `
                    gIsfind = true
                }

            }

        }
        gIsfind = false

    }

}
function darkMode() {
    const elBody = document.querySelector('body')
    elBody.classList.toggle('botDark')
}
function megaHint() {
    isMega = true
}

function modeMines() {
    gModemines = true
    oninit()
    gGame.isOn = false
    for (var i = 0; i < gLevel.SIZE; i++) {

        for (var j = 0; j < gLevel.SIZE; j++) {
            if (board[i][j].isMine) board[i][j].isMine = false
        }
    }
    const elModePos = document.querySelector('.Text')
    console.log(elModePos)
    elModePos.innerText = `mines left to replace: ${gnewMines} `
}

function removeMega(location1, location2) {

    for (var x = location1.i; x <= location2.i; x++) {

        for (var y = location1.j; y <= location2.j; y++) {
            const negCell = document.querySelector(`.cell-${x}-${y}`)
            if (board[x][y].isMarked) continue
            console.log(board[x][y].isShown)
            if ((board[x][y].isShown) || isMineRend) continue
            else negCell.innerText = press
        }

    }
}
function Undo() {
    if (gGame.isOn) {
        const lastLoc = glocationLastRend.pop()
        const elCell = document.querySelector(`.cell-${lastLoc.i}-${lastLoc.j}`)
        for (var i = gLastrender.length - 1; i >= 0; i--) {


            if (gLastrender[i] === Mine) {
                elCell.innerText = press
            }
            else if (gLastrender[i] === EMPTY) {
                elCell.innerText = press
                for (var i = 0; i < glocationsLastRenders.length; i++) {
                    const loc = glocationsLastRenders[i]
                    const elNegcell = document.querySelector(`.cell-${loc.i}-${loc.j}`)
                    elNegcell.innerText = press
                    // renderCell(glocationsLastRenders[i],press)
                }
            }
            else elCell.innerText = press
        }
    }

}
function Exterminator() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (board[i][j].isMine) {
                const loc = { i: i, j: j }
                gMines.push(loc)
            }
        }
    }
    const locMine1 = getRandomInt(0, gMines.length)
    const loc1 = gMines[locMine1]
    const locMine2 = getRandomInt(0, gMines.length)
    const loc2 = gMines[locMine2]
    const locMine3 = getRandomInt(0, gMines.length)
    const loc3 = gMines[locMine3]
    board[loc1.i][loc1.j].isMine = false
    board[loc2.i][loc2.j].isMine = false
    board[loc3.i][loc3.j].isMine = false
    gLevel.MINES = gLevel.MINES - 3
    
    renderBoard(board, '.board-container')
}