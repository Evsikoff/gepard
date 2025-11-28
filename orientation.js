(() => {
  const OVERLAY_ID = 'mobile-landscape-overlay';
  const STYLE_ID = 'mobile-landscape-styles';

  const ensureStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${OVERLAY_ID} {
        position: fixed;
        inset: 0;
        background: #000;
        color: #fff;
        display: none;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 2.5rem 1.5rem;
        z-index: 10000;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        letter-spacing: 0.02em;
      }

      #${OVERLAY_ID} .mobile-landscape-message {
        max-width: 32rem;
        font-size: clamp(1.1rem, 2vw, 1.4rem);
        font-weight: 600;
      }

      #${OVERLAY_ID} .mobile-landscape-subtext {
        margin-top: 0.75rem;
        font-size: clamp(0.95rem, 1.8vw, 1.1rem);
        font-weight: 400;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);
  };

  const ensureOverlay = () => {
    let overlay = document.getElementById(OVERLAY_ID);
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div>
        <p class="mobile-landscape-message">Поверните смартфон</p>
        <p class="mobile-landscape-subtext">Пожалуйста, используйте портретную ориентацию для корректного отображения.</p>
      </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
  };

  const isMobileDevice = () => {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const narrowViewport = window.matchMedia('(max-width: 1024px)').matches;
    const userAgentIsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return (coarsePointer && narrowViewport) || userAgentIsMobile;
  };

  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;

  const toggleOverlay = () => {
    const overlay = ensureOverlay();
    const shouldShow = isMobileDevice() && isLandscape();
    overlay.style.display = shouldShow ? 'flex' : 'none';
    document.documentElement.style.overflow = shouldShow ? 'hidden' : '';
  };

  document.addEventListener('DOMContentLoaded', () => {
    ensureStyles();
    ensureOverlay();
    toggleOverlay();
  });

  ['resize', 'orientationchange'].forEach((eventName) => {
    window.addEventListener(eventName, toggleOverlay, { passive: true });
  });
})();
