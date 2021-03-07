let obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 2 + 20;
    this.bottom = (Math.random() * canvas.height) / 2 + 25;
    this.x = canvas.width;
    this.width = 80;
    this.color = "hsla(" + hue + ",100%,50%,0.8)";
    this.counted = false;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }
  update() {
    this.x -= gamerspeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

function handleObstacles() {
  if (frame % 70 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[i]);
  }
}
