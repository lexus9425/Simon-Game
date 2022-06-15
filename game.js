// Creates an array with the colors red, blue, green and yellow
var buttonColors = ["red", "blue", "green", "yellow"];

// Creates an empty array that will store the game pattern
var gamePattern = [];

// Creates an empty array that will store the user clicked pattern
var userClickedPattern = [];

// 
var started = false;

//
var level = 0;

// function that 
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    // Creates a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
    
    // Uses random number between 0 and 3 to select a color from the buttonColors array
    var randomChosenColor = buttonColors[randomNumber];

    // Adds randomly chosen color to the gamePattern array
    gamePattern.push(randomChosenColor);

    // Causes button to fade in and out
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

//
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

// Plays sound associated with chosen color
function playSound(name) {

    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

// Adds pressed class to button
function animatePress(currentColor) {
    
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//
$(document).keypress(function() {

    if (!started) {
        
        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

       if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                
                nextSequence();
            }, 1000);
       }
    } else {

        playSound("wrong");

        $("body").addClass("game-over");

        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {

    level = 0;

    gamePattern = [];

    started = false;
}