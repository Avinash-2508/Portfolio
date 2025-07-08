var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var started = false
var level = 0

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level)
        nextSequence()
        started = true
    }  
})
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)

    checkAnswer(userClickedPattern.length-1)

})

function checkAnswer(currentLevel){

}
function nextSequence(){
    level++
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
}
function playSound(sound){
    var audio = new Audio("sounds/"+sound+".mp3")
    audio.play()
}