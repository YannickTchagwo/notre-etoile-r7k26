document.querySelector('[data-scroll]').addEventListener('click', () => {
  document.getElementById('announcement').scrollIntoView({ behavior: 'smooth' });
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

// Après la naissance, renseignez la date au format AAAA-MM-JJ dans
// l'attribut data-birth de la section .days pour activer le compteur.
const daysSection = document.querySelector('.days');
if (daysSection.dataset.birth) {
  const birth = new Date(`${daysSection.dataset.birth}T00:00:00`);
  const elapsed = Math.max(0, Math.floor((Date.now() - birth) / 86400000));
  document.getElementById('days-value').textContent = elapsed;
}
