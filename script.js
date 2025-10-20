const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let W = (canvas.width = innerWidth);
let H = (canvas.height = innerHeight);

window.addEventListener('resize', () => {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
});

class Confetti {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * -H * 0.5;
    this.size = 6 + Math.random() * 10;
    this.speedY = 1 + Math.random() * 3;
    this.speedX = -1.5 + Math.random() * 3;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.08;
    this.color = randomColor();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rot += this.rotSpeed;
    if (this.y > H + 40) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    ctx.restore();
  }
}

function randomColor() {
  const colors = ['#ffbf47', '#ff6347', '#87cefa', '#ff80c0', '#b4ffb4'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const confettis = Array.from({ length: 120 }, () => new Confetti());

let running = true;
function loop() {
  ctx.clearRect(0, 0, W, H);
  confettis.forEach((c) => {
    c.update();
    c.draw();
  });
  if (running) requestAnimationFrame(loop);
}
loop();

document.getElementById('toggleLights').addEventListener('click', () => {
  running = !running;
  if (running) loop();
});
