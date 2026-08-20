/* js/playground.js - Simulador de Parametrização Aprimorado (Módulo 7) */

document.addEventListener('DOMContentLoaded', () => {
  const selectProg = document.getElementById('play-prog');
  const sliderIdh = document.getElementById('play-idh');
  const selectRegion = document.getElementById('play-region');
  const valIdh = document.getElementById('play-idh-val');
  const btnFnma = document.getElementById('btn-fill-fnma');

  const resRegras = document.getElementById('screen-regras');
  const resMetas = document.getElementById('screen-metas');
  const resDocs = document.getElementById('screen-docs');
  const resValores = document.getElementById('screen-valores');
  const codeFlow = document.getElementById('screen-flow-code');

  const idhLabels = {
    1: 'Baixo',
    2: 'Médio',
    3: 'Alto'
  };

  function updatePlayground() {
    const prog = selectProg.value;
    const idhNum = parseInt(sliderIdh.value, 10);
    const region = selectRegion.value;

    // Show IDH Label
    valIdh.textContent = idhLabels[idhNum];

    // Compute Contrapartida
    let contrapartida = '10% (Padrão)';
    if (idhNum === 1) {
      contrapartida = '0% (Isento para IDH Baixo)';
    } else if (idhNum === 2) {
      contrapartida = '5% (Reduzido)';
    }

    // Set values based on Program Selection
    if (prog === 'propatinhas') {
      resRegras.innerHTML = `Contrapartida: ${contrapartida}. <br><strong>Defeso Eleitoral:</strong> Sujeito a vedação ordinária (Bloqueado ❌).`;
      resMetas.textContent = 'Volume quantitativo de castrações de cães e gatos (Metas Padronizadas).';
      resDocs.textContent = 'Termo de Adesão Eletrônica + Declaração de Capacidade Clínica do Ente.';
      resValores.textContent = 'De R$ 150.000,00 a R$ 500.000,00 | Público: Clínicas e Entes Locais';

      // Set screen row colors
      resRegras.parentElement.className = 'screen-data-item alert-theme';
      resMetas.parentElement.className = 'screen-data-item';
      resDocs.parentElement.className = 'screen-data-item';
      resValores.parentElement.className = 'screen-data-item';

      codeFlow.textContent = 
`[API Simpatinhas (Aferição)] ──> [Metas Padronizadas]
         │ (Foco: Monitoramento Físico)
         ▼
[SIAFI / UG: SIORG 267384] ──> [Relatório Simplificado]`;

    } else if (prog === 'prevfogo') {
      const isAmazonia = (region === 'N' || region === 'CO');
      const defesoText = `Contrapartida: ${contrapartida}. Cláusula Suspensiva: Ativa. <br><strong>Defeso Eleitoral:</strong> Permitido por Portaria de Emergência (Liberado ✅).`;
      
      resRegras.innerHTML = defesoText;
      resValores.textContent = 'De R$ 300.000,00 a R$ 1.200.000,00 | Público: Estados/Municípios';
      
      if (isAmazonia) {
        resMetas.textContent = 'Treinamento de brigadas locais com Planos Estratégicos Regionais.';
        resDocs.textContent = 'Plano de Contingência Ambiental Local (Obrigatório na Amazônia Legal ⚠️).';
        resDocs.parentElement.className = 'screen-data-item alert-theme';
        resRegras.parentElement.className = 'screen-data-item active-theme';
        resMetas.parentElement.className = 'screen-data-item';
        resValores.parentElement.className = 'screen-data-item';

        codeFlow.textContent = 
`[Plano de Contingência] (N/CO) ──> [Filtro Amazônia Legal]
         │
         ▼
[Cláusula Suspensiva (1a)] ──> [SIAFI / UG: SIORG 267384]`;
      } else {
        resMetas.textContent = 'Prevenção de incêndios e capacitação de voluntários locais.';
        resDocs.textContent = 'Plano Regional de Prevenção e Combate a Incêndios.';
        resDocs.parentElement.className = 'screen-data-item';
        resRegras.parentElement.className = 'screen-data-item active-theme';
        resMetas.parentElement.className = 'screen-data-item';
        resValores.parentElement.className = 'screen-data-item';

        codeFlow.textContent = 
`[Plano Regional Prevenção] ──> [Cláusula Suspensiva (1a)]
         │
         ▼
[Homologação [ÓRGÃO]] ──> [SIAFI / UG: SIORG 267384]`;
      }
    }
  }

  // Pre-fill button (Prévfogo, IDH Médio [value 2], Norte [N] region)
  if (btnFnma) {
    btnFnma.addEventListener('click', () => {
      selectProg.value = 'prevfogo';
      sliderIdh.value = 2; // Médio
      selectRegion.value = 'N';
      updatePlayground();
    });
  }

  // Listeners
  if (selectProg && sliderIdh && selectRegion) {
    selectProg.addEventListener('change', updatePlayground);
    sliderIdh.addEventListener('input', updatePlayground);
    selectRegion.addEventListener('change', updatePlayground);
  }

  // Initial calculation
  updatePlayground();
});
