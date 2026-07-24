/* audio.js — pronunciation playback via the browser's built-in
   SpeechSynthesis API. Free, offline, zero dependencies.
   Voice quality is robotic and varies by browser/OS, but it works
   with no internet connection and no audio files to bundle.
*/
const Pronounce = (() => {
  const supported = 'speechSynthesis' in window;

  function speak(text, { rate = 0.9 } = {}) {
    if (!supported || !text) return;
    window.speechSynthesis.cancel(); // stop anything already playing
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = rate;
    window.speechSynthesis.speak(utter);
  }

  function makeSpeakerButton(text, lang) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'speaker-btn';
    btn.setAttribute('aria-label', lang === 'es' ? 'Escuchar pronunciación' : 'Listen to pronunciation');
    btn.textContent = '🔊';
    if (!supported) {
      btn.disabled = true;
      btn.title = lang === 'es'
        ? 'Audio no disponible en este navegador'
        : 'Audio not available in this browser';
    } else {
      btn.addEventListener('click', () => speak(text));
    }
    return btn;
  }

  return { supported, speak, makeSpeakerButton };
})();
