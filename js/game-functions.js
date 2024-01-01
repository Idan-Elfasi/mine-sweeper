'use strict'
var gmine = 0
var gmine=gLevel.MINES
var gfirstClick = true
var gcountRendMine=0

function setMinesNegsCount(board, rowIdx, colIdx) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue

            var currCell = board[i][j]
            if (currCell.isMine) {
                count++
            }

        }
    }
    return count
}

function onCellClicked(elCell, i, j) {
    if (gGame.isOn) {
        if(elCell.innerText===Flag)return
        // if(elCell.innerText===Mine||elCell.innerText||elCell.innerText===EMPTY)return
        if (gfirstClick) {
            if (gBoard[i][j].isMine) {
                //           //update model:
                var mine = getRandomMine(gBoard)
                gBoard[mine.i][mine.j].isMine = true
                gBoard[i][j].isMine = false

                renderBoard(gBoard, '.board-container')
                // console.log(gBoard[i][j].minesAroundCount)
                if (gBoard[i][j].minesAroundCount === 0) {
                    renderCell({ i, j }, EMPTY)
                }
                else renderCell({ i, j }, gBoard[i][j].minesAroundCount)


            }
            gfirstClick = false
        }

        if (gBoard[i][j].isMine) {
            elCell.innerText = Mine
            gcountRendMine++
            gLevel.MINES--
            const elh5=document.querySelector('h5 span')
            elh5.innerText = `${gLevel.MINES}`
            // console.log(countMine)



        }
        else if (gBoard[i][j].minesAroundCount === 0) {
            elCell.innerText = EMPTY
            revelNeg(i, j)
            if(!gBoard[i][j].isShown) gBoard[i][j].isShown = true
            
        }
        else {
            elCell.innerText = gBoard[i][j].minesAroundCount
            
             if(!gBoard[i][j].isShown) gBoard[i][j].isShown = true
        }
        cehckGameover(elCell)
        CheckWin( i, j)
    }
}



function revelNeg(rowIdx, colIdx) {

    for (var x = rowIdx - 1; x <= rowIdx + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue
        for (var y = colIdx - 1; y <= colIdx + 1; y++) {
            if (x === rowIdx && y === colIdx) continue
            if (y < 0 || y >= gBoard[0].length) continue
            if (gBoard[x][y].isMarked) continue
            if (gBoard[x][y].isMine) continue
            const negCell = document.querySelector(`.cell-${x}-${y}`)
            negCell.innerText = (gBoard[x][y].minesAroundCount === 0) ? EMPTY : gBoard[x][y].minesAroundCount
          if(!gBoard[x][y].isShown){
            gGame.shownCount++
              gBoard[x][y].isShown=true
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
        if(elCell.innerText===Flag){
elCell.innerText=press
        }
else if(elCell.innerText===Mine||elCell.innerText||elCell.innerText===EMPTY) {
return
}

   else{

       elCell.innerText = Flag
       gBoard[x][y].isMarked = true
       if (gBoard[x][y].isMine) {
           gLevel.MINES--
       }
               // gGame.markedCount++
               else{ gBoard[x][y].isShown=false  }
               const elh5 = document.querySelector('h5 span')
               elh5.innerText = `${gLevel.MINES}`
               cehckGameover(elCell)
               CheckWin( x, y)
   }  

 
    
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
        var mine = getRandomMine(gBoard)
        gBoard[mine.i][mine.j].isMine = true
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
    oninit()
    const elSmile = document.querySelector('.smile')
    elSmile.innerText = '😄'
   
}
function cehckGameover(elCell) {
    if (elCell.innerText === Mine && gLives !== 0) {
        gLives--
    }
    if (gLives === 2) {
        const ellives = document.querySelector('.life .life1')
        ellives.innerText = ''
    }
    else if (gLives === 1) {
        const ellives = document.querySelector('.life .life2')
        ellives.innerText = ''
    }


    else if (gLives === 0) {
        const elSmile = document.querySelector('.smile')
        elSmile.innerText = '😢'
        const ellives = document.querySelector('.life .life3')
        ellives.innerText = ''
        gGame.isOn = false
    }

}
function CheckWin( i, j) {
    if (gGame.isOn) {
// console.log(gGame.markedCount)
        if (gBoard[i][j].isMine  && gBoard[i][j].isMarked && gGame.markedCount !== gmine) {
            gGame.markedCount++
            // console.log(gGame.markedCount)
        }
        if (!gBoard[i][j].isMine && gBoard[i][j].isShown && gGame.shownCount !== ((gLevel.SIZE) * (gLevel.SIZE) - gmine)) {
            gGame.shownCount++
        }
        if (gGame.markedCount === gmine && gGame.shownCount === ((gLevel.SIZE) * (gLevel.SIZE) - gGame.markedCount )
        || gcountRendMine<3&&gGame.shownCount+gcountRendMine+gGame.markedCount===(gLevel.SIZE) * (gLevel.SIZE)) {
            const smile = document.querySelector('.smile')
            smile.innerText = WIN
            gGame.isOn = false
        }
    }
    console.log('glives:'+gLives)
    console.log('rendmine: '+gcountRendMine)
            console.log('shownCount: '+gGame.shownCount)
            console.log('markCount: '+gGame.markedCount)

}
// console.log(gLevel.MINES)
// console.log(gmine)