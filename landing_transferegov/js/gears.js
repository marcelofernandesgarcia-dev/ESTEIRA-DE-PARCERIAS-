/* js/gears.js - Animações das Engrenagens e Setas das Convocatórias (Módulo 5) */

document.addEventListener('DOMContentLoaded', () => {
  const arrowConnectors = document.querySelectorAll('.gear-arrow');
  const gearBlocks = document.querySelectorAll('.gear-block');
  const gearExampleTitle = document.getElementById('gear-example-title');
  const gearExampleText = document.getElementById('gear-example-text');

  // Sequential pulsing arrow animation
  let activeIndex = 0;
  setInterval(() => {
    arrowConnectors.forEach(arrow => arrow.classList.remove('active-pulse'));
    if (arrowConnectors.length > 0) {
      arrowConnectors[activeIndex].classList.add('active-pulse');
      activeIndex = (activeIndex + 1) % arrowConnectors.length;
    }
  }, 1500);

  const gearExemplos = {
    habilitacao: {
      title: 'Habilitação no Caso FNMA',
      desc: 'O ente federativo deve comprovar regularidade fiscal e previdenciária. No programa Prévfogo, exige-se também a aprovação prévia no comitê de combate a incêndios local.'
    },
    anexos: {
      title: 'Anexos Obrigatórios no Caso FNMA',
      desc: 'No Propatinhas, o anel de anexos inclui a Declaração de Capacidade Clínica. No Prévfogo da Amazônia Legal, anexa-se obrigatoriamente o Plano de Emergência Regional.'
    },
    clausulas: {
      title: 'Cláusulas Suspensivas no Caso FNMA',
      desc: 'A liberação das parcelas orçamentárias fica suspensa por até 1 ano até a comprovação física das metas de treinamento ou entrega dos planos de contingência.'
    },
    metas: {
      title: 'Metas Padronizadas no Caso FNMA',
      desc: 'O gestor escolhe pacotes fechados de metas: ex: "1.000 castrações cirúrgicas" (Propatinhas) ou "Treinamento de 50 brigadistas voluntários" (Prévfogo).'
    }
  };

  // Interactive block click triggers
  gearBlocks.forEach(block => {
    block.addEventListener('click', () => {
      gearBlocks.forEach(b => b.classList.remove('active'));
      block.classList.add('active');

      const gearType = block.getAttribute('data-gear');
      if (gearType && gearExemplos[gearType]) {
        gearExampleTitle.textContent = gearExemplos[gearType].title;
        gearExampleText.textContent = gearExemplos[gearType].desc;
      }
    });
  });
});
