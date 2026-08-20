/* js/timeline.js - Linha do tempo da jornada (Módulo 6 - 5 Etapas) */

document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.timeline-node');
  const details = document.querySelectorAll('.timeline-detail-content');
  const progressLine = document.querySelector('.timeline-progress');

  function updateTimelineProgress(stepNum) {
    if (!progressLine) return;
    // Calculate percentage based on active step (1 to 5)
    const percent = ((stepNum - 1) / 4) * 100;
    progressLine.style.width = `${percent}%`;
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const step = parseInt(node.getAttribute('data-step'), 10);
      
      // Update active state for nodes
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      // Update active state for details panel
      details.forEach(d => {
        d.classList.remove('active');
        if (parseInt(d.getAttribute('data-step'), 10) === step) {
          d.classList.add('active');
        }
      });

      // Update progress bar width
      updateTimelineProgress(step);
    });
  });

  // Initial progress line load (starts at Step 1 active: 0%)
  updateTimelineProgress(1);
});
