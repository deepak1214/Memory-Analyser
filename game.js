var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$(".btn").on("click",function(key){
    
    var userChosenColor = key.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
});
$(document).on("keydown",function(){
    if(!started)
    {
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence,1000);
        }
    }
    else {
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
    }

}
    
function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var buttonColours = ["red","blue","green","yellow"];
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(nameOfSound) {
    var loc = "sounds/" + nameOfSound + ".mp3";
    var audio = new Audio(loc);
    audio.play();
}
function animatePress(currentColour) {
    
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);

}
function startOver() {
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    started=false;
      
}