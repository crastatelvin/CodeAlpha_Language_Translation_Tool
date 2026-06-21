// Futuristic Neural Translator UI Engine

// 1. Language Definitions
const LANGUAGE_NAMES = {
  'auto': 'AUTO-DETECT',
  'en': 'ENGLISH',
  'es': 'SPANISH',
  'fr': 'FRENCH',
  'de': 'GERMAN',
  'it': 'ITALIAN',
  'ja': 'JAPANESE',
  'zh': 'CHINESE',
  'ko': 'KOREAN',
  'ru': 'RUSSIAN',
  'pt': 'PORTUGUESE',
  'hi': 'HINDI',
  'ar': 'ARABIC',
  'tr': 'TURKISH',
  'nl': 'DUTCH',
  'sv': 'SWEDISH'
};

// 2. Audio Engine (Dynamic Web Audio API Synthesizer)
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Low-pass terminal key click sound
function playClickSound() {
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(120, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.05);
  
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// Decryption tick sound for streaming effect
function playDecryptionTick() {
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800 + Math.random() * 400, audioCtx.currentTime);
  
  gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.03);
}

// Futuristic sweep when decryption finishes
function playSuccessSound() {
  initAudio();
  if (!audioCtx) return;

  const time = audioCtx.currentTime;
  
  // Sweep 1 (Low to High)
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(200, time);
  osc1.frequency.exponentialRampToValueAtTime(1200, time + 0.4);
  
  gain1.gain.setValueAtTime(0.05, time);
  gain1.gain.exponentialRampToValueAtTime(0.001, time + 0.4);
  
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  
  osc1.start();
  osc1.stop(time + 0.4);
  
  // Harmonics chord delay
  setTimeout(() => {
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc2.frequency.setValueAtTime(900, audioCtx.currentTime + 0.15);
    
    gain2.gain.setValueAtTime(0.03, audioCtx.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    
    osc2.start();
    osc2.stop(audioCtx.currentTime + 0.3);
  }, 100);
}

// Low drone error buzz
function playErrorSound() {
  initAudio();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(100, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.3);
  
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

// 3. Futuristic Background Canvas Grid Visualizer
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let isMinimalTheme = false;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Particles tracking visual packets
const packets = [];
for (let i = 0; i < 20; i++) {
  packets.push({
    x: Math.random() * width,
    y: Math.random() * height,
    speed: 0.5 + Math.random() * 1.5,
    size: 1 + Math.random() * 2,
    direction: Math.random() > 0.5 ? 'horizontal' : 'vertical',
    color: Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.4)' : 'rgba(189, 0, 255, 0.4)'
  });
}

let offset = 0;
function animateCanvas() {
  ctx.fillStyle = 'rgba(3, 4, 8, 0.2)'; // trail effect
  ctx.fillRect(0, 0, width, height);
  
  const gridSize = 60;
  ctx.strokeStyle = isMinimalTheme ? 'rgba(110, 63, 243, 0.015)' : 'rgba(0, 240, 255, 0.025)';
  ctx.lineWidth = 1;
  
  // Vertical Grid Lines
  for (let x = (offset % gridSize); x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Horizontal Grid Lines
  for (let y = (offset % gridSize); y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  offset -= 0.15;
  
  // Render and update data packets moving on grid lines
  packets.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = isMinimalTheme ? 'rgba(110, 63, 243, 0.2)' : p.color;
    ctx.shadowBlur = isMinimalTheme ? 2 : 10;
    ctx.shadowColor = p.color;
    ctx.fill();
    ctx.shadowBlur = 0; // reset glow
    
    if (p.direction === 'horizontal') {
      p.x += p.speed;
      p.y = Math.round(p.y / gridSize) * gridSize + (offset % gridSize);
      if (p.x > width) p.x = 0;
    } else {
      p.y += p.speed;
      p.x = Math.round(p.x / gridSize) * gridSize + (offset % gridSize);
      if (p.y > height) p.y = 0;
    }
  });

  // Telemetry texts in corners (Futuristic Only)
  if (!isMinimalTheme) {
    ctx.font = '9px Share Tech Mono';
    ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.fillText('SYS_COORD: [' + (offset * -10).toFixed(1) + ']', 20, 30);
    ctx.fillText('NEURAL_LOAD: ' + (25 + Math.sin(offset / 10) * 8).toFixed(2) + '%', 20, 45);
    ctx.fillText('LINK_INTEGRITY: 99.87%', width - 150, 30);
  }

  requestAnimationFrame(animateCanvas);
}
requestAnimationFrame(animateCanvas);

// 4. UI Elements and Terminal Logging
const terminalLogs = document.getElementById('terminalLogs');

function addLog(text, type = 'cyan') {
  if (isMinimalTheme) return; // Skip logs in minimal theme
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const line = document.createElement('div');
  line.className = `log-line text-${type}`;
  line.textContent = `[${timeStr}] [${type.toUpperCase()}] ${text}`;
  
  terminalLogs.appendChild(line);
  terminalLogs.scrollTop = terminalLogs.scrollHeight;
  
  // Cap logs at 50
  while (terminalLogs.childNodes.length > 50) {
    terminalLogs.removeChild(terminalLogs.firstChild);
  }
}

// 5. Dom Elements
const sourceLangSelect = document.getElementById('sourceLang');
const targetLangSelect = document.getElementById('targetLang');
const sourceText = document.getElementById('sourceText');
const outputText = document.getElementById('outputText');
const charCount = document.getElementById('charCount');
const translateBtn = document.getElementById('translateBtn');
const minimalTranslateBtn = document.getElementById('minimalTranslateBtn');
const progressRing = document.getElementById('progressRing');
const swapBtn = document.getElementById('swapBtn');
const minimalSwapBtn = document.getElementById('minimalSwapBtn');
const clearBtn = document.getElementById('clearBtn');
const ttsBtn = document.getElementById('ttsBtn');
const copyBtn = document.getElementById('copyBtn');
const linkStatus = document.getElementById('linkStatus');
const pingValue = document.getElementById('pingValue');
const outputCursor = document.getElementById('outputCursor');
const scanningBar = document.getElementById('scanningBar');
const textareaGlitch = document.getElementById('textareaGlitch');
const themeToggle = document.getElementById('themeToggle');

// 6. Theme Switching Logic (Cyber / Minimal)
themeToggle.addEventListener('change', () => {
  isMinimalTheme = themeToggle.checked;
  playClickSound();
  
  if (isMinimalTheme) {
    document.body.classList.add('theme-minimal');
    // Move selector nodes to minimal containers
    document.getElementById('minimalSourceContainer').appendChild(sourceLangSelect);
    document.getElementById('minimalTargetContainer').appendChild(targetLangSelect);
    
    // Update placeholder text if output is empty
    if (outputText.textContent === "Decrypted signal will render here..." || outputText.innerHTML === '') {
      outputText.innerHTML = '<span class="placeholder-text">Translation will appear here ✨</span>';
      outputText.className = 'placeholder-text';
    }
  } else {
    document.body.classList.remove('theme-minimal');
    // Move selector nodes back to futuristic panel headers
    document.getElementById('futuristicSourceContainer').appendChild(sourceLangSelect);
    document.getElementById('futuristicTargetContainer').appendChild(targetLangSelect);
    
    // Update placeholder text if output is empty
    if (outputText.textContent === "Translation will appear here ✨" || outputText.innerHTML === '') {
      outputText.innerHTML = '<span class="placeholder-text">Decrypted signal will render here...</span>';
      outputText.className = 'placeholder-text';
    }
    
    addLog('Restored Cybernetic Futuristic HUD System Layout.', 'green');
  }
});

// Update Character count on input + click sounds
sourceText.addEventListener('input', () => {
  const len = sourceText.value.length;
  charCount.textContent = len;
  playClickSound();
  
  // Glitch effect on massive deletion or large input (only in futuristic mode)
  if (!isMinimalTheme && len % 100 === 0 && len > 0) {
    triggerInputGlitch();
  }
});

// Ctrl+Enter keybind to translate
sourceText.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    executeTranslation();
  }
});

function triggerInputGlitch() {
  textareaGlitch.classList.add('glitch-active');
  setTimeout(() => {
    textareaGlitch.classList.remove('glitch-active');
  }, 250);
}

// Swap languages logic (Futuristic and Minimal buttons)
function swapLanguages() {
  playClickSound();
  const src = sourceLangSelect.value;
  const tgt = targetLangSelect.value;
  
  if (src === 'auto') {
    sourceLangSelect.value = tgt;
    targetLangSelect.value = 'en';
  } else {
    sourceLangSelect.value = tgt;
    targetLangSelect.value = src;
  }
  
  addLog(`Swapped input channels: ${LANGUAGE_NAMES[sourceLangSelect.value]} ⟷ ${LANGUAGE_NAMES[targetLangSelect.value]}`);
}

swapBtn.addEventListener('click', swapLanguages);
minimalSwapBtn.addEventListener('click', swapLanguages);

// Clear/Purge buffer
clearBtn.addEventListener('click', () => {
  playClickSound();
  sourceText.value = '';
  charCount.textContent = '0';
  
  if (isMinimalTheme) {
    outputText.innerHTML = '<span class="placeholder-text">Translation will appear here ✨</span>';
  } else {
    outputText.innerHTML = '<span class="placeholder-text">Decrypted signal will render here...</span>';
  }
  outputText.className = 'placeholder-text';
  
  ttsBtn.disabled = true;
  copyBtn.disabled = true;
  addLog('Input buffer purged.', 'pink');
});

// Update Ping Latency simulated changes
setInterval(() => {
  if (isMinimalTheme) return;
  const ping = Math.floor(8 + Math.random() * 12);
  pingValue.textContent = `${ping} MS`;
}, 4000);

// 7. Translation and Cybernetic Streaming Decryption
let isTranslating = false;
let streamingInterval = null;

// Progress circle updater
function setProgress(percent) {
  if (isMinimalTheme) return;
  const radius = 46;
  const circumference = 2 * Math.PI * radius; // ~289
  const offset = circumference - (percent / 100) * circumference;
  progressRing.style.strokeDashoffset = offset;
}

// Primary API Translation Trigger (Both Cyber and Minimal Buttons)
translateBtn.addEventListener('click', executeTranslation);
minimalTranslateBtn.addEventListener('click', executeTranslation);

async function executeTranslation() {
  if (isTranslating) return;
  
  const text = sourceText.value.trim();
  if (!text) {
    addLog('No transmission text entered. Input matrix empty.', 'pink');
    playErrorSound();
    return;
  }
  
  isTranslating = true;
  translateBtn.classList.add('processing');
  translateBtn.disabled = true;
  minimalTranslateBtn.disabled = true;
  ttsBtn.disabled = true;
  copyBtn.disabled = true;
  
  // Show cursor & scanning line
  outputCursor.classList.remove('hidden');
  scanningBar.classList.remove('hidden');
  outputText.innerHTML = '';
  outputText.className = '';
  
  const srcLang = sourceLangSelect.value;
  const tgtLang = targetLangSelect.value;
  
  addLog(`Initializing bridge link: ${LANGUAGE_NAMES[srcLang]} ⟶ ${LANGUAGE_NAMES[tgtLang]}...`);
  setProgress(20);
  
  try {
    // Stage 1: Handshake
    await delay(250);
    setProgress(40);
    addLog('Establishing handshake with translation matrix...');
    
    // Fetch translation
    let translatedText = await performTranslation(text, srcLang, tgtLang);
    setProgress(75);
    
    // Stage 2: Signal decryption
    addLog('Signal packet received. Beginning stream decryption...', 'purple');
    
    // Animate streaming decryption
    await streamDecrypt(translatedText);
    
    // Complete
    setProgress(100);
    playSuccessSound();
    addLog('Decryption success. Signal completely rendered.', 'green');
    
    // Enable features
    ttsBtn.disabled = false;
    copyBtn.disabled = false;
  } catch (error) {
    console.error(error);
    playErrorSound();
    addLog(`Neural Link Failure: ${error.message}`, 'pink');
    
    if (isMinimalTheme) {
      outputText.innerHTML = `<span style="color: #f87171;">[Translation Error] Unable to complete request: ${error.message}</span>`;
    } else {
      outputText.innerHTML = `<span class="text-glow-pink">[DECRYPTION_ERROR] link broke during stream decryption. Details: ${error.message}</span>`;
    }
    setProgress(0);
  } finally {
    isTranslating = false;
    translateBtn.classList.remove('processing');
    translateBtn.disabled = false;
    minimalTranslateBtn.disabled = false;
    outputCursor.classList.add('hidden');
    scanningBar.classList.add('hidden');
  }
}

// Core Translation API Caller (with Fallbacks)
async function performTranslation(text, src, tgt) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${src}&tl=${tgt}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Google API status: ${response.status}`);
    
    const data = await response.json();
    let translatedParts = [];
    if (data && data[0]) {
      data[0].forEach(item => {
        if (item[0]) translatedParts.push(item[0]);
      });
    }
    
    if (translatedParts.length > 0) {
      if (src === 'auto' && data[2]) {
        const detected = data[2];
        addLog(`Auto-detected source channel: [${detected.toUpperCase()}] ${LANGUAGE_NAMES[detected] || detected}`, 'green');
      }
      return translatedParts.join('');
    }
    throw new Error("Empty translation parts");
  } catch (err) {
    addLog(`Primary node failed: ${err.message}. Retrying with secondary fallback...`, 'pink');
    
    // Secondary Fallback: MyMemory Translation API
    const langpair = `${src === 'auto' ? 'en' : src}|${tgt}`;
    const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
    
    const response = await fetch(fallbackUrl);
    if (!response.ok) throw new Error(`Secondary node failed. API status: ${response.status}`);
    
    const data = await response.json();
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    
    throw new Error("Unable to establish handshake with all translation nodes.");
  }
}

// 8. Streaming Decryption Animation (Matrix character cyber-typing)
const CYPHER_CHARS = "01X*?#@ΔΨΩ§%&+=<>[]{}";

function streamDecrypt(targetString) {
  return new Promise((resolve) => {
    let currentLength = 0;
    const totalLength = targetString.length;
    
    // Adjust speed based on output length to prevent extremely long delays for huge text
    const speed = Math.max(3, Math.min(30, Math.floor(1500 / totalLength)));
    
    streamingInterval = setInterval(() => {
      if (currentLength >= totalLength) {
        clearInterval(streamingInterval);
        outputText.textContent = targetString;
        resolve();
        return;
      }
      
      currentLength++;
      
      const decryptedPart = targetString.slice(0, currentLength);
      let cypherPart = "";
      
      const cypherLen = Math.min(4, totalLength - currentLength);
      for (let i = 0; i < cypherLen; i++) {
        cypherPart += CYPHER_CHARS.charAt(Math.floor(Math.random() * CYPHER_CHARS.length));
      }
      
      outputText.textContent = decryptedPart + cypherPart;
      
      if (currentLength % 2 === 0) {
        playDecryptionTick();
      }
      
      const percent = Math.floor(75 + (currentLength / totalLength) * 25);
      setProgress(percent);
      
    }, speed);
  });
}

// Utility delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 9. Clipboard Copy Functionality
copyBtn.addEventListener('click', () => {
  playClickSound();
  const text = outputText.textContent;
  if (!text || text.startsWith("Decrypted signal") || text.startsWith("Translation will appear") || text.includes("[DECRYPTION_ERROR]")) return;
  
  navigator.clipboard.writeText(text).then(() => {
    addLog('Decrypted buffer cloned to local clip.', 'green');
    
    // Visual indicator on button
    const originalContent = copyBtn.innerHTML;
    copyBtn.innerHTML = `
      <svg class="btn-icon" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
      <span>CLONED!</span>
    `;
    copyBtn.classList.add('text-glow-green');
    
    setTimeout(() => {
      copyBtn.innerHTML = originalContent;
      copyBtn.classList.remove('text-glow-green');
    }, 2000);
  }).catch(err => {
    addLog(`Buffer copy failed: ${err.message}`, 'pink');
  });
});

// 10. Text to Speech Engine (Web Speech Synthesis)
ttsBtn.addEventListener('click', () => {
  playClickSound();
  const text = outputText.textContent;
  if (!text || text.startsWith("Decrypted signal") || text.startsWith("Translation will appear") || text.includes("[DECRYPTION_ERROR]")) return;
  
  if ('speechSynthesis' in window) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      addLog('Vocal synthesis aborted.');
      ttsBtn.classList.remove('text-glow-cyan');
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    const tgtLang = targetLangSelect.value;
    utterance.lang = tgtLang;
    
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(voice => voice.lang.startsWith(tgtLang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }
    
    utterance.onstart = () => {
      addLog('Synthesizing vocal wave stream...', 'cyan');
      ttsBtn.classList.add('text-glow-cyan');
    };
    
    utterance.onend = () => {
      addLog('Vocal wave stream complete.', 'cyan');
      ttsBtn.classList.remove('text-glow-cyan');
    };
    
    utterance.onerror = (e) => {
      addLog(`Vocal wave error: ${e.error}`, 'pink');
      ttsBtn.classList.remove('text-glow-cyan');
    };
    
    window.speechSynthesis.speak(utterance);
  } else {
    addLog('Voice synthesis engine unavailable in host browser.', 'pink');
  }
});

// Ensure voices are loaded for SpeechSynthesis
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
