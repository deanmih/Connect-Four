function show(column) {
    ++noTokensPlaced;
    switchButtonColors(column);
    for (let line = 5; line >= 0; --line) {
        let cellIndex = buttonIndexes[line][column];
        if (playerIndex == 1 && allCellIndexes.includes(cellIndex)) {
            document.getElementById(cellIndex).style.background = "white";
            let toDelete = allCellIndexes.indexOf(cellIndex);
            allCellIndexes.splice(toDelete, 1);
            boardCheck(playerIndex);
            ++playerIndex;
            break;
        } 
        if (playerIndex == 2 && allCellIndexes.includes(cellIndex)) {
            document.getElementById(cellIndex).style.background = "black";
            document.getElementById(cellIndex).style.border = "black";
            let toDelete = allCellIndexes.indexOf(cellIndex);
            allCellIndexes.splice(toDelete, 1);
            --playerIndex;
            boardCheck(playerIndex);
            break;
        } 
        if (line == 1) {
            document.getElementById(column).disabled = true;
        }
    }
}

function switchButtonColors() {
   for (let i = 0; i < 7; ++i) {
        if (noTokensPlaced % 2 != 0) {
            document.getElementById(i).style.background = "black";
            document.getElementById(i).style.color = "white";
        } else {
            document.getElementById(i).style.background = "white";
            document.getElementById(i).style.color = "black";
        }
    }
}

function boardCheck() {
    let foundWinner = 0;
    for (let i = 0; i < 69; ++i) {
        let s1 = document.getElementById(winCombinations[i][0]).style.background;
        let s2 = document.getElementById(winCombinations[i][1]).style.background;
        let s3 = document.getElementById(winCombinations[i][2]).style.background;
        let s4 = document.getElementById(winCombinations[i][3]).style.background; 
        if (s1 == s2 && s2 == s3 && s3 == s4 && s1 == "white" || s1 == s2 && s2 == s3 && s3 == s4 && s1 == "black") {
            console.log(s1 + " " + s2 + " " + s3 + " " + s4);
            foundWinner = 1;
            winMessage(s1);
        } else if (noTokensPlaced == 42 && foundWinner == 0) {
            drawMessage();
        }
    }
}

