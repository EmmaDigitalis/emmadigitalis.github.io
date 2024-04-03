var board = [
    ["rook-w", "knight-w", "bishop-w", "queen-w", "king-w", "bishop-w", "knight-w", "rook-w"],
    ["pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b"],
    ["rook-b", "knight-b", "bishop-b", "queen-b", "king-b", "bishop-b", "knight-b", "rook-b"]
]

var turn = 0;

var targets = [];
var clicked = "";

function generateBoard() {
    for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board[r].length; c++) {
            var target = $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(c) + "]");
            if (board[r][c] != "") {
                placePiece(board[r][c], target);
            }
        }
    }
    $(".blackwin").removeClass("blackwin");
    $(".whitewin").removeClass("whitewin");
}

function placePiece(piece, tile) {
    var vPiece = piece;
    var vTile = tile;

    switch (vPiece) {
        case ("pawn-w"):
            vTile.html('<i class="fa-regular fa-chess-pawn"></i>');
            break;
        case ("pawn-b"):
            vTile.html('<i class="fa-solid fa-chess-pawn"></i>');
            break;
        case ("rook-w"):
            vTile.html('<i class="fa-regular fa-chess-rook"></i>');
            break;
        case ("rook-b"):
            vTile.html('<i class="fa-solid fa-chess-rook"></i>');
            break;
        case ("knight-w"):
            vTile.html('<i class="fa-regular fa-chess-knight"></i>');
            break;
        case ("knight-b"):
            vTile.html('<i class="fa-solid fa-chess-knight"></i>');
            break;
        case ("bishop-w"):
            vTile.html('<i class="fa-regular fa-chess-bishop"></i>');
            break;
        case ("bishop-b"):
            vTile.html('<i class="fa-solid fa-chess-bishop"></i>');
            break;
        case ("queen-w"):
            vTile.html('<i class="fa-regular fa-chess-queen"></i>');
            break;
        case ("queen-b"):
            vTile.html('<i class="fa-solid fa-chess-queen"></i>');
            break;
        case ("king-w"):
            vTile.html('<i class="fa-regular fa-chess-king"></i>');
            break;
        case ("king-b"):
            vTile.html('<i class="fa-solid fa-chess-king"></i>');
            break;
    }

    updateTurn(0)
}

generateBoard();

function setSize() {
    if ($(window).width() / $(window).height() > 1) {
        $('.tile').css({
            "width": "9vh",
            "height": "9vh"
        });
        $('i').css("font-size", "5vh");
    } else {
        $('.tile').css({
            "width": "9vw",
            "height": "9vw"
        });
        $('i').css("font-size", "5vw");
    }
}

setSize();
$(window).resize(function () {
    setSize();
})

function previewMove(tile) {
    var t = tile;

    var r = $(t).attr("data-row");
    var c = $(t).attr("data-col");

    if (board[r][c] != "") {
        var piece = board[r][c];
        if (turn % 2 == 0) {
            switch (piece) {
                case "pawn-w":
                    pawnCheck(r, c, 1);
                    break;
                case "rook-w":
                    rookCheck(r, c);
                    break;
                case "knight-w":
                    knightCheck(r, c);
                    break;
                case "bishop-w":
                    bishopCheck(r, c);
                    break;
                case "queen-w":
                    queenCheck(r, c);
                    break;
                case "king-w":
                    kingCheck(r, c);
                    break;
            }
        } else {
            switch (piece) {
                case "pawn-b":
                    pawnCheck(r, c, -1);
                    break;
                case "rook-b":
                    rookCheck(r, c);
                    break;
                case "knight-b":
                    knightCheck(r, c);
                    break;
                case "bishop-b":
                    bishopCheck(r, c);
                    break;
                case "queen-b":
                    queenCheck(r, c);
                    break;
                case "king-b":
                    kingCheck(r, c);
                    break;
            }
        }
    }
}

$(".tile").on("mouseleave", function () {
    $(".preview").removeClass("preview");
    $(".target").removeClass("target");
    if (clicked == "") {
        targets = [];
    }
})

$(".tile").on("mouseenter", function () {
    previewMove(this);
})


function startMove(tile) {
    var t = tile;

    var r = $(t).attr("data-row");
    var c = $(t).attr("data-col");

    if (targets.length == 0) {
        if (turn % 2 == 0) {
            if (board[r][c].includes("-w")) {
                clicked = String(r) + String(c);
                $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(c) + "]>i").addClass("currentPiece");
                var amount = $(".preview").length;
                for (i = 0; i < amount; i++) {
                    targets.push($(".preview").eq(i));
                }
                $("#cancel").removeClass("hide");
                $("#board").addClass("selected");
                $(".preview").addClass("potential");

            }
        }
    }
}


//Clicking pieces
$(".tile").on("click", function () {
    if ($(this).hasClass("potential") || $(this).hasClass("hit")) {
        movePiece(this);
    } else {
        startMove(this);
    }
})

function startMove(tile) {
    var t = tile;

    var r = $(t).attr("data-row");
    var c = $(t).attr("data-col");

    if ((turn % 2 == 0 && board[r][c].includes("-w")) || (turn % 2 != 0 && board[r][c].includes("-b"))) {
        //Clear previous selection
        resetMoves();

        //Create new selection
        clicked = String(r) + String(c);
        $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(c) + "]>i").addClass("currentPiece");
        var amount = $(".preview").length;
        for (i = 0; i < amount; i++) {
            targets.push($(".preview").eq(i));
        }
        $("#cancel").removeClass("hide");
        $("#board").addClass("selected");
        $(".preview").addClass("potential");
        $(".target").addClass("hit");
    }
}

//Moving pieces
function movePiece(tile) {
    var t = tile;

    var r = $(t).attr("data-row");
    var c = $(t).attr("data-col");

    board[r][c] = board[clicked[0]][clicked[1]];
    board[clicked[0]][clicked[1]] = "";

    $("div.tile[data-row|=" + String(clicked[0]) + "][data-col|=" + String(clicked[1]) + "]").html("");
    var target = $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(c) + "]");
    placePiece(board[r][c], target);
    updateTurn(1);
    setSize();
    resetMoves();
    winCheck();
}

//Update turn display
function updateTurn(increment) {
    let i = increment;

    turn += i;
    var turnString;
    if (turn % 2 == 0) {
        turnString = "White";
    } else {
        turnString = "Black";
    }
    $("#turn").html("Turn " + String(turn + 1) + ": It is now " + turnString + "'s turn.");
}

//Update turn display
function winCheck() {
    var blackKing = 0;
    var whiteKing = 0;
    
    for (let i = 0; i < board.length; i++){
        if (board[i].indexOf("king-b") == -1){
            blackKing++;
        }
    }
    for (let i = 0; i < board.length; i++){
        if (board[i].indexOf("king-w") == -1){
            whiteKing++;
        }
    }
    
    if (blackKing > 7){
        alert("White Wins!")
        $("#board").addClass("whitewin");
    }
    if (whiteKing > 7){
        alert("Black Wins!")
        $("#board").addClass("blackwin");
    }
}

//Reset the currently available moves
function resetMoves() {
    $(".selected").removeClass("selected");
    $(".potential").removeClass("potential");
    $(".hit").removeClass("hit");
    $(".currentPiece").removeClass("currentPiece");
    clicked = "";
    targets = [];
    $("#cancel").addClass("hide");
}

$("#cancel").on("click", function () {
    resetMoves();
})

function resetGame(){
    $(".tile").html("");

    board = [
        ["rook-w", "knight-w", "bishop-w", "queen-w", "king-w", "bishop-w", "knight-w", "rook-w"],
        ["pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w", "pawn-w"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b", "pawn-b"],
        ["rook-b", "knight-b", "bishop-b", "queen-b", "king-b", "bishop-b", "knight-b", "rook-b"]
    ]
    
    turn = 0;
    
    targets = [];
    clicked = "";

    generateBoard();
    setSize();
}

$("#reset").on("click", function () {
    resetGame();
})

























//List of movement checkers
function pawnCheck(row, column, direction) {
    var r = parseInt(row);
    var c = parseInt(column);
    var d = parseInt(direction);

    if (r + d < 8 && r + d > -1) {
        if (board[r + d][c] == "") {
            $("div.tile[data-row|=" + String(r + d) + "][data-col|=" + String(c) + "]").addClass("preview");
        }
        if (turn % 2 == 0){
            if (board[r + (d*2)][c] == "" && r == 1) {
                $("div.tile[data-row|=" + String(r + (d*2)) + "][data-col|=" + String(c) + "]").addClass("preview");
            }
        }else{
            if (board[r + (d*2)][c] == "" && r == 6) {
                $("div.tile[data-row|=" + String(r + (d*2)) + "][data-col|=" + String(c) + "]").addClass("preview");
            }
        }

        if (c + 1 < 8) {
            if ((turn % 2 == 0 && board[r + d][c + 1].includes("-b")) || (turn % 2 != 0 && board[r + d][c + 1].includes("-w"))) {
                $("div.tile[data-row|=" + String(r + d) + "][data-col|=" + String(c + 1) + "]").addClass("target");
            }
        }
        if (c - 1 > -1) {
            if ((turn % 2 == 0 && board[r + d][c - 1].includes("-b")) || (turn % 2 != 0 && board[r + d][c - 1].includes("-w"))) {
                $("div.tile[data-row|=" + String(r + d) + "][data-col|=" + String(c - 1) + "]").addClass("target");
            }
        }
    }
}

function rookCheck(row, column) {
    var r = parseInt(row);
    var c = parseInt(column);

    for (let i = r - 1; i > -1; i--) {
        if (board[i][c] == "") {
            $("div.tile[data-row|=" + String(i) + "][data-col|=" + String(c) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[i][c].includes("-b")) || (turn % 2 != 0 && board[i][c].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(i)) + "][data-col|=" + String(parseInt(c)) + "]").addClass("target");
            }
            break;
        }
    }

    for (let i = r + 1; i < 8; i++) {
        if (board[i][c] == "") {
            $("div.tile[data-row|=" + String(i) + "][data-col|=" + String(c) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[i][c].includes("-b")) || (turn % 2 != 0 && board[i][c].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(i)) + "][data-col|=" + String(parseInt(c)) + "]").addClass("target");
            }
            break;
        }
    }

    for (let i = c - 1; i > -1; i--) {
        if (board[r][i] == "") {
            $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(i) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[r][i].includes("-b")) || (turn % 2 != 0 && board[r][i].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(r)) + "][data-col|=" + String(parseInt(i)) + "]").addClass("target");
            }
            break;
        }
    }

    for (let i = c + 1; i < 8; i++) {
        if (board[r][i] == "") {
            $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(i) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[r][i].includes("-b")) || (turn % 2 != 0 && board[r][i].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(r)) + "][data-col|=" + String(parseInt(i)) + "]").addClass("target");
            }
            break;
        }
    }
}

function knightCheck(row, column) {
    var r = parseInt(row);
    var c = parseInt(column);

    if (r + 2 < 8 && c + 1 < 8) {
        if (board[r + 2][c + 1] === "") {
            $("div.tile[data-row|=" + String(r + 2) + "][data-col|=" + String(c + 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r + 2][c + 1].includes("-b")) || (turn % 2 != 0 && board[r + 2][c + 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) + 2) + "][data-col|=" + String(parseInt(c) + 1) + "]").addClass("target");
        }
    }
    if (r + 2 < 8 && c - 1 > -1) {
        if (board[r + 2][c - 1] == "") {
            $("div.tile[data-row|=" + String(r + 2) + "][data-col|=" + String(c - 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r + 2][c - 1].includes("-b")) || (turn % 2 != 0 && board[r + 2][c - 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) + 2) + "][data-col|=" + String(parseInt(c) - 1) + "]").addClass("target");
        }
    }
    if (r - 2 > -1 && c + 1 < 8) {
        if (board[r - 2][c + 1] == "") {
            $("div.tile[data-row|=" + String(r - 2) + "][data-col|=" + String(c + 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r - 2][c + 1].includes("-b")) || (turn % 2 != 0 && board[r - 2][c + 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) - 2) + "][data-col|=" + String(parseInt(c) + 1) + "]").addClass("target");
        }
    }
    if (r - 2 > -1 && c - 1 > -1) {
        if (board[r - 2][c - 1] == "") {
            $("div.tile[data-row|=" + String(r - 2) + "][data-col|=" + String(c - 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r - 2][c - 1].includes("-b")) || (turn % 2 != 0 && board[r - 2][c - 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) - 2) + "][data-col|=" + String(parseInt(c) - 1) + "]").addClass("target");
        }
    }

    if (r + 1 < 8 && c + 2 < 8) {
        if (board[r + 1][c + 2] === "") {
            $("div.tile[data-row|=" + String(r + 1) + "][data-col|=" + String(c + 2) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r + 1][c + 2].includes("-b")) || (turn % 2 != 0 && board[r + 1][c + 2].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) + 1) + "][data-col|=" + String(parseInt(c) + 2) + "]").addClass("target");
        }
    }
    if (r + 1 < 8 && c - 2 > -1) {
        if (board[r + 1][c - 2] == "") {
            $("div.tile[data-row|=" + String(r + 1) + "][data-col|=" + String(c - 2) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r + 1][c - 2].includes("-b")) || (turn % 2 != 0 && board[r + 1][c - 2].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) + 1) + "][data-col|=" + String(parseInt(c) - 2) + "]").addClass("target");
        }
    }
    if (r - 1 > -1 && c + 2 < 8) {
        if (board[r - 1][c + 2] == "") {
            $("div.tile[data-row|=" + String(r - 1) + "][data-col|=" + String(c + 2) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r - 1][c + 2].includes("-b")) || (turn % 2 != 0 && board[r - 1][c + 2].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) - 1) + "][data-col|=" + String(parseInt(c) + 2) + "]").addClass("target");
        }
    }
    if (r - 1 > -1 && c - 2 > -1) {
        if (board[r - 1][c - 2] == "") {
            $("div.tile[data-row|=" + String(r - 1) + "][data-col|=" + String(c - 2) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r - 1][c - 2].includes("-b")) || (turn % 2 != 0 && board[r - 1][c - 2].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) - 1) + "][data-col|=" + String(parseInt(c) - 2) + "]").addClass("target");
        }
    }
}

function bishopCheck(row, column) {
    var r = parseInt(row);
    var c = parseInt(column);

    var up = r+1;
    var left = c+1;
    var down = 8 - r;
    var right = 8 - c;

    for (let i = 1; i < up && i < left; i++) {
        if (board[r - i][c - i] == "") {
            $("div.tile[data-row|=" + String(r - i) + "][data-col|=" + String(c - i) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[r - i][c - i].includes("-b")) || (turn % 2 != 0 && board[r - i][c - i].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(r) - i) + "][data-col|=" + String(parseInt(c) - i) + "]").addClass("target");
            }
            break;
        }
    }

    for (let i = 1; i < up && i < right; i++) {
        if (board[r - i][c + i] == "") {
            $("div.tile[data-row|=" + String(r - i) + "][data-col|=" + String(c + i) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[r - i][c + i].includes("-b")) || (turn % 2 != 0 && board[r - i][c + i].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(r) - i) + "][data-col|=" + String(parseInt(c) + i) + "]").addClass("target");
            }
            break;
        }
    }

    for (let i = 1; i < down && i < left; i++) {
        if (board[r + i][c - i] == "") {
            $("div.tile[data-row|=" + String(r + i) + "][data-col|=" + String(c - i) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[r + i][c - i].includes("-b")) || (turn % 2 != 0 && board[r + i][c - i].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(r) + i) + "][data-col|=" + String(parseInt(c) - i) + "]").addClass("target");
            }
            break;
        }
    }

    for (let i = 1; i < down && i < right; i++) {
        if (board[r + i][c + i] == "") {
            $("div.tile[data-row|=" + String(r + i) + "][data-col|=" + String(c + i) + "]").addClass("preview");
        } else {
            if ((turn % 2 == 0 && board[r + i][c + i].includes("-b")) || (turn % 2 != 0 && board[r + i][c + i].includes("-w"))) {
                $("div.tile[data-row|=" + String(parseInt(r) + i) + "][data-col|=" + String(parseInt(c) + i) + "]").addClass("target");
            }
            break;
        }
    }
}

function queenCheck(row, column) {
    bishopCheck(row, column);
    rookCheck(row, column);
}

function kingCheck(row, column) {
    var r = parseInt(row);
    var c = parseInt(column);

    if (r + 1 < 8) {
        if (board[r + 1][c] === "") {
            $("div.tile[data-row|=" + String(r + 1) + "][data-col|=" + String(c) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r + 1][c].includes("-b")) || (turn % 2 != 0 && board[r + 1][c].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) + 1) + "][data-col|=" + String(parseInt(c)) + "]").addClass("target");
        }
    }
    if (r - 1 > -1) {
        if (board[r - 1][c] == "") {
            $("div.tile[data-row|=" + String(r - 1) + "][data-col|=" + String(c) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r - 1][c].includes("-b")) || (turn % 2 != 0 && board[r - 1][c].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) - 1) + "][data-col|=" + String(parseInt(c)) + "]").addClass("target");
        }
    }
    if (c + 1 < 8) {
        if (board[r][c + 1] == "") {
            $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(c + 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r][c + 1].includes("-b")) || (turn % 2 != 0 && board[r][c + 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r)) + "][data-col|=" + String(parseInt(c) + 1) + "]").addClass("target");
        }
    }
    if (c - 1 > -1) {
        if (board[r][c - 1] == "") {
            $("div.tile[data-row|=" + String(r) + "][data-col|=" + String(c - 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r][c - 1].includes("-b")) || (turn % 2 != 0 && board[r][c - 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r)) + "][data-col|=" + String(parseInt(c) - 1) + "]").addClass("target");
        }
    }

    if (r + 1 < 8 && c + 1 < 8) {
        if (board[r + 1][c + 1] === "") {
            $("div.tile[data-row|=" + String(r + 1) + "][data-col|=" + String(c + 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r + 1][c + 1].includes("-b")) || (turn % 2 != 0 && board[r + 1][c + 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) + 1) + "][data-col|=" + String(parseInt(c) + 1) + "]").addClass("target");
        }
    }
    if (r + 1 < 8 && c - 1 > -1) {
        if (board[r + 1][c - 1] == "") {
            $("div.tile[data-row|=" + String(r + 1) + "][data-col|=" + String(c - 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r + 1][c - 1].includes("-b")) || (turn % 2 != 0 && board[r + 1][c - 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) + 1) + "][data-col|=" + String(parseInt(c) - 1) + "]").addClass("target");
        }
    }
    if (r - 1 > -1 && c + 1 < 8) {
        if (board[r - 1][c + 1] == "") {
            $("div.tile[data-row|=" + String(r - 1) + "][data-col|=" + String(c + 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r - 1][c + 1].includes("-b")) || (turn % 2 != 0 && board[r - 1][c + 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) - 1) + "][data-col|=" + String(parseInt(c) + 1) + "]").addClass("target");
        }
    }
    if (r - 1 > -1 && c - 1 > -1) {
        if (board[r - 1][c - 1] == "") {
            $("div.tile[data-row|=" + String(r - 1) + "][data-col|=" + String(c - 1) + "]").addClass("preview");
        }
        if ((turn % 2 == 0 && board[r - 1][c - 1].includes("-b")) || (turn % 2 != 0 && board[r - 1][c - 1].includes("-w"))) {
            $("div.tile[data-row|=" + String(parseInt(r) - 1) + "][data-col|=" + String(parseInt(c) - 1) + "]").addClass("target");
        }
    }
}