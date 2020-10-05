//changes when randomly generated
let buttonColours = ['red', 'blue', 'green', 'yellow'];
//the colors that are clicked on are added here 
let userClickedPattern = [];
let level = 0;
let start = false;
let gamePattern = [];

/********* starting sequence **************/
//clicking key to invoke nextSequence function
$(document).keydown(function () {
    if (!start) { //if start is true then invoked nextSequence function and set start variable to false => only want the keyboard key to be pressed for first time
        $('h1').text('Level' + ' ' + level);
        nextSequence();
        start = true;
    }
});

//color that user clicked on
$('.btn').on('click', function () {
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

//function that generates random number to choose random color => button => sound
function nextSequence() {
    userClickedPattern = []; // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    level++; //increase the level variable by 1 everytime the nextSequence is called
    $('h1').text('Level' + ' ' + level); //
    let randomNumber = Math.round(Math.random() * 3); //generate a random number
    let randomChosenColour = buttonColours[randomNumber];//generate a random color using the random number
    gamePattern.push(randomChosenColour); //add the random chosen color to gamePattern variable
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //makes button flash
    playSound(randomChosenColour); // makes button play sound 
}

/***************ANIMATION **********************/

//plays sound - invoked by both click and nextSequence() function
function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

//changes button to grey with a delay
function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

/*****************CHECKING ANSWER ************/

function checkAnswer(currentLevel) {
    //if the userClickedPattern element (at the last index) is equal to the gamePatten at that same index - so if comp is yellow then we click yellow (both yellow at index 0).   Also both have same length of 1 (yellow) so this invokes nextSequence() and comp generates green and user's array is wiped clean. user clicks yellow (to match first yellow click). checkAnswer is invoked. both have yellow at index 0. but their length is not the same as comp has array yellow and green and user just has yellow. so the if statement (to invoked nextSequence) is not triggered. Then the user clicks green. checkAnswer is invoked. both have green at index 1. both have same length of 2. so nextSequence is triggered again. blue is generated and user's array is wiped clean. and so it goes on.   
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        //if both sequences have the same length - meaning that we have clicked and copied the random generated color by the computer 
        if (userClickedPattern.length === gamePattern.length) {
            //set time out to invoke nextSequence()
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else { // game over!
        //change h1 text to 'game over'
        $('h1').text('Game Over, Press Any Key to Restart');
        //play the game over sound
        playSound('wrong');
        //add the class 'game-over'
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

/********** START OVER **********/
function startOver() {
    userClickedPattern = [];
    level = 0;
    start = false;
    gamePattern = [];

}





