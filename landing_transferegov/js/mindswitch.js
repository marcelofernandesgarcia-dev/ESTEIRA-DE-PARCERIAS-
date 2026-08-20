/* js/mindswitch.js - Alternador de Mindset (Módulo 3) */

document.addEventListener('DOMContentLoaded', () => {
  const switchContainer = document.querySelector('.mindset-switch');
  const btnSicon = document.getElementById('switch-sicon');
  const btnTransfere = document.getElementById('switch-transfere');
  const panelSicon = document.getElementById('panel-sicon');
  const panelTransfere = document.getElementById('panel-transfere');

  if (btnSicon && btnTransfere) {
    btnSicon.addEventListener('click', () => {
      switchContainer.classList.remove('right-active');
      switchContainer.classList.add('left-active');
      
      btnSicon.classList.add('active');
      btnTransfere.classList.remove('active');
      
      panelSicon.classList.add('active');
      panelTransfere.classList.remove('active');
    });

    btnTransfere.addEventListener('click', () => {
      switchContainer.classList.remove('left-active');
      switchContainer.classList.add('right-active');
      
      btnTransfere.classList.add('active');
      btnSicon.classList.remove('active');
      
      panelTransfere.classList.add('active');
      panelSicon.classList.remove('active');
    });
  }
});
