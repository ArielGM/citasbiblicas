const BOOKS = {
  genesis: 'GEN', génesis: 'GEN', exodo: 'EXO', éxodo: 'EXO', levitico: 'LEV', levítico: 'LEV', numeros: 'NUM', números: 'NUM', deuteronomio: 'DEU', josue: 'JOS', josué: 'JOS', jueces: 'JDG', rut: 'RUT', '1 samuel': '1SA', '2 samuel': '2SA', '1 reyes': '1KI', '2 reyes': '2KI', '1 cronicas': '1CH', '1 crónicas': '1CH', '2 cronicas': '2CH', '2 crónicas': '2CH', esdras: 'EZR', nehemias: 'NEH', nehemías: 'NEH', ester: 'EST', job: 'JOB', salmos: 'PSA', salmo: 'PSA', proverbios: 'PRO', eclesiastes: 'ECC', eclesiastés: 'ECC', cantares: 'SNG', 'cantar de los cantares': 'SNG', isaias: 'ISA', isaías: 'ISA', jeremias: 'JER', jeremías: 'JER', lamentaciones: 'LAM', ezequiel: 'EZK', daniel: 'DAN', oseas: 'HOS', joel: 'JOL', amos: 'AMO', amós: 'AMO', abdias: 'OBA', abdías: 'OBA', jonas: 'JON', jonás: 'JON', miqueas: 'MIC', nahum: 'NAM', habacuc: 'HAB', sofonias: 'ZEP', sofonías: 'ZEP', hageo: 'HAG', zacarias: 'ZEC', zacarías: 'ZEC', malaquias: 'MAL', malaquías: 'MAL',
  mateo: 'MAT', 'san mateo': 'MAT', marcos: 'MRK', lucas: 'LUK', lucas: 'LUK', 'san lucas': 'LUK', juan: 'JHN', 'san juan': 'JHN', hechos: 'ACT', romanos: 'ROM', '1 corintios': '1CO', '2 corintios': '2CO', galatas: 'GAL', gálatas: 'GAL', efesios: 'EPH', filipenses: 'PHP', colosenses: 'COL', '1 tesalonicenses': '1TH', '2 tesalonicenses': '2TH', '1 timoteo': '1TI', '2 timoteo': '2TI', tito: 'TIT', filemon: 'PHM', filemón: 'PHM', hebreos: 'HEB', santiago: 'JAS', '1 pedro': '1PE', '2 pedro': '2PE', '1 juan': '1JN', '2 juan': '2JN', '3 juan': '3JN', judas: 'JUD', apocalipsis: 'REV'
};

const BOOK_SUGGESTIONS = [
  'Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Rut', '1 Samuel', '2 Samuel',
  '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras', 'Nehemías', 'Ester', 'Job', 'Salmos', 'Proverbios',
  'Eclesiastés', 'Cantares', 'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel', 'Oseas', 'Joel', 'Amós',
  'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías', 'Mateo', 'Marcos',
  'Lucas', 'Juan', 'Hechos', 'Romanos', '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses',
  '1 Tesalonicenses', '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', '1 Pedro',
  '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis'
];

const form = document.querySelector('#reference-form');
const input = document.querySelector('#reference');
const bookSuggestions = document.querySelector('#book-suggestions');
const bibleVersion = document.querySelector('#bible-version');
const versionTrigger = document.querySelector('#bible-version-trigger');
const versionTriggerText = document.querySelector('#bible-version-text');
const versionOptions = document.querySelector('#bible-version-options');
const status = document.querySelector('#status');
const searchButton = document.querySelector('#search-button');
const card = document.querySelector('#verse-card');
const refEl = document.querySelector('#verse-reference');
const textEl = document.querySelector('#verse-text');
const versionEl = document.querySelector('#verse-version');
const bg = document.querySelector('#background-color');
const fg = document.querySelector('#text-color');
const fontFamily = document.querySelector('#font-family');
const fontTrigger = document.querySelector('#font-family-trigger');
const fontTriggerText = document.querySelector('#font-family-text');
const fontOptions = document.querySelector('#font-family-options');
const transparent = document.querySelector('#transparent-bg');
const dots = document.querySelector('#slide-dots');
const previousButton = document.querySelector('#previous-slide');
const nextButton = document.querySelector('#next-slide');
const downloadButton = document.querySelector('#download-button');
const downloadPptButton = document.querySelector('#download-ppt-button');
const downloadNote = document.querySelector('#download-note');

let slides = [{ reference: 'Mateo 5:3–12', text: 'Cargando pasaje…', verseItems: [] }];
let currentSlide = 0;
let spanishTranslations = [];
let matchingBooks = [];
let activeSuggestion = -1;

const FONT_OPTIONS = [
  { id: 'manrope', label: 'Manrope · minimalista' },
  { id: 'cormorant', label: 'Cormorant · clásica' }
];

const normalize = value => value.trim().toLocaleLowerCase('es').replace(/\s+/g, ' ');

function closeBookSuggestions() {
  matchingBooks = [];
  activeSuggestion = -1;
  bookSuggestions.hidden = true;
  bookSuggestions.innerHTML = '';
  input.setAttribute('aria-expanded', 'false');
  input.removeAttribute('aria-activedescendant');
}

function chooseBook(book) {
  input.value = `${book} `;
  closeBookSuggestions();
  input.focus();
}

function renderBookSuggestions() {
  const typedBook = input.value.trim();
  if (!typedBook || /\d/.test(typedBook)) {
    closeBookSuggestions();
    return;
  }

  matchingBooks = BOOK_SUGGESTIONS.filter(book => normalize(book).startsWith(normalize(typedBook))).slice(0, 8);
  activeSuggestion = -1;
  bookSuggestions.innerHTML = '';
  bookSuggestions.hidden = !matchingBooks.length;
  input.setAttribute('aria-expanded', String(matchingBooks.length > 0));

  matchingBooks.forEach((book, index) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'book-suggestion';
    option.id = `book-suggestion-${index}`;
    option.setAttribute('role', 'option');
    option.textContent = book;
    option.addEventListener('mousedown', event => event.preventDefault());
    option.addEventListener('click', () => chooseBook(book));
    bookSuggestions.append(option);
  });
}

function setActiveSuggestion(index) {
  activeSuggestion = index;
  [...bookSuggestions.children].forEach((option, itemIndex) => {
    const isActive = itemIndex === activeSuggestion;
    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-selected', String(isActive));
  });
  input.setAttribute('aria-activedescendant', `book-suggestion-${activeSuggestion}`);
}

function closeVersionOptions() {
  versionOptions.hidden = true;
  versionTrigger.setAttribute('aria-expanded', 'false');
}

async function chooseTranslation(id, refreshPassage = false) {
  bibleVersion.value = id;
  const translation = selectedTranslation();
  if (!translation) return;
  versionTriggerText.textContent = `${translation.shortName} · ${translation.name}`;
  versionEl.textContent = translation.shortName.toUpperCase();
  versionOptions.querySelectorAll('.version-option').forEach(option => {
    const isActive = option.dataset.translationId === id;
    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-selected', String(isActive));
  });
  closeVersionOptions();
  if (refreshPassage) await search();
}

function closeFontOptions() {
  fontOptions.hidden = true;
  fontTrigger.setAttribute('aria-expanded', 'false');
}

function chooseFont(id) {
  const font = FONT_OPTIONS.find(option => option.id === id);
  if (!font) return;
  fontFamily.value = font.id;
  fontTriggerText.textContent = font.label;
  fontOptions.querySelectorAll('.font-option').forEach(option => {
    const isActive = option.dataset.fontId === id;
    option.classList.toggle('is-active', isActive);
    option.setAttribute('aria-selected', String(isActive));
  });
  closeFontOptions();
  updateAppearance();
}

function renderFontOptions() {
  fontOptions.innerHTML = '';
  FONT_OPTIONS.forEach(font => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'font-option';
    option.dataset.fontId = font.id;
    option.setAttribute('role', 'option');
    option.classList.toggle('is-active', font.id === fontFamily.value);
    option.setAttribute('aria-selected', String(font.id === fontFamily.value));
    option.textContent = font.label;
    option.addEventListener('click', () => chooseFont(font.id));
    fontOptions.append(option);
  });
}

function parseReference(value) {
  const match = value.trim().match(/^(.+?)\s+(\d+)(?:\s*:\s*(.+))?\s*$/);
  if (!match) throw new Error('Usa un formato como: Mateo 12, Mateo 12:1-3 o Mateo 12:1,5-8.');
  const [, rawBook, chapter, selection] = match;
  const book = BOOKS[normalize(rawBook)];
  if (!book) throw new Error('No reconocí el libro. Prueba “Mateo” o “1 Corintios”.');
  if (!selection) return { book, chapter: Number(chapter), verses: null, label: rawBook.trim() };

  const requested = new Set();
  const parts = selection.replace(/\s+y\s+/giu, ',').split(/[;,]/).map(part => part.trim()).filter(Boolean);
  if (!parts.length) throw new Error('Indica al menos un versículo después de los dos puntos.');

  for (const part of parts) {
    const range = part.match(/^(\d+)(?:\s*[-–]\s*(\d+))?$/);
    if (!range) throw new Error('Usa números, rangos con guion y separa grupos con coma o “y”.');
    const from = Number(range[1]), to = Number(range[2] || range[1]);
    if (to < from) throw new Error('El último versículo de cada rango debe ser mayor o igual al primero.');
    for (let verse = from; verse <= to; verse += 1) requested.add(verse);
  }
  return { book, chapter: Number(chapter), verses: requested, label: rawBook.trim() };
}

function setStatus(message, kind = '') { status.textContent = message; status.className = `status ${kind}`; }
function selectedTranslation() { return spanishTranslations.find(translation => translation.id === bibleVersion.value); }
function flattenContent(content) {
  return content.map(item => {
    if (typeof item === 'string') return item;
    if (item.text) return item.text;
    if (item.lineBreak) return '\n';
    if (item.heading) return `${item.heading} `;
    return '';
  }).join('').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
}
function chapterVerses(chapterData) {
  return chapterData.chapter.content
    .filter(item => item.type === 'verse')
    .map(item => ({ v: item.number, t: flattenContent(item.content) }));
}
async function loadTranslations() {
  try {
    const response = await fetch('https://bible.helloao.org/api/available_translations.json');
    if (!response.ok) throw new Error();
    const catalog = await response.json();
    spanishTranslations = catalog.translations
      .filter(translation => translation.language === 'spa')
      .sort((a, b) => a.name.localeCompare(b.name, 'es'));
    if (!spanishTranslations.length) throw new Error();
    bibleVersion.innerHTML = '';
    versionOptions.innerHTML = '';
    spanishTranslations.forEach(translation => {
      const option = document.createElement('option');
      option.value = translation.id;
      option.textContent = `${translation.shortName} · ${translation.name}`;
      bibleVersion.append(option);

      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.className = 'version-option';
      optionButton.dataset.translationId = translation.id;
      optionButton.setAttribute('role', 'option');
      optionButton.textContent = `${translation.shortName} · ${translation.name}`;
      optionButton.addEventListener('click', () => chooseTranslation(translation.id, true));
      versionOptions.append(optionButton);
    });
    const preferred = spanishTranslations.find(translation => translation.id === 'spa_rvg') || spanishTranslations[0];
    bibleVersion.value = preferred.id;
    versionEl.textContent = preferred.shortName.toUpperCase();
    bibleVersion.disabled = false;
    versionTrigger.disabled = false;
    chooseTranslation(preferred.id);
    setStatus('Cargando Mateo 5:3–12…');
    await search();
  } catch {
    bibleVersion.innerHTML = '<option>No se pudieron cargar las versiones</option>';
    setStatus('No se pudo cargar el catálogo bíblico. Revisa tu conexión e inténtalo nuevamente.', 'error');
  }
}
function buildReference(label, chapter, verses) {
  const numbers = verses.map(verse => verse.v);
  const parts = [];
  let start = numbers[0], previous = numbers[0];
  for (const number of numbers.slice(1)) {
    if (number === previous + 1) { previous = number; continue; }
    parts.push(start === previous ? String(start) : `${start}–${previous}`);
    start = number; previous = number;
  }
  parts.push(start === previous ? String(start) : `${start}–${previous}`);
  return `${label.replace(/^san\s+/i, '').replace(/^./, c => c.toUpperCase())} ${chapter}:${parts.join(',')}`;
}

const MAX_CHARACTERS_PER_SLIDE = 210;

function makeSlides(verses, reference) {
  const groups = [];
  let group = [];
  let characterCount = 0;

  for (const verse of verses) {
    const verseLength = String(verse.v).length + verse.t.trim().length + 3;
    const exceedsLimit = group.length > 0 && (
      group.length === 3 ||
      characterCount + verseLength > MAX_CHARACTERS_PER_SLIDE
    );

    if (exceedsLimit) {
      groups.push(group);
      group = [];
      characterCount = 0;
    }

    group.push(verse);
    characterCount += verseLength;
  }

  if (group.length) groups.push(group);

  return groups.map(group => ({
    reference: buildReference(reference.label, reference.chapter, group),
    text: `“${group.map(verse => `${verse.v}. ${verse.t.trim()}`).join(' ')}”`,
    verseItems: group
  }));
}

function fitText() {
  const sizes = ['clamp(1.45rem, 2.7vw, 2.85rem)', 'clamp(1.25rem, 2.3vw, 2.4rem)', 'clamp(1.1rem, 2vw, 2rem)', 'clamp(.95rem, 1.6vw, 1.6rem)'];
  for (const size of sizes) {
    card.style.setProperty('--verse-size', size);
    if (textEl.scrollHeight <= textEl.clientHeight) return true;
  }
  return false;
}

function renderDots() {
  dots.innerHTML = '';
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button'; dot.className = 'slide-dot';
    dot.setAttribute('aria-label', `Ver lámina ${index + 1} de ${slides.length}`);
    dot.setAttribute('aria-current', String(index === currentSlide));
    dot.addEventListener('click', () => showSlide(index));
    dots.append(dot);
  });
}

function updateDownloadDetails() {
  downloadButton.textContent = `Descargar (${slides.length} PNG)`;
  downloadPptButton.textContent = `Descargar PPTX (${slides.length} diapos.)`;
  downloadNote.textContent = `${slides.length} lámina${slides.length === 1 ? '' : 's'} preparada${slides.length === 1 ? '' : 's'}.`;
}

function splitSlide(index) {
  const slide = slides[index];
  const midpoint = Math.ceil(slide.verseItems.length / 2);
  const groups = [slide.verseItems.slice(0, midpoint), slide.verseItems.slice(midpoint)];
  const match = slide.reference.match(/^(.*?)\s+(\d+):/);
  if (!match || !groups[1].length) return false;
  const reference = { label: match[1], chapter: Number(match[2]) };
  slides.splice(index, 1, ...groups.map(group => ({
    reference: buildReference(reference.label, reference.chapter, group),
    text: `“${group.map(verse => `${verse.v}. ${verse.t.trim()}`).join(' ')}”`,
    verseItems: group
  })));
  updateDownloadDetails();
  return true;
}

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, slides.length - 1));
  const slide = slides[currentSlide];
  refEl.textContent = slide.reference;
  textEl.textContent = slide.text;
  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
  renderDots();
  return new Promise(resolve => requestAnimationFrame(() => {
    if (!fitText() && slide.verseItems.length > 1 && splitSlide(currentSlide)) {
      showSlide(currentSlide).then(resolve);
      return;
    }
    resolve();
  }));
}

function updateAppearance() {
  card.style.backgroundColor = transparent.checked ? 'transparent' : bg.value;
  textEl.style.color = fg.value;
  const verseFont = fontFamily.value === 'cormorant' ? 'Cormorant Garamond, Georgia, serif' : 'Manrope, Avenir, sans-serif';
  card.style.setProperty('--verse-font', verseFont);
  [refEl, textEl, versionEl].forEach(element => { element.style.fontFamily = verseFont; });
  textEl.style.fontWeight = fontFamily.value === 'cormorant' ? '500' : '300';
  card.style.boxShadow = transparent.checked ? 'none' : '';
  showSlide(currentSlide);
}

async function search(event) {
  event?.preventDefault();
  let reference;
  try { reference = parseReference(input.value); } catch (error) { setStatus(error.message, 'error'); return; }
  const translation = selectedTranslation();
  if (!translation) { setStatus('Espera a que carguen las versiones bíblicas antes de buscar.', 'error'); return; }
  searchButton.disabled = true; searchButton.textContent = 'Buscando…'; setStatus(`Consultando ${translation.shortName}…`);
  try {
    const response = await fetch(`https://bible.helloao.org/api/${translation.id}/${reference.book}/${reference.chapter}.json`);
    if (!response.ok) throw new Error('No se pudo encontrar ese capítulo.');
    const chapter = await response.json();
    const verses = chapterVerses(chapter).filter(verse => !reference.verses || reference.verses.has(verse.v));
    if (!verses.length) throw new Error('No encontré versículos para esa referencia.');
    versionEl.textContent = (chapter.translation.shortName || translation.shortName).toUpperCase();
    slides = makeSlides(verses, reference);
    updateDownloadDetails();
    await showSlide(0);
    setStatus(`${verses.length} versículo${verses.length === 1 ? '' : 's'} en ${slides.length} lámina${slides.length === 1 ? '' : 's'}.`, 'success');
  } catch (error) {
    setStatus(error.message || 'Ocurrió un error al consultar la Biblia.', 'error');
  } finally {
    searchButton.disabled = false; searchButton.textContent = 'Buscar';
  }
}

const waitForPaint = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
async function exportSlide(index) {
  await showSlide(index); await waitForPaint();
  const canvas = await html2canvas(card, { scale: 3, backgroundColor: transparent.checked ? null : bg.value, useCORS: true, logging: false });
  const output = document.createElement('canvas'); output.width = 1920; output.height = 1080;
  output.getContext('2d').drawImage(canvas, 0, 0, 1920, 1080);
  return new Promise(resolve => output.toBlob(resolve, 'image/png'));
}

async function downloadPngs() {
  if (!window.html2canvas) { setStatus('No se pudo cargar el generador de PNG. Revisa tu conexión.', 'error'); return; }
  const selectedSlide = currentSlide;
  downloadButton.disabled = true; downloadButton.textContent = 'Generando PNGs…';
  try {
    for (let index = 0; index < slides.length; index += 1) {
      downloadButton.textContent = `Generando ${index + 1} de ${slides.length}…`;
      const blob = await exportSlide(index);
      const link = document.createElement('a');
      const versionId = selectedTranslation()?.shortName?.toLowerCase() || 'biblia';
      link.download = `${slides[index].reference.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()}-${versionId}-${String(index + 1).padStart(2, '0')}.png`;
      link.href = URL.createObjectURL(blob); link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }
    setStatus(`${slides.length} PNG${slides.length === 1 ? '' : 's'} descargado${slides.length === 1 ? '' : 's'}. Ya puedes agregarlos como imágenes en tu presentación.`, 'success');
  } catch {
    setStatus('No se pudieron generar todos los PNG. Inténtalo nuevamente.', 'error');
  } finally {
    await showSlide(selectedSlide);
    downloadButton.disabled = false; updateDownloadDetails();
  }
}

async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function downloadPptx() {
  if (!window.PptxGenJS || !window.html2canvas) {
    setStatus('No se pudo cargar el generador de PowerPoint. Revisa tu conexión.', 'error');
    return;
  }
  const selectedSlide = currentSlide;
  downloadPptButton.disabled = true;
  downloadPptButton.textContent = 'Generando PPTX…';
  try {
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.author = 'Pasaje a PNG';
    pptx.subject = `Pasajes bíblicos ${selectedTranslation()?.name || ''}`.trim();
    pptx.title = 'Pasajes bíblicos para presentación';
    pptx.lang = 'es-CL';

    for (let index = 0; index < slides.length; index += 1) {
      downloadPptButton.textContent = `Generando diapositiva ${index + 1} de ${slides.length}…`;
      const imageData = await blobToDataUrl(await exportSlide(index));
      const pptSlide = pptx.addSlide();
      pptSlide.background = { color: bg.value.replace('#', '') };
      pptSlide.addImage({ data: imageData, x: 0, y: 0, w: 13.333, h: 7.5 });
    }
    const versionId = selectedTranslation()?.shortName?.toLowerCase() || 'biblia';
    await pptx.writeFile({ fileName: `pasajes-biblicos-${versionId}.pptx`, compression: true });
    setStatus(`${slides.length} diapositiva${slides.length === 1 ? '' : 's'} exportada${slides.length === 1 ? '' : 's'} en un único archivo PPTX.`, 'success');
  } catch {
    setStatus('No se pudo generar el PPTX. Inténtalo nuevamente.', 'error');
  } finally {
    await showSlide(selectedSlide);
    downloadPptButton.disabled = false;
    updateDownloadDetails();
  }
}

form.addEventListener('submit', search);
input.addEventListener('input', renderBookSuggestions);
input.addEventListener('focus', renderBookSuggestions);
input.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeBookSuggestions();
    return;
  }
  if (!matchingBooks.length) return;
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    setActiveSuggestion((activeSuggestion + 1) % matchingBooks.length);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    setActiveSuggestion((activeSuggestion - 1 + matchingBooks.length) % matchingBooks.length);
  } else if (event.key === 'Enter' && activeSuggestion >= 0) {
    event.preventDefault();
    chooseBook(matchingBooks[activeSuggestion]);
  }
});
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('.reference-autocomplete')) closeBookSuggestions();
  if (!event.target.closest('.version-picker')) closeVersionOptions();
  if (!event.target.closest('.font-picker')) closeFontOptions();
});
versionTrigger.addEventListener('click', () => {
  if (versionTrigger.disabled) return;
  const willOpen = versionOptions.hidden;
  versionOptions.hidden = !willOpen;
  versionTrigger.setAttribute('aria-expanded', String(willOpen));
});
versionTrigger.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeVersionOptions();
});
fontTrigger.addEventListener('click', () => {
  const willOpen = fontOptions.hidden;
  fontOptions.hidden = !willOpen;
  fontTrigger.setAttribute('aria-expanded', String(willOpen));
});
fontTrigger.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeFontOptions();
});
[bg, fg, fontFamily, transparent].forEach(control => control.addEventListener('input', updateAppearance));
bibleVersion.addEventListener('change', () => {
  const translation = selectedTranslation();
  if (translation) chooseTranslation(translation.id, true);
});
previousButton.addEventListener('click', () => { showSlide(currentSlide - 1); });
nextButton.addEventListener('click', () => { showSlide(currentSlide + 1); });
downloadButton.addEventListener('click', downloadPngs);
downloadPptButton.addEventListener('click', downloadPptx);
window.addEventListener('resize', () => { showSlide(currentSlide); });
renderFontOptions();
updateAppearance(); showSlide(0);
loadTranslations();
