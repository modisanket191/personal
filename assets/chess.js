(() => {
  // Keep the portfolio navigation permanently visible while scrolling.
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    header { position:fixed!important; top:0!important; left:0!important; right:0!important; width:100%!important; z-index:9999!important; }
    body { padding-top:72px!important; }
    .section-top { display:block!important; }
    .section-top .section-intro { margin-top:16px; max-width:650px; }
    #theme-toggle { display:inline-flex; align-items:center; justify-content:center; gap:6px; width:38px; height:38px; padding:0; margin-left:4px; border:1px solid var(--line); border-radius:999px; background:var(--surface); color:var(--text); cursor:pointer; font-size:17px; line-height:1; }
    #theme-toggle:hover { border-color:#53606d; }
    html.light { --bg:#f6f8fa; --surface:#ffffff; --surface2:#eef2f5; --line:#d7dde3; --text:#17202a; --muted:#5f6b76; --soft:#34404b; --accent:#087ea4; --accent2:#16805f; --white:#111820; }
    html.light body { background:var(--bg); color:var(--text); }
    html.light header { background:rgba(246,248,250,.88); border-bottom-color:rgba(20,30,40,.10); }
    html.light .hero:before { background:radial-gradient(circle,rgba(8,126,164,.10),transparent 68%); }
    html.light .btn.primary, html.light .inquiry-submit { background:#17202a; color:#fff; border-color:#17202a; }
    html.light .tenure-badge, html.light .education-timeline-date { background:#f1f4f6; color:#34404b; border-color:#cbd3da; }
    html.light .chess-mark, html.light .chess-rating, html.light .inquiry-field input, html.light .inquiry-field select, html.light .inquiry-field textarea { background:#f8fafb; color:var(--text); }
    html.light .connect, html.light .chess-card, html.light .project-card.featured { background:linear-gradient(145deg,#ffffff,#f1f4f6); }
    html.light .metric, html.light .tenure-legend { background:linear-gradient(145deg,#ffffff,#eef2f5); }
    #education .education-timeline-date { display:inline-flex; align-items:center; margin:14px 0 10px; padding:6px 11px; border:1px solid #394550; border-radius:999px; background:#0d1116; color:#dce4ec; font-size:11px; font-weight:600; letter-spacing:.03em; }
    #education .education-timeline-date::before { content:''; width:7px; height:7px; border-radius:50%; background:#a7f3d0; margin-right:8px; }
    #education .education-degree + .education-timeline-date { margin-top:8px; }
    @media(max-width:800px){ #theme-toggle { width:36px; height:36px; } }
    @media(max-width:520px){ #education .education-timeline-date { margin-top:10px; } }
  `;
  document.head.appendChild(navStyle);

  // Add a persistent light/dark mode toggle to the navigation.
  const addThemeToggle = () => {
    const nav = document.querySelector('.navlinks');
    if (!nav || document.getElementById('theme-toggle')) return;
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.type = 'button';
    button.setAttribute('aria-label', 'Toggle light and dark mode');
    nav.appendChild(button);
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'light') document.documentElement.classList.add('light');
    const updateIcon = () => {
      const light = document.documentElement.classList.contains('light');
      button.textContent = light ? '☀' : '☾';
      button.title = light ? 'Switch to dark mode' : 'Switch to light mode';
    };
    button.addEventListener('click', () => {
      const light = document.documentElement.classList.toggle('light');
      localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
      updateIcon();
    });
    updateIcon();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addThemeToggle);
  else addThemeToggle();

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
  const setRating = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value ?? '—'; };
  const render = (data) => {
    setRating('rapid-rating', data?.chess_rapid?.last?.rating);
    setRating('blitz-rating', data?.chess_blitz?.last?.rating);
    setRating('bullet-rating', data?.chess_bullet?.last?.rating);
    const status = document.getElementById('chess-status');
    if (status) status.textContent = 'Live ratings from Chess.com public API';
  };
  const showError = () => { const status = document.getElementById('chess-status'); if (status) status.textContent = 'Chess.com ratings are temporarily unavailable.'; };
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
