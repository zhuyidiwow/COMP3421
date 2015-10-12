var originPosition;
var targetPosition;
var timeoutID1, timeoutID2;
var position;
var color;
var x = 0, y = 0, i, j, k, l;
var size = 5;
var difficulty;
var timeLimit = 0;
var timeCost = 0;
var count = 0;
var t;

var gem6 = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]];

var gem8= [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]];

var gem = gem6;

function start() {
    var input1 = window.prompt("Welcome to the Gemz Game!\n\n\nIn this game, you can drag and drop gemz to eliminate them.\nThe more you eliminate during the time, the highr your score!\n\nPlease input the size of board first\n'6'  for 6x6 board and '8' for 8x8 board\n\n","");
    size = parseInt(input1) - 1;
    if (size == 5) {
        gem = gem6;
        $("#8board").css("display", "none");
        $("#intro").css("left", "500px");
    }
    else if (size == 7) {
        gem = gem8;
        $("#6board").css("display", "none");
        $("#intro").css("left", "650px");
    }
    else {
        alert("Sorry, wrong input. Please input again.");
        start();
    }
    
    var input2 = window.prompt("Good choice!\nThen select the difficulty:\n1.Nightmare\n2.Advanced\n3.Intermediate\n4.Relaxing\n5.Beginner\nJust input the numbers! eg: 1","");
    difficulty = parseInt(input2);
    if (difficulty == 1){
        timeLimit = 20;
    }
    else if (difficulty == 2){
        timeLimit = 40;
    }
    else if (difficulty == 3){
        timeLimit = 60;
    }
    else if (difficulty == 4){
        timeLimit = 200;
    }
    else if (difficulty == 5){
        timeLimit = 1000;
    }
    else {
        alert("Sorry, wrong input. Please input again.");
        start();
    }
    initial();
    timer();
}

function initial() {
    for (i = 0; i <= size; i++) {
        for (j = 0; j <= size; j++) {
            getPosition(i, j);
            
            if (gem[i][j] == 0) {
                color = Math.floor(4*Math.random());
                if (color == 0) {
                    $("." + position).attr("name","0");
                    $("." + position).attr("src","0red.jpg");
                }
                else if (color == 1) {
                    $("." + position).attr("name","1");
                    $("." + position).attr("src","1yellow.jpg");
                }
                else if (color == 2) {
                    $("." + position).attr("name","2");
                    $("." + position).attr("src","2blue.jpg");
                }
                else if (color == 3) {
                    $("." + position).attr("name","3");
                    $("." + position).attr("src","3green.jpg");
                }
                gem[i][j] = 1;
            }
            
            $("." + position).removeAttr("ondrop");
            $("." + position).removeAttr("ondragover");
            //may have problem
        }
    }
    window.clearTimeout(timeoutID2);
//遍历所有position，遍历所有position，如果对应位置空着，随机出name，根据name加src，改gem；
//遍历所有position，removeattr("ondrop"),removeattr("ondragover")
}

function reArrange() {
    for (i = (size-1); i >= 0; i--) {
        for (j = 0; j <= size; j++) {
            var bottom = 0;
            if (gem[i][j] == 1){
                bottom = i + 1;
                while ((bottom <= size) && (gem[bottom][j] == 0)) {
                    bottom++;
                }
                bottom -= 1;
                if (bottom != i) {
                    getPosition(i, j);
                    draggedPiece = $("." + position);
                    $(draggedPiece).removeClass(position);
                    getPosition(bottom, j);
                    targetPiece = $("." + position);
                    $(draggedPiece).addClass(position);
                    $(targetPiece).removeClass(position);
                    getPosition(i, j);
                    $(targetPiece).addClass(position);
                    gem[bottom][j] = 1;
                    gem[i][j] = 0;
                }
            }
        }
    }
    window.clearTimeout(timeoutID1);
}

function searchGem(i, j) {
    var topX = i;
    var bottomX = i + 1;
    var leftY = j;
    var rightY = j + 1;
    var verticalCount = 0;
    var horizontalCount = 0;
    getPosition(i, j);
    var name = $("." + position).attr("name");
    var curName;
    if (bottomX > size) {
        bottomX = size;
        verticalCount -= 1;
    }
    if (rightY > size) {
        rightY = size;
        horizontalCount -= 1;
    }

    getPosition(topX, j);
    curName = $("." + position).attr("name");
    while ((topX >= 0) && (curName == name)) {
        verticalCount += 1;
        topX--;
        if (topX >= 0) {
            getPosition(topX, j);
            curName = $("." + position).attr("name");
        }
        else {
            break;
        }
    }
    topX += 1;

    getPosition(bottomX, j);
    curName = $("." + position).attr("name");
    while ((bottomX <= size) && (curName == name)) {
        verticalCount += 1;
        bottomX++;
        if (bottomX <= size) {
            getPosition(bottomX, j);
            curName = $("." + position).attr("name");
        }
        else {
            break;
        }
    }
    bottomX -= 1;

    getPosition(i, leftY);
    curName = $("." + position).attr("name");
    while ((leftY >= 0) && (curName == name)) {
        horizontalCount += 1;
        leftY--;
        if (leftY >= 0) {
            getPosition(i, leftY);
            curName = $("." + position).attr("name");
        }
        else {
            break;
        }
    }
    leftY += 1;

    getPosition(i, rightY);
    curName = $("." + position).attr("name");
    while ((rightY <= size) && (curName == name)) {
        horizontalCount += 1;
        rightY++;
        if (rightY <= size) {
            getPosition(i, rightY);
            curName = $("." + position).attr("name");
        }
        else {
            break;
        }
    }
    rightY -= 1;

    if (verticalCount >= 3) {
        for (k = topX; k <= bottomX; k++) {
            getPosition(k, j)
            $("." + position).removeAttr("name");
            $("." + position).removeAttr("src");
            gem[k][j] = 0;
        }
        count += 1;
    }
                
    if (horizontalCount >= 3) {
        for (l = leftY; l <= rightY; l++) {
            getPosition(i, l)
            $("." + position).removeAttr("name");
            $("." + position).removeAttr("src");
            gem[i][l] = 0;
        }
        count += 1;
    } 
}

function drag(ev) {
    originPosition = ev.target.className.split(' ')[1];
    draggedPiece = ev.target;
    getCoordinate (originPosition);
    findDroppable (x, y);
}
    
function allowDrop(ev) {
    ev.preventDefault();
}
    
function drop(ev) {
    ev.preventDefault();
    targetPosition = ev.target.className.split(' ')[1];
    targetPiece = ev.target;
    $(targetPiece).removeClass(targetPosition);
    $(targetPiece).addClass(originPosition);
    $(draggedPiece).removeClass(originPosition);
    $(draggedPiece).addClass(targetPosition);
    getCoordinate(targetPosition);
    searchGem(x, y);
    getCoordinate(originPosition);
    searchGem(x, y);
    timeoutID1 = window.setTimeout(reArrange, 400);
    timeoutID2 = window.setTimeout(initial, 400);
    //timeoutID = window.setTimeout(initial, 1000);
}

function findDroppable(x, y) {
    //corner
        //top-left
    if ((x == 0) && (y == 0)) {
        getPosition(x + 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
        //top-right
    if ((x == 0) && (y == size)) {
        getPosition(x, y - 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x + 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
        //bot-left
    if ((x == size) && (y == 0)) {
        getPosition(x - 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
        //bot-right
    if ((x == size) && (y == size)) {
        getPosition(x - 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
    //top
    if ((x == 0) && ((y >= 1) && (y <= (size - 1)))) {
        getPosition(x + 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
    //left
    if (((x >= 1) && (x <= (size-1))) && (y == 0)) {
        getPosition(x + 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x - 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
    //bot
    if ((x == size) && ((y >= 1) && (y <= (size - 1)))) {
        getPosition(x - 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
    //right
    if (((x >= 1) && (x <= (size-1))) && (y == size)) {
        getPosition(x, y - 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x - 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x + 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
    //other
    if ( ((x >= 1) && (x <= (size - 1))) && ((y >= 1) && (y <= (size - 1))) ) {
        getPosition(x - 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x + 1, y);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y - 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
        getPosition(x, y + 1);
        $("." + position).attr("ondrop","drop(event)");
        $("." + position).attr("ondragover","allowDrop(event)");
    }
}

function change (t, d, tp, op) {
    $(t).removeClass(tp);
    $(t).addClass(op);
    $(d).removeClass(op);
    $(d).addClass(tp);
}

function getCoordinate (position) {
    var arr = position.split("");
    x = parseInt(arr[1]);
    y = parseInt(arr[2]);
}

function getPosition (x, y) {
    position = "p" + x + y;
}

function timer(){    
    document.getElementById("timeLimit").innerHTML = timeLimit + "s";
    document.getElementById("timeCost").innerHTML = timeCost + "s";
    timeCost += 1;
    t = setTimeout("timer()",1000);
    if (timeCost >= timeLimit) {
        stop();
    }
}

function reset() {
    alert("You choose to reset the game!\nYou played for " + timeCost + " seconds.\nYou eliminated: " + count + "set of gems.\nThe page will refresh after you close this window.");
    location.reload();
}

function stop() {
    alert("Time is up!\nYou played for " + timeCost + " seconds.\nYou eliminated: " + count + "set of gems.\nThe page will refresh after you close this window.");
    location.reload();
}

function rules() {
    alert("Welcome to the World of Gemz!\n\nIn this game you play the role of a miner. You should try your best to collect gems!(Eliminate them in the game!)\n\nRules:\n1. The gems won't eliminate themselves, you need to drage and drop!\n2. You can only drag an gem to its adjascent position in one step.\n3. After you drop the gem, it will disappear with adjacent gems if there are three gems in the same line or row with the same color\n4. After the gems are eliminated, the gems above will settle down and new gems will appear at the top.\n\n");
    alert("Settings:\n\n1. You can choose whether to use 6x6 board or 8x8 board, reset to change\n2. You can choose one difficulty from 5 difficulties, from nightmare to beginner Reset to change difficulty");
}