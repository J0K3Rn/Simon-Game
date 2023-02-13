var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var randomChosenColor;
var gameStarted = false;
var gameOver = false;
var level = 0;
var highScore = 0;

var userClickPattern = [];
var userClickCounter = 0;

$('.btn').click(function () {
    var id = $(this).attr('id');
    userChosenColor(id);
});

$(document).keydown(function () {
    if (gameStarted === false) {
        gameStart();
    } else if (gameStarted === true && gameOver === true) {
        gameReset();
        gameStart();
    }
});

function gameStart() {
    gameStarted = true;
    nextSequence();
}

function gameLose() {
    gameOver = true;
    var loseSound = new Audio('sounds/wrong.mp3');
    loseSound.play();
    $('body').addClass('game-over'); //toggle css class
    setTimeout(function () {
        $('body').removeClass("game-over"); //untoggle css class
    }, 200);
    $('h1').text("GAME OVER");
    $('h6').text("Press Any Key to Restart");
}

function gameReset() {
    $('h6').text("");
    gamePattern = [];
    level = 0;
    gameOver = false;
    userClickPattern = [];
    userClickCounter = 0;
}

function checkAnswer() {
    if (userClickPattern[userClickCounter] !== gamePattern[userClickCounter]) {
        console.log("Incorrect");
        gameLose();
        return;
    } else {
        console.log("Correct");
    }
    userClickCounter++;
    if (userClickCounter == level) {
        if (level > highScore) {
            highScore = level;
            $('h2').text("High Score: " + highScore);
        }
        console.log("Reset");
        userClickCounter = 0;
        userClickPattern = [];
        setTimeout(() => {
            nextSequence();
        },500);
    }
}

function nextSequence() {
    randomChosenColor = buttonColors[randomColor()]
    gamePattern.push(randomChosenColor);
    flashColor(randomChosenColor);
    level++;
    $('h1').text("Level " + level);
}

function randomColor() {
    var ranColor = Math.floor(Math.random() * 4);
    return ranColor;
}

function flashColor(color) {
    $('#' + color).addClass('pressed'); //toggle css class
    var colorSound = new Audio('sounds/' + color + '.mp3');
    colorSound.play();
    setTimeout(function () {
        $('#' + color).removeClass("pressed"); //untoggle css class
    }, 100);
}

function userChosenColor(color) {
    flashColor(color);
    userClickPattern.push(color);
    checkAnswer();
}