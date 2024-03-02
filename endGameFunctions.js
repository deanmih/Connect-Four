function winMessage(s1) {
    let winner = s1.toUpperCase();
    let winMsg = document.createElement("button");
    winMsg.className = "container";
    winMsg.style.marginTop = "auto";
    winMsg.style.background = "white";
    winMsg.style.width = "800px"
    winMsg.style.height = "150px";
    winMsg.innerHTML = winner + " " + "Wins!" + " " + "Click to reset the board!";
    winMsg.style.fontSize = "35px";
    winMsg.style.fontFamily = "Georgia";
    winMsg.style.borderRadius = "25px";
    winMsg.style.border = "none";
    winMsg.addEventListener("click", refreshGame); 
    document.body.appendChild(winMsg);
    killButtons();
    refreshBtn();
}

function drawMessage() {
    let drawMsg = document.createElement("button");
    drawMsg.className = "container";
    drawMsg.style.marginTop = "auto";
    drawMsg.style.background = "white";
    drawMsg.style.width = "800px"
    drawMsg.style.height = "150px";
    drawMsg.innerHTML = "Draw";
    drawMsg.style.fontSize = "35px";
    drawMsg.style.fontFamily = "Georgia";
    drawMsg.style.borderRadius = "25px";
    drawMsg.style.border = "none";
    drawMsg.innerHTML = "Draw!" + " " + "Click to reset the board!";
    drawMsg.addEventListener("click", refreshGame); 
    document.body.appendChild(drawMsg);
    killButtons();
    refreshBtn();
}

function killButtons() {
    for (let i = 0; i < 7; ++i) {
        let element1 = document.getElementById("addButtonDiv");
        let element2 = document.getElementById(i);
        element1.remove();
        element2.remove();
     }
 }

function refreshGame() {
    location.reload();    
}