var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];

var blueSound = new Audio("sounds/blue.mp3");
var greenSound = new Audio("sounds/green.mp3");
var redSound = new Audio("sounds/red.mp3");
var yellowSound = new Audio("sounds/yellow.mp3");
var wrongSound = new Audio("sounds/wrong.mp3");

var level = 0;
var userClickCounter = 0;

function nextSequence() {
  level++;
  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);

  $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
  playSound(buttonColors[randomNumber]);
}

$(".btn").on("click", function() {
  if (level > 0) {
    // get which button was clicked
    var userColor = $(this).attr("id");

    // check if the user clicked the right sequence
    if (userColor === gamePattern[userClickCounter]) {
      // if right button was pressed play sound and animation
      playSound(userColor);
      $("#" + userColor).addClass("pressed");
      setTimeout(function() {
        $("#" + userColor).removeClass("pressed");
      }, 100);
      userClickCounter++;
      if (userClickCounter === gamePattern.length) { // user got the whole sequence right, add new sequence and up a level
        userClickCounter = 0;
        setTimeout(function() {
          nextSequence()
        }, 700);
      }

    } else if (userColor !== gamePattern[userClickCounter]) {
      // user made a mistake
      playSound("wrong");
      $("body").addClass("game-over");

      // reset game parameters
      $("h1").html("Whomp Whomp :( Game Over. Please press any key to start a new game");
      level = 0;
      userClickCounter = 0;
      gamePattern = [];
    }
  }
});

$(document).on("keydown", function() {
  if (level === 0) {
    $("body").removeClass("game-over");
    setTimeout(function() {
      nextSequence()
    }, 700);
  }
});

function playSound(color) {
  switch (color) {
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "red":
      redSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "wrong":
      wrongSound.play();
      break;
    default:
      console.log(color);
  }
}
