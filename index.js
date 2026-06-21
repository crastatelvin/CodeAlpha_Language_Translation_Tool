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
  requestAnimationFrame(animate);
}
animate();

let audioCtx = null;
function initAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}
function playClickSound() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}
document.getElementById('sourceText').addEventListener('input', playClickSound);

async function performTranslation(text, src, tgt) {
  const url = https://translate.googleapis.com/translate_a/single?client=gtx&sl=\&sl=\&tl=\&dt=t&q=\;
  const response = await fetch(url);
  const data = await response.json();
  return data[0].map(item => item[0]).join('');
}

function streamDecrypt(targetString) {
  return new Promise((resolve) => {
    let currentLength = 0;
    const output = document.getElementById('outputText');
    const interval = setInterval(() => {
      if (currentLength >= targetString.length) {
        clearInterval(interval);
        output.textContent = targetString;
        resolve();
        return;
      }
      currentLength++;
      output.textContent = targetString.slice(0, currentLength) + "...";
    }, 20);
  });
}

document.getElementById('translateBtn').addEventListener('click', async () => {
  const text = document.getElementById('sourceText').value;
  const translation = await performTranslation(text, 'en', 'es');
  await streamDecrypt(translation);
});
