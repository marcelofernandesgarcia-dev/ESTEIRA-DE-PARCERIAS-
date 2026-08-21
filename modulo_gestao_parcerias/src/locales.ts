// SGP Localization Dictionary (Portuguese and English)

export interface TranslationSchema {
  common: {
    portalName: string;
    mgi: string;
    govFederal: string;
    startDiagnosis: string;
    loading: string;
    yes: string;
    no: string;
    back: string;
    close: string;
    success: string;
    error: string;
  };
  nav: {
    home: string;
    library: string;
    solutions: string;
    legislation: string;
    templates: string;
    steps: string;
    diagnosis: string;
    checklist: string;
    aiGuide: string;
    knowledge: string;
    tools: string;
    libraryDesc: string;
    legislationDesc: string;
    stepsDesc: string;
    solutionsDesc: string;
    templatesDesc: string;
    checklistDesc: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    desc: string;
    btnDiagnosis: string;
    btnAi: string;
    statsTitle: string;
    statsActivePartners: string;
    statsYears: string;
    statsModule: string;
    statsDisclaimer: string;
  };
  overview: {
    title: string;
    desc: string;
    axis1Title: string;
    axis1Desc: string;
    axis2Title: string;
    axis2Desc: string;
    axis3Title: string;
    axis3Desc: string;
  };
  legislation: {
    title: string;
    desc: string;
    filters: {
      all: string;
      const: string;
      fed: string;
      adm: string;
    };
    criticalPoints: string;
    complianceTip: string;
    viewFullText: string;
    btnHide: string;
    btnShow: string;
    data: Array<{
      id: string;
      title: string;
      category: 'const' | 'fed' | 'adm';
      shortCategory: string;
      scope: string;
      summary: string;
      keyPoints: string[];
      fullLawLink: string;
      complianceTips: string;
    }>;
  };
  mediaSection: {
    title: string;
    desc: string;
    videoMode: string;
    videoModes: {
      simulated: string;
      local: string;
      custom: string;
    };
    customInputPlaceholder: string;
    btnLoadCustom: string;
    speed: string;
    captions: string;
    audioDesc: string;
    libras: string;
    videoSubtitles: Array<{ start: number; end: number; text: string; desc: string }>;
    manualTitle: string;
    manualDesc: string;
    btnDownloadPdf: string;
    chapters: Array<{
      id: string;
      title: string;
      short: string;
      content: string;
      stats: Array<{ label: string; value: string }>;
    }>;
  };
  solutions: {
    title: string;
    desc: string;
  };
  templates: {
    title: string;
    desc: string;
    btnCopy: string;
    btnCopied: string;
    btnDownload: string;
    labelSearch: string;
    btnViewText: string;
    data: Array<{
      id: string;
      title: string;
      desc: string;
      filename: string;
      templateText: string;
    }>;
  };
  steps: {
    title: string;
    desc: string;
    phase: string;
    keyActionLabel: string;
    tipLabel: string;
    lifecycle: Array<{
      number: string;
      title: string;
      desc: string;
      keyAction: string;
      tips: string;
    }>;
  };
  simulator: {
    title: string;
    desc: string;
    labelEntityType: string;
    entityTypes: {
      state: string;
      capital: string;
      municipality: string;
    };
    labelPopulation: string;
    labelAct: string;
    labelUf: string;
    btnDownloadRoadmap: string;
    apiTitle: string;
    apiDesc: string;
    apiPlaceholder: string;
    btnApiSearch: string;
    apiSourceManual: string;
    apiSourceValidated: string;
    populationText: string;
    eligiblePngi: string;
    phase: string;
    date: string;
    kitRecommended: string;
    checklistTitle: string;
    resultEligibleYes: string;
    resultEligibleNo: string;
    btnNextStep: string;
    btnPrevStep: string;
    btnRedo: string;
    stepLabel: string;
    readinessLabel: string;
    readinessStatusHigh: string;
    readinessStatusMed: string;
    readinessStatusLow: string;
  };
  worksMap: {
    title: string;
    desc: string;
    labelSearch: string;
    progress: string;
    beneficiary: string;
    cost: string;
    updated: string;
    data: Array<{
      id: string;
      name: string;
      siafi: string;
      value: string;
      osc: string;
      beneficiary: string;
      lat: string;
      lng: string;
      status: string;
      progress: number;
      timestamp: string;
      x: string;
      y: string;
    }>;
  };
  checklistSection: {
    title: string;
    desc: string;
    helpText: string;
    items: {
      cnpj: string;
      rfb: string;
      crf: string;
      cndt: string;
      capTec: string;
      fichaLimpa: string;
    };
    resultSuccess: string;
    resultWarning: string;
  };
  contact: {
    title: string;
    desc: string;
    name: string;
    city: string;
    email: string;
    message: string;
    btnSubmit: string;
    successAlert: string;
  };
  antigravity: {
    title: string;
    desc: string;
    btnViewSpec: string;
    btnHideSpec: string;
    btnCopySpec: string;
    btnCopiedSpec: string;
    btnSync: string;
    syncing: string;
    synced: string;
  };
  aiChat: {
    title: string;
    desc: string;
    placeholder: string;
    btnSend: string;
    greeting: string;
    communicationError: string;
    questions: string[];
    bannerTitle: string;
    bannerDesc: string;
    bannerBtn: string;
  };
  timeline: {
    title: string;
    desc: string;
    statusCompleted: string;
    statusInProgress: string;
    statusToExecute: string;
    stepDetails: string;
    mandatoryActions: string;
    data: Array<{
      date: string;
      title: string;
      desc: string;
      status: string;
      details: string;
    }>;
  };
  successCases: {
    title: string;
    desc: string;
    badgeLogistics: string;
    badgeGovernance: string;
    badgeLand: string;
    badgePeople: string;
    data: Array<{
      title: string;
      state: string;
      desc: string;
      badge: string;
    }>;
  };
}

export const ptTranslations: TranslationSchema = {
  common: {
    portalName: 'PORTAL DE PARCERIAS SUBNACIONAIS',
    mgi: 'MINISTÉRIO DA GESTÃO E DA INOVAÇÃO EM SERVIÇOS PÚBLICOS',
    govFederal: 'GOVERNO FEDERAL',
    startDiagnosis: 'Iniciar Diagnóstico',
    loading: 'Carregando...',
    yes: 'SIM',
    no: 'NÃO',
    back: 'Voltar',
    close: 'Fechar',
    success: 'Sucesso',
    error: 'Erro'
  },
  nav: {
    home: 'Gestão de Parcerias',
    library: 'Biblioteca & Vídeos',
    solutions: 'Soluções',
    legislation: 'Legislação',
    templates: 'Modelos de Minutas',
    steps: 'Passo a Passo',
    diagnosis: 'Auto-Diagnóstico',
    checklist: 'Checklist & Suporte',
    aiGuide: 'IA Orientadora',
    knowledge: 'Conhecimento',
    tools: 'Ferramentas',
    libraryDesc: 'Vídeos didáticos e guias de adesão',
    legislationDesc: 'Decisões e marcos federais',
    stepsDesc: 'Cronograma oficial de transição',
    solutionsDesc: 'Módulos e interoperabilidade',
    templatesDesc: 'Modelos de editais e termos',
    checklistDesc: 'Checklist e auditoria complementar'
  },
  hero: {
    badge: 'Decisão STF • ADPF 854 • Ministro Flávio Dino',
    title: 'Internalização da ',
    titleHighlight: 'Gestão de Parcerias',
    desc: 'Orientações, capacitações e soluções tecnológicas para a implementação coordenada da transparência, rastreabilidade e governança federativa nas transferências de recursos subnacionais.',
    btnDiagnosis: 'Auto-Diagnóstico de Adesão',
    btnAi: 'Falar com SGP IA',
    statsTitle: 'Pacto Federativo',
    statsActivePartners: '+280 Entes',
    statsYears: '10 Anos',
    statsModule: 'Dupla Habilitação',
    statsDisclaimer: '*O MGI apoiará os entes subnacionais na transição sistêmica sem tarifas de uso tecnológico direto.'
  },
  overview: {
    title: 'A Decisão do STF e a Governança das Parcerias',
    desc: 'O Acórdão relatado pelo Ministro Flávio Dino na ADPF nº 854, dotado de eficácia erga omnes e efeito vinculante, impõe que o Governo Federal forneça ferramentas e treinamento aos Estados, Distrito Federal e Municípios para viabilizar rastreabilidade absoluta e publicidade total de recursos descentralizados.',
    axis1Title: 'Eixo 1: Capacitação',
    axis1Desc: 'Qualificação contínua de gestores e técnicos locais para a transição procedimental e prestação de contas rastreável.',
    axis2Title: 'Eixo 2: Ferramentas',
    axis2Desc: 'Disponibilização do sistema unificado Transferegov.br operando sob a regra de Dupla Habilitação.',
    axis3Title: 'Eixo 3: Suporte Técnico',
    axis3Desc: 'Assistência contínua, intercâmbio de dados por meio de APIs robustas e suporte operacional permanente da Rede.'
  },
  legislation: {
    title: 'Central de Legislação de Parcerias',
    desc: 'Navegue pelos principais normativos federais e marcos legais que regem a execução e conformidade do Módulo de Parcerias.',
    filters: {
      all: 'Todas',
      const: 'Constitucional',
      fed: 'Leis/Decretos',
      adm: 'Portarias'
    },
    criticalPoints: 'Pontos Críticos:',
    complianceTip: 'Dica de Compliance:',
    viewFullText: 'Ver texto integral publicado',
    btnHide: 'Ocultar Detalhes',
    btnShow: 'Ver Detalhes e Pontos Críticos',
    data: [
      {
        id: 'portaria3248',
        title: 'Portaria SEGES/MGI nº 3.248/2026',
        category: 'adm',
        shortCategory: 'Portaria de Adesão',
        scope: 'Federal, Estadual e Municipal',
        summary: 'Estabelece os procedimentos e cronograma oficial para adesão de estados, Distrito Federal e municípios interessados no uso do Transferegov.br para execução de transferências e parcerias com recursos próprios (Internalização).',
        keyPoints: [
          'Gratuidade total: O MGI disponibiliza as soluções e o Transferegov.br sem custos tarifários diretos aos entes aderentes.',
          'Adesão obrigatória à Rede de Parcerias: O ente deve integrar a Rede de Parcerias em 1ª ou 2ª camada.',
          'Formalização por Acordo de Adesão: Assinado eletronicamente pelo chefe do Executivo ou autoridade delegada.',
          'Cadastro de sistemas externos (APIs): Formulário para integração com sistemas de TI locais no Transferegov.br.'
        ],
        fullLawLink: 'https://www.gov.br/transferegov/pt-br/legislacao/portarias/portaria-seges-mgi-no-3-248-de-15-de-abril-de-2026',
        complianceTips: 'Certifique-se de que o representante legal do seu ente tenha situação cadastral ativa e regular no CNPJ antes de iniciar o protocolo.'
      },
      {
        id: 'adpf854',
        title: 'Decisão do STF na ADPF 854',
        category: 'const',
        shortCategory: 'Constitucional',
        scope: 'Nacional (Obrigatório)',
        summary: 'Decisão vinculante do STF que determina a rastreabilidade total ponta a ponta e transparência ativa de todos os recursos descentralizados (incluindo emendas parlamentares), proibindo emendas invisíveis.',
        keyPoints: [
          'Eficácia Erga Omnes: Vincula todos os entes federados e esferas de governo.',
          'Identificação do Beneficiário Final: O recurso deve ser rastreado até o prestador/fornecedor final na ponta.',
          'MGI como Facilitador: Delega ao MGI o dever de fornecer a tecnologia de controle e auditoria aos municípios.'
        ],
        fullLawLink: '#',
        complianceTips: 'Toda despesa efetuada deve estar vinculada a um CNPJ/CPF de destino final, sem possibilidade de saques em espécie ou contas genéricas.'
      }
    ]
  },
  mediaSection: {
    title: 'Biblioteca de Mídias e Documentos de Suporte',
    desc: 'Assista a vídeos de orientação com acessibilidade e leia o manual federal de transparência diretamente no navegador.',
    videoMode: 'Modo de Reprodução de Vídeo:',
    videoModes: {
      simulated: 'Simulador Acessível com Transcrições',
      local: 'Vídeo Local Ativo (/media/video-promocional.mp4)',
      custom: 'Carregar Arquivo Customizado da Pasta /media'
    },
    customInputPlaceholder: 'Ex: video-treinamento-sgp.mp4',
    btnLoadCustom: 'Carregar Mídia',
    speed: 'Velocidade',
    captions: 'Legendas',
    audioDesc: 'Audiodescrição',
    libras: 'LIBRAS (Tradutor)',
    videoSubtitles: [
      { start: 0, end: 12, text: "Abertura oficial do STF. Entendimento constitucional da ADPF 854.", desc: "Imagem externa do Supremo Tribunal Federal sob o céu de Brasília. Uma vinheta instrumental suave é executada." },
      { start: 12, end: 28, text: "Ministro Flávio Dino: A transparência e a rastreabilidade absoluta dos recursos públicos são pilares da democracia.", desc: "Plenário do STF. O Ministro Flávio Dino fala ao microfone, vestindo sua toga preta de ministro." },
      { start: 28, end: 44, text: "É imperioso que cada centavo repassado por emendas ou parcerias possa ser auditado pelo cidadão na ponta final.", desc: "Corte de câmera mostrando os demais ministros acompanhando o voto no plenário." },
      { start: 44, end: 60, text: "O Ministério da Gestão e Inovação (MGI) fornecerá a tecnologia e a capacitação sem custos para estados e municípios.", desc: "Gráfico explicativo na tela detalha as secretarias do MGI unidas no programa de suporte." },
      { start: 60, end: 80, text: "Com a Dupla Habilitação no Transferegov e a Ordem de Pagamento da Parceria (OPP), o controle financeiro será total.", desc: "Captura de tela simulada da interface do Transferegov com as opções de duplo repasse ativas." },
      { start: 80, end: 95, text: "Imagens georreferenciadas e vistorias fotográficas virtuais darão segurança jurídica aos fiscais e gestores de obras.", desc: "Foto aérea de um canteiro de obras com marcações geométricas de GPS e coordenadas sobrepostas." },
      { start: 95, end: 110, text: "A Rede de Parcerias está de portas abertas. Acesse o Front Door e qualifique seus servidores na Escola Virtual de Governo.", desc: "Imagem do portal de login da Rede de Parcerias e logotipo da EV.G/ENAP." },
      { start: 110, end: 120, text: "Unidos pelo pacto federativo, garantindo eficiência, controle e integridade na gestão pública. Governo Federal do Brasil.", desc: "A vinheta encerra com a assinatura visual do Ministério da Gestão e Inovação e as cores da bandeira nacional." }
    ],
    manualTitle: 'Manual de Referência Técnica - PNGI & SGP',
    manualDesc: 'Selecione os capítulos abaixo para leitura rápida das regras consolidadas do Ministério da Gestão e Inovação.',
    btnDownloadPdf: 'Baixar Manual Completo (PDF)',
    chapters: [
      {
        id: 'intro',
        title: '1. Fundamentação Jurídica (ADPF 854)',
        short: 'Legislação & STF',
        content: `A **Arguição de Descumprimento de Preceito Fundamental (ADPF) 854**, sob relatoria do **Ministro Flávio Dino**, consolidou a obrigatoriedade da rastreabilidade total nas transferências públicas.\n\n### Principais Marcos Legais:\n- **Eficácia Erga Omnes:** Aplicação compulsória a todos os poderes e esferas administrativas (federal, estadual, distrital e municipal).\n- **Rastreabilidade Ponta a Ponta:** Todo recurso público transferido deve ter seu beneficiário final identificado, eliminando as \"emendas invisíveis\".\n- **Pacto de Cooperação:** O Ministério da Gestão e da Inovação em Serviços Públicos (MGI) assume o papel de centralizador tecnológico e de fomento para capacitação procedimental.`,
        stats: [
          { label: 'Eficácia Jurídica', value: 'Erga Omnes' },
          { label: 'Órgão Relator', value: 'STF' },
          { label: 'Impacto Federativo', value: '100% de Estados/Municípios' }
        ]
      },
      {
        id: 'solutions',
        title: '2. Catálogo de Soluções e Tecnologia',
        short: 'Sistemas & Ferramentas',
        content: `O **Modelo Federal de Transparência e Rastreabilidade** baseia-se na modernização do **Transferegov.br** e na introdução do módulo de **Dupla Habilitação**:\n\n### Ferramentas de Controle Ativo:\n- **Dupla Habilitação:** Permite que o ente municipal ou estadual atue como repassador de seus recursos orçamentários próprios utilizando a plataforma federal.\n- **Ordem de Pagamento da Parceria (OPP):** Garante a quitação de despesas direto na conta bancária específica do fornecedor final.\n- **Georreferenciamento de Obras:** Exigência de comprovação visual (fotos por aplicativo) para cada boletim de medição liberado.\n- **Painéis BI (Monitoragov.br):** Dashboards de auditoria para controle interno e tribunais de contas.`,
        stats: [
          { label: 'Sistema Base', value: 'Transferegov.br' },
          { label: 'Custo de Adesão', value: 'Gratuito' },
          { label: 'Controle Social', value: 'Cidadãogov.br' }
        ]
      },
      {
        id: 'action',
        title: '3. Plano de Ação Federativo',
        short: 'Roteiro de Implantação',
        content: `Para garantir a conformidade imediata com a ordem do STF, os entes federados devem seguir um roteiro integrado de 3 etapas fundamentais:\n\n### Passos de Adesão:\n1. **Manifestação de Interesse (Front Door):** O ente acessa o portal da Rede de Parcerias e registra o pedido de integração sistêmica.\n2. **Diagnóstico e Planejamento:** O sistema avalia o porte do ente e define se utilizará o **Kit Simplificado** ou a **Integração via API (Conecta Gov.br)**.\n3. **Formalização do Termo:** Assinatura do Acordo de Cooperação Técnica (ACT) e parametrização dos perfis de gestores na plataforma.`,
        stats: [
          { label: 'Adesão Centralizada', value: 'Rede de Parcerias' },
          { label: 'Prazos Médios', value: '30 a 60 dias' },
          { label: 'Suporte Técnico', value: 'Diretoria DTPAR' }
        ]
      },
      {
        id: 'governance',
        title: '4. Capacitação & Governança',
        short: 'Treinamento & Redes',
        content: `A transição sistêmica exige o preparo técnico do funcionalismo público subnacional, que é garantido pelas estruturas integradas de ensino governamental.\n\n### Estratégia de Fortalecimento:\n- **Escola Nacional de Administração Pública (ENAP):** Workshops presenciais e oficinas regionais estruturadas sob o programa \"ENAP Aqui\".\n- **Escola Virtual de Governo (EV.G):** Trilhas formativas virtuais gratuitas com emissão de certificado imediato para gestão de parcerias e controle interno.\n- **Rede de Parcerias:** Fórum permanente de governança colaborativa com mais de 280 parceiros institucionais para troca de experiências bem-sucedidas.`,
        stats: [
          { label: 'Plataforma Virtual', value: 'EV.G' },
          { label: 'Parceiros Institucionais', value: '+280 Órgãos' },
          { label: 'Certificação', value: 'Gratuita e Imediata' }
        ]
      }
    ]
  },
  solutions: {
    title: 'Catálogo de Soluções PNGI & SGP',
    desc: 'O Programa Nacional de Gestão e Inovação (PNGI) disponibiliza soluções sem ônus tarifários de uso tecnológico direto para modernização dos entes federados.'
  },
  templates: {
    title: 'Biblioteca de Modelos Jurídicos Padronizados (Minutas da AGU)',
    desc: 'Aproveite os editais e minutas contratuais de parcerias já homologados pela Advocacia-Geral da União (AGU), reduzindo drasticamente os riscos de inconsistência jurídica.',
    btnCopy: 'Copiar Modelo',
    btnCopied: 'Copiado!',
    btnDownload: 'Baixar em .TXT',
    labelSearch: 'Buscar Minutas...',
    btnViewText: 'Visualizar Minuta',
    data: [
      {
        id: 'edital',
        title: 'Edital de Chamamento Público',
        desc: 'Utilizado para realizar a seleção pública e garantir igualdade de condições para as OSCs interessadas em propor parceria.',
        filename: 'modelo_edital_chamamento_publico.txt',
        templateText: `EDITAL DE CHAMAMENTO PUBLICO Nº XX/202X\nPROCESSO ADMINISTRATIVO Nº XXXXXXX/202X\nORGANISMO DIRETOR: [Nome da Secretaria ou Ente Municipal/Estadual]\n\n1. OBJETO\nConstitui objeto do presente Edital a seleção de propostas apresentadas por Organizacoes da Sociedade Civil (OSCs) para a execucao de [descrever resumidamente o objeto/finalidade da parceria, ex: programa esportivo comunitario].\n\n2. REQUISITOS DE PARTICIPACAO\nPoderao participar deste Chamamento as OSCs que cumprirem as exigencias da Lei nº 13.019/2014, incluindo:\na) Tempo minimo de existencia activa comprovada pelo CNPJ de no minimo:\n   - 1 (um) ano, no âmbito de parcerias com o Municipio;\n   - 2 (dois) anos, no âmbito de parcerias com o Estado/DF;\n   - 3 (tres) anos, no âmbito de parcerias com a Uniao.\nb) Apresentacao de Certidao de Regularidade Fiscal da Receita Federal (RFB).\nc) Apresentacao de Certificado de Regularidade do FGTS (CRF).\nd) Apresentacao de Certidao Negativa de Debitos Trabalhistas (CNDT).\ne) Declaracao de Ficha Limpa dos dirigentes da OSC (ausencia de condenacoes por improbidade ou crimes publicos).\n\n3. DA DOTACAO ORCAMENTARIA\nOs recursos financeiros destinados a execucao das parcerias selecionadas somam o valor total de R$ XXXXXXX,XX (descrever por extenso), correndo por conta da dotacao orcamentaria nº XXXXXXXXXXXXXXXXXXXXXX.\n\n4. DO PLANO DE TRABALHO\nA proposta de plano de trabalho apresentada pela OSC devera demonstrar nexo causal claro, contendo:\n- Descricao da realidade que servira de objeto da parceria;\n- Metas a serem atingidas e atividades de execucao;\n- Cronograma de desembolso financeiro;\n- Previsao de receitas e despesas detalhadas.\n\nLocal/UF, data de publicacao.\n\n__________________________________\nAUTORIDADE COMPETENTE / GESTOR`
      },
      {
        id: 'fomento',
        title: 'Termo de Fomento (MROSC)',
        desc: 'Instrumento para formalizar parcerias com transferencia de recursos cujos projetos foram propostos e desenhados pelas OSCs.',
        filename: 'modelo_termo_de_fomento_mrosc.txt',
        templateText: `TERMO DE FOMENTO Nº XX/202X\nPROCESSO SEI Nº XXXXXXXXX/202X\nCONCEDENTE: [Nome do Ente Publico Repassador / Secretaria]\nCONVENENTE: [Nome da Organizacao da Sociedade Civil - OSC]\n\nClausula Primeira - Do Objeto:\nO presente Termo de Fomento tem por objeto a concessao de apoio financeiro publico para execucao do projeto "[Nome do Projeto da OSC]", de acordo com o plano de trabalho aprovado, visando [descrever finalidade social].\n\nClausula Segunda - Dos Recursos Financeiros:\nPara a execucao do objeto deste Termo, a CONCEDENTE repassara a CONVENENTE o valor de R$ XXXXXXX,XX (descrever por extenso), que sera depositado na conta bancaria exclusiva nº XXXXXX, Agencia XXXX do Banco [do Brasil/Caixa Economica Federal].\n§1º Os rendimentos de aplicacoes financeiras deverao ser aplicados no objeto da parceria.\n§2º Os pagamentos aos prestadores e fornecedores finais serao efetuados exclusivamente via Ordem de Pagamento da Parceria (OPP), diretamente nas contas dos destinatarios devidamente cadastrados.\n\nClausula Terceira - Do Tempo de Existencia da OSC:\nA CONVENENTE declara cumprir o tempo minimo de existencia de CNPJ ativo exigido pelo art. 33 da Lei nº 13.019/2014, possuindo [X] anos de atividades ininterruptas.\n\nClausula Quarta - Do Monitoramento e Fiscalizacao:\nA CONCEDENTE monitorara a parceria de forma continua, incluindo:\na) Vistorias por georreferenciamento fotografico para comprovar as metas de infraestrutura.\nb) Auditoria digital dos pagamentos via Monitoragov.br.\n\nLocal/UF, data da assinatura.\n\n__________________________          __________________________\nAUTORIDADE PUBLICA                  REPRESENTANTE DA OSC`
      },
      {
        id: 'colabora',
        title: 'Termo de Colaboração',
        desc: 'Instrumento para formalizar parcerias com transferencia de recursos cujos projetos e metas foram idealizados pela propria Administracao Publica.',
        filename: 'modelo_termo_de_colaboracao_mrosc.txt',
        templateText: `TERMO DE COLABORACAO Nº XX/202X\nPROCESSO SEI Nº XXXXXXXXX/202X\nPARCEIRO PUBLICO: [Nome do Ente Publico / Secretaria]\nPARCEIRO PRIVADO: [Nome da Organizacao da Sociedade Civil - OSC]\n\nClausula Primeira - Do Objeto:\nConstitui objeto do presente Termo de Colaboracao a execucao conjunta do programa de interesse publico "[Nome do Programa Idealizado pelo Ente]", de acordo com as diretrizes e plano de trabalho pre-estabelecidos pelo PARCEIRO PUBLICO.\n\nClausula Segunda - Das Metas Fisicas:\nA OSC executara as metas definidas pela Administracao Publica, que incluem:\n- Meta 1: [Descrever meta, ex: atendimento diario de 50 criancas].\n- Meta 2: [Descrever meta, ex: realizacao de 10 oficinas mensais].\n\nClausula Terceira - Da Rastreabilidade Financeira (OPP):\nTodo e qualquer pagamento de despesas vinculadas a este Termo deve ser liquidado diretamente na plataforma do Transferegov.br por meio de Ordem de Pagamento da Parceria (OPP), restando vedada a transferencia global ou saques para contas de livre movimentacao.\n\nClausula Quarta - Da Regularidade Fiscal:\nA OSC conveniada obriga-se a manter, durante toda a vigencia da parceria, a regularidade de suas certidoes RFB, FGTS e CNDT.\n\nLocal/UF, data.\n\n__________________________          __________________________\nGESTOR PUBLICO                      DIRETOR DA OSC`
      },
      {
        id: 'act',
        title: 'Acordo de Cooperação Técnica',
        desc: 'Utilizado para estabelecer cooperacao mutua de interesse publico sem transferencia de recursos financeiros ou doacao de bens.',
        filename: 'modelo_acordo_cooperacao_tecnica_act.txt',
        templateText: `ACORDO DE COOPERACAO TECNICA (ACT) Nº XX/202X\nPARTE A: [Ministerio/Secretaria / Ente Publico Concedente]\nPARTE B: [Ente Subnacional Aderente / OSC Co-participante]\n\nClausula Primeira - Do Objeto:\nO presente Acordo de Cooperacao Tecnica tem por objeto a mutua cooperacao e intercambio de conhecimentos, metodologias, tecnologias e capacitacoes entre as partes, visando a implantacao assistida do Modulo de Gestao de Parcerias e solucoes do PNGI.\n\nClausula Segunda - Dos Recursos Financeiros:\nEste instrumento nao enseja qualquer repasse de recursos financeiros ou doacao de bens moveis/imoveis entre os participes, correndo as despesas de pessoal e suporte tecnico por conta das dotacoes orcamentarias proprias de cada orgao.\n\nClausula Quarta - Das Atribuições Comuns:\nAs partes comprometem-se a:\na) Designar interlocutores e coordenadores da parceria;\nb) Cumprir os prazos e cronograma de trabalho definidos conjuntamente;\nc) Fornecer dados abertos e estatisticas sobre o andamento das metas no âmbito local.\n\nClausula Quinta - Do Prazo de Vigência:\nO presente Acordo de Cooperacao vigorara pelo prazo de 24 (vinte e quatro) meses a contar da data de sua assinatura, podendo ser prorrogado por Termo Aditivo.\n\nLocal/UF, data.\n\n__________________________          __________________________\nAUTORIDADE PARTE A                  AUTORIDADE PARTE B`
      }
    ]
  },
  steps: {
    title: 'Ciclo de Vida Operacional das Parcerias (MROSC)',
    desc: 'Entenda o fluxo completo de gestão de uma parceria voluntária no modelo federal de controle e transparência.',
    phase: 'Fase',
    keyActionLabel: 'Ação Chave da Fase:',
    tipLabel: 'Dica Prática:',
    lifecycle: [
      {
        number: '01',
        title: 'Planejamento e Edital',
        desc: 'Fase inicial onde a Administracao Publica planeja a parceria, detalha as metas fisicas esperadas e publica o Edital de Chamamento Publico baseado nas minutas padrao da AGU.',
        keyAction: 'Publicacao do Edital de Selecao',
        tips: 'Defina metas fisicas claras e mensuraveis no edital para simplificar a prestacao de contas no final.'
      },
      {
        number: '02',
        title: 'Seleção e Julgamento',
        desc: 'As OSCs enviam propostas e planos de trabalho. A comissao de selecao audita o tempo minimo de existencia do CNPJ da OSC (1 ano municipal, 2 estadual, 3 federal) e as certidoes de regularidade RFB, CRF e CNDT.',
        keyAction: 'Habilitacao da OSC e Plano de Trabalho',
        tips: 'Use o Checklist de Admissibilidade para auditar a documentacao rapidamente antes do julgamento.'
      },
      {
        number: '03',
        title: 'Celebração',
        desc: 'Formalizacao juridica do Termo de Fomento ou Colaboracao. O sistema Transferegov.br realiza a abertura automatica de uma conta bancaria exclusiva para movimentacao dos recursos no banco oficial.',
        keyAction: 'Assinatura Eletronica e Abertura de Conta',
        tips: 'A conta da parceria e bloqueada para saques comuns, aceitando apenas ordens de pagamento eletronicas.'
      },
      {
        number: '04',
        title: 'Execução e Monitoramento',
        desc: 'A OSC executa o projeto e paga fornecedores diretamente pelo sistema por meio de Ordem de Pagamento da Parceria (OPP). Obras sao monitoradas por georreferenciamento fotografico via Cidadaogov.br.',
        keyAction: 'Pagamentos via OPP e Fotos de Obras',
        tips: 'A OPP garante que o recurso saia da conta da parceria direto para o fornecedor final, cumprindo a ADPF 854.'
      },
      {
        number: '05',
        title: 'Prestação de Contas',
        desc: 'A OSC envia o Relatório de Execução do Objeto provando a entrega fisica das metas. Se as metas forem atingidas, a prestacao de contas financeira e simplificada sob a Portaria 424/2016.',
        keyAction: 'Validacao do Relatorio de Execucao do Objeto',
        tips: 'Caso existam despesas nao correlacionadas ou desvios de finalidade, aplica-se a calculadora de glosas.'
      }
    ]
  },
  simulator: {
    title: 'Simulador de Transição Regulatória e Elegibilidade PNGI',
    desc: 'Identifique os prazos limites e os passos de compliance específicos para o rollout do Módulo de Gestão de Parcerias no seu ente federado.',
    labelEntityType: 'Tipo de Ente Federativo',
    entityTypes: {
      state: 'Estado / DF',
      capital: 'Capital de Estado',
      municipality: 'Município'
    },
    labelPopulation: 'População Estimada (Habitantes)',
    labelAct: 'Possui ACT de Cooperação Ativo com MGI?',
    labelUf: 'Unidade Federativa (Estado)',
    btnDownloadRoadmap: 'Baixar Roteiro em PDF',
    apiTitle: 'Importação Rápida via API Rede de Parcerias',
    apiDesc: 'Insira o CNPJ ou código SIAFI do Ente Federado para carregar automaticamente as informações reais da Rede de Parcerias.',
    apiPlaceholder: 'Ex: 13.927.801/0001-49 (Cnpj da Bahia)',
    btnApiSearch: 'Validar e Importar Ente',
    apiSourceManual: 'PREENCHIMENTO MANUAL',
    apiSourceValidated: 'VALIDADO VIA API/SIAFI',
    populationText: 'Habitantes',
    eligiblePngi: 'Elegível ao PNGI Geral:',
    phase: 'Fase de Rollout:',
    date: 'Data Limite de Transição:',
    kitRecommended: 'Modelo de Kit de Transição:',
    checklistTitle: 'Roteiro Recomendado de Transição:',
    resultEligibleYes: 'SIM (Elegível a todo o catálogo do PNGI)',
    resultEligibleNo: 'NÃO (Restrito às obrigações do Módulo de Parcerias ADPF 854)',
    btnNextStep: 'Próximo Passo',
    btnPrevStep: 'Voltar',
    btnRedo: 'Refazer Diagnóstico',
    stepLabel: 'Passo',
    readinessLabel: 'Prontidão de Adesão',
    readinessStatusHigh: 'Alta Prontidão (Fluxo Geral)',
    readinessStatusMed: 'Prontidão Média (Assistência Requerida)',
    readinessStatusLow: 'Adesão Crítica (Prioridade Alta)',
  },
  worksMap: {
    title: 'Mapa de Obras e Transparência de Recursos Georreferenciados',
    desc: 'Demonstração interativa de monitoramento físico de obras. Os fiscais locais registram fotos georreferenciadas na ponta para validar a liberação de recursos.',
    labelSearch: 'Buscar obras por SIAFI ou OSC...',
    progress: 'Progresso Físico:',
    beneficiary: 'Beneficiário Final:',
    cost: 'Valor da Parceria:',
    updated: 'Última Atualização:',
    data: [
      {
        id: 'obra-01',
        name: 'Construção da Unidade de Pronto Atendimento - UPA 24h',
        siafi: '883902',
        value: 'R$ 2.450.000,00',
        osc: 'Instituto de Saúde e Assistência Comunitária (ISAC)',
        beneficiary: 'Moradores do Bairro Industrial',
        lat: '-12.9714',
        lng: '-38.5014',
        status: 'Em Andamento',
        progress: 68,
        timestamp: '10/07/2026 10:14:40',
        x: '35%',
        y: '45%'
      },
      {
        id: 'obra-02',
        name: 'Reforma e Ampliação da Creche Escola Municipal Sementes da Inclusão',
        siafi: '772911',
        value: 'R$ 890.000,00',
        osc: 'Organização Viver Bem',
        beneficiary: '120 crianças da Educação Infantil',
        lat: '-12.9814',
        lng: '-38.5114',
        status: 'Concluído',
        progress: 100,
        timestamp: '09/07/2026 15:30:12',
        x: '65%',
        y: '25%'
      },
      {
        id: 'obra-03',
        name: 'Implantação do Complexo Esportivo e Social Vila Solidária',
        siafi: '556100',
        value: 'R$ 1.620.000,00',
        osc: 'Liga Desportiva e Cultural Metropolitana',
        beneficiary: 'Jovens e adolescentes sob risco social',
        lat: '-12.9614',
        lng: '-38.4914',
        status: 'Em Atraso',
        progress: 32,
        timestamp: '08/07/2026 08:45:00',
        x: '48%',
        y: '70%'
      }
    ]
  },
  checklistSection: {
    title: 'Admissibilidade Rápida de Parcerias',
    desc: 'Simule a conformidade prévia de uma Organização da Sociedade Civil (OSC) antes da celebração de parcerias sob o regime MROSC.',
    helpText: 'Selecione os requisitos atendidos para auditar o nível de risco da parceria:',
    items: {
      cnpj: 'CNPJ ativo há pelo menos 1 ano (Municipal), 2 anos (Estadual) ou 3 anos (Federal)',
      rfb: 'Certidão Conjunta RFB/PGFN ativa (Regularidade Fiscal Federal)',
      crf: 'Certificado de Regularidade do FGTS (CRF) ativo',
      cndt: 'Certidão Negativa de Débitos Trabalhistas (CNDT) ativa',
      capTec: 'Comprovação de capacidade técnica ou experiência prévia correlata',
      fichaLimpa: 'Declaração Ficha Limpa (ausência de impedimentos ético-jurídicos dos dirigentes)'
    },
    resultSuccess: 'OSC com Admissibilidade Completa: Risco Baixo de Rejeição pelo TCU!',
    resultWarning: 'Atenção: A falta de requisitos obrigatórios constitui óbice legal para a celebração e eleva o risco regulatório.'
  },
  contact: {
    title: 'Suporte Técnico e Articulação da Rede',
    desc: 'Solicite esclarecimentos adicionais ou agende reuniões bilaterais de apoio à transição operacional junto à equipe DTPAR/SEGES.',
    name: 'Nome Completo / Cargo',
    city: 'Ente Federativo / Cidade',
    email: 'E-mail Institucional',
    message: 'Descrição da Solicitação de Suporte',
    btnSubmit: 'Enviar Solicitação de Suporte',
    successAlert: 'Solicitação registrada com sucesso! A equipe de suporte da Rede de Parcerias entrará em contato em até 48 horas úteis.'
  },
  antigravity: {
    title: 'Integração de Contexto do Agente Antigravity',
    desc: 'Este painel expõe a especificação operacional utilizada por agentes autônomos para calibrar ferramentas locais de auditoria e compliance regulatório.',
    btnViewSpec: 'Visualizar Especificação do Agente',
    btnHideSpec: 'Ocultar Especificação',
    btnCopySpec: 'Copiar JSON de Configuração',
    btnCopiedSpec: 'Copiado para o Clipboard!',
    btnSync: 'Sincronizar Políticas de Conformidade',
    syncing: 'Sincronizando...',
    synced: 'Sincronizado com Sucesso!'
  },
  aiChat: {
    title: 'Central de Apoio Cognitivo e Orientações',
    desc: 'Converse com o SGP-Compliance Orientador IA. Tire suas dúvidas sobre o novo fluxo do Transferegov, prazos de rollout, ADPF 854 e minutas padronizadas.',
    placeholder: 'Pergunte sobre dupla habilitação, prazos, ADPF 854 ou regras do TCU...',
    btnSend: 'Enviar',
    greeting: 'Olá! Sou o **SGP-Orientador IA**. Estou aqui para esclarecer suas dúvidas sobre a adesão ao **Programa Nacional de Gestão e Inovação (PNGI)** e a implantação do **Módulo de Gestão de Parcerias (ADPF 854)** no Transferegov.br. Como posso ajudar seu ente federado hoje?',
    communicationError: 'Desculpe, tive um problema de comunicação com o servidor técnico. Por favor, tente enviar sua dúvida novamente.',
    questions: [
      "O que é a 'Dupla Habilitação' no Transferegov.br?",
      "Como a ADPF 854 do STF impacta meu município?",
      "O que é a Ordem de Pagamento da Parceria (OPP)?",
      "Como funciona o Kit de Implantação para pequenos municípios?",
      "Quais são os estados elegíveis para o piloto de Julho/2026?"
    ],
    bannerTitle: 'Tem dúvidas sobre Adesão, Integração Nacional ou Gestão de Parcerias no Transferegov?',
    bannerDesc: 'Nosso Orientador Inteligente está disponível no painel lateral. Faça perguntas sobre a transição sistêmica federativa, diretrizes do PNGI, uso de convênios, OPP e regularidade de parcerias.',
    bannerBtn: 'Abrir Orientador IA'
  },
  timeline: {
    title: 'Calendário de Transição e Rollout Oficial',
    desc: 'Cronograma evolutivo de implantação federativa nacional estabelecido pela Portaria SEGES/MGI nº 3.248/2026.',
    statusCompleted: 'Concluído',
    statusInProgress: 'Em Andamento',
    statusToExecute: 'A Executar',
    stepDetails: 'Detalhamento da Etapa',
    mandatoryActions: 'Ações Mandatórias',
    data: [
      {
        date: 'Março/2026',
        title: 'Articulação e Webinários',
        desc: 'Lançamento nacional das diretrizes processuais, materiais didáticos e início dos webinários de capacitação para gestores públicos de todo o país.',
        status: 'Concluído',
        details: 'Disponibilização da primeira base de conhecimento, detalhando os novos fluxos de prestação de contas, georreferenciamento e regras do novo Módulo de Parcerias.'
      },
      {
        date: 'Junho/2026',
        title: 'Abertura de Pedidos e Modelos AGU',
        desc: 'Habilitação da entrada de solicitações formais na Rede de Parcerias. Divulgação das minutas jurídicas padronizadas pela Advocacia-Geral da União (AGU).',
        status: 'Concluído',
        details: 'Entes federados iniciam o envio de manifestação de interesse por meio do portal Rede de Parcerias (Front Door).'
      },
      {
        date: 'Julho/2026',
        title: 'Fase Piloto (ACT Vigente)',
        desc: 'Início da implantação assistida nos 8 estados pioneiros com Acordos de Cooperação Técnica vigentes.',
        status: 'Em Andamento',
        details: 'Estados participantes do Piloto: Acre (AC), Alagoas (AL), Amapá (AP), Bahia (BA), Rondônia (RO), Rio Grande do Norte (RN), Roraima (RR) e Tocantins (TO).'
      },
      {
        date: 'Outubro/2026',
        title: 'Expansão - Demais Estados',
        desc: 'Rollout completo do Módulo de Gestão de Parcerias para as demais unidades da federação (Estados e DF) não inclusos no piloto.',
        status: 'A Executar',
        details: 'Fase crucial para garantir a cobertura nacional do controle estadual sobre as próprias transferências utilizando a plataforma unificada.'
      },
      {
        date: 'Janeiro/2027',
        title: 'Capitais Brasileiras',
        desc: 'Foco direcionado às capitais de estados, visando o alinhamento de métricas de alta performance, BI e transparência ativa refinada.',
        status: 'A Executar',
        details: 'Integrações sistêmicas avançadas e disponibilização de dashboards personalizados para os grandes centros urbanos.'
      },
      {
        date: 'Abril/2027 a Março/2028',
        title: 'Escalonamento de Municípios',
        desc: 'Adoção progressiva e escalonada para todos os municípios brasileiros, segmentados por faixas populacionais de forma sustentável.',
        status: 'A Executar',
        details: 'Prazos da Portaria nº 3.248/2026: 1) Abr/2027: Municípios > 1M hab. | 2) Jul/2027: Municípios > 500k hab. | 3) Out/2027: Municípios > 200k hab. | 4) Jan/2028: Municípios > 100k hab. | 5) Mar/2028: Demais municípios (Kits Simplificados).'
      }
    ]
  },
  successCases: {
    title: 'Casos de Sucesso em Gestão e Transparência',
    desc: 'Conheça iniciativas estaduais que otimizaram a aplicação de recursos e são referência na Rede de Parcerias.',
    badgeLogistics: 'Logística e Ativos',
    badgeGovernance: 'Gestão Estratégica',
    badgeLand: 'Regularização Fundiária',
    badgePeople: 'Valorização de Pessoas',
    data: [
      {
        title: 'Credenciamento de Imóveis',
        state: 'Bahia (BA)',
        desc: 'Criação de um modelo extremamente ágil e seguro de credenciamento para contratação de avaliadores de imóveis públicos, reduzindo o tempo de processo em 75%.',
        badge: 'Logística e Ativos'
      },
      {
        title: 'GESPEN - Gestão Prisional',
        state: 'Nacional',
        desc: 'Metodologia inovadora para acompanhamento de dados estratégicos e monitoramento de metas em unidades prisionais, focando em segurança e direitos humanos.',
        badge: 'Gestão Estratégica'
      },
      {
        title: 'Paz no Campo',
        state: 'Maranhão (MA)',
        desc: 'Iniciativa que integra tecnologia geográfica para agilizar processos de regularização fundiária de pequenos agricultores e assentamentos sustentáveis.',
        badge: 'Regularização Fundiária'
      },
      {
        title: 'Geração E.S.S.E',
        state: 'Espírito Santo (ES)',
        desc: 'Programa inovador de valorização, reinserção e aproveitamento do conhecimento acumulado de servidores públicos ativos com mais de 60 anos.',
        badge: 'Valorização de Pessoas'
      }
    ]
  }
};

export const enTranslations: TranslationSchema = {
  common: {
    portalName: 'SUBNATIONAL PARTNERSHIPS PORTAL',
    mgi: 'MINISTRY OF MANAGEMENT AND INNOVATION IN PUBLIC SERVICES',
    govFederal: 'FEDERAL GOVERNMENT',
    startDiagnosis: 'Start Diagnosis',
    loading: 'Loading...',
    yes: 'YES',
    no: 'NO',
    back: 'Back',
    close: 'Close',
    success: 'Success',
    error: 'Error'
  },
  nav: {
    home: 'Partnership Management',
    library: 'Library & Videos',
    solutions: 'Solutions',
    legislation: 'Legislation',
    templates: 'Template Models',
    steps: 'Step-by-Step',
    diagnosis: 'Self-Diagnosis',
    checklist: 'Checklist & Support',
    aiGuide: 'AI Guide',
    knowledge: 'Knowledge',
    tools: 'Tools',
    libraryDesc: 'Instructional videos and guides',
    legislationDesc: 'Federal decisions and acts',
    stepsDesc: 'Official transition timeline',
    solutionsDesc: 'System modules and APIs',
    templatesDesc: 'Notices and terms templates',
    checklistDesc: 'Checklist and supplementary audit'
  },
  hero: {
    badge: 'STF Decision • ADPF 854 • Minister Flávio Dino',
    title: 'Internalization of ',
    titleHighlight: 'Partnerships Management',
    desc: 'Guidelines, capacity building, and technological solutions for the coordinated implementation of transparency, traceability, and federative governance in subnational resource transfers.',
    btnDiagnosis: 'Adhesion Self-Diagnosis',
    btnAi: 'Talk to SGP AI',
    statsTitle: 'Federative Pact',
    statsActivePartners: '+280 Entities',
    statsYears: '10 Years',
    statsModule: 'Dual Qualification',
    statsDisclaimer: '*MGI will support subnational entities in systemic transition without direct technology usage fees.'
  },
  overview: {
    title: 'The STF Decision and Partnership Governance',
    desc: 'The Ruling reported by Minister Flávio Dino in ADPF No. 854, endowed with erga omnes efficacy and binding effect, mandates the Federal Government to provide tools and training to States, Federal District, and Municipalities to enable absolute traceability and full publicity of decentralized resources.',
    axis1Title: 'Axis 1: Capacity Building',
    axis1Desc: 'Continuous qualification of local managers and technicians for procedural transition and traceable accountability.',
    axis2Title: 'Axis 2: Tools',
    axis2Desc: 'Provision of the unified Transferegov.br system operating under the innovative Dual Qualification rule.',
    axis3Title: 'Axis 3: Technical Support',
    axis3Desc: 'Continuous assistance, data exchange through robust APIs, and permanent operational support from the Network.'
  },
  legislation: {
    title: 'Partnerships Legislation Hub',
    desc: 'Browse the main federal regulations and legal frameworks that govern the execution and compliance of the Partnership Module.',
    filters: {
      all: 'All',
      const: 'Constitutional',
      fed: 'Laws/Decrees',
      adm: 'Ordinances'
    },
    criticalPoints: 'Critical Points:',
    complianceTip: 'Compliance Tip:',
    viewFullText: 'View full published text',
    btnHide: 'Hide Details',
    btnShow: 'View Details & Critical Points',
    data: [
      {
        id: 'portaria3248',
        title: 'SEGES/MGI Ordinance No. 3,248/2026',
        category: 'adm',
        shortCategory: 'Adhesion Ordinance',
        scope: 'Federal, State, and Municipal',
        summary: 'Establishes the procedures and official schedule for the adhesion of states, Federal District, and municipalities interested in using Transferegov.br for the execution of transfers and partnerships with their own resources (Internalization).',
        keyPoints: [
          'Total gratuity: MGI provides the solutions and Transferegov.br without direct tariff costs to adhering entities.',
          'Mandatory adhesion to the Partnership Network: The entity must join the Partnership Network in the 1st or 2nd layer.',
          'Formalization by Adhesion Agreement: Electronically signed by the Chief Executive or delegated authority.',
          'Registration of external systems (APIs): Form for integration with local IT systems in Transferegov.br.'
        ],
        fullLawLink: 'https://www.gov.br/transferegov/pt-br/legislacao/portarias/portaria-seges-mgi-no-3-248-de-15-de-abril-de-2026',
        complianceTips: 'Make sure your entity\'s legal representative has an active and regular registration status with the CNPJ registry before initiating the protocol.'
      },
      {
        id: 'adpf854',
        title: 'STF Decision in ADPF 854',
        category: 'const',
        shortCategory: 'Constitutional',
        scope: 'National (Mandatory)',
        summary: 'Binding decision of the STF that determines total end-to-end traceability and active transparency of all decentralized resources (including parliamentary amendments), prohibiting invisible amendments.',
        keyPoints: [
          'Erga Omnes Efficacy: Binds all federated entities and spheres of government.',
          'Identification of the Final Beneficiary: The resource must be tracked to the final provider/supplier at the end.',
          'MGI as Facilitator: Delegates to MGI the duty to provide control and audit technology to municipalities.'
        ],
        fullLawLink: '#',
        complianceTips: 'All expenses incurred must be linked to a destination CNPJ/CPF of the final beneficiary, with no possibility of cash withdrawals or generic accounts.'
      }
    ]
  },
  mediaSection: {
    title: 'Media Library & Support Documents',
    desc: 'Watch guide videos with accessibility features and read the federal transparency manual directly in your browser.',
    videoMode: 'Video Playback Mode:',
    videoModes: {
      simulated: 'Accessible Simulator with Transcripts',
      local: 'Active Local Video (/media/video-promocional.mp4)',
      custom: 'Load Custom File from /media Folder'
    },
    customInputPlaceholder: 'E.g.: sgp-training-video.mp4',
    btnLoadCustom: 'Load Media',
    speed: 'Speed',
    captions: 'Captions',
    audioDesc: 'Audio Description',
    libras: 'LIBRAS (Sign Language)',
    videoSubtitles: [
      { start: 0, end: 12, text: "STF official opening. Constitutional understanding of ADPF 854.", desc: "External image of the Supreme Federal Court under the Brasília sky. A soft instrumental vignette is played." },
      { start: 12, end: 28, text: "Minister Flávio Dino: Absolute transparency and traceability of public resources are pillars of democracy.", desc: "Plenary of the STF. Minister Flávio Dino speaks to the microphone, wearing his black minister's robe." },
      { start: 28, end: 44, text: "It is imperative that every single cent transferred through amendments or partnerships can be audited by the citizen at the final end.", desc: "Camera cut showing the other ministers following the vote in the plenary." },
      { start: 44, end: 60, text: "The Ministry of Management and Innovation (MGI) will provide the technology and training at no cost to states and municipalities.", desc: "Explanatory chart on the screen details the MGI secretariats united in the support program." },
      { start: 60, end: 80, text: "With the Dual Qualification in Transferegov and the Partnership Payment Order (OPP), financial control will be total.", desc: "Simulated screenshot of the Transferegov interface with dual transfer options active." },
      { start: 80, end: 95, text: "Georeferenced images and virtual photo inspections will give legal security to inspectors and construction managers.", desc: "Aerial photo of a construction site with GPS geometric markings and coordinates overlaid." },
      { start: 95, end: 110, text: "The Partnerships Network is open. Access the Front Door and qualify your servers in the Virtual Government School.", desc: "Image of the Partnerships Network login portal and the EV.G/ENAP logo." },
      { start: 110, end: 120, text: "United by the federative pact, ensuring efficiency, control, and integrity in public management. Federal Government of Brazil.", desc: "The vignette ends with the visual signature of the Ministry of Management and Innovation and the colors of the national flag." }
    ],
    manualTitle: 'Technical Reference Manual - PNGI & SGP',
    manualDesc: 'Select the chapters below for a quick read of the consolidated rules from the Ministry of Management and Innovation.',
    btnDownloadPdf: 'Download Full Manual (PDF)',
    chapters: [
      {
        id: 'intro',
        title: '1. Legal Basis (ADPF 854)',
        short: 'Legislation & STF',
        content: `The **Claim of Non-Compliance with a Fundamental Precept (ADPF) 854**, reported by **Minister Flávio Dino**, consolidated the mandatory nature of total traceability in public transfers.\n\n### Main Legal Milestones:\n- **Erga Omnes Efficacy:** Compulsory application to all powers and administrative spheres (federal, state, district, and municipal).\n- **End-to-End Traceability:** Every transferred public resource must have its final beneficiary identified, eliminating \"invisible amendments\".\n- **Cooperation Pact:** The Ministry of Management and Innovation in Public Services (MGI) assumes the role of technological centralizer and promoter for procedural capacity building.`,
        stats: [
          { label: 'Legal Efficacy', value: 'Erga Omnes' },
          { label: 'Reporting Body', value: 'STF' },
          { label: 'Federative Impact', value: '100% of States/Municipalities' }
        ]
      },
      {
        id: 'solutions',
        title: '2. Solution Catalog & Technology',
        short: 'Systems & Tools',
        content: `The **Federal Model of Transparency and Traceability** is based on the modernization of **Transferegov.br** and the introduction of the **Dual Qualification** module:\n\n### Active Control Tools:\n- **Dual Qualification:** Allows the municipal or state entity to act as a repasser of its own budgetary resources using the federal platform.\n- **Partnership Payment Order (OPP):** Guarantees the settlement of expenses directly in the specific bank account of the final supplier.\n- **Georeferencing of Works:** Requirement of visual proof (photos by app) for each released measurement report.\n- **BI Dashboards (Monitoragov.br):** Audit dashboards for internal control and audit courts.`,
        stats: [
          { label: 'Base System', value: 'Transferegov.br' },
          { label: 'Adhesion Cost', value: 'Free' },
          { label: 'Social Control', value: 'Cidadãogov.br' }
        ]
      },
      {
        id: 'action',
        title: '3. Federative Action Plan',
        short: 'Implementation Roadmap',
        content: `To ensure immediate compliance with the STF order, federated entities must follow an integrated roadmap of 3 fundamental steps:\n\n### Adhesion Steps:\n1. **Manifestation of Interest (Front Door):** The entity accesses the Partnership Network portal and registers the request for systemic integration.\n2. **Diagnosis and Planning:** The system evaluates the size of the entity and defines whether it will use the **Simplified Kit** or **API Integration (Conecta Gov.br)**.\n3. **Formalization of the Term:** Signature of the Technical Cooperation Agreement (ACT) and parameterization of manager profiles on the platform.`,
        stats: [
          { label: 'Centralized Adhesion', value: 'Partnerships Network' },
          { label: 'Average Time', value: '30 to 60 days' },
          { label: 'Technical Support', value: 'DTPAR Directorate' }
        ]
      },
      {
        id: 'governance',
        title: '4. Capacity Building & Governance',
        short: 'Training & Networks',
        content: `The systemic transition requires the technical preparation of the subnational public service, which is guaranteed by the integrated governmental teaching structures.\n\n### Strengthening Strategy:\n- **National School of Public Administration (ENAP):** In-person workshops and regional training structured under the \"ENAP Here\" program.\n- **Virtual School of Government (EV.G):** Free online learning paths with immediate certificate issuance for partnership management and internal control.\n- **Partnerships Network:** Permanent forum of collaborative governance with more than 280 institutional partners to share successful experiences.`,
        stats: [
          { label: 'Virtual Platform', value: 'EV.G' },
          { label: 'Institutional Partners', value: '+280 Organs' },
          { label: 'Certification', value: 'Free and Immediate' }
        ]
      }
    ]
  },
  solutions: {
    title: 'PNGI & SGP Solution Catalog',
    desc: 'The National Program for Management and Innovation (PNGI) provides solutions without direct technological usage fees to modernize federated entities.'
  },
  templates: {
    title: 'Library of Standardized Legal Models (AGU Minutas)',
    desc: 'Take advantage of the partnership selection calls and contract drafts already approved by the Office of the Attorney General of the Union (AGU), drastically reducing legal inconsistency risks.',
    btnCopy: 'Copy Template',
    btnCopied: 'Copied!',
    btnDownload: 'Download as .TXT',
    labelSearch: 'Search Drafts...',
    btnViewText: 'Preview Template',
    data: [
      {
        id: 'edital',
        title: 'Public Selection Call (Edital)',
        desc: 'Used to perform public selection and ensure equal conditions for CSOs interested in proposing a partnership.',
        filename: 'template_public_call_selection.txt',
        templateText: `PUBLIC CALL SELECTION NOTICE No. XX/202X\nADMINISTRATIVE PROCESS No. XXXXXXX/202X\nDIRECTING ORGAN: [Name of the Secretariat or Municipal/State Entity]\n\n1. OBJECT\nThe object of this Selection Call is to select proposals submitted by Civil Society Organizations (CSOs) for the execution of [briefly describe the object/purpose of the partnership, e.g., community sports program].\n\n2. PARTICIPATION REQUIREMENTS\nCSOs that meet the requirements of Law No. 13,019/2014 may participate in this call, including:\na) Minimum active existence time proven by CNPJ of at least:\n   - 1 (one) year, in the context of partnerships with the Municipality;\n   - 2 (two) years, in the context of partnerships with the State/DF;\n   - 3 (three) years, in the context of partnerships with the Union.\nb) Submission of the Fiscal Regularity Certificate from the Federal Revenue (RFB).\nc) Submission of the FGTS Regularity Certificate (CRF).\nd) Submission of the Negative Certificate of Labor Debits (CNDT).\ne) Declaration of Ficha Limpa (Clean Record) of the CSO directors (absence of convictions for administrative misconduct or public crimes).\n\n3. BUDGETARY ALLOCATION\nThe financial resources destined for the execution of the selected partnerships total R$ XXXXXXX,XX (describe in words), running at the expense of budget allocation No. XXXXXXXXXXXXXXXXXXXXXX.\n\n4. WORK PLAN\nThe work plan proposal presented by the CSO must demonstrate a clear causal connection, containing:\n- Description of the reality that will serve as the object of the partnership;\n- Targets to be achieved and execution activities;\n- Financial disbursement schedule;\n- Detailed revenue and expense forecast.\n\nLocation/UF, publication date.\n\n__________________________________\nCOMPETENT AUTHORITY / MANAGER`
      },
      {
        id: 'fomento',
        title: 'Promotion Agreement (Termo de Fomento - MROSC)',
        desc: 'Instrument to formalize partnerships with resource transfer whose projects were proposed and designed by CSOs.',
        filename: 'template_promotion_agreement_mrosc.txt',
        templateText: `PROMOTION AGREEMENT No. XX/202X\nSEI PROCESS No. XXXXXXXXX/202X\nGRANTOR: [Name of the Repasser Public Entity / Secretariat]\nGRANTEE: [Name of the Civil Society Organization - CSO]\n\nClause One - Object:\nThis Promotion Agreement has as its object the granting of public financial support for the execution of the project "[Project Name of the CSO]", in accordance with the approved work plan, aiming at [describe social purpose].\n\nClause Two - Financial Resources:\nFor the execution of the object of this Agreement, the GRANTOR will transfer to the GRANTEE the amount of R$ XXXXXXX,XX (describe in words), which will be deposited in the exclusive bank account No. XXXXXX, Agency XXXX of the [Banco do Brasil/Caixa Economica Federal] bank.\n§1º Earnings from financial investments must be applied to the object of the partnership.\n§2º Payments to final providers and suppliers will be made exclusively via Partnership Payment Order (OPP), directly to the accounts of the duly registered recipients.\n\nClause Three - CSO Existence Time:\nThe GRANTEE declares that it complies with the minimum active CNPJ existence time required by art. 33 of Law No. 13,019/2014, possessing [X] years of uninterrupted activities.\n\nClause Four - Monitoring and Supervision:\nThe GRANTOR will monitor the partnership continuously, including:\na) Inspections by photographic georeferencing to prove infrastructure goals.\nb) Digital audit of payments via Monitoragov.br.\n\nLocation/UF, date of signature.\n\n__________________________          __________________________\nPUBLIC AUTHORITY                    CSO REPRESENTATIVE`
      },
      {
        id: 'colabora',
        title: 'Collaboration Agreement (Termo de Colaboração)',
        desc: 'Instrument to formalize partnerships with resource transfer whose projects and goals were idealized by the Public Administration itself.',
        filename: 'template_collaboration_agreement_mrosc.txt',
        templateText: `COLLABORATION AGREEMENT No. XX/202X\nSEI PROCESS No. XXXXXXXXX/202X\nPUBLIC PARTNER: [Name of the Public Entity / Secretariat]\nPRIVATE PARTNER: [Name of the Civil Society Organization - CSO]\n\nClause One - Object:\nThe object of this Collaboration Agreement is the joint execution of the public interest program "[Program Name Idealized by the Entity]", in accordance with the guidelines and work plan pre-established by the PUBLIC PARTNER.\n\nClause Two - Physical Targets:\nThe CSO will execute the targets defined by the Public Administration, which include:\n- Target 1: [Describe target, e.g., daily care of 50 children].\n- Target 2: [Describe target, e.g., conducting 10 monthly workshops].\n\nClause Three - Financial Traceability (OPP):\nAny and all payments of expenses linked to this Agreement must be settled directly in the Transferegov.br platform by means of Partnership Payment Order (OPP), it being forbidden to transfer globally or withdraw cash to free-movement accounts.\n\nClause Four - Fiscal Regularity:\nThe partner CSO obliges itself to maintain, during the entire validity of the partnership, the regularity of its RFB, FGTS, and CNDT certificates.\n\nLocation/UF, date.\n\n__________________________          __________________________\nPUBLIC MANAGER                      CSO DIRECTOR`
      },
      {
        id: 'act',
        title: 'Technical Cooperation Agreement (ACT)',
        desc: 'Used to establish mutual cooperation of public interest without transfer of financial resources or donation of assets.',
        filename: 'template_technical_cooperation_agreement_act.txt',
        templateText: `TECHNICAL COOPERATION AGREEMENT (ACT) No. XX/202X\nPART A: [Ministry/Secretariat / Grantor Public Entity]\nPART B: [Adhering Subnational Entity / Co-participating CSO]\n\nClause One - Object:\nThis Technical Cooperation Agreement has as its object the mutual cooperation and exchange of knowledge, methodologies, technologies, and training between the parts, aiming at the assisted implementation of the Partnership Management Module and PNGI solutions.\n\nClause Two - Financial Resources:\nThis instrument does not involve any transfer of financial resources or donation of movable/immovable assets between the participants, running the expenses of personnel and technical support at the expense of the budget allocations of each organ.\n\nClause Four - Common Duties:\nThe parties commit to:\na) Designate interlocutors and coordinators of the partnership;\nb) Comply with the deadlines and work schedule defined jointly;\nc) Provide open data and statistics on the progress of goals at the local level.\n\nClause Five - Term of Validity:\nThis Cooperation Agreement will be valid for 24 (twenty-four) months counting from the date of its signature, and may be extended by Addendum.\n\nLocation/UF, date.\n\n__________________________          __________________________\nPART A AUTHORITY                    PART B AUTHORITY`
      }
    ]
  },
  steps: {
    title: 'Partnerships Operational Lifecycle (MROSC)',
    desc: 'Understand the complete management flow of a voluntary partnership in the federal model of control and transparency.',
    phase: 'Phase',
    keyActionLabel: 'Key Phase Action:',
    tipLabel: 'Practical Tip:',
    lifecycle: [
      {
        number: '01',
        title: 'Planning and Notice',
        desc: 'Initial phase where the Public Administration plans the partnership, details the expected physical targets, and publishes the Public Call Notice based on standard AGU drafts.',
        keyAction: 'Publication of Selection Notice',
        tips: 'Define clear and measurable physical goals in the notice to simplify final accountability.'
      },
      {
        number: '02',
        title: 'Selection and Judgment',
        desc: 'CSOs submit proposals and work plans. The selection committee audits the minimum CNPJ existence of the CSO (1 year municipal, 2 state, 3 federal) and RFB, CRF, and CNDT certificates.',
        keyAction: 'CSO Qualification and Work Plan approval',
        tips: 'Use the Admissibility Checklist to audit documentation quickly before the judgment.'
      },
      {
        number: '03',
        title: 'Celebration',
        desc: 'Legal formalization of the Promotion or Collaboration Agreement. The Transferegov.br system automatically opens an exclusive bank account to manage resources at the official bank.',
        keyAction: 'Electronic Signature and Account Opening',
        tips: 'The partnership account is blocked for common withdrawals, accepting only electronic payment orders.'
      },
      {
        number: '04',
        title: 'Execution and Monitoring',
        desc: 'The CSO executes the project and pays suppliers directly through the system via Partnership Payment Order (OPP). Works are monitored by georeferenced photos via Cidadãogov.br.',
        keyAction: 'Payments via OPP and Works Photos',
        tips: 'The OPP guarantees that the resource leaves the partnership account directly to the final supplier, complying with ADPF 854.'
      },
      {
        number: '05',
        title: 'Accountability (Prestação de Contas)',
        desc: 'The CSO submits the Object Execution Report proving the physical delivery of targets. If goals are met, financial accountability is simplified under Ordinance 424/2016.',
        keyAction: 'Validation of Object Execution Report',
        tips: 'If there are unrelated expenses or deviations from the purpose, the disallowed costs calculator applies.'
      }
    ]
  },
  simulator: {
    title: 'Regulatory Transition & PNGI Eligibility Simulator',
    desc: 'Identify deadlines and specific compliance steps for the rollout of the Partnership Management Module in your federated entity.',
    labelEntityType: 'Federated Entity Type',
    entityTypes: {
      state: 'State / Federal District',
      capital: 'State Capital',
      municipality: 'Municipality'
    },
    labelPopulation: 'Estimated Population (Inhabitants)',
    labelAct: 'Does it have an active Cooperation ACT with MGI?',
    labelUf: 'Federated Unit (State)',
    btnDownloadRoadmap: 'Download Roadmap in PDF',
    apiTitle: 'Quick Import via Partnerships Network API',
    apiDesc: 'Enter the CNPJ or SIAFI code of the Federated Entity to automatically load actual information from the Partnerships Network.',
    apiPlaceholder: 'E.g.: 13.927.801/0001-49 (Bahia CNPJ)',
    btnApiSearch: 'Validate and Import Entity',
    apiSourceManual: 'MANUAL FILLING',
    apiSourceValidated: 'VALIDATED VIA API/SIAFI',
    populationText: 'Inhabitants',
    eligiblePngi: 'Eligible to General PNGI:',
    phase: 'Rollout Phase:',
    date: 'Transition Deadline Date:',
    kitRecommended: 'Recommended Transition Kit:',
    checklistTitle: 'Recommended Transition Checklist:',
    resultEligibleYes: 'YES (Eligible to the full PNGI catalog)',
    resultEligibleNo: 'NO (Restricted to Partnership Module obligations under ADPF 854)',
    btnNextStep: 'Next Step',
    btnPrevStep: 'Back',
    btnRedo: 'Redo Diagnosis',
    stepLabel: 'Step',
    readinessLabel: 'Adhesion Readiness',
    readinessStatusHigh: 'High Readiness (General Flow)',
    readinessStatusMed: 'Medium Readiness (Support Required)',
    readinessStatusLow: 'Critical Adhesion (High Priority)',
  },
  worksMap: {
    title: 'Works Map and Georeferenced Resource Transparency',
    desc: 'Interactive demonstration of physical monitoring of works. Local inspectors upload georeferenced photos to validate the release of resources.',
    labelSearch: 'Search works by SIAFI or CSO...',
    progress: 'Physical Progress:',
    beneficiary: 'Final Beneficiary:',
    cost: 'Partnership Value:',
    updated: 'Last Update:',
    data: [
      {
        id: 'obra-01',
        name: 'Construction of 24h Emergency Care Unit - UPA',
        siafi: '883902',
        value: 'R$ 2,450,000.00',
        osc: 'Institute of Health and Community Assistance (ISAC)',
        beneficiary: 'Industrial Neighborhood Residents',
        lat: '-12.9714',
        lng: '-38.5014',
        status: 'In Progress',
        progress: 68,
        timestamp: '10/07/2026 10:14:40',
        x: '35%',
        y: '45%'
      },
      {
        id: 'obra-02',
        name: 'Reform and Expansion of Municipal Inclusivity Preschool "Sementes da Inclusão"',
        siafi: '772911',
        value: 'R$ 890,000.00',
        osc: 'Viver Bem Organization',
        beneficiary: '120 preschool children',
        lat: '-12.9814',
        lng: '-38.5114',
        status: 'Completed',
        progress: 100,
        timestamp: '09/07/2026 15:30:12',
        x: '65%',
        y: '25%'
      },
      {
        id: 'obra-03',
        name: 'Implementation of Vila Solidária Sports and Social Complex',
        siafi: '556100',
        value: 'R$ 1,620,000.00',
        osc: 'Metropolitan Sports and Cultural League',
        beneficiary: 'Youth and adolescents at social risk',
        lat: '-12.9614',
        lng: '-38.4914',
        status: 'Delayed',
        progress: 32,
        timestamp: '08/07/2026 08:45:00',
        x: '48%',
        y: '70%'
      }
    ]
  },
  checklistSection: {
    title: 'Partnerships Quick Admissibility Auditing',
    desc: 'Simulate the prior compliance of a Civil Society Organization (CSO) before signing partnerships under the MROSC regime.',
    helpText: 'Select the requirements met to audit the partnership risk level:',
    items: {
      cnpj: 'Active CNPJ for at least 1 year (Municipal), 2 years (State), or 3 years (Federal)',
      rfb: 'Active Joint RFB/PGFN Certificate (Federal Fiscal Regularity)',
      crf: 'Active FGTS Regularity Certificate (CRF)',
      cndt: 'Active Negative Certificate of Labor Debits (CNDT)',
      capTec: 'Proof of technical capacity or related prior experience',
      fichaLimpa: 'Clean Record Declaration (absence of ethical/legal impediments of directors)'
    },
    resultSuccess: 'CSO with Full Admissibility: Low Risk of Audit Objections by TCU!',
    resultWarning: 'Warning: Missing mandatory requirements constitute a legal obstacle for celebration and raise regulatory risk.'
  },
  contact: {
    title: 'Technical Support & Network Articulation',
    desc: 'Request additional clarifications or schedule bilateral support meetings for the operational transition with the DTPAR/SEGES team.',
    name: 'Full Name / Role',
    city: 'Federated Entity / City',
    email: 'Institutional Email',
    message: 'Support Request Description',
    btnSubmit: 'Submit Support Request',
    successAlert: 'Support request registered successfully! The Partnerships Network support team will contact you within 48 business hours.'
  },
  antigravity: {
    title: 'Antigravity Agent Context Integration',
    desc: 'This panel exposes the operational specification used by autonomous agents to calibrate local auditing and regulatory compliance tools.',
    btnViewSpec: 'View Agent Specification',
    btnHideSpec: 'Hide Specification',
    btnCopySpec: 'Copy Configuration JSON',
    btnCopiedSpec: 'Copied to Clipboard!',
    btnSync: 'Sync Compliance Policies',
    syncing: 'Syncing...',
    synced: 'Successfully Synced!'
  },
  aiChat: {
    title: 'Cognitive Support & Guidelines Center',
    desc: 'Chat with the AI SGP-Compliance Advisor. Clear your doubts about the new Transferegov flow, rollout timelines, ADPF 854, and standard drafts.',
    placeholder: 'Ask about dual qualification, deadlines, ADPF 854, or TCU rules...',
    btnSend: 'Send',
    greeting: 'Hello! I am the **SGP-Advisor AI**. I am here to clarify your doubts about the adhesion to the **National Management and Innovation Program (PNGI)** and the implementation of the **Partnership Management Module (ADPF 854)** in Transferegov.br. How can I help your federated entity today?',
    communicationError: 'Sorry, I had a communication problem with the technical server. Please try sending your question again.',
    questions: [
      "What is 'Dual Qualification' in Transferegov.br?",
      "How does the STF ADPF 854 impact my municipality?",
      "What is the Partnership Payment Order (OPP)?",
      "How does the Implementation Kit work for small municipalities?",
      "Which states are eligible for the July/2026 pilot?"
    ],
    bannerTitle: 'Have questions about Adhesion, National Integration, or Partnership Management in Transferegov?',
    bannerDesc: 'Our Intelligent Advisor is available in the lateral panel. Ask questions about systemic federative transition, PNGI guidelines, covenants usage, OPP, and partnership compliance.',
    bannerBtn: 'Open AI Advisor'
  },
  timeline: {
    title: 'Official Transition & Rollout Schedule',
    desc: 'Evolutionary timeline of national federative implementation established by SEGES/MGI Ordinance No. 3,248/2026.',
    statusCompleted: 'Completed',
    statusInProgress: 'In Progress',
    statusToExecute: 'To Execute',
    stepDetails: 'Step Details',
    mandatoryActions: 'Mandatory Actions',
    data: [
      {
        date: 'March/2026',
        title: 'Articulation & Webinars',
        desc: 'National launch of procedural guidelines, educational materials, and start of training webinars for public managers nationwide.',
        status: 'Completed',
        details: 'Availability of the first knowledge base, detailing the new flows for accountability, georeferencing, and rules of the new Partnership Module.'
      },
      {
        date: 'June/2026',
        title: 'Call for Requests & AGU Models',
        desc: 'Opening of formal request submission in the Partnerships Network. Dissemination of standardized legal templates by the Office of the Attorney General of the Union (AGU).',
        status: 'Completed',
        details: 'Federated entities begin sending expression of interest through the Partnerships Network portal (Front Door).'
      },
      {
        date: 'July/2026',
        title: 'Pilot Phase (Active ACT)',
        desc: 'Start of assisted implementation in the 8 pioneer states with active Technical Cooperation Agreements.',
        status: 'In Progress',
        details: 'States participating in the Pilot: Acre (AC), Alagoas (AL), Amapá (AP), Bahia (BA), Rondônia (RO), Rio Grande do Norte (RN), Roraima (RR), and Tocantins (TO).'
      },
      {
        date: 'October/2026',
        title: 'Expansion - Other States',
        desc: 'Full rollout of the Partnership Management Module to the remaining states and the Federal District (DF) not included in the pilot.',
        status: 'To Execute',
        details: 'Crucial phase to ensure national coverage of state control over their own transfers using the unified platform.'
      },
      {
        date: 'January/2027',
        title: 'Brazilian Capitals',
        desc: 'Focused direction on state capitals, aiming at the alignment of high performance metrics, BI, and refined active transparency.',
        status: 'To Execute',
        details: 'Advanced systemic integrations and availability of customized dashboards for large urban centers.'
      },
      {
        date: 'April/2027 to March/2028',
        title: 'Municipality Scaling',
        desc: 'Progressive and scaled adoption for all Brazilian municipalities, segmented by population ranges in a sustainable way.',
        status: 'To Execute',
        details: 'Deadlines from Ordinance No. 3,248/2026: 1) Apr/2027: Municipalities > 1M pop. | 2) Jul/2027: Municipalities > 500k pop. | 3) Oct/2027: Municipalities > 200k pop. | 4) Jan/2028: Municipalities > 100k pop. | 5) Mar/2028: Other municipalities (Simplified Kits).'
      }
    ]
  },
  successCases: {
    title: 'Success Cases in Management & Transparency',
    desc: 'Discover state initiatives that optimized the application of resources and are a reference in the Partnerships Network.',
    badgeLogistics: 'Logistics and Assets',
    badgeGovernance: 'Strategic Management',
    badgeLand: 'Land Regularization',
    badgePeople: 'Valuing People',
    data: [
      {
        title: 'Property Accreditation',
        state: 'Bahia (BA)',
        desc: 'Creation of an extremely agile and secure accreditation model for hiring evaluators of public properties, reducing process time by 75%.',
        badge: 'Logistics and Assets'
      },
      {
        title: 'GESPEN - Prison Management',
        state: 'National',
        desc: 'Innovative methodology for monitoring strategic data and targets in prison units, focusing on safety and human rights.',
        badge: 'Strategic Management'
      },
      {
        title: 'Paz no Campo (Peace in the Countryside)',
        state: 'Maranhão (MA)',
        desc: 'Initiative that integrates geographic technology to streamline land regularization processes for small farmers and sustainable settlements.',
        badge: 'Land Regularization'
      },
      {
        title: 'ESSE Generation',
        state: 'Espírito Santo (ES)',
        desc: 'Innovative program for valuing, reintegrating, and leveraging the accumulated knowledge of active public servants over 60 years old.',
        badge: 'Valuing People'
      }
    ]
  }
};
