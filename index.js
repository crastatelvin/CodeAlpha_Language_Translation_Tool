const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
function animate() {
  ctx.fillStyle = 'rgba(5, 6, 11, 0.2)';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 50) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  requestAnimationFrame(animate);
}
animate();
