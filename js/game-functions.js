'use strict'
var gmine = 0
var isMineRend = false
var gmine = gLevel.MINES
var gfirstClick = true
var gcountRendMine = 0
var gleftTop = { i: 0, j: 0 }
var grightBottom = { i: 0, j: 0 }
var gCountclickArea = 0

var gLoction =
{
    i: 0,
    j: 0
}
var gi = 0
var gj = 0
var gModemines = false
var gnewMines = gLevel.MINES


function setMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue

            var currCell = board[i][j]
            if (currCell.isMine) {
                count++
            }

        }
    }
    return count
}

function onCellClicked(elCell, i, j) {
    
    if (isMega) {
        gGame.isOn = false
        if (gCountclickArea < 2) {
            if (gCountclickArea===0) gleftTop = { i: i, j: j }
            else grightBottom = { i: i, j: j }
            
            gCountclickArea++
        }
        if (gleftTop.i < grightBottom.i && gleftTop.j < grightBottom.j) {
            // console.log(location1.i , location1.j, location2.i , location2.j )
            for (var x = gleftTop.i; x <= grightBottom.i; x++) {
            
            for (var y = gleftTop.j; y <= grightBottom.j; y++) {
                if(board[x][y].isMarked)continue
                const elTd=document.querySelector(`.cell-${x}-${y}`)
                console.log(elTd)
                if (board[x][y].isMine){
                  elTd.innerText=Mine
                } 
                else if (board[x][y].minesAroundCount === 0) elTd.innerText = EMPTY
                else elTd.innerText = board[x][y].minesAroundCount
            }
        }
                setTimeout(() => {
                    removeMega(gleftTop,grightBottom)
                        }
                , 2000)
          
            isMega = false
            gGame.isOn=true
        }
    }
    if (gModemines) {
        if (gnewMines) {
            board[i][j].isMine = true
            console.log('new mine: ' + board[i][j].isMine)
            gnewMines--
            console.log('gnewMines: ' + gnewMines)
            const elModePos = document.querySelector(' .Text')
            elModePos.innerText = `mines left to replace: ${gnewMines} `
        }
        else {

            gModemines = false
            gGame.isOn = true
            gfirstClick = false
            renderBoard(board, '.board-container')


        }
    }

    if (gGame.isOn) {
if(gCountclickArea===2)return
        if (elCell.innerText === Flag) return
        // if(elCell.innerText===Mine||elCell.innerText||elCell.innerText===EMPTY)return
        if (gfirstClick) {
            if (board[i][j].isMine) {
                //           //update model:
                var mine = getRandomMine(board)
                board[mine.i][mine.j].isMine = true
                board[i][j].isMine = false

                renderBoard(board, '.board-container')
                // console.log(gBoard[i][j].minesAroundCount)
                if (board[i][j].minesAroundCount === 0) {
                    renderCell({ i, j }, EMPTY)
                }
                else renderCell({ i, j }, board[i][j].minesAroundCount)


            }
            gfirstClick = false
        }

        if (board[i][j].isMine) {
            elCell.innerText = Mine
            renderCell({ i, j }, Mine)
            isMineRend = true
            gcountRendMine++
            gLevel.MINES--
            const elh5 = document.querySelector('h5 span')
            elh5.innerText = `${gLevel.MINES}`
            // console.log(countMine)



        }
        else if (board[i][j].minesAroundCount === 0) {
            elCell.innerText = EMPTY
            renderCell({ i, j }, EMPTY)
            revelNeg(i, j)
            if (!board[i][j].isShown) board[i][j].isShown = true

        }
        else {
            elCell.innerText = board[i][j].minesAroundCount
            renderCell({ i, j }, board[i][j].minesAroundCount)


            if (!board[i][j].isShown) board[i][j].isShown = true
        }
        isMineRend = false
        cehckGameover(elCell)
        CheckWin(i, j)
        gi = i
        gj = j
        console.log('location:' + ' ' + gi + ' ' + gj)
    }
}



function revelNeg(rowIdx, colIdx) {

    for (var x = rowIdx - 1; x <= rowIdx + 1; x++) {
        if (x < 0 || x >= board.length) continue
        for (var y = colIdx - 1; y <= colIdx + 1; y++) {
            if (x === rowIdx && y === colIdx) continue
            if (y < 0 || y >= board[0].length) continue
            if (board[x][y].isMarked) continue
            if (board[x][y].isMine) continue
            const negCell = document.querySelector(`.cell-${x}-${y}`)
            negCell.innerText = (board[x][y].minesAroundCount === 0) ? EMPTY : board[x][y].minesAroundCount
            if (!board[x][y].isShown) {
                gGame.shownCount++
                board[x][y].isShown = true
            }
        }
    }
}

function setLevel(elBtn) {
    if (elBtn.innerText === 'Peth-Tikva') {
        gLevel.SIZE = 4
        gLevel.MINES = 4
        oninit()
    }
    else if (elBtn.innerText === 'Tel-Aviv') {
        gLevel.SIZE = 8
        gLevel.MINES = 14
        oninit()
    }
    else if (elBtn.innerText === 'New-York') {
        gLevel.SIZE = 12
        gLevel.MINES = 32
        oninit()
    }

}

function onCellMarked(elCell, x, y) {

    if (gGame.isOn) {
        if (elCell.innerText === Flag) {
            elCell.innerText = press
        }
        else if (elCell.innerText === press) {

            elCell.innerText = Flag
            board[x][y].isMarked = true
            if (board[x][y].isMine) {
                gLevel.MINES--
            }
            // gGame.markedCount++
            else { board[x][y].isShown = false }
            const elh5 = document.querySelector('h5 span')
            elh5.innerText = `${gLevel.MINES}`
            cehckGameover(elCell)
            CheckWin(x, y)
        }
        else return

    }
}
// function addMine(board1) {
//     const i=getRandomInt(0,gLevel.SIZE)
//     const j=getRandomInt(0,gLevel.SIZE)
//     if(i===x&&j===y)return false
//     if( board1[i][j].isMine)return false
//     board1[i][j].isMine = true //model
//     return true

//     // const elCell=document.querySelector(`.cell-${pos.i}-${pos.j}`)
//     // elCell.innerText=Mine //Dom
// }

function createMines() {

    for (var i = 0; i < gLevel.mines; i++) {
        // update model
        var mine = getRandomMine(board)
        board[mine.i][mine.j].isMine = true
    }
}

// get random empty position that doesn't include a specipc cell content
function getRandomMine(board) {
    // console.log('gBoard.length', board.length)
    const emptyCells = []

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[i].length; j++) {
            const cell = board[i][j]
            if (!cell.isMine) {
                emptyCells.push({ i, j })
            }
        }
    }

    if (!emptyCells.length) return null

    const randIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randIdx]
}

function restartGame() {
    const elSmile = document.querySelector('.smile')
    elSmile.innerText = '😄'
    gGame.isOn=false
    board=[]
    gGame.markedCount = 0
    gGame.shownCount=0
    gLives =3
    gHints=3
    oninit()

    // renderBoard(gBoard, '.board-container')

}
function cehckGameover(elCell) {
    if (elCell.innerText === Mine && gLives !== 0) {
        gLives--
    }
    if (gLives === 2) {
        const ellives = document.querySelector('.life .life1')
        ellives.style.display = 'none'
    }
    else if (gLives === 1) {
        const ellives = document.querySelector('.life .life2')
        ellives.style.display = 'none'
    }


    else if (gLives === 0) {
        const elSmile = document.querySelector('.smile')
        elSmile.innerText = '😢'
        const ellives = document.querySelector('.life .life3')
        ellives.style.display = 'none'
        gGame.isOn = false
    }

}
function CheckWin(i, j) {
    if (gGame.isOn) {
        // console.log(gGame.markedCount)
        if (board[i][j].isMine && board[i][j].isMarked && gGame.markedCount !== gmine) {
            gGame.markedCount++
            // console.log(gGame.markedCount)
        }
        if (!board[i][j].isMine && board[i][j].isShown && gGame.shownCount !== ((gLevel.SIZE) * (gLevel.SIZE) - gmine)) {
            gGame.shownCount++
        }
        if (gGame.markedCount === gmine && gGame.shownCount === ((gLevel.SIZE) * (gLevel.SIZE) - gGame.markedCount)
            || gcountRendMine < 3 && gGame.shownCount + gcountRendMine + gGame.markedCount === (gLevel.SIZE) * (gLevel.SIZE)) {
            const smile = document.querySelector('.smile')
            smile.innerText = WIN
            gGame.isOn = false
        }
    }
    console.log('glives:' + gLives)
    console.log('rendmine: ' + gcountRendMine)
    console.log('shownCount: ' + gGame.shownCount)
    console.log('markCount: ' + gGame.markedCount)

}
// console.log(gLevel.MINES)
// console.log(gmine)