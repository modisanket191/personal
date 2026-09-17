(() => {
  // Keep the portfolio navigation pinned while scrolling and stack section headings vertically.
  const navStyle = document.createElement('style');
  navStyle.textContent = `header { position: sticky !important; top: 0; z-index: 100; width: 100%; }
    .section-top { display:block !important; }
    .section-top .section-intro { margin-top:16px; max-width:650px; }
    #education .education-timeline-date { display:inline-flex; align-items:center; margin:14px 0 10px; padding:6px 11px; border:1px solid #394550; border-radius:999px; background:#0d1116; color:#dce4ec; font-size:11px; font-weight:600; letter-spacing:.03em; }
    #education .education-timeline-date::before { content:''; width:7px; height:7px; border-radius:50%; background:#a7f3d0; margin-right:8px; }
    #education .education-degree + .education-timeline-date { margin-top:8px; }
    @media (max-width:520px) { #education .education-timeline-date { margin-top:10px; } }`;
  document.head.appendChild(navStyle);

  // Add the education timeline without changing the existing education content.
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
