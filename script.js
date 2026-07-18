document.querySelector('[data-scroll]').addEventListener('click', () => {
  document.getElementById('announcement').scrollIntoView({ behavior: 'smooth' });
});

const entrance = document.getElementById('entrance');
const openAnnouncement = document.getElementById('open-announcement');

openAnnouncement.addEventListener('click', () => {
  entrance.classList.add('opening');
  openAnnouncement.disabled = true;
  window.setTimeout(() => {
    entrance.classList.add('leaving');
    document.body.classList.remove('entrance-locked');
  }, 1650);
  window.setTimeout(() => entrance.remove(), 2450);
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
