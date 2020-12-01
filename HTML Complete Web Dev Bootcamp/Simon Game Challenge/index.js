var buttonColours = ["red", "blue", "green", "yellow"];
var level = 1;
var started = false;

var gamePattern = [];
var userClickedPattern = [];

$(document).on("keypress", function() {
   if(!started) {
        $("#level-title").text("Level " + level);
        chooseOne();
        started = true;
   }
});     

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          chooseOne();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function chooseOne() {
    userClickedPattern = [];
    $("#level-title").text("Level " + level);
    level++;
    var colour = Math.floor(Math.random() * 4);
    playSound(buttonColours[colour]);
    animatePress(buttonColours[colour]);
    gamePattern.push(buttonColours[colour]);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },80)
}

function playSound(currentColor) {
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}   

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
  }
