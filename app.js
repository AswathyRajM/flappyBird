const canvas = document.getElementById("canvas1");
const replayBtn = document.getElementById("replay");

var ctx = canvas.getContext("2d");
canvas.width = 1800;
canvas.height = 800;

document.querySelector(
  ".container .score .score-heading"
).innerHTML = localStorage.getItem("flappyHighScore");

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamerspeed = 4;
let frameHit = 0;

const backgroundImage = new Image();
backgroundImage.src = "images/bg.png";
let bg = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  if (bg.x1 <= -bg.width + gamerspeed) {
    bg.x1 = bg.width;
  } else bg.x1 -= gamerspeed;
  if (bg.x2 <= -bg.width + gamerspeed) {
    bg.x2 = bg.width;
  } else bg.x2 -= gamerspeed;
  ctx.drawImage(backgroundImage, bg.x1, bg.y, bg.width, bg.height);
  ctx.drawImage(backgroundImage, bg.x2, bg.y, bg.width, bg.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleParticles();
  handleObstacles();
  bird.update();
  bird.draw();
  ctx.fillStyle = "white";
  ctx.font = "100px Georgia";
  ctx.strokeText(score, canvas.width - 150, 150);
  ctx.fillText(score, canvas.width - 150, 150);
  handleCollisions();
  if (handleCollisions()) {
    replayBtn.style.display = "initial";
    return;
  }
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}
animate();

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    spacePressed = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    spacePressed = false;
  }
  bird.frameX = 0;
});

const bang = new Image();
bang.src = "images/hitspritesheet.png";

function handleCollisions() {
  for (i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom - 40 && //
          bird.y + bird.height < canvas.height))
    ) {
      //collision detected
      ctx.drawImage(
        bang,
        0,
        0,
        2340 / 2,
        982,
        bird.x - 20,
        bird.y - 20,
        bird.width * 1.85,
        bird.height * 1.95
      );
      ctx.font = "60px Georgia";
      ctx.fillStyle = "white";

      // Local storage of high score
      // localStorage.setItem("flappyHighScore", 1);

      let highScore = localStorage.getItem("flappyHighScore");

      if (highScore === null || score > highScore) {
        ctx.fillText(
          "Congrats! High Score! " + score,
          canvas.width / 3.2,
          canvas.height / 2 - 10
        );
        localStorage.setItem("flappyHighScore", score);
        document.querySelector(
          ".container .score .score-heading"
        ).innerHTML = score;

        return true;
      } else if (highScore > score) {
        console.log(highScore <= score);
        ctx.fillText(
          "Game Over, Your Score is " + score,
          canvas.width / 3.2,
          canvas.height / 2 - 10
        );
      }
      return true;
    }
  }
}

replayBtn.addEventListener("click", () => {
  score = 0;
  gamerspeed = 4;
  bg = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  };
  spacePressed = false;
  obstaclesArray = [];
  score = 0;
  delete bird;
  const bird = new Bird();
  replayBtn.style.display = "none";
  animate();
});
