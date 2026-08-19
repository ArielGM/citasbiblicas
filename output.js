const STORAGE_KEY = 'citas-biblicas-presentacion';
const card = document.querySelector('#output-card');
const reference = document.querySelector('#output-reference');
const text = document.querySelector('#output-text');
const version = document.querySelector('#output-version');
const controls = document.querySelector('#presentation-controls');
const previous = document.querySelector('#output-previous');
const next = document.querySelector('#output-next');
const counter = document.querySelector('#output-counter');
const fullscreen = document.querySelector('#output-fullscreen');
const channel = 'BroadcastChannel' in window ? new BroadcastChannel(STORAGE_KEY) : null;
let state = { slides: [], currentSlide: 0, appearance: {} };
let controlsTimer;

function readStoredState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); } catch { return null; }
}

function fitText() {
  const cardWidth = card.clientWidth || 640;
  const sizes = [.047, .041, .036, .032, .028, .024]
    .map(ratio => `${Math.max(10, Math.round(cardWidth * ratio))}px`);
  for (const size of sizes) {
    card.style.setProperty('--verse-size', size);
    if (text.scrollHeight <= text.clientHeight) return;
  }
}

function render() {
  const slides = Array.isArray(state.slides) ? state.slides : [];
  const hasSlides = slides.length > 0;
  const index = hasSlides ? Math.max(0, Math.min(state.currentSlide || 0, slides.length - 1)) : 0;
  const slide = slides[index];
  const appearance = state.appearance || {};
  const isClassic = appearance.font === 'cormorant';

  document.documentElement.style.setProperty('--background', appearance.background || '#05070b');
  document.documentElement.style.setProperty('--text', appearance.text || '#ffffff');
  document.documentElement.style.setProperty('--font', isClassic ? 'Cormorant Garamond, Georgia, serif' : 'Manrope, Avenir, sans-serif');
  card.style.setProperty('--verse-weight', isClassic ? '500' : '300');
  document.body.classList.toggle('is-transparent', Boolean(appearance.transparent));
  reference.textContent = slide?.reference || 'Cita bíblica';
  text.textContent = slide?.text || 'Abre esta vista desde el generador para presentar una cita.';
  version.textContent = hasSlides ? (appearance.version || '') : '';
  previous.disabled = !hasSlides || index === 0;
  next.disabled = !hasSlides || index === slides.length - 1;
  counter.textContent = hasSlides ? `${index + 1} / ${slides.length}` : '0 / 0';

  requestAnimationFrame(fitText);
}

function applyState(nextState) {
  if (!nextState || !Array.isArray(nextState.slides)) return;
  state = nextState;
  render();
}

function navigate(change) {
  const count = state.slides?.length || 0;
  if (!count) return;
  state.currentSlide = Math.max(0, Math.min((state.currentSlide || 0) + change, count - 1));
  render();
}

function revealControls() {
  controls.classList.add('is-visible');
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => controls.classList.remove('is-visible'), 1800);
}

async function toggleFullscreen() {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await document.documentElement.requestFullscreen?.();
}

previous.addEventListener('click', () => navigate(-1));
next.addEventListener('click', () => navigate(1));
fullscreen.addEventListener('click', toggleFullscreen);
document.addEventListener('pointermove', revealControls);
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1); revealControls(); }
  if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1); revealControls(); }
  if (event.key.toLowerCase() === 'f') toggleFullscreen();
});
window.addEventListener('resize', () => requestAnimationFrame(fitText));
window.addEventListener('storage', event => {
  if (event.key === STORAGE_KEY) applyState(readStoredState());
});
channel?.addEventListener('message', event => applyState(event.data));
applyState(readStoredState() || state);
