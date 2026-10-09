(() => {
  const isCantos = window.location.pathname.toLowerCase().includes('/proyecta-cantos/');
  const currentTool = isCantos ? 'cantos' : 'citas';
  const nav = document.createElement('nav');

  nav.className = 'product-nav';
  nav.setAttribute('aria-label', 'Herramientas de proyección');
  nav.innerHTML = `
    <a href="../citas-biblicas/index.html"${currentTool === 'citas' ? ' aria-current="page"' : ''}>Citas Bíblicas</a>
    <a href="../proyecta-cantos/index.html"${currentTool === 'cantos' ? ' aria-current="page"' : ''}>Proyecta Cantos</a>
  `;

  document.body.prepend(nav);
})();
