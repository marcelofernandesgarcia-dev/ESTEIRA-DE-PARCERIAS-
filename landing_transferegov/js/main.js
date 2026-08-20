/* js/main.js - Coordenação de Interface e Navegação (11 Módulos) */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Scroll progress bar
  const scrollProgress = document.getElementById('scroll-progress');
  
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0 && scrollProgress) {
      const progressPercent = (window.pageYOffset / totalScroll) * 100;
      scrollProgress.style.width = `${progressPercent}%`;
    }
  });

  // 2. Active nav link highlight on scroll (11 Modules)
  const navLinks = document.querySelectorAll('nav a:not(.btn-nav)');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
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

  // 3. Back to Top Button
  const btnBackToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      btnBackToTop.classList.add('visible');
    } else {
      btnBackToTop.classList.remove('visible');
    }
  });

  if (btnBackToTop) {
    btnBackToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Section Fade-In (Intersection Observer)
  const fadeSections = document.querySelectorAll('section');
  
  fadeSections.forEach(section => {
    section.classList.add('fade-in-section');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeSections.forEach(section => {
    observer.observe(section);
  });

  // 5. Interactive Table Rows (Módulo 8)
  const rows = document.querySelectorAll('.interactive-table tbody tr');
  const tableCaseTitle = document.getElementById('table-case-title');
  const tableCaseDesc = document.getElementById('table-case-desc');

  const roleCases = {
    concedente: {
      title: 'Papel do Concedente no Caso FNMA',
      desc: 'Configura os parâmetros da chamada pública (Ex: edital Prévfogo ou Propatinhas) no ecossistema TRANSFEREGOV, definindo os requisitos de habilitação, anexos e as metas padronizadas. Valida a manifestação de interesse enviada pelo proponente e executa o empenho orçamentário via SIAFI.'
    },
    proponente: {
      title: 'Papel do Proponente no Caso FNMA',
      desc: 'Os municípios e estados aderem às campanhas escolhendo as metas quantificáveis do programa ambiental e submetem a Declaração de Adesão. Após o repasse, executam a despesa orçamentária no sistema e emitem o Relatório de Execução Simplificado.'
    },
    finalistica: {
      title: 'Papel da Área Finalística no Caso FNMA',
      desc: 'Técnicos ambientais e fiscais finalísticos do [ÓRGÃO] que vistoriam as ações (aferição de castrações ou brigadas locais) e assinam a aprovação técnica baseada na comprovação de metas físicas no sistema.'
    },
    coordenacao: {
      title: 'Papel da Coordenação no Caso FNMA',
      desc: 'Coordena reuniões de governança técnica semanais entre o Departamento de Gestão de Fundos (UG 267384) e o MGI para monitorar o andamento das parametrizações de novas portarias no ambiente de produção do TRANSFEREGOV.'
    }
  };

  rows.forEach(row => {
    row.addEventListener('click', () => {
      const role = row.getAttribute('data-role');
      
      // Update active state in table
      rows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      // Update description box
      if (role && roleCases[role]) {
        tableCaseTitle.textContent = roleCases[role].title;
        tableCaseDesc.textContent = roleCases[role].desc;
      }
    });
  });

  // 6. Welcome Portal Tabs Switcher (Módulo 1)
  const tabButtons = document.querySelectorAll('.portal-tab-btn');
  const tabPanes = document.querySelectorAll('.portal-tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      // Update active class on buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show/Hide target panels
      tabPanes.forEach(pane => {
        if (pane.getAttribute('id') === targetId) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });
});
