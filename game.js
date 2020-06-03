var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var keyPress = 0;
var highScore = 0;


$(".btn").on("click", function()
 {



   var userChosenColor = this.id;
   userClickedPattern.push(userChosenColor);



     var answer = userClickedPattern.length - 1;
     var result = checkAnswer(answer);


   if (result === false)
                {
                    playSound("wrong")
                    resetGame();


                  }
    if (result === true ) {
      playSound(userChosenColor);
      animatePress(userChosenColor);
      if ( answer === (gamePattern.length -  1)) {
        setTimeout(function () {
            userClickedPattern = [];
            nextSequence();
        }, 1000);
      }
    }
});


$(document).keypress(function() {
  if (keyPress < 1 ) {

  nextSequence();
  keyPress+=1;

}});
$("h1").click(function() {
  if (keyPress < 1 ) {

  nextSequence();
  keyPress+=1;

}});

function resetGame () {
  if (level > highScore) {

    highScore = level;
    $(".score").text("High Score: "+highScore);
  }

  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over")},100);
  gamePattern = [];
  userClickedPattern = [];
  keyPress = 0;
  level = 0;
  $("h1").text("Game Over, Press Any Key To Start");
}

function nextSequence() {
  ++level;
  $("h1").text("Level " + level);

    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor =  buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(250).fadeIn(250);
    playSound(randomChosenColor);



}

function playSound(name) {
  var audio = new Audio("sounds/" + (name) + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100);

}

function checkAnswer(i)
{

              if (gamePattern[i] != userClickedPattern[i]) {

                  return false;

              } else {return true;}
              }
