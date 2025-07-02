var isStarted=false;
var lvl=1;
var len=0;
var clicked=[];
var ended=false;
var highScore=0;
var buttons=["red","green","yellow","blue"];
$(document).off("keydown").on("keydown",function(event){
    if(event.key==="Enter"){
        if(isStarted===false){
            startTheGame();
        }
    }   
});
function startTheGame(){
    isStarted=true;
    ended=false;
    $("header").text("LEVEL "+lvl);
    var toClick=Math.floor(Math.random()*4);
    clickButton(toClick);
    clicked.push(toClick);
}
function clickButton(toClick){
    $("#"+buttons[toClick]).addClass("pressed");
    makeSound(toClick);
    setTimeout(function(){
        $("#"+buttons[toClick]).removeClass("pressed");
    },200);
}
function makeSound(toClick){
    var audio=new Audio("sounds/"+buttons[toClick]+".mp3");
    audio.play();
}
$(".btn").on("click",function(event){
    highScore=Math.max(highScore,lvl);
    $(".highScore").text(highScore);
    if(!isStarted)return;
    len++;
    if(buttons[clicked[len-1]]===event.target.id){
        clickButton(clicked[len-1]);
    }
    else{
        ended=true;
        endTheGame();
    }
    if(len==clicked.length && !ended){
        nextLvl();
    }
});
function nextLvl(){
    len=0;
    lvl++;
    setTimeout(function(){
        startTheGame();
    },1000);
}
function endTheGame(){
    $("body").addClass("wrongAns");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("header").text("Lost! Press Enter to restart!");
    setTimeout(function(){
        $("body").removeClass("wrongAns");
    },500);
    isStarted=false;
    clicked=[];
    lvl=1;
    len=0;
}
