/* js/environments.js - Interatividade dos Ambientes de Operação (Módulo 3) */

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.environment-card');
  const detailsBox = document.getElementById('environments-detail-box');
  const detailsTitle = document.getElementById('environments-detail-title');
  const detailsText = document.getElementById('environments-detail-text');

  const envInfo = {
    acesso: {
      title: 'Acesso Livre: Navegação e Consulta Pública',
      desc: 'Ideal para consulta de editais e acompanhamento de parcerias ativas por qualquer cidadão. Cerca de 90% das funcionalidades de visualização estão liberadas sem necessidade de autenticação por gov.br, garantindo transparência pública absoluta.'
    },
    treinamento: {
      title: 'Ambiente de Treinamento: Sandbox de Simulação',
      desc: 'O espaço perfeito para capacitação. Permite simular empenhos, termos de adesão e execução física em um ambiente seguro e isolado (https://tre-siconv.estaleiro.serpro.gov.br/ep-atos-prep-web/), onde é impossível cometer erros com efeitos financeiros reais.'
    },
    homologacao: {
      title: 'Ambiente de Homologação: Testes e Validação de Fluxos',
      desc: 'Reservado para testes avançados de TI, integração de APIs e validação prévia de parametrizações personalizadas antes da ativação final em produção.'
    },
    producao: {
      title: 'Ambiente de Produção: Operação e Impacto Real',
      desc: 'Onde a execução acontece formalmente. Atos praticados aqui resultam em empenho, liberação de recursos financeiros reais na conta do proponente e geram obrigações jurídicas irrevogáveis.'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active classes
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const envType = card.getAttribute('data-env');
      if (envType && envInfo[envType]) {
        detailsTitle.textContent = envInfo[envType].title;
        detailsText.textContent = envInfo[envType].desc;
        detailsBox.classList.add('visible');
      }
    });
  });
});
