/* js/readers.js - Leitor Interativo de Slides e Relatório Técnico (Módulo 11) */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Modals selectors
  const btnOpenSlides = document.getElementById('btn-read-slides');
  const btnOpenSlidesIntro = document.getElementById('btn-read-slides-intro');
  const btnOpenReport = document.getElementById('btn-read-report');
  
  const slidesModal = document.getElementById('slides-reader-modal');
  const reportModal = document.getElementById('report-reader-modal');
  
  const btnCloseSlides = document.getElementById('close-slides-modal');
  const btnCloseReport = document.getElementById('close-report-modal');

  // 2. Slides Carousel state
  let currentSlide = 1;
  const totalSlides = 12;
  
  const slideImg = document.getElementById('slides-modal-img');
  const slideCount = document.getElementById('slides-modal-counter');
  const slideDesc = document.getElementById('slides-modal-desc');
  const btnPrevSlide = document.getElementById('prev-modal-slide');
  const btnNextSlide = document.getElementById('next-modal-slide');

  const slideDescriptions = {
    1: 'Capa da apresentação: Parcerias Federais Modernizadas - Transição para o ecossistema TRANSFEREGOV.',
    2: 'Sumário Executivo: A transição de convênios tradicionais para Transferências Simplificadas no âmbito do FNMA.',
    3: 'Ambientes de Operação: Diferenciação clara entre os ambientes de Acesso Livre, Treinamento (Sandbox), Homologação e Produção.',
    4: 'Engrenagem das Convocatórias: Os 4 blocos configuráveis no sistema - Requisitos, Anexos, Cláusulas e Metas.',
    5: 'Diferenças de Fluxo: Comparativo entre a rota burocrática clássica e a rota ágil do TRANSFEREGOV.',
    6: 'Jornada Simplificada em 5 Etapas: Convocatória, Proposição, Validação, Empenho Automático (SIAFI) e Ciclo Final.',
    7: 'Parametrização do Propatinhas: Metas quantitativas e monitoramento físico integrado ao Simpatinhas.',
    8: 'Parametrização do Prévfogo: Planos regionais, regras de defeso ambiental e cláusulas de controle.',
    9: 'Estruturação Orgânica: Adoção do código do SIORG/CIORG 267384 (Depto de Gestão de Fundos) para gestão das contas.',
    10: 'Gestão de Riscos: Mitigação de curva de aprendizado, "Sintoma do Convênio" e regras de período eleitoral.',
    11: 'Horizonte Temporal: Metas de curto, médio e longo prazo (Visão 2027) para a consolidação da esteira.',
    12: 'Biblioteca de Mídias e Contatos de Suporte: Links úteis e próximos passos na capacitação.'
  };

  function updateSlideViewer() {
    if (slideImg && slideCount && slideDesc) {
      slideImg.src = `materiais_complementares/slides/slide${currentSlide}.png`;
      slideCount.textContent = `Slide ${currentSlide} de ${totalSlides}`;
      slideDesc.textContent = slideDescriptions[currentSlide] || '';
    }
  }

  // Prev / Next listeners
  if (btnPrevSlide && btnNextSlide) {
    btnPrevSlide.addEventListener('click', () => {
      currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
      updateSlideViewer();
    });

    btnNextSlide.addEventListener('click', () => {
      currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
      updateSlideViewer();
    });
  }

  // 3. Modal Show / Hide logic
  if (btnCloseSlides && slidesModal) {
    const openSlides = (e) => {
      e.preventDefault();
      slidesModal.style.display = 'flex';
      currentSlide = 1;
      updateSlideViewer();
      document.body.style.overflow = 'hidden'; // block page scroll
    };

    if (btnOpenSlides) {
      btnOpenSlides.addEventListener('click', openSlides);
    }
    if (btnOpenSlidesIntro) {
      btnOpenSlidesIntro.addEventListener('click', openSlides);
    }

    btnCloseSlides.addEventListener('click', () => {
      slidesModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  if (btnOpenReport && btnCloseReport && reportModal) {
    btnOpenReport.addEventListener('click', (e) => {
      e.preventDefault();
      reportModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    btnCloseReport.addEventListener('click', () => {
      reportModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  // Close modals when clicking outside contents
  window.addEventListener('click', (e) => {
    if (e.target === slidesModal) {
      slidesModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    if (e.target === reportModal) {
      reportModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // 4. Report collapsible items
  const reportHeaders = document.querySelectorAll('.report-chapter-header');
  reportHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const chapter = header.parentElement;
      const content = chapter.querySelector('.report-chapter-content');
      const arrow = header.querySelector('span');

      const isActive = chapter.classList.contains('active');
      
      if (isActive) {
        chapter.classList.remove('active');
        if (content) content.style.display = 'none';
        if (arrow) arrow.textContent = '▸';
      } else {
        chapter.classList.add('active');
        if (content) content.style.display = 'block';
        if (arrow) arrow.textContent = '▾';
      }
    });
  });
});
