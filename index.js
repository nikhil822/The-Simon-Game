var buttonColours=["red","blue","green","yellow"];
var pattern=[];
var userclick=[];
var start=false;
var level=0;
$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level "+level);
        nextSequence();
        start=true;
    }
});
$(".btn").click(function(){
    var userchosen=$(this).attr("id");
    userclick.push(userchosen);
    playSound(userchosen);
    animatePress(userchosen);
    checkAnswer(userclick.length-1);
});
function checkAnswer(currentlevel){
    if(pattern[currentlevel]==userclick[currentlevel]){
        if(userclick.length==pattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any key to restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function nextSequence(){
    userclick=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomcolour=buttonColours[randomnumber];
    pattern.push(randomcolour);
    $("#" + randomcolour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomcolour);
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}
function playSound(name){
    var audio=new Audio("sounds/" + name +".mp3");
    audio.play();
}
function startOver(){
    level=0;
    pattern=[];
    start=false;
}