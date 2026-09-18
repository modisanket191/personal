(() => {
  const addEducationTimeline = () => {
    const educationCard = document.querySelector('#education .card');
    if (!educationCard || educationCard.dataset.timelineAdded) return;
    const degrees = educationCard.querySelectorAll('h3');
    const dates = ['2013 — 2015', '2008 — 2012'];
    degrees.forEach((degree, index) => {
      degree.classList.add('education-degree');
      const date = document.createElement('div');
      date.className = 'education-timeline-date';
      date.textContent = dates[index] || '';
      degree.insertAdjacentElement('afterend', date);
    });
    educationCard.dataset.timelineAdded = 'true';
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addEducationTimeline);
  else addEducationTimeline();

  const username = 'sanketmodi19';
  const endpoint = `https://api.chess.com/pub/player/${username}/stats`;
  const setRating = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? '—';
  };
  const render = (data) => {
    setRating('rapid-rating', data?.chess_rapid?.last?.rating);
    setRating('blitz-rating', data?.chess_blitz?.last?.rating);
    setRating('bullet-rating', data?.chess_bullet?.last?.rating);
    const status = document.getElementById('chess-status');
    if (status) status.textContent = 'Live ratings from Chess.com public API';
  };
  const showError = () => {
    const status = document.getElementById('chess-status');
    if (status) status.textContent = 'Chess.com ratings are temporarily unavailable.';
  };
  fetch(endpoint, { headers: { Accept: 'application/json' } })
    .then(r => { if (!r.ok) throw new Error(`Chess.com API returned ${r.status}`); return r.json(); })
    .then(render)
    .catch(() => {
      const callbackName = '__chessStatsCallback';
      window[callbackName] = render;
      const script = document.createElement('script');
      script.src = `${endpoint}?callback=${callbackName}`;
      script.onerror = showError;
      document.head.appendChild(script);
    });
})();
