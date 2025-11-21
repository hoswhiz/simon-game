var level = 0;
var randomBtn = [];
var clickedList = [];

function pressed(btn) {
  $("." + btn).addClass("pressed");
  setTimeout(() => {
    $("." + btn).removeClass("pressed");
  }, 100);
}

function levelUp() {
  var randomNumber = Math.floor(Math.random() * 4) + 1;
  switch (randomNumber) {
    case 1:
      randomBtn.push("green");
      break;
    case 2:
      randomBtn.push("red");
      break;
    case 3:
      randomBtn.push("yellow");
      break;
    case 4:
      randomBtn.push("blue");
      break;
  }
}

function gameOver() {
  $("#level-title").text("Game Over | Level : " + level);
  randomBtn = [];
  clickedList = [];
  level = 0;
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  playSound("./sounds/wrong.mp3");
}

function playSound(source) {
  var audio = new Audio(source);
  audio.play();
}

function playSequence() {
  // فقط آخرین عضو رو اجرا کن
  const lastIndex = randomBtn.length - 1;
  setTimeout(() => {
    pressed(randomBtn[lastIndex]);
    playSound("./sounds/" + randomBtn[lastIndex] + ".mp3");
  }, 500);
}

$(document).keypress(function (event) {
  if (event.key === "a" && level === 0) {
    startGame();
  }
});

// برای موبایل - لمس صفحه
$(document).on("touchstart", function () {
  if (level === 0) {
    startGame();
  }
});

function startGame() {
  randomBtn = [];
  clickedList = [];
  level = 1;
  levelUp();

  playSequence();

  $(".btn")
    .off("click")
    .click(function () {
      var classes = $(this).attr("class").split(" ");
      var color = classes[1];
      clickedList.push(color);
      pressed(color);
      playSound("./sounds/" + color + ".mp3");

      var currentIndex = clickedList.length - 1;
      if (clickedList[currentIndex] !== randomBtn[currentIndex]) {
        gameOver();
        return;
      }

      if (clickedList.length === randomBtn.length) {
        clickedList = [];
        setTimeout(() => {
          level++;
          levelUp();
          playSequence();
        }, 1000);
        $("#level-title").text("Level : " + level);
      }
    });
}
