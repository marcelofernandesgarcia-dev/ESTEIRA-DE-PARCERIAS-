/* js/faq.js - FAQ Accordion Aprimorado (Módulo 9 - Suporta Perguntas 1 a 8) */

document.addEventListener('DOMContentLoaded', () => {
  const accordionItems = document.querySelectorAll('.accordion-item');

  // Suporte dinâmico para as 8 perguntas estruturadas na página de treinamento:
  // 1. Isso vira um convênio tradicional?
  // 2. Precisa de plano de trabalho?
  // 3. Como é a prestação de contas?
  // 4. Precisa de instrumento jurídico?
  // 5. Há defeso eleitoral?
  // 6. Abertura automática de conta bancária (SIAFI)
  // 7. Repasse para entidades não-governamentais (ONGs)
  // 8. Conciliação de extrato bancário automatizada
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items first to reduce visual noise
        accordionItems.forEach(i => {
          i.classList.remove('active');
          const c = i.querySelector('.accordion-content');
          if (c) c.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          // Set max-height equal to scrollHeight to animate opening
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });
    }
  });
});
