// ===== Nav scroll state =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Homepage welcome popup =====
const homeWelcome = document.getElementById('homeWelcome');
if (homeWelcome) {
  window.setTimeout(() => {
    homeWelcome.classList.add('is-hiding');
    window.setTimeout(() => homeWelcome.remove(), 500);
  }, 2500);
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navLinks.id = 'mobileNav';
  navToggle.setAttribute('aria-controls', 'mobileNav');
  navToggle.setAttribute('aria-expanded', 'false');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', event => {
    if (nav && !nav.contains(event.target)) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
      navToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Timetable data =====
const timetable = {
  mon: [
    { time: '3:00 PM', name: 'CMA (USA) — Part 1', teacher: 'Faculty Team', room: 'Online' },
    { time: '5:00 PM', name: 'CFA — Level I', teacher: 'Faculty Team', room: 'Online' },
  ],
  tue: [
    { time: '3:30 PM', name: 'CIA (USA) — Part 1', teacher: 'Faculty Team', room: 'Online' },
    { time: '5:30 PM', name: 'University Finance Program', teacher: 'Finance Faculty', room: 'Online' },
  ],
  wed: [
    { time: '3:00 PM', name: 'CMA (USA) — Part 2', teacher: 'Faculty Team', room: 'Online' },
    { time: '5:00 PM', name: 'CFA — Level II', teacher: 'Faculty Team', room: 'Online' },
  ],
  thu: [
    { time: '3:30 PM', name: 'CIA (USA) — Parts 2 & 3', teacher: 'Faculty Team', room: 'Online' },
    { time: '5:30 PM', name: 'University Finance Program', teacher: 'Finance Faculty', room: 'Online' },
  ],
  fri: [
    { time: '3:00 PM', name: 'CFA — Level III', teacher: 'Faculty Team', room: 'Online' },
    { time: '5:00 PM', name: 'Professional Exam Workshop', teacher: 'Faculty Team', room: 'Online' },
  ],
  sat: [],
};

const boardPanel = document.getElementById('boardPanel');
const dayBtns = document.querySelectorAll('.day-btn');

function renderDay(day) {
  if (!boardPanel) return;
  const slots = timetable[day] || [];
  boardPanel.innerHTML = '';
  if (slots.length === 0) {
    boardPanel.innerHTML = '<div class="slot-empty">No classes scheduled — enjoy the weekend.</div>';
    return;
  }
  slots.forEach(slot => {
    const el = document.createElement('div');
    el.className = 'slot';
    el.innerHTML = `
      <div class="slot-time">${slot.time}</div>
      <div class="slot-info">
        <h4>${slot.name}</h4>
        <span>${slot.teacher}</span>
      </div>
      <div class="slot-room">${slot.room}</div>
    `;
    boardPanel.appendChild(el);
  });
}

dayBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    dayBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDay(btn.dataset.day);
  });
});

// initial render
if (boardPanel) renderDay('mon');

// ===== Homepage contact form =====
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const submitButton = contactForm.querySelector('button[type="submit"]');

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    contactFormStatus.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });

      const result = await response.json();
      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error(result.message || 'The inquiry could not be sent.');
      }

      const activationRequired = /activat|confirm/i.test(String(result.message || ''));
      contactFormStatus.textContent = activationRequired
        ? 'Form activation is required. Check support@zhsacadmey.com and confirm the FormSubmit email.'
        : `Thank you, ${name}. Your inquiry has been sent to support@zhsacadmey.com.`;
      contactForm.reset();
    } catch (error) {
      console.error('Contact form submission failed:', error);
      contactFormStatus.textContent = error instanceof Error
        ? `The inquiry could not be sent: ${error.message}`
        : 'The inquiry could not be sent. Please try again.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send inquiry';
    }
  });
}

// ===== Head portrait underline trigger =====
const headPortrait = document.querySelector('.head-portrait');
if (headPortrait) {
  const portraitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headPortrait.classList.add('visible');
        portraitObserver.unobserve(headPortrait);
      }
    });
  }, { threshold: 0.3 });
  portraitObserver.observe(headPortrait);
}
