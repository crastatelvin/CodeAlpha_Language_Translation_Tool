# Language Translation Tool - Walkthrough

A high-tech, dual-themed translation tool featuring a style selector to switch between a cyber-futuristic HUD design and a clean, modern minimal look (inspired by LinguaVerse). It utilizes free translation APIs (Google Translate and MyMemory), simulated quantum decryption/streaming character animations, dynamically synthesized sound effects via the Web Audio API, text-to-speech, and responsive terminal process logging.

## Core Features & Architecture

1. **Interface Style Toggle (Cyber vs. Minimal)**
   - **Cyber Futuristic HUD Mode**:
     - Neon cyan/purple glow theme with a digital system stats dashboard.
     - Rotating progress circles, blinking terminal cursor, scanning lines, and hologram flicker effects.
     - Retro-futuristic fonts (`Orbitron` and `Share Tech Mono`).
     - Real-time logging console printing background handshake processes and latencies.
   - **Minimalist LinguaVerse Mode**:
     - Clean, modern layout matching the premium "LinguaVerse" translation design.
     - Deep space gradient background with a faint, static background coordinate grid.
     - Unified double-column glass card container (Source Panel on the left, Target Panel on the right).
     - Centered selectors header bar, custom flag-adorned selects, and a central swap language button.
     - An inline purple "Translate" button with a lightning bolt symbol.
     - Standard sans-serif typography (`Inter`) for enhanced legibility.

2. **Translation Matrix Engine**
   - **Primary Node**: Connects to the free Google Translate `gtx` endpoint (fast, client-side, zero key required).
   - **Secondary Node (Fallback)**: Connects to the free MyMemory translation API.
   - **Streaming/Decryption Animation**: Renders translated results character-by-character, cycling through random cypher glyphs before revealing the actual characters.
   - **Keybind Trigger**: Supports pressing `Ctrl + Enter` inside the textarea to execute translation.

3. **Synthesized Sound Effects**
   - Leverages the browser's native **Web Audio API** to generate all sounds on the fly.
   - **Key Clicks**: A low-pass filtered click when typing or interacting.
   - **Cyber Sweep**: A rising dual-oscillator chime chord upon successful translation.
   - **Low Drone**: A descending sawtooth buzz on errors.
   - **Decryption Ticks**: High-frequency ticks synchronizing with the streaming text.

4. **Speech & Clipboard Integration**
   - **Clone Buffer**: Copies translation text to the clipboard with temporary feedback ("CLONED!").
   - **Voice Synthesis**: Uses the Web Speech Synthesis API to speak the translated text in the native accent of the target language.

## How to Run the Server

To view and test the application manually:

### 1. Start the HTTP Server
Run the following command in your terminal inside the workspace directory (`c:\Users\Administrator\Desktop\Alpha\Task 1`):

```powershell
python -m http.server 8000
```

*Note: The server has already been started in the background of this session.*

### 2. Access the Application
Open your web browser and navigate to:

[http://localhost:8000](http://localhost:8000)
