let blank = "blank";
let player1 = "WHITE";
let player2 = "BLACK";
let playerTurn = 1;
let noPlacedTokens = 0;
let foundwinner = 0;
let winString1 = "WHITEWHITEWHITEWHITE";
let winString2 = "BLACKBLACKBLACKBLACK";
let drawMessage = "Draw! Click here to reset the board!";
let playerPlacementGrid = [...Array(6)].map(e => Array(7).fill(blank));

function newGame() {
    let titleCard = document.getElementById("titlu");
    let startGameButton = document.getElementById("startGameButton");
    titleCard.remove();
    startGameButton.remove();
    createGameGrid();
}

function createGameGrid() {
    createAddButtonContainer();
    createEmptyTokenGrid();
}

function createAddButtonContainer() {
    let addButtonsContainer = document.createElement("div");
    addButtonsContainer.id = "addButtonContainer";
    document.body.appendChild(addButtonsContainer);
    addAddButtons();
}

function addAddButtons() {
    let addButtonsContainer = document.getElementById("addButtonContainer");
    for (let i = 0; i < 7; ++i) {
        let addButton = document.createElement("button");
        addButton.id = "addButton" + i;
        addButton.classList.add("addButton1");
        addButton.innerHTML = "Add Token";
        addButton.addEventListener("click", playerAddsToken);
        addButtonsContainer.appendChild(addButton);
    }
} 

function createEmptyTokenGrid() {
    for (let i = 0; i < 6; ++i) {
        let emptyGridTokenContainer = document.createElement("div");
        emptyGridTokenContainer.id = "container";
        document.body.appendChild(emptyGridTokenContainer);
        for (let j = 0; j < 7; ++j) {
            let gridToken = document.createElement("span");
            gridToken.id = "L" + i + "C" + j;
            gridToken.classList.add("dot");
            emptyGridTokenContainer.appendChild(gridToken);
        }
    }
}

function playerAddsToken(id) {
    let length = this.id.length;
    let column = this.id[length - 1];
    ++noPlacedTokens;
    for (let line = 5; line >= 0; --line) {
        if (playerPlacementGrid[line][column] == blank && playerTurn == 1) {
            playerPlacementGrid[line][column] = player1;
            document.getElementById("L" + line + "C" + column).className = "dotWhite";
            changeAddButtonColor();
            checkForWinner(player1);
            ++playerTurn;
            break;
        }
        if (playerPlacementGrid[line][column] == blank && playerTurn == 2) {
            playerPlacementGrid[line][column] = player2;
            document.getElementById("L" + line + "C" + column).className = "dotBlack"; 
            changeAddButtonColor();  
            checkForWinner(player2);
            --playerTurn;
            break;
        }
        if (line == 1) {
            document.getElementById("addButton" + column).disabled = true; 
        }
    }
    if (playerPlacementGrid[0][column] != blank) {
        document.getElementById("addButton" + column).className = "deadButton"; 
    }
}

function changeAddButtonColor() {
    for(let i = 0; i < 7; ++i) {
        let className = document.getElementById("addButton" + i).className;
        if (playerTurn == 1 && className != "deadButton") {
            document.getElementById("addButton" + i).className = "addButton2";
        } else if (playerTurn == 2 && className != "deadButton") {
            document.getElementById("addButton" + i).className = "addButton1";
        }
    }
}

function checkForWinner(player) {
    checkLines(player);
    checkColumn(player);
    checkPrimaryDiagonals(player);
    checkSecondaryDiagonals(player);
}

function checkLines(player) {
    for (let i = 0; i < 6; ++i) {
        let lineString = "";
        for (let j = 0; j < 7; ++j) {
            lineString += playerPlacementGrid[i][j];
        }
        if (lineString.includes(winString1) || lineString.includes(winString2)) {
            showWinner(player);
            removeAddButtons();
            ++foundwinner;
            break;
        } 
    }
}

function checkColumn(player) {
    for (let j = 0; j < 7; ++j) {
        let columnString = "";
        for (let i = 0; i < 6; ++i) {
            columnString += playerPlacementGrid[i][j];
        }
        if (columnString.includes(winString1) || columnString.includes(winString2)) {
            removeAddButtons();
            showWinner(player);
            ++foundwinner;
            break;
        } 
    }
}

function checkPrimaryDiagonals(player) {
    let primaryDiagonalsUnified = "";
    for (let i = 2; i >= 0; --i) {
        for (let j = 0, k = i; k <= 5; ++j, ++k) {
            primaryDiagonalsUnified += playerPlacementGrid[k][j];
        }
        primaryDiagonalsUnified += "|";
    }
    for (let j = 1; j <= 3; ++j) {
        for (let i = 0, k = j; k <= 6; ++i, ++k) {
            primaryDiagonalsUnified += playerPlacementGrid[i][k];
        }
        primaryDiagonalsUnified += "|";
    }
    if (primaryDiagonalsUnified.includes(winString1) || primaryDiagonalsUnified.includes(winString2)) {
        showWinner(player);
        removeAddButtons(); 
        ++foundwinner;
    } else if (foundwinner == 0 && noPlacedTokens == 42) {
        showWinner(drawMessage);
        removeAddButtons(); 
    }
}

function checkSecondaryDiagonals(player) {
    let secondaryDiagonalsUnified = "";
    for (let i = 3; i < 6; ++i) {
        for (let j = 0, k = i; k >= 0; ++j, --k) {
            secondaryDiagonalsUnified += playerPlacementGrid[k][j];
        }
        secondaryDiagonalsUnified += "|";
    }
    for (let j = 1; j < 4; ++j) {
        for (let i = 5, k = j; k < 7; --i, ++k) {
            secondaryDiagonalsUnified += playerPlacementGrid[i][k];
        }
        secondaryDiagonalsUnified += "|";
    }
    if (secondaryDiagonalsUnified.includes(winString1) || secondaryDiagonalsUnified.includes(winString2)) {
        showWinner(player);
        removeAddButtons();
        ++foundwinner; 
    }
}

function showWinner(player) {
    let winButton = document.createElement("button");
    winButton.id = "winButton";
    if (player == drawMessage) {
        winButton.innerHTML = drawMessage;
    } else {
        winButton.innerHTML = player + " Wins! Click here to reset the board!";
    }
    winButton.addEventListener("click", reloadGame);
    document.body.appendChild(winButton);
}

function reloadGame() {
    location.reload();
}

function removeAddButtons() {
    let addButtonContainer = document.getElementById("addButtonContainer");
    addButtonContainer.remove();
}
