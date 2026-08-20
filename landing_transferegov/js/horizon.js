/* js/horizon.js - Animação do Horizonte de Implementação (Módulo 10) */

document.addEventListener('DOMContentLoaded', () => {
  const horizonSection = document.getElementById('mod10');
  const horizonProgress = document.querySelector('.horizon-progress-bar');
  const horizonPoints = document.querySelectorAll('.horizon-point');
  const horizonCards = document.querySelectorAll('.horizon-card');

  if (!horizonSection) return;

  const observerOptions = {
    root: null,
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 1. Animate progress bar to 100%
        if (horizonProgress) {
          horizonProgress.style.width = '100%';
        }

        // 2. Animate points and cards sequentially
        horizonPoints.forEach((point, idx) => {
          setTimeout(() => {
            point.classList.add('active');
          }, idx * 400);
        });

        horizonCards.forEach((card, idx) => {
          setTimeout(() => {
            card.classList.add('active');
          }, idx * 400 + 200);
        });

        // Stop observing once animation triggers
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(horizonSection);
});
