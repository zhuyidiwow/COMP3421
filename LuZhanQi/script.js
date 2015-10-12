var originPosition;
var graveNo = 0;
var x, y, i, j;
var position;
var moveTime = 0;
var totalTime = 0;
var customeTime;
var t;
var chessBoard = [
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],];

function timer(){    
    document.getElementById("totalTimer").innerHTML = totalTime + "s";
    document.getElementById("moveTimer").innerHTML = moveTime + "s";
    moveTime += 1;
    totalTime += 1;
    t = setTimeout("timer()",1000);
    if (moveTime >= parseInt(customeTime)) {
        alert("Move! Time is up!");
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    updateBoard ();
    originPosition = ev.target.className.split(' ')[1];
    draggedPiece = ev.target;
    getCoordinate (originPosition);
    findDroppable (x, y);
}

function drop(ev) {
    ev.preventDefault();
    targetPosition = ev.target.className.split(' ')[1];
    targetPiece = ev.target;
    var tname = $(targetPiece).attr("name");
    var dname = $(draggedPiece).attr("name");
    battle (targetPiece, draggedPiece, targetPosition, originPosition, tname, dname);
    moveTime = 0;
}

function initialDrag(ev) {
    draggedPiece = ev.target;
    var name = $(draggedPiece).attr("name");
    if (name == "boom"){
        $(".boom").attr("ondrop","initialDrop(event)");
        $(".boom").attr("ondragover","allowDrop(event)");
    }
    else if (name == "mine"){
        $(".mine").attr("ondrop","initialDrop(event)");
        $(".mine").attr("ondragover","allowDrop(event)");
    }
    else if (name == "flag"){
        getPosition(1, 13);
        $(".empty." + position).attr("ondrop","initialDrop(event)");
        $(".empty." + position).attr("ondragover","allowDrop(event)");
        getPosition(3, 13);
        $(".empty." + position).attr("ondrop","initialDrop(event)");
        $(".empty." + position).attr("ondragover","allowDrop(event)");
    }
    else {
        $(".empty").attr("ondrop","initialDrop(event)");
        $(".empty").attr("ondragover","allowDrop(event)");
    }
}

function initialDrop (ev) {
    ev.preventDefault();
    targetPosition = ev.target.className.split(' ')[1];
    targetPiece = ev.target;
    $(draggedPiece).removeAttr("id");
    $(draggedPiece).addClass(targetPosition);
    $(draggedPiece).removeAttr("ondragstart");
    $(draggedPiece).attr("ondragstart","drag(event)");
    if (($(draggedPiece).attr("name") == "flag") ||
        ($(draggedPiece).attr("name") == "mine")) {
        $(draggedPiece).removeAttr("draggable");
        $(draggedPiece).removeAttr("ondragstart");
        $(draggedPiece).attr("draggable","false");
    }
    $(targetPiece).remove();
    $(".empty").removeAttr("ondrop");
    $(".empty").removeAttr("ondragover");
}
        
function updateBoard () {
    for (i = 0; i <= 13; i++) {
        for (j = 0; j <= 4; j++) {
            getPosition(j, i);
            if ($("." + position).hasClass("dead")) {
                chessBoard [i][j] = 0;
            }
        }
    }
    $(".epieces").removeAttr("ondrop");
    $(".epieces").removeAttr("ondragover");
    $(".dead").removeAttr("ondrop");
    $(".dead").removeAttr("ondragover");
}

function getCoordinate (position) {
    var arr = position.split("");
    if (arr.length == 4) {
        x = parseInt(arr[1]);
        y = parseInt(arr[2] + arr[3]);
    }
    else if (arr.length == 3) {
        x = parseInt(arr[1]);
        y = parseInt(arr[2]);
    }
}

function getPosition (x, y) {
    position = "p" + x + y;
}

function findDroppable (x, y) {
    //When around campsite, make campsite available
    var campsite = [
        [1, 2], [3, 2], [2, 3], [1, 4], [3, 4],
        [1, 9], [3, 9], [2, 10], [1, 11], [3, 11]];
    for (i = 0; i <= 9; i++) {
        var dx = Math.pow((x - campsite[i][0]),2);
        var dy = Math.pow((y - campsite[i][1]),2);
        if ((dx + dy) <= 2){
            getPosition(campsite[i][0], campsite[i][1]);
            $("." + position).attr("ondrop","drop(event)");
            $("." +position).attr("ondragover","allowDrop(event)");
        }
    }
    
    //When the piece is on railroad corners
    if (((x == 0) && (y == 1)) ||
        ((x == 4) && (y == 1)) ||
        ((x == 0) && (y == 5)) ||
        ((x == 4) && (y == 5)) ||
        ((x == 0) && (y == 8)) ||
        ((x == 4) && (y == 8)) ||
        ((x == 0) && (y == 12)) ||
        ((x == 4) && (y == 12))) {
        var rightX = x + 1;
        var leftX = x - 1;
        var topY = y - 1;
        var bottomY = y + 1;
        //on the right
        while((rightX <= 3) && (chessBoard[y][rightX] == 0)){
            getPosition(rightX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            rightX++;
        }
        if (rightX <= 4) {
            getPosition(rightX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
        //on the left
        while((leftX >= 1) && (chessBoard[y][leftX] == 0)){
            getPosition(leftX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            leftX--;
        }
        if (leftX >= 0){
            getPosition(leftX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
        //on the top
        while((topY >= 1) && (chessBoard[topY][x] == 0)){
            getPosition(x, topY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            topY--;
        }
        if (topY >= 0){
            getPosition(x, topY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
        // on the bottom
        while((bottomY <= 12) && (chessBoard[bottomY][x] == 0)){
            getPosition(x, bottomY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            bottomY++;
        }
        if (bottomY <= 13) {
            getPosition(x, bottomY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
    }
    //When the piece is on vertical railroad
    if (((x == 0) && ((y >= 2) && (y <= 12)))||
        ((x == 4) && ((y >= 2) && (y <= 12)))) {
        var topY = y - 1;
        var bottomY = y + 1;
        //on the top
        while((topY >= 2) && (chessBoard[topY][x] == 0)){
            getPosition(x, topY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            topY--;
        }
        if (topY >= 1){
            getPosition(x, topY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
        // on the bottom
        while((bottomY <= 11) && (chessBoard[bottomY][x] == 0)){
            getPosition(x, bottomY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            bottomY++;
        }
        if (bottomY <= 12) {
            getPosition(x, bottomY);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
    }
    //When the piece is on horizontal railroad
    if (((y == 1) && ((x >= 1) && (x <=3)))||
        ((y == 5) && ((x >= 1) && (x <=3)))||
        ((y == 8) && ((x >= 1) && (x <=3)))||
        ((y == 12) && ((x >= 1) && (x <=3)))) {
        var rightX = x + 1;
        var leftX = x - 1;
        //on the right
        while((rightX <= 3) && (chessBoard[y][rightX] == 0)){
            getPosition(rightX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            rightX++;
        }
        if (rightX <= 4) {
            getPosition(rightX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
        //on the left
        while((leftX >= 1) && (chessBoard[y][leftX] == 0)){
            getPosition(leftX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
            leftX--;
        }
        if (leftX >= 0){
            getPosition(leftX, y);
            $(".epieces." + position).attr("ondrop", "drop(event)");
            $(".epieces." + position).attr("ondragover", "allowDrop(event)");
            $(".dead." + position).attr("ondrop", "drop(event)");
            $(".dead." + position).attr("ondragover", "allowDrop(event)");
        }
    }
    if ((y == 1) && ((x >= 1) && (x <=3))) {
        getPosition(x, y - 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
    if ((y == 12) && ((x >= 1) && (x <=3))) {
        getPosition(x, y + 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
    //on middle
    if ((y == 5) && (x == 2)) {
        getPosition(2, 8);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(2, 4);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
    if ((y == 8) && (x == 2)) {
        getPosition(2, 5);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(2, 9);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
    //when the piece is on road
        //When the piece is in campsite
    for (i = 0; i <= 9; i++) {
        if ((x == campsite[i][0]) && (y == campsite[i][1])){
            getPosition(x, y);
            var left = x - 1;
            var top = y - 1;
            var right = x + 1;
            var bottom = y + 1;
            for (x = left; x <= right; x++) {
                for (y = top; y <= bottom; y++) {
                getPosition(x, y);
                $(".epieces." + position).attr("ondrop","drop(event)");
                $(".epieces." +position).attr("ondragover","allowDrop(event)");
                $(".dead." + position).attr("ondrop","drop(event)");
                $(".dead." +position).attr("ondragover","allowDrop(event)");
                }
            }
            getPosition(left+1, top+1);
            $("." + position).removeAttr("ondrop");
            $("." +position).removeAttr("ondragover");
        }
    }
        //When the piece is not in campsite & on top & not on corner
    if ((y == 0) && ((x >= 1) && (x <= 3))) {
        var left = x - 1;
        var right = x + 1;
        for (x = left; x <= right; x++){
            getPosition(x, y);
            $(".epieces." + position).attr("ondrop","drop(event)");
            $(".epieces." +position).attr("ondragover","allowDrop(event)");
            $(".dead." + position).attr("ondrop","drop(event)");
            $(".dead." +position).attr("ondragover","allowDrop(event)");
        }
        getPosition(left + 1, y + 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
        //When the piece is not in campsite & on bottom & not on corner
    if ((y == 13) && ((x >= 1) && (x <= 3))) {
        var left = x - 1;
        var right = x + 1;
        for (x = left; x <= right; x++){
            getPosition(x, y);
            $(".epieces." + position).attr("ondrop","drop(event)");
            $(".epieces." +position).attr("ondragover","allowDrop(event)");
            $(".dead." + position).attr("ondrop","drop(event)");
            $(".dead." +position).attr("ondragover","allowDrop(event)");
        }
        getPosition(left + 1, y - 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
        //When the piece on top-left corner
    if ((x == 0) && (y == 0)){
        getPosition(x + 1, y);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
        //When the piece on top-right corner
    if ((x == 4) && (y == 0)){
        getPosition(x - 1, y);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
        //When the piece on bottom-left corner
    if ((x == 0) && (y == 13)){
        getPosition(x + 1, y);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
        //When the piece on button-right corner
    if ((x == 4) && (y == 13)){
        getPosition(x - 1, y);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }
        //When the piece on other posts
    if (((x == 2) && (y == 2)) ||
        ((x == 1) && (y == 3)) ||
        ((x == 3) && (y == 3)) ||
        ((x == 2) && (y == 4)) ||
        ((x == 2) && (y == 9)) ||
        ((x == 1) && (y == 10)) ||
        ((x == 3) && (y == 10)) ||
        ((x == 2) && (y == 11))) {
        getPosition(x - 1, y);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x + 1, y);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $(".epieces." + position).attr("ondrop","drop(event)");
        $(".epieces." +position).attr("ondragover","allowDrop(event)");
        $(".dead." + position).attr("ondrop","drop(event)");
        $(".dead." +position).attr("ondragover","allowDrop(event)");
    }

}

function battle (targetPiece, draggedPiece, targetPosition, originPosition, tname, dname) {
    if (tname == "road") { //直接换位置
    change (targetPiece, draggedPiece, targetPosition, originPosition);
    }
    
    else if (tname == "boom" || dname == "boom") { //同归于尽
        die (targetPiece, targetPosition);
        die (draggedPiece, originPosition);
    }
    
    else if (tname == "mine") { //是工兵就赢，不是就死
        if (dname == "1") {
        die (targetPiece, targetPosition);
        change (targetPiece, draggedPiece, targetPosition, originPosition);
        }
        else {
        die (draggedPiece, originPosition);
        }  
    }
    
    else if (tname == "flag") { //Game Over
        gameOver ();
    }
    else if (parseInt(dname) > parseInt(tname)) { //玩家大
        die (targetPiece, targetPosition);
        change (targetPiece, draggedPiece, targetPosition, originPosition); 
    }
    
    else if (parseInt(dname) == parseInt(tname)) { //ping
        die (targetPiece, targetPosition);
        die (draggedPiece, originPosition);
    }
    
    else if (parseInt(dname) < parseInt(tname)) { //电脑大
        die (draggedPiece, originPosition);
    }
}

function change (t, d, tp, op) {
    $(t).removeClass(tp);
    $(t).addClass(op);
    $(d).removeClass(op);
    $(d).addClass(tp);
}

function die(piece, position) {
    graveNo++;
    $(piece).removeClass(position);
    if (graveNo <= 10) {
    $("#grave1").append($(piece).clone());//important
    $("#grave1").append("<h6></h6>");
    }
    else if (graveNo <= 20) {
    $("#grave2").append($(piece).clone());//important
    $("#grave2").append("<h6></h6>");
    }
    else if (graveNo <= 30) {
    $("#grave3").append($(piece).clone());//important
    $("#grave3").append("<h6></h6>");
    }
    else if (graveNo <= 40) {
    $("#grave4").append($(piece).clone());//important
    $("#grave4").append("<h6></h6>");
    }
    else if (graveNo <= 50) {
    $("#grave5").append($(piece).clone());//important
    $("#grave5").append("<h6></h6>");
    }
    $(piece).removeAttr("name");
    if ($(piece).hasClass("pieces")) {
        $(piece).removeAttr("draggable");
        $(piece).removeAttr("ondragstart");
        //$(piece).attr("ondrop","drop(event)");
        //$(piece).attr("ondragover","allowDrop(event)");
        $(piece).removeClass("pieces");
        $(piece).addClass("dead");
    }
    if ($(piece).hasClass("epieces")) {
        $(piece).removeClass("epieces");
        $(piece).addClass("dead");
    }
    $(piece).addClass(position);
    $(piece).attr("name","road");
    //getCoordinate(position);
    //chessBoard[y][x] = 0;
}

function gameOver() {
    alert("You win!");
    location.reload();
}

function start() {
    customeTime = window.prompt("Please enter the time limit: (s)", "");
    alert("Now you can place your pieces and fight!\nThe game is on!\nAdd oil!\n\nFor detailed rules, click READ ME button");
    timer();
}

function stop() {
    alert("You choose to stop the game!\nYou played for " + totalTime + " seconds.\nThe page will refresh after you close this window.");
    location.reload();
}

function welcome(){
    alert("Welcome! This is LuZhanQi (Anqi, you cannot see opponent's pieces)!\nYou can place your pieces first and then press Start button to start.\n\nClick READ ME for detailed rules.");
}

function rules() {
    alert("Welcome to the World of LuZhanQi!\n---------------\n\nIntro:\nLuZhanQi is a well known Chines board game. In this game, you play the role of a commander. You have 25 pieces in total. You can move them to destory your enemy!\n\nRules:\n\nYou cannot see opponent's pieces. \nThe order of pieces is: Field Marhsal(司令，General軍長，Major Generals師長，Brigadier Generals旅長，Colonels團長，Majors 營長，Captains連長 ，Lieutenants排長，Engineers工兵. \nWhen encountered, the piece of higher order will destory piece with lower order.\nAnd there are 3 kinds of special pieces: Bombs炸彈，Landmines地雷，Flag軍旗.\nBombs can destory any pieces when interact with another piece, and destory itself at the same time.\nLandmines destory any piece except Engineer who steps on it, and can only be destoryed by Engineers.\nWhen Flag is stepped on by an enemy, the Flag holder lose.\n\n");
    alert("Move Rule: You can move your pieces along lines. But there are two kinds of lines, the light ones are roads while the thick ones are railroads. Your pieces can move freely on a straight railroad if not stopped by other pieces, but can only move one step on roads.\nPiece Placing Rules: You could only play this game after you finishing placing your pieces. Drag and drop to place pieces. The position of enemy pieces won't change. \nFlag can only be placed in one of the two Headquaters大本營. Mines can only be places on the last two rows. Bombs can not be placed on the first row\n\nTips: Place your mines, bombs and engineers first.");
    alert("For the time limit:\nIf you reach time limit, the game won't stop. In stead, you will be nagged to hurry up.\n\nEnjoy!")
}