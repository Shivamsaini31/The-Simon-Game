var isStarted = false;
var lvl = 1;
var len = 0;
var clicked = [];
var ended = false;
var highScore = 0;
var currentScore = 0;
var buttons = ["red", "green", "yellow", "blue"];

// Initialize the game
$(document).ready(function () {
  updateDisplay();

  // Keyboard controls
  $(document)
    .off("keydown")
    .on("keydown", function (event) {
      if (event.key === "Enter") {
        if (isStarted === false) {
          startTheGame();
        }
      }
    });

  // Control button events
  $("#start-btn").on("click", function () {
    if (isStarted === false) {
      startTheGame();
    }
  });

  $("#restart-btn").on("click", function () {
    restartGame();
  });

  // Simon button events
  $(".simon-button").on("click", function (event) {
    if (!isStarted) return;

    const buttonId = $(this).attr("id");
    const buttonIndex = buttons.indexOf(buttonId);

    if (buttonIndex === -1) return;

    len++;
    if (buttons[clicked[len - 1]] === buttonId) {
      clickButton(clicked[len - 1]);
      currentScore = Math.max(currentScore, len);
      updateDisplay();
    } else {
      ended = true;
      endTheGame();
    }

    if (len === clicked.length && !ended) {
      nextLvl();
    }
  });
});

function startTheGame() {
  isStarted = true;
  ended = false;
  len = 0;
  clicked = [];
  lvl = 1;
  currentScore = 0;

  updateDisplay();
  $("#status-text").text("Watch the sequence!");

  var toClick = Math.floor(Math.random() * 4);
  clicked.push(toClick);

  setTimeout(function () {
    playSequence();
  }, 1000);
}

function restartGame() {
  isStarted = false;
  ended = false;
  len = 0;
  clicked = [];
  lvl = 1;
  currentScore = 0;

  updateDisplay();
  $("#status-text").text("Press ENTER or START to begin");
  $("body").removeClass("wrongAns");
}

function clickButton(toClick) {
  const button = $("#" + buttons[toClick]);
  button.addClass("pressed");
  makeSound(toClick);

  setTimeout(function () {
    button.removeClass("pressed");
  }, 300);
}

function makeSound(toClick) {
  var audio = new Audio("sounds/" + buttons[toClick] + ".mp3");
  audio.play().catch(function (error) {
    console.log("Audio play failed:", error);
  });
}

function playSequence() {
  let i = 0;
  $("#status-text").text("Watch carefully...");

  const interval = setInterval(() => {
    if (i < clicked.length) {
      clickButton(clicked[i]);
      i++;
    } else {
      clearInterval(interval);
      $("#status-text").text("Your turn! Repeat the sequence");
    }
  }, 800);
}

function nextLvl() {
  len = 0;
  lvl++;
  highScore = Math.max(highScore, lvl-1);
  updateDisplay();
  $("#status-text").text("Great! Level " + lvl + " coming up...");

  setTimeout(function () {
    var toClick = Math.floor(Math.random() * 4);
    clicked.push(toClick);
    playSequence();
  }, 1500);
}

function endTheGame() {
  $("body").addClass("wrongAns");

  var audio = new Audio("sounds/wrong.mp3");
  audio.play().catch(function (error) {
    console.log("Audio play failed:", error);
  });

  $("#status-text").text("Game Over! Press RESTART to try again");

  setTimeout(function () {
    $("body").removeClass("wrongAns");
  }, 500);

  isStarted = false;
  clicked = [];
  len = 0;
}

function updateDisplay() {
  $("#level-number").text(lvl);
  $("#current-score").text(lvl-1);
  $("#high-score").text(highScore);
}
