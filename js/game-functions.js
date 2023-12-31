'use strict'
var countMine=0
var gfirstClick=true

 function setMinesNegsCount(board,rowIdx,colIdx) {
     var count = 0
    
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            
            var currCell = board[i][j] 
            if(currCell.isMine){
                count++ 
            }
            
}
    }
    return count
}

 function onCellClicked(elCell,i,j){
    if(gGame.isOn){
        if(gfirstClick){
            if(gBoard[i][j].isMine){
        //           //update model:
        var mine = getRandomMine(gBoard)
        gBoard[mine.i][mine.j].isMine = true
                gBoard[i][j].isMine=false
           
                    renderBoard(gBoard,'.board-container')
                    // console.log(gBoard[i][j].minesAroundCount)
                    if(gBoard[i][j].minesAroundCount===0){
                        renderCell({i,j},EMPTY)
                    }
             else      renderCell({i,j},gBoard[i][j].minesAroundCount)

                    
            }
                gfirstClick=false
            }
        
            if(gBoard[i][j].isMine){
                elCell.innerText=Mine
                countMine++
                console.log(countMine)
                
                

            }
            else if (gBoard[i][j].minesAroundCount===0){
                elCell.innerText=EMPTY
                revelNeg(i,j)
                gBoard[i][j].isShown=true
            }
            else{
                elCell.innerText=gBoard[i][j].minesAroundCount
                gBoard[i][j].isShown=true
            }
        cehckGameover(elCell)
        CheckWin(elCell,i,j)
        }
    }
    


 function revelNeg(rowIdx,colIdx){

    for (var x = rowIdx - 1; x <= rowIdx + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue
        for (var y = colIdx - 1; y <= colIdx + 1; y++) {
            if (x === rowIdx && y === colIdx) continue
            if (y < 0 || y >= gBoard[0].length) continue
            if(gBoard[x][y].isMarked)continue
            if(gBoard[x][y].isMine)continue
            const negCell=document.querySelector(`.cell-${x}-${y}`)
            negCell.innerText= (gBoard[x][y].minesAroundCount===0)?EMPTY:gBoard[x][y].minesAroundCount
        }
 }
 }

function setLevel(elBtn){
    if(elBtn.innerText==='Peth-Tikva'){
        gLevel.SIZE=4
        gLevel.MINES=2
        oninit()
    }
     else if(elBtn.innerText==='Tel-Aviv'){
        gLevel.SIZE=8
        gLevel.MINES=14
        oninit()
    }
    else if(elBtn.innerText==='New-York')
    { gLevel.SIZE=12
    gLevel.MINES=32
    oninit()
    }
    
}

 function onCellMarked(elCell,x,y){
    if(gGame.isOn){
    elCell.innerText=Flag
    if(gBoard[x][y].isMine){
        gBoard[x][y].isMarked=true
    }
    cehckGameover(elCell)
    CheckWin(elCell,x,y)
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

function restartGame(){
    oninit()
    const elSmile=document.querySelector('.smile')
    elSmile.innerText='😄'

}
function cehckGameover(elCell){
    if(elCell.innerText===Mine&&gLives!==0){
        gLives--
    }
        if(gLives===2){
            const ellives=document.querySelector('.life .life1')
            ellives.innerText=''
        }
        else if(gLives===1){
            const ellives=document.querySelector('.life .life2')
            ellives.innerText=''
        }
    

else if(gLives===0){
    const elSmile=document.querySelector('.smile')
    elSmile.innerText='😢'
    const ellives=document.querySelector('.life .life3')
    ellives.innerText=''
    gGame.isOn = false
}
    
}
function CheckWin(elCell,i,j){
    if(gGame.isOn){
        
        if (gBoard[i][j].isMine = true && elCell.innerText === Flag && gGame.markedCount !== gLevel.MINES) {
            gGame.markedCount++
        }
        if(!gBoard[i][j].isMine&&elCell.innerText !== Flag&&gGame.shownCount!==( (gLevel.SIZE)*(gLevel.SIZE)-gGame.markedCount ) ){
            gGame.shownCount++
        }
        if(gGame.markedCount === gLevel.MINES&& gGame.shownCount===(gLevel.SIZE)*(gLevel.SIZE)-gGame.markedCount){
            const smile=document.querySelector('.smile')
            smile.innerText='😎'
            alert('Nice Winnnnnnn')
            gGame.isOn=false
        }
    }
   
}
