'use strict'


function hintTime(rowIdx,colIdx,board){
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= gBoard[0].length) continue
            if (gBoard[x][y].isMarked) continue
            setTimeout(() => {
            if (gBoard[i][j].isMine) {
                elCell.innerText = Mine }
                else if (gBoard[i][j].minesAroundCount === 0) {
                    elCell.innerText = EMPTY}
                    else  elCell.innerText = gBoard[i][j].minesAroundCount
                },1000)
}
    }
}