var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//starting the game
$("body").keydown(function() {
  if (!started) {
    $("h1").text("level " + level);
    nextSequence();
    started = true;
  }
});

//generating random color
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonAnimation(randomChosenColor);
  playSound(randomChosenColor);
}

//user choosen colors
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  buttonAnimation(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//checking user chosen sequence
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
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

//starting over a new game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//animation
function buttonAnimation(color) {
  document.querySelector("." + color).classList.add("pressed");
  setTimeout(function() {
    document.querySelector("." + color).classList.toggle("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
