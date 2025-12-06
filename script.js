const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTime = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const download = document.getElementById('download');
const likeBtn = document.getElementById('like');
const lyricsBtn = document.getElementById('lyricsBtn');
const lyrics = document.getElementById('lyrics');
const lyricsText = document.getElementById('lyricsText');

audio.addEventListener('loadedmetadata', () => {
  const p = document.getElementById('progress');
  if (p) p.max = Math.floor(audio.duration);
  const d = document.getElementById('duration');
  if (d) d.textContent = formatTime(audio.duration);
  const src = document.getElementById('audioSrc');
  if (src && download) download.href = src.src;
});

playBtn.addEventListener('click', () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

audio.addEventListener('play', () => playBtn.textContent = '❚❚');
audio.addEventListener('pause', () => playBtn.textContent = '►');

audio.addEventListener('timeupdate', () => {
  if (progress) progress.value = Math.floor(audio.currentTime);
  if (currentTime) currentTime.textContent = formatTime(audio.currentTime);
});

if (progress) {
  progress.addEventListener('input', (e) => {
    audio.currentTime = e.target.value;
  });
}

if (document.getElementById('like')) {
  const likeBtnEl = document.getElementById('like');
  likeBtnEl.addEventListener('click', () => {
    const pressed = likeBtnEl.getAttribute('aria-pressed') === 'true';
    likeBtnEl.setAttribute('aria-pressed', (!pressed).toString());
    likeBtnEl.textContent = !pressed ? '♥' : '♡';
  });
}

if (lyricsBtn) {
  lyricsBtn.addEventListener('click', () => {
    const hidden = lyrics.classList.toggle('hidden');
    lyrics.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    lyricsBtn.textContent = hidden ? 'Sözleri Göster' : 'Sözleri Gizle';
  });
}

function formatTime(sec){
  if (!sec || isNaN(sec)) return '00:00';
  const s = Math.floor(sec % 60).toString().padStart(2,'0');
  const m = Math.floor(sec / 60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

lyricsText.textContent = `Buraya şarkı sözlerini yapıştırabilirsin.
Sevgi dolu bir not eklemek istersen burayı düzenle.`;