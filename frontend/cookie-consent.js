/**
 * EXTROSA BEAUTY - GDPR COOKIE CONSENT ENGINE
 * Conforme al Regolamento UE 2016/679 (GDPR) e alle Linee Guida Garante Privacy 2021
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'extrosa_cookie_consent';
  const DEFAULT_CONSENT = {
    necessary: true,
    analytics: false,
    marketing: false,
    timestamp: null,
    version: '1.0'
  };

  function getSavedConsent() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }

  function saveConsent(consent) {
    try {
      const payload = {
        ...consent,
        necessary: true,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      applyConsent(payload);
      hideBanner();
      hideModal();
    } catch (e) {
      console.error('Impossibile salvare il consenso cookie:', e);
    }
  }

  function applyConsent(consent) {
    // Gestione dell'iframe di Google Maps se presente nella pagina
    const mapIframe = document.querySelector('iframe[src*="google.com/maps"]');
    if (mapIframe) {
      const mapContainer = mapIframe.parentElement;
      if (!consent.marketing) {
        if (!document.getElementById('gmaps-blocked-placeholder')) {
          mapIframe.style.display = 'none';
          const placeholder = document.createElement('div');
          placeholder.id = 'gmaps-blocked-placeholder';
          placeholder.className = 'w-full h-full bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-3';
          placeholder.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-[#cda250]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <p class="text-xs text-neutral-300 font-light max-w-xs leading-relaxed">
              La mappa interattiva è disattivata perché non hai accettato i cookie di terze parti (Google Maps).
            </p>
            <button type="button" onclick="window.extrosaCookieConsent.acceptCategory('marketing')" class="bg-[#cda250]/10 hover:bg-[#cda250] text-[#cda250] hover:text-black border border-[#cda250]/30 px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-medium transition-colors">
              Abilita Mappa e Accetta Cookie
            </button>
          `;
          mapContainer.appendChild(placeholder);
        }
      } else {
        const placeholder = document.getElementById('gmaps-blocked-placeholder');
        if (placeholder) placeholder.remove();
        mapIframe.style.display = 'block';
      }
    }

    // Dispaccia evento globale per eventuali altri script
    window.dispatchEvent(new CustomEvent('extrosaCookieConsentChanged', { detail: consent }));
  }

  function injectBannerHTML() {
    if (document.getElementById('extrosa-cookie-banner')) return;

    const bannerContainer = document.createElement('div');
    bannerContainer.id = 'extrosa-cookie-banner-wrap';
    bannerContainer.innerHTML = `
      <!-- BANNER BOTTOM -->
      <div id="extrosa-cookie-banner" class="fixed bottom-0 inset-x-0 z-[999990] p-4 sm:p-6 transition-all duration-500 transform translate-y-full opacity-0 pointer-events-none">
        <div class="max-w-5xl mx-auto bg-neutral-950/95 border border-[#cda250]/40 rounded-[1.75rem] p-6 sm:p-8 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div class="space-y-2 flex-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#cda250] animate-pulse"></span>
              <h4 class="font-serif text-lg text-white tracking-wide">Informativa sui Cookie & Privacy</h4>
            </div>
            <p class="text-xs text-neutral-300 font-light leading-relaxed max-w-3xl">
              Utilizziamo cookie tecnici essenziali per garantire il corretto funzionamento del sito e della prenotazione. Con il tuo consenso, utilizziamo anche cookie terzi (Google Maps) per fornirti la mappa interattiva. Puoi accettare tutti i cookie, rifiutare quelli non essenziali o personalizzare le tue preferenze. 
              Per maggiori informazioni consulta la <a href="./privacy-policy.html" target="_blank" class="text-[#cda250] underline hover:text-white">Privacy Policy</a> e la <a href="./cookie-policy.html" target="_blank" class="text-[#cda250] underline hover:text-white">Cookie Policy</a>.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-shrink-0">
            <button id="extrosa-cookie-accept-all" type="button" class="bg-[#cda250] hover:bg-white text-black font-sans text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg text-center cursor-pointer">
              Accetta Tutti
            </button>
            <button id="extrosa-cookie-reject-optional" type="button" class="bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs uppercase tracking-wider font-medium px-5 py-3 rounded-full transition-colors text-center cursor-pointer">
              Rifiuta Non Essenziali
            </button>
            <button id="extrosa-cookie-open-customize" type="button" class="bg-transparent hover:text-white text-neutral-400 text-xs uppercase tracking-wider font-light px-4 py-3 text-center transition-colors underline cursor-pointer">
              Personalizza
            </button>
          </div>

        </div>
      </div>

      <!-- MODAL PERSONALIZZA PREFERENZE -->
      <div id="extrosa-cookie-modal" class="fixed inset-0 z-[999995] hidden flex items-center justify-center p-4 opacity-0 transition-opacity duration-300 pointer-events-none">
        <div id="extrosa-cookie-modal-backdrop" class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
        
        <div class="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-[2rem] p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] z-10">
          
          <div class="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#cda250]/10 border border-[#cda250]/30 flex items-center justify-center text-[#cda250]">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/></svg>
              </div>
              <div>
                <h3 class="font-serif text-xl text-white">Preferenze Consenso Cookie</h3>
                <p class="text-xs text-neutral-400 font-light">Gestisci in modo granulare i permessi di tracciamento</p>
              </div>
            </div>
            <button id="extrosa-cookie-modal-close" type="button" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center text-lg">&times;</button>
          </div>

          <div class="overflow-y-auto space-y-4 pr-1 text-xs font-light text-neutral-300">
            
            <!-- Category: Tecnici -->
            <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start justify-between gap-4">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <h4 class="text-white font-medium text-sm">Cookie Tecnici e Necessari</h4>
                  <span class="text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold">Sempre Attivi</span>
                </div>
                <p class="text-neutral-400 text-[11px] leading-relaxed">
                  Indispensabili per il funzionamento informatico della piattaforma, la navigazione sicura e la memorizzazione della scelta del consenso cookie. Non possono essere disattivati.
                </p>
              </div>
              <input type="checkbox" checked disabled class="accent-[#cda250] w-5 h-5 rounded cursor-not-allowed mt-1 flex-shrink-0" />
            </div>

            <!-- Category: Analitici -->
            <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start justify-between gap-4">
              <div class="space-y-1">
                <h4 class="text-white font-medium text-sm">Cookie Analitici e Statistiche</h4>
                <p class="text-neutral-400 text-[11px] leading-relaxed">
                  Ci consentono di analizzare in modo anonimo ed aggregato il traffico delle pagine per migliorare le prestazioni del sito.
                </p>
              </div>
              <input id="cookie-opt-analytics" type="checkbox" class="accent-[#cda250] w-5 h-5 rounded cursor-pointer mt-1 flex-shrink-0" />
            </div>

            <!-- Category: Marketing / Terze Parti -->
            <div class="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start justify-between gap-4">
              <div class="space-y-1">
                <h4 class="text-white font-medium text-sm">Cookie di Terze Parti (Google Maps)</h4>
                <p class="text-neutral-400 text-[11px] leading-relaxed">
                  Abilitano l'integrazione di componenti terzi esterni, come la mappa Google Maps per la localizzazione del salone nel footer.
                </p>
              </div>
              <input id="cookie-opt-marketing" type="checkbox" class="accent-[#cda250] w-5 h-5 rounded cursor-pointer mt-1 flex-shrink-0" />
            </div>

          </div>

          <div class="border-t border-neutral-800 pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a href="./cookie-policy.html" target="_blank" class="text-xs text-[#cda250] hover:underline">Leggi la Cookie Policy completa</a>
            <button id="extrosa-cookie-save-preferences" type="button" class="w-full sm:w-auto bg-[#cda250] hover:bg-white text-black font-sans text-xs uppercase tracking-wider font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer text-center">
              Salva Preferenze Selezionate
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.appendChild(bannerContainer);

    // Event Listeners
    document.getElementById('extrosa-cookie-accept-all').addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: true, marketing: true });
    });

    document.getElementById('extrosa-cookie-reject-optional').addEventListener('click', () => {
      saveConsent({ necessary: true, analytics: false, marketing: false });
    });

    document.getElementById('extrosa-cookie-open-customize').addEventListener('click', () => {
      openModal();
    });

    document.getElementById('extrosa-cookie-modal-close').addEventListener('click', hideModal);
    document.getElementById('extrosa-cookie-modal-backdrop').addEventListener('click', hideModal);

    document.getElementById('extrosa-cookie-save-preferences').addEventListener('click', () => {
      const analyticsChoice = document.getElementById('cookie-opt-analytics').checked;
      const marketingChoice = document.getElementById('cookie-opt-marketing').checked;
      saveConsent({ necessary: true, analytics: analyticsChoice, marketing: marketingChoice });
    });
  }

  function showBanner() {
    const banner = document.getElementById('extrosa-cookie-banner');
    if (!banner) return;
    banner.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
    banner.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
  }

  function hideBanner() {
    const banner = document.getElementById('extrosa-cookie-banner');
    if (!banner) return;
    banner.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    banner.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
  }

  function openModal() {
    const modal = document.getElementById('extrosa-cookie-modal');
    if (!modal) return;

    const currentConsent = getSavedConsent() || DEFAULT_CONSENT;
    const analyticsBox = document.getElementById('cookie-opt-analytics');
    const marketingBox = document.getElementById('cookie-opt-marketing');
    
    if (analyticsBox) analyticsBox.checked = !!currentConsent.analytics;
    if (marketingBox) marketingBox.checked = !!currentConsent.marketing;

    modal.classList.remove('hidden');
    void modal.offsetWidth;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
  }

  function hideModal() {
    const modal = document.getElementById('extrosa-cookie-modal');
    if (!modal) return;
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }

  function init() {
    injectBannerHTML();
    const consent = getSavedConsent();
    if (!consent) {
      setTimeout(showBanner, 500);
    } else {
      applyConsent(consent);
    }

    // Attach listeners to footer links or elements with data-open-cookie-settings
    document.querySelectorAll('[data-open-cookie-settings], .open-cookie-settings-link').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // API Pubblica
  window.extrosaCookieConsent = {
    openModal: openModal,
    getConsent: getSavedConsent,
    acceptCategory: function(category) {
      const current = getSavedConsent() || DEFAULT_CONSENT;
      current[category] = true;
      saveConsent(current);
    }
  };

})();
