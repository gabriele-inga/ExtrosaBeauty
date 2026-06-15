// --- BUSINESS DATA DIRECTORIES ---
const TREATMENTS = [
  {
    id: "e1",
    name: "Epilazione con Cera Ritardante",
    category: "Epilazione",
    duration: "30 min",
    price: 25,
    description: "Trattamento di epilazione con cera speciale formulata per rallentare la ricrescita del pelo."
  },
  {
    id: "e2",
    name: "Epilazione Definitiva Laser",
    category: "Epilazione",
    duration: "45 min",
    price: 69,
    description: "Tecnologia laser di ultima generazione per l'eliminazione permanente e sicura dei peli superflui."
  },
  {
    id: "vc1",
    name: "Trattamento Hammam & Sapone Nero",
    category: "Viso & Corpo",
    duration: "60 min",
    price: 65,
    description: "Calore del vapore e stesura del sapone nero per una rigenerazione cutanea profonda d'ispirazione orientale."
  },
  {
    id: "vc4",
    name: "Trattamento Viso Anti-Aging",
    category: "Viso & Corpo",
    duration: "60 min",
    price: 90,
    description: "Rituale liftante intensivo per contrastare i segni del tempo e ridonare elasticità alla pelle."
  },
  {
    id: "m1",
    name: "Massaggio Relax Umami",
    category: "Massaggi",
    duration: "50 min",
    price: 60,
    description: "Manovre avvolgenti e oli essenziali per allentare le tensioni e rigenerare mente e corpo."
  }
];

// Unica sede fissa preimpostata coerentemente con la richiesta
const ONLY_LOCATION = "Extrosa Salon - Caramagna Piemonte (Piazza Castello)";

const TIME_SLOTS = [
  "09:00", "10:30", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"
];

// --- APP STATE ENGINE ---
let widgetState = { serviceId: "", location: ONLY_LOCATION, date: "" };
let bookingModalState = {
  step: 1,
  selectedService: "",
  selectedLocation: ONLY_LOCATION,
  selectedDate: new Date().toISOString().split("T")[0],
  selectedTimeSlot: "",
  customerName: "",
  customerPhone: "",
  customerEmail: ""
};

function safeQuerySelector(selector) {
  const element = document.querySelector(selector);
  if (!element && !selector.includes("location")) {
    console.warn(`Element with selector "${selector}" was not found.`);
  }
  return element;
}

// DOM items
const bookingModal = safeQuerySelector("#booking-modal");
const bookingModalOverlay = safeQuerySelector("#booking-modal-overlay");
const bookingModalClose = safeQuerySelector("#booking-modal-close");

const widgetServiceBtn = safeQuerySelector("#widget-service-btn");
const widgetServiceLabel = safeQuerySelector("#widget-service-label");
const widgetServiceDropdown = safeQuerySelector("#widget-service-dropdown");
const widgetServicesList = safeQuerySelector("#widget-services-list");

const widgetDateInput = safeQuerySelector("#widget-date-input");
const widgetSubmitBtn = safeQuerySelector("#widget-submit-btn");
const heroBtnBook = safeQuerySelector("#hero-btn-book");

const bookingStepBadge = safeQuerySelector("#booking-step-badge");
const bookingModalStep1 = safeQuerySelector("#booking-modal-step-1");
const bookingModalStep2 = safeQuerySelector("#booking-modal-step-2");
const bookingModalStep3 = safeQuerySelector("#booking-modal-step-3");
const bookingModalStep4 = safeQuerySelector("#booking-modal-step-4");

const bookingTreatmentsContainer = safeQuerySelector("#booking-treatments-container");
const bookingS1Next = safeQuerySelector("#booking-s1-next");
const bookingInputDate = safeQuerySelector("#booking-input-date");
const bookingSlotsGrid = safeQuerySelector("#booking-slots-grid");
const bookingS2Back = safeQuerySelector("#booking-s2-back");
const bookingS2Next = safeQuerySelector("#booking-s2-next");

const bookingDetailsForm = safeQuerySelector("#booking-details-form");
const bookingInputName = safeQuerySelector("#booking-input-name");
const bookingInputPhone = safeQuerySelector("#booking-input-phone");
const bookingInputEmail = safeQuerySelector("#booking-input-email");
const bookingS3Back = safeQuerySelector("#booking-s3-back");

const summaryServiceName = safeQuerySelector("#summary-service-name");
const summaryServicePrice = safeQuerySelector("#summary-service-price");
const summaryServiceLocation = safeQuerySelector("#summary-service-location");
const summaryServiceDatetime = safeQuerySelector("#summary-service-datetime");
const bookingSuccessP = safeQuerySelector("#booking-success-p");
const bookingSuccessClose = safeQuerySelector("#booking-success-close");

document.addEventListener("DOMContentLoaded", () => {
  setupWidgetDates();
  renderWidgetServices();

  // Nasconde automaticamente il selettore di location nel popup se presente nell'HTML
  const bookingSelectLocation = document.querySelector("#booking-select-location");
  if (bookingSelectLocation && bookingSelectLocation.parentElement) {
    bookingSelectLocation.parentElement.classList.add("hidden");
  }

  if (window.lucide) window.lucide.createIcons();
  document.addEventListener("click", handleOutsideClicks);
});

function setupWidgetDates() {
  if (widgetDateInput) {
    const today = new Date().toISOString().split("T")[0];
    widgetDateInput.min = today;
    widgetDateInput.addEventListener("change", (e) => { widgetState.date = e.target.value; });
  }
}

function renderWidgetServices() {
  if (!widgetServicesList) return;
  widgetServicesList.innerHTML = "";
  TREATMENTS.forEach((treatment) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "w-full flex justify-between items-center px-4 py-3 rounded-xl text-xs text-left text-neutral-400 hover:bg-neutral-900 hover:text-white cursor-pointer";
    btn.innerHTML = `<div><span class="font-semibold block">${treatment.name}</span></div><div><span class="font-serif text-neutral-300">${treatment.price}€</span></div>`;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      widgetState.serviceId = treatment.id;
      widgetServiceLabel.innerText = treatment.name;
      widgetServiceDropdown.classList.add("hidden");
    });
    widgetServicesList.appendChild(btn);
  });
}

if (widgetServiceBtn) {
  widgetServiceBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    widgetServiceDropdown.classList.toggle("hidden");
  });
}

function handleOutsideClicks(e) {
  if (widgetServiceDropdown && !widgetServiceBtn.contains(e.target) && !widgetServiceDropdown.contains(e.target)) {
    widgetServiceDropdown.classList.add("hidden");
  }
}

if (widgetSubmitBtn) {
  widgetSubmitBtn.addEventListener("click", () => { openBookingModal(widgetState.serviceId, widgetState.date); });
}

if (heroBtnBook) {
  heroBtnBook.addEventListener("click", () => { openBookingModal("", ""); });
}

function openBookingModal(preFilledServiceId = "", preFilledDate = "") {
  bookingModalState.step = 1;
  bookingModalState.selectedService = preFilledServiceId;
  bookingModalState.selectedLocation = ONLY_LOCATION;
  const today = new Date().toISOString().split("T")[0];
  bookingModalState.selectedDate = preFilledDate || today;

  if (bookingInputDate) {
    bookingInputDate.min = today;
    bookingInputDate.value = bookingModalState.selectedDate;
  }

  if (bookingModal) {
    bookingModal.classList.remove("hidden");
    bookingModal.classList.add("flex");
    requestAnimationFrame(() => {
      bookingModal.classList.add("opacity-100");
      const subPanel = bookingModal.querySelector(".relative.w-full.max-w-2xl");
      if (subPanel) subPanel.classList.add("scale-100", "translate-y-0");
    });
  }
  renderBookingStep();
}

function closeBookingModal() {
  if (bookingModal) {
    bookingModal.classList.remove("opacity-100");
    setTimeout(() => { bookingModal.classList.replace("flex", "hidden"); }, 350);
  }
}

if (bookingModalClose) bookingModalClose.addEventListener("click", closeBookingModal);
if (bookingModalOverlay) bookingModalOverlay.addEventListener("click", closeBookingModal);

function renderBookingStep() {
  const currentStep = bookingModalState.step;
  if (currentStep < 4) bookingStepBadge.innerText = `Step ${currentStep} di 3`;

  [bookingModalStep1, bookingModalStep2, bookingModalStep3, bookingModalStep4].forEach(s => s.classList.add("hidden"));

  if (currentStep === 1) { bookingModalStep1.classList.remove("hidden"); renderStep1Treatments(); }
  else if (currentStep === 2) { bookingModalStep2.classList.remove("hidden"); renderStep2TimeSlots(); }
  else if (currentStep === 3) { bookingModalStep3.classList.remove("hidden"); renderStep3Summary(); }
  else if (currentStep === 4) { bookingModalStep4.classList.remove("hidden"); }
}

function renderStep1Treatments() {
  if (!bookingTreatmentsContainer) return;
  bookingTreatmentsContainer.innerHTML = "";
  TREATMENTS.forEach((treatment) => {
    const isSelected = bookingModalState.selectedService === treatment.id;
    const card = document.createElement("div");
    card.className = `p-4 border transition-all cursor-pointer flex justify-between items-center ${isSelected ? "bg-neutral-900 border-white text-white" : "bg-black border-neutral-850 text-neutral-300"}`;
    card.innerHTML = `<div><span class="font-serif text-base font-medium">${treatment.name}</span></div><div><span class="font-serif text-white">${treatment.price}€</span></div>`;
    card.addEventListener("click", () => {
      bookingModalState.selectedService = treatment.id;
      renderStep1Treatments();
    });
    bookingTreatmentsContainer.appendChild(card);
  });
  if (bookingS1Next) bookingS1Next.disabled = !bookingModalState.selectedService;
}

if (bookingS1Next) { bookingS1Next.addEventListener("click", () => { bookingModalState.step = 2; renderBookingStep(); }); }

function renderStep2TimeSlots() {
  if (!bookingSlotsGrid) return;
  bookingSlotsGrid.innerHTML = "";
  TIME_SLOTS.forEach((slot) => {
    const isSelected = bookingModalState.selectedTimeSlot === slot;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `py-3 border text-xs font-medium transition-all ${isSelected ? "bg-white text-black border-white" : "bg-black border-neutral-850 text-neutral-400"}`;
    btn.innerText = slot;
    btn.addEventListener("click", () => { bookingModalState.selectedTimeSlot = slot; renderStep2TimeSlots(); });
    bookingSlotsGrid.appendChild(btn);
  });
  if (bookingS2Next) bookingS2Next.disabled = !bookingModalState.selectedTimeSlot;
}

if (bookingS2Back) bookingS2Back.addEventListener("click", () => { bookingModalState.step = 1; renderBookingStep(); });
if (bookingS2Next) bookingS2Next.addEventListener("click", () => { bookingModalState.step = 3; renderBookingStep(); });

function renderStep3Summary() {
  const tr = TREATMENTS.find((t) => t.id === bookingModalState.selectedService);
  if (!tr) return;
  if (summaryServiceName) summaryServiceName.innerText = tr.name;
  if (summaryServicePrice) summaryServicePrice.innerText = `${tr.price}€`;
  if (summaryServiceLocation) summaryServiceLocation.innerText = bookingModalState.selectedLocation;
  if (summaryServiceDatetime) summaryServiceDatetime.innerText = `${bookingModalState.selectedDate} alle ore ${bookingModalState.selectedTimeSlot}`;
}

if (bookingS3Back) bookingS3Back.addEventListener("click", () => { bookingModalState.step = 2; renderBookingStep(); });

if (bookingDetailsForm) {
  bookingDetailsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (bookingSuccessP) bookingSuccessP.innerText = "La tua richiesta è stata registrata con successo per la sede di Caramagna Piemonte. Ti contatteremo a breve.";
    bookingModalState.step = 4;
    renderBookingStep();
  });
}
if (bookingSuccessClose) bookingSuccessClose.addEventListener("click", closeBookingModal);

// --- TAB DI NAVIGAZIONE INTERATTIVA SERVIZI ---
document.addEventListener('DOMContentLoaded', () => {
  const servicesData = {
    tab1: { title: "Epilazione Professionale", desc: "Trattamenti di epilazione delicati ed efficaci.", duration: "30 MIN", price: "DA €25" },
    tab2: { title: "Trattamenti Viso & Corpo", desc: "Esclusivi trattamenti anti-aging e rituali rigeneranti.", duration: "60 MIN", price: "DA €50" },
    tab3: { title: "Massaggi d'Autore", desc: "Ritagliati un momento di puro relax.", duration: "50 MIN", price: "DA €60" },
    tab4: { title: "Manicure & Pedicure", desc: "Servizi dedicati alla bellezza di mani e piedi.", duration: "45 MIN", price: "DA €35" },
    tab5: { title: "Trucco & Solarium", desc: "Servizi di make-up professionale per eventi.", duration: "20 MIN", price: "DA €20" }
  };

  const tabs = document.querySelectorAll('.tab-btn');
  const cardTitle = document.getElementById('card-title');
  const cardDesc = document.getElementById('card-desc');
  const cardDuration = document.getElementById('card-duration');
  const cardPrice = document.getElementById('card-price');
  const card = document.getElementById('service-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.replace('text-neutral-900', 'text-neutral-400');
        t.querySelector('.tab-indicator').classList.replace('opacity-100', 'opacity-0');
      });
      tab.classList.replace('text-neutral-400', 'text-neutral-900');
      tab.querySelector('.tab-indicator').classList.replace('opacity-0', 'opacity-100');

      if (card) {
        card.classList.add('opacity-0');
        setTimeout(() => {
          const data = servicesData[tab.getAttribute('data-target')];
          if (cardTitle) cardTitle.textContent = data.title;
          if (cardDesc) cardDesc.textContent = data.desc;
          if (cardDuration) cardDuration.textContent = data.duration;
          if (cardPrice) cardPrice.textContent = data.price;
          card.classList.remove('opacity-0');
        }, 300);
      }
    });
  });

  // --- LOGICA DI NAVIGAZIONE CON CAPSULE ARROTONDATE (SENZA PALLINI) ---
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Resetta tutti gli elementi della navigazione
      navLinks.forEach((item) => {
        item.classList.remove("bg-white/10", "bg-white/[0.05]");

        // Ripristina i colori e i bordi di base a seconda del pulsante
        if (item.getAttribute("href") === "#contact-us-section") {
          item.classList.remove("text-white", "bg-[#cda250]/10");
          item.classList.add("text-[#cda250]");
        } else {
          item.classList.remove("text-white");
          item.classList.add("text-neutral-400");
        }
      });

      // Applica lo stile "Attivo" (Arrotondato pieno) sul link cliccato
      if (this.getAttribute("href") === "#contact-us-section") {
        this.classList.remove("text-[#cda250]");
        this.classList.add("text-white", "bg-[#cda250]/10");
      } else {
        this.classList.remove("text-neutral-400");
        this.classList.add("text-white", "bg-white/10");
      }
    });
  });

  // --- SCROLL REATTIVO NAVBAR CAPSULE ---
  const mainNavbar = document.getElementById("main-navbar");
  const navbarCapsule = document.getElementById("navbar-capsule");

  window.addEventListener("scroll", () => {
    if (mainNavbar && navbarCapsule) {
      if (window.scrollY > 50) {
        mainNavbar.classList.replace("pt-6", "pt-3");
        navbarCapsule.classList.remove("bg-white/[0.04]", "border-white/15", "py-3.5", "px-8");
        navbarCapsule.classList.add("bg-neutral-950/90", "border-white/10", "py-2.5", "px-6", "backdrop-blur-3xl");
      } else {
        mainNavbar.classList.replace("pt-3", "pt-6");
        navbarCapsule.classList.remove("bg-neutral-950/90", "border-white/10", "py-2.5", "px-6", "backdrop-blur-3xl");
        navbarCapsule.classList.add("bg-white/[0.04]", "border-white/15", "py-3.5", "px-8");
      }
    }
  });
});

// Registra il plugin in cima al file se usi moduli, altrimenti GSAP lo prenderà globalmente
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("services-scroll-video");
  const scrollWrapper = document.getElementById("services-scroll-wrapper");

  if (video && scrollWrapper) {
    video.addEventListener("loadedmetadata", initVideoScrub);
    if (video.readyState >= 2) initVideoScrub();
  }

  function initVideoScrub() {
    gsap.to(video, {
      currentTime: video.duration,
      ease: "none",
      scrollTrigger: {
        trigger: scrollWrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        markers: false
      }
    });
  }

  // Logica delle Tab per la Card dei Servizi
  const tabButtons = document.querySelectorAll("#services-tabs .tab-btn");
  const cardTitle = document.getElementById("card-title");
  const cardDesc = document.getElementById("card-desc");
  const cardDuration = document.getElementById("card-duration");
  const cardPrice = document.getElementById("card-price");
  const serviceCard = document.getElementById("service-card");

  const servicesData = {
    tab1: { title: "Epilazione Professionale", desc: "Trattamenti di epilazione delicati ed efficaci. Dalla nostra cera speciale progettata per rallentare la ricrescita del pelo, fino all'epilazione definitiva con laser a diodo per una pelle liscia per sempre.", duration: "30 MIN", price: "DA €25" },
    tab2: { title: "Trattamenti Viso & Corpo", desc: "Rituali personalizzati d'alta gamma per rigenerare i tessuti cutanei, combattere i segni del tempo e ridonare luminosità profonda attraverso peeling enzimatici e maschere bio-attive.", duration: "60 MIN", price: "DA €60" },
    tab3: { title: "Massaggi d'Autore", desc: "Esperienze sensoriali esclusive che fondono tecniche orientali e occidentali. Sciolgono le tensioni muscolari profumando la mente con oli essenziali rari scelti su misura.", duration: "50 MIN", price: "DA €70" },
    tab4: { title: "Mani & Piedi Luxury", desc: "Manicure e pedicure curative ed estetiche con l'applicazione di smalti semipermanenti a lunghissima durata. Include scrub ai cristalli di zucchero e massaggio idratante.", duration: "45 MIN", price: "DA €35" },
    tab5: { title: "Trucco & Solarium", desc: "Make-up professionale per eventi speciali e cerimonie, abbinato a sessioni solarium sicure di ultima generazione per un'abbronzatura sana, omogenea e dorata tutto l'anno.", duration: "40 MIN", price: "DA €45" }
  };

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      const data = servicesData[target];
      if (!data) return;

      gsap.to(serviceCard, {
        opacity: 0, y: 10, duration: 0.2, onComplete: () => {
          cardTitle.textContent = data.title;
          cardDesc.textContent = data.desc;
          cardDuration.textContent = data.duration;
          cardPrice.textContent = data.price;

          tabButtons.forEach(btn => {
            const indicator = btn.querySelector(".tab-indicator");
            if (btn === button) {
              btn.classList.remove("text-neutral-400");
              btn.classList.add("text-neutral-900");
              if (indicator) indicator.style.opacity = "1";
            } else {
              btn.classList.remove("text-neutral-900");
              btn.classList.add("text-neutral-400");
              if (indicator) indicator.style.opacity = "0";
            }
          });
          gsap.to(serviceCard, { opacity: 1, y: 0, duration: 0.3 });
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('beauty-preloader');
    const circle = document.getElementById('loading-circle');
    
    // 1. Avvia immediatamente l'animazione del cerchio d'oro
    if (circle) {
      circle.classList.add('animate');
    }

    // 2. Transizione "effetto goccia d'acqua" a 2.2 secondi esatti
    setTimeout(() => {
      if (preloader) {
        // Applica le classi di transizione fluide (Sfocatura che sparisce + espansione a onda)
        preloader.classList.add('opacity-0', 'scale-110', 'blur-md');
        
        // Rimuove l'elemento dal DOM solo quando l'effetto visivo è terminato
        setTimeout(() => {
          preloader.remove();
        }, 1200); // Tempo leggermente aumentato per far godere la morbidezza del blur
      }
    }, 1500); // Durata del caricamento: 2.2 secondi
  });


/* ==========================================================================
   INTERACTIVE MOBILE REELS CARD STACK ENGINE
   ========================================================================== */
function initMobileReelsStack() {
  const container = document.getElementById('reels-stack-container');
  if (!container) return;

  let cards = Array.from(container.querySelectorAll('.instagram-reel-card'));
  
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  function arrangeStack() {
    if (window.innerWidth >= 768) {
      cards.forEach(card => {
        card.removeAttribute('style');
        card.removeAttribute('data-stack-index');
        const video = card.querySelector('video');
        if (video && !video.paused) video.pause();
      });
      return;
    }

    cards.forEach((card, index) => {
      card.setAttribute('data-stack-index', index);
      const video = card.querySelector('video');

      if (index === 0) {
        // Carta Principale in primo piano
        card.style.transform = `translateX(0px) scale(1) translateZ(0)`;
        card.style.opacity = '1';
        card.style.zIndex = '30';
        card.style.pointerEvents = 'auto';
        if (video && video.paused) {
          video.play().catch(() => {});
        }
      } else if (index === 1) {
        // Prima carta dietro (spunta a destra)
        card.style.transform = `translateX(24px) scale(0.92) translateZ(-10px)`;
        card.style.opacity = '0.85';
        card.style.zIndex = '20';
        card.style.pointerEvents = 'none';
        if (video && !video.paused) video.pause();
      } else if (index === 2) {
        // Seconda carta dietro (spunta ancora più a destra)
        card.style.transform = `translateX(44px) scale(0.84) translateZ(-20px)`;
        card.style.opacity = '0.6';
        card.style.zIndex = '10';
        card.style.pointerEvents = 'none';
        if (video && !video.paused) video.pause();
      } else {
        // Tutte le altre carte nascoste sotto il mazzo
        card.style.transform = `translateX(60px) scale(0.76) translateZ(-30px)`;
        card.style.opacity = '0';
        card.style.zIndex = '0';
        card.style.pointerEvents = 'none';
        if (video && !video.paused) video.pause();
      }
    });
  }

  // Gestione degli eventi Touch e Mouse per lo Swipe su Mobile
  function onStart(e) {
    if (window.innerWidth >= 768) return;
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = startX;
    if (cards[0]) cards[0].style.transition = 'none';
  }

  function onMove(e) {
    if (!isDragging || !cards[0]) return;
    currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const deltaX = currentX - startX;

    // Permette il trascinamento solo verso sinistra per sfogliare la carta
    if (deltaX < 0) {
      cards[0].style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.03}deg) scale(1)`;
      cards[0].style.opacity = 1 + (deltaX / 300);
    }
  }

  function onEnd() {
    if (!isDragging || !cards[0]) return;
    isDragging = false;
    cards[0].style.transition = 'transform 0.4s ease, opacity 0.4s ease';

    const deltaX = currentX - startX;
    
    // Soglia di Swipe superata: manda la carta in fondo al mazzo
    if (deltaX < -100) {
      const activeCard = cards.shift(); // Rimuove la prima
      cards.push(activeCard);          // La sposta alla fine
    }
    
    arrangeStack();
  }

  // Attivazione dei Listener sul container mobile
  container.addEventListener('touchstart', onStart, { passive: true });
  container.addEventListener('touchmove', onMove, { passive: true });
  container.addEventListener('touchend', onEnd);

  container.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  // Inizializzazione iniziale e resize
  arrangeStack();
  window.addEventListener('resize', arrangeStack);
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileReelsStack();
});