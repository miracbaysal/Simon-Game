

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
//Oyunun başlayıp başlamadığını takip etmenin bir yoluna ihtiyacınız olacak, bu nedenle yalnızca ilk tuşa bastığınızda nextSequence() işlevini çağırırsınız.
var started = false;

var level = 0;
 
//Detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
//Klavyeden ilk tuşa basıldığında yakalama ve nextSequence() çağır.
$(document).keypress(function() {
    if (!started) {

        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        //h1 etiketi oyun başlamadan önce "Başlamak için bir tuşa basınız." yazıyor. Oyun başladığında "Level 0" ile değiştir.
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});


$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    // Kullanıcı tıklayıp yanıtını seçtikten sonra checkAnswer() işlevini çağırın ve kullanıcının sırasındaki son yanıtın index'ini iletin.
    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

    //If statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){

            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        playSound("wrong");
        


        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Oyun Bitti, Tekrar Başlamak İçin Bir Tuşa Basınız.")
        startOver();
        
    };
};


function nextSequence() {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level. 
    userClickedPattern = [];

    //Increase the level by 1 every time nextSequence() is called.
    level ++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    //Update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

    //Flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
};

// Ses çalma

function playSound(name) {

    var colour = new Audio("sounds/" + name + ".mp3");
    colour.play();
};

//Tıklandığında css sınıfı ekleme ve 100 ms sonra kaldırma.

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
};

//Baştan başla
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}