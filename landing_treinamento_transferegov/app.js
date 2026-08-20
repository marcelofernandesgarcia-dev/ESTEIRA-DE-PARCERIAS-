/* app.js - Lógica interativa da Landing Page de Treinamento TRANSFEREGOV */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Scroll Progress Bar & Nav Active States
  const scrollProgress = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('nav a:not(.btn-nav)');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Progress Bar
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const progressPercent = (window.pageYOffset / totalScroll) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Active Link Highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 120) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Módulo 3 - Alternador de Mindset
  const mindsetToggle = document.getElementById('mindset-toggle-wrapper');
  const btnSiconvao = document.getElementById('btn-siconvao');
  const btnSimplificado = document.getElementById('btn-simplificado');
  const panelSiconvao = document.getElementById('panel-siconvao');
  const panelSimplificado = document.getElementById('panel-simplificado');

  btnSiconvao.addEventListener('click', () => {
    mindsetToggle.classList.remove('simplificado-active');
    mindsetToggle.classList.add('siconvao-active');
    btnSiconvao.classList.add('active');
    btnSimplificado.classList.remove('active');
    panelSiconvao.classList.add('active');
    panelSimplificado.classList.remove('active');
  });

  btnSimplificado.addEventListener('click', () => {
    mindsetToggle.classList.remove('siconvao-active');
    mindsetToggle.classList.add('simplificado-active');
    btnSimplificado.classList.add('active');
    btnSiconvao.classList.remove('active');
    panelSimplificado.classList.add('active');
    panelSiconvao.classList.remove('active');
  });

  // 3. Módulo 4 - Jornada Linha do Tempo
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const detailViews = document.querySelectorAll('.detail-view');

  timelineSteps.forEach(step => {
    step.addEventListener('click', () => {
      const stepTarget = step.getAttribute('data-step');
      
      // Update active step
      timelineSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');

      // Update active view
      detailViews.forEach(view => {
        view.classList.remove('active');
        if (view.getAttribute('id') === `detail-${stepTarget}`) {
          view.classList.add('active');
        }
      });
    });
  });

  // 4. Módulo 5 - Playground de Parametrização
  const progOptionPropatinhas = document.getElementById('prog-propatinhas');
  const progOptionPrevfogo = document.getElementById('prog-prevfogo');
  const idhOptionAlto = document.getElementById('idh-alto');
  const idhOptionBaixo = document.getElementById('idh-baixo');
  const regOptionAmazonia = document.getElementById('reg-amazonia');
  const regOptionOutras = document.getElementById('reg-outras');

  // Values
  let activeProgram = 'propatinhas';
  let activeIdh = 'baixo';
  let activeRegion = 'outras';

  // Listeners
  progOptionPropatinhas.addEventListener('click', () => {
    activeProgram = 'propatinhas';
    progOptionPropatinhas.classList.add('active');
    progOptionPrevfogo.classList.remove('active');
    updateSimulation();
  });

  progOptionPrevfogo.addEventListener('click', () => {
    activeProgram = 'prevfogo';
    progOptionPrevfogo.classList.add('active');
    progOptionPropatinhas.classList.remove('active');
    updateSimulation();
  });

  idhOptionAlto.addEventListener('click', () => {
    activeIdh = 'alto';
    idhOptionAlto.classList.add('active');
    idhOptionBaixo.classList.remove('active');
    updateSimulation();
  });

  idhOptionBaixo.addEventListener('click', () => {
    activeIdh = 'baixo';
    idhOptionBaixo.classList.add('active');
    idhOptionAlto.classList.remove('active');
    updateSimulation();
  });

  regOptionAmazonia.addEventListener('click', () => {
    activeRegion = 'amazonia';
    regOptionAmazonia.classList.add('active');
    regOptionOutras.classList.remove('active');
    updateSimulation();
  });

  regOptionOutras.addEventListener('click', () => {
    activeRegion = 'outras';
    regOptionOutras.classList.add('active');
    regOptionAmazonia.classList.remove('active');
    updateSimulation();
  });

  function updateSimulation() {
    const resContrapartida = document.getElementById('res-contrapartida');
    const resIntegracao = document.getElementById('res-integracao');
    const resPlanos = document.getElementById('res-planos');
    const resClausula = document.getElementById('res-clausula');
    const visualFlow = document.getElementById('visual-flow-code');
    const resultRows = document.querySelectorAll('.result-row');

    // Reset row themes
    resultRows.forEach(row => {
      row.classList.remove('primary-theme', 'alert-theme');
    });

    // Compute Contrapartida
    if (activeIdh === 'baixo') {
      resContrapartida.textContent = '0% (Isenção Total ✅)';
      resContrapartida.parentElement.classList.add('primary-theme');
    } else {
      resContrapartida.textContent = '10% (Padrão 🪙)';
    }

    // Compute Integrations & Specifics
    if (activeProgram === 'propatinhas') {
      resIntegracao.textContent = 'API Simpatinhas: Conectada ✅';
      resPlanos.textContent = 'Adesão ao Programa Nacional 📋';
      resClausula.textContent = 'Isento';
      
      visualFlow.textContent = 
`[API Externa: Simpatinhas]
         │ (Dados de castração físico)
         ▼
[TRANSFEREGOV: Metas Padronizadas]
         │ (Gera contrapartida automática)
         ▼
[Validação Final do Concedente] ──> [Relatório Simplificado]`;
    } else {
      // Prévfogo
      resIntegracao.textContent = 'Nenhuma (Alimentação Manual ❌)';
      resClausula.textContent = 'Requerido: 1 ano para regularizar ⏳';
      resClausula.parentElement.classList.add('alert-theme');

      if (activeRegion === 'amazonia') {
        resPlanos.textContent = 'Plano de Contingência Ambiental (Obrigatório ⚠️)';
        resPlanos.parentElement.classList.add('alert-theme');
        
        visualFlow.textContent = 
`[Plano Local de Contingência] (Obrigatório)
         │ (Amazônia Legal)
         ▼
[Homologação Técnica do [ÓRGÃO]]
         │ (Aprovação com Cláusula Suspensiva)
         ▼
[TRANSFEREGOV: Desembolso] ──> [Relatório de Execução]`;
      } else {
        resPlanos.textContent = 'Plano Regional de Combate ⚠️';
        
        visualFlow.textContent = 
`[Plano Regional de Combate a Incêndios]
         │ (Região Geral)
         ▼
[Homologação Técnica do [ÓRGÃO]]
         │ (Aprovação com Cláusula Suspensiva)
         ▼
[TRANSFEREGOV: Desembolso] ──> [Relatório de Execução]`;
      }
    }
  }

  // Initial simulation load
  updateSimulation();

  // 5. Módulo 6 - Papéis e Responsabilidades
  const roleButtons = document.querySelectorAll('.role-btn');
  const roleViews = document.querySelectorAll('.role-view');

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRole = btn.getAttribute('data-role');

      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      roleViews.forEach(view => {
        view.classList.remove('active');
        if (view.getAttribute('id') === `role-${targetRole}`) {
          view.classList.add('active');
        }
      });
    });
  });

  // 6. Módulo 7 - FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-content').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });
});
