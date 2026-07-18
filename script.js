document.querySelector('[data-scroll]').addEventListener('click', () => {
  document.getElementById('announcement').scrollIntoView({ behavior: 'smooth' });
});

const entrance = document.getElementById('entrance');
const openAnnouncement = document.getElementById('open-announcement');
const envelopeTrigger = document.getElementById('envelope-trigger');

const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));
const waitForMotion = (element, eventName, maximumDuration, propertyName) => new Promise(resolve => {
  let finished = false;
  const complete = () => {
    if (finished) return;
    finished = true;
    element.removeEventListener(eventName, onEnd);
    resolve();
  };
  const onEnd = event => {
    if (event.target !== element) return;
    if (propertyName && event.propertyName !== propertyName) return;
    complete();
  };
  element.addEventListener(eventName, onEnd);
  window.setTimeout(complete, maximumDuration);
});

const revealAnnouncement = async () => {
  if (entrance.classList.contains('opening')) return;
  openAnnouncement.disabled = true;
  envelopeTrigger.setAttribute('aria-disabled', 'true');

  const flap = entrance.querySelector('.envelope-flap');
  const letter = entrance.querySelector('.envelope-letter');

  entrance.classList.add('opening');
  await waitForMotion(flap, 'transitionend', 950, 'transform');

  entrance.classList.add('card-revealed');
  await waitForMotion(letter, 'animationend', 1200);

  await wait(650);
  entrance.classList.add('leaving');
  document.body.classList.remove('entrance-locked');
  await wait(800);
  entrance.remove();
};

openAnnouncement.addEventListener('click', revealAnnouncement);
envelopeTrigger.addEventListener('click', revealAnnouncement);
envelopeTrigger.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    revealAnnouncement();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.observe').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const whatsappDialog = document.getElementById('whatsapp-dialog');
const whatsappMessage = 'Bonjour famille Tchagwo, toutes mes félicitations pour la naissance de Ralph ! Bienvenue à votre petite merveille ❤️';
const whatsappNumbers = { papa: '491629835810', maman: '4917628051139' };

document.getElementById('congrats').addEventListener('click', () => whatsappDialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => whatsappDialog.close());
whatsappDialog.addEventListener('click', event => {
  if (event.target === whatsappDialog) whatsappDialog.close();
});

document.querySelectorAll('[data-recipient]').forEach(link => {
  link.href = `https://wa.me/${whatsappNumbers[link.dataset.recipient]}?text=${encodeURIComponent(whatsappMessage)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

// Après la naissance, renseignez la date au format AAAA-MM-JJ dans
// l'attribut data-birth de la section .days pour activer le compteur.
const daysSection = document.querySelector('.days');
if (daysSection.dataset.birth) {
  const birth = new Date(`${daysSection.dataset.birth}T00:00:00`);
  const elapsed = Math.max(0, Math.floor((Date.now() - birth) / 86400000));
  document.getElementById('days-value').textContent = elapsed;
}
