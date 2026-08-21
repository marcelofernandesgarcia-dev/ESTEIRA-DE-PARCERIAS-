import { useState, useEffect, useRef } from 'react';
// Coordenadas simplificadas aproximadas dos polígonos dos estados do Brasil para Canvas 500x460
const BRAZIL_STATES_POLYGONS = [
  { uf: 'RR', name: 'Roraima', capital: 'Boa Vista', region: 'Norte', pilot: true, points: [[170,25], [210,25], [195,65], [160,70]] },
  { uf: 'AP', name: 'Amapá', capital: 'Macapá', region: 'Norte', pilot: true, points: [[270,40], [300,55], [290,75], [260,65]] },
  { uf: 'AM', name: 'Amazonas', capital: 'Manaus', region: 'Norte', pilot: false, points: [[60,75], [170,75], [195,120], [150,150], [90,140], [60,115]] },
  { uf: 'PA', name: 'Pará', capital: 'Belém', region: 'Norte', pilot: false, points: [[195,65], [290,75], [300,125], [250,140], [230,135], [195,120]] },
  { uf: 'AC', name: 'Acre', capital: 'Rio Branco', region: 'Norte', pilot: true, points: [[30,145], [90,140], [80,165], [40,160]] },
  { uf: 'RO', name: 'Rondônia', capital: 'Porto Velho', region: 'Norte', pilot: true, points: [[90,140], [150,150], [160,190], [110,190]] },
  { uf: 'TO', name: 'Tocantins', capital: 'Palmas', region: 'Norte', pilot: true, points: [[260,125], [290,125], [280,180], [250,180]] },
  
  { uf: 'MA', name: 'Maranhão', capital: 'São Luís', region: 'Nordeste', pilot: false, points: [[300,85], [335,95], [325,135], [300,125]] },
  { uf: 'PI', name: 'Piauí', capital: 'Teresina', region: 'Nordeste', pilot: false, points: [[335,95], [365,100], [355,150], [325,135]] },
  { uf: 'CE', name: 'Ceará', capital: 'Fortaleza', region: 'Nordeste', pilot: false, points: [[365,85], [400,90], [390,120], [370,115]] },
  { uf: 'RN', name: 'Rio Grande do Norte', capital: 'Natal', region: 'Nordeste', pilot: true, points: [[400,90], [435,95], [430,110], [405,105]] },
  { uf: 'PB', name: 'Paraíba', capital: 'João Pessoa', region: 'Nordeste', pilot: false, points: [[405,105], [435,110], [430,125], [400,120]] },
  { uf: 'PE', name: 'Pernambuco', capital: 'Recife', region: 'Nordeste', pilot: false, points: [[355,120], [430,125], [425,140], [350,135]] },
  { uf: 'AL', name: 'Alagoas', capital: 'Maceió', region: 'Nordeste', pilot: true, points: [[410,140], [425,140], [415,155], [405,150]] },
  { uf: 'SE', name: 'Sergipe', capital: 'Aracaju', region: 'Nordeste', pilot: false, points: [[400,150], [412,152], [405,165], [395,160]] },
  { uf: 'BA', name: 'Bahia', capital: 'Salvador', region: 'Nordeste', pilot: true, points: [[310,140], [395,140], [395,160], [380,190], [340,195], [320,165]] },

  { uf: 'MT', name: 'Mato Grosso', capital: 'Cuiabá', region: 'Centro-Oeste', pilot: false, points: [[160,150], [250,140], [240,205], [175,215]] },
  { uf: 'GO', name: 'Goiás', capital: 'Goiânia', region: 'Centro-Oeste', pilot: false, points: [[240,190], [280,190], [270,230], [230,220]] },
  { uf: 'DF', name: 'Distrito Federal', capital: 'Brasília', region: 'Centro-Oeste', pilot: false, points: [[255,200], [268,200], [268,212], [255,212]] },
  { uf: 'MS', name: 'Mato Grosso do Sul', capital: 'Campo Grande', region: 'Centro-Oeste', pilot: false, points: [[170,215], [225,215], [215,255], [160,245]] },

  { uf: 'MG', name: 'Minas Gerais', capital: 'Belo Horizonte', region: 'Sudeste', pilot: false, points: [[275,200], [330,195], [345,240], [290,250], [260,230]] },
  { uf: 'ES', name: 'Espírito Santo', capital: 'Vitória', region: 'Sudeste', pilot: false, points: [[345,225], [360,230], [350,250], [340,245]] },
  { uf: 'RJ', name: 'Rio de Janeiro', capital: 'Rio de Janeiro', region: 'Sudeste', pilot: false, points: [[315,250], [350,245], [340,260], [310,255]] },
  { uf: 'SP', name: 'São Paulo', capital: 'São Paulo', region: 'Sudeste', pilot: false, points: [[215,250], [285,250], [270,280], [205,270]] },

  { uf: 'PR', name: 'Paraná', capital: 'Curitiba', region: 'Sul', pilot: false, points: [[195,270], [250,275], [240,300], [185,290]] },
  { uf: 'SC', name: 'Santa Catarina', capital: 'Florianópolis', region: 'Sul', pilot: false, points: [[205,295], [250,300], [240,315], [195,310]] },
  { uf: 'RS', name: 'Rio Grande do Sul', capital: 'Porto Alegre', region: 'Sul', pilot: false, points: [[180,310], [240,315], [220,355], [165,345]] }
];

import { 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Calendar, 
  MapPin, 
  Users, 
  Code, 
  ChevronRight,
  ChevronDown, 
  Check, 
  Copy,
  Info, 
  Globe, 
  FileText, 
  FileImage, 
  ShieldAlert, 
  Download, 
  Building, 
  Zap, 
  BookOpen, 
  Smartphone,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Database,
  Search,
  MessageSquare,
  Sparkle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Captions,
  Eye,
  Maximize2,
  RotateCcw,
  Languages,
  Menu,
  X,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ptTranslations, enTranslations } from './locales';
import CentralEvolucao from './components/CentralEvolucao';
import SimuladorElegibilidade from './components/SimuladorElegibilidade';
import MapaRollout from './components/MapaRollout';
import { faqData, faqCategoryTranslations } from './data/faqData';
import { onSnapshotLogbook, addLogbookEntry, LogbookEntry } from './firebase';

// Types for Simulator
type EntityType = 'state' | 'capital' | 'municipality';

interface SimulatorOutput {
  eligiblePngi: boolean;
  rolloutPhase: string;
  rolloutDate: string;
  kitType: 'completo' | 'simplificado' | 'piloto';
  actionSteps: string[];
  description: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ROLLOUT_DATA = [
  {
    date: 'Março/2026',
    title: 'Articulação e Webinários',
    desc: 'Lançamento nacional das diretrizes processuais, materiais didáticos e início dos webinários de capacitação para gestores públicos de todo o país.',
    status: 'Concluído',
    details: 'Disponibilização da primeira base de conhecimento, detalhando os novos fluxos de prestação de contas, georreferenciamento e regras do novo Módulo de Parcerias.',
  },
  {
    date: 'Junho/2026',
    title: 'Abertura de Pedidos e Modelos AGU',
    desc: 'Habilitação da entrada de solicitações formais na Rede de Parcerias. Divulgação das minutas jurídicas padronizadas pela Advocacia-Geral da União (AGU).',
    status: 'Concluído',
    details: 'Entes federados iniciam o envio de manifestação de interesse por meio do portal Rede de Parcerias (Front Door).',
  },
  {
    date: 'Julho/2026',
    title: 'Fase Piloto (ACT Vigente)',
    desc: 'Início da implantação assistida nos 8 estados pioneiros com Acordos de Cooperação Técnica vigentes.',
    status: 'Em Andamento',
    details: 'Estados participantes do Piloto: Acre (AC), Alagoas (AL), Amapá (AP), Bahia (BA), Rondônia (RO), Rio Grande do Norte (RN), Roraima (RR) e Tocantins (TO).',
  },
  {
    date: 'Outubro/2026',
    title: 'Expansão - Demais Estados',
    desc: 'Rollout completo do Módulo de Gestão de Parcerias para as demais unidades da federação (Estados e DF) não inclusos no piloto.',
    status: 'A Executar',
    details: 'Fase crucial para garantir a cobertura nacional do controle estadual sobre as próprias transferências utilizando a plataforma unificada.',
  },
  {
    date: 'Janeiro/2027',
    title: 'Capitais Brasileiras',
    desc: 'Foco direcionado às capitais de estados, visando o alinhamento de métricas de alta performance, BI e transparência ativa refinada.',
    status: 'A Executar',
    details: 'Integrações sistêmicas avançadas e disponibilização de dashboards personalizados para os grandes centros urbanos.',
  },
  {
    date: 'Abril/2027 a Março/2028',
    title: 'Escalonamento de Municípios',
    desc: 'Adoção progressiva e escalonada para todos os municípios brasileiros, segmentados por faixas populacionais de forma sustentável.',
    status: 'A Executar',
    details: 'Prazos da Portaria nº 3.248/2026: 1) Abr/2027: Municípios > 1M hab. | 2) Jul/2027: Municípios > 500k hab. | 3) Out/2027: Municípios > 200k hab. | 4) Jan/2028: Municípios > 100k hab. | 5) Mar/2028: Demais municípios (Kits Simplificados).',
  }
];

const getSuccessCases = (lang: 'pt' | 'en') => {
  if (lang === 'pt') {
    return [
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
    ];
  } else {
    return [
      {
        title: 'Real Estate Accreditation',
        state: 'Bahia (BA)',
        desc: 'Creation of an extremely agile and secure accreditation model for hiring public real estate appraisers, reducing process time by 75%.',
        badge: 'Logistics and Assets'
      },
      {
        title: 'GESPEN - Prison Management',
        state: 'National',
        desc: 'Innovative methodology for tracking strategic data and monitoring goals in prison units, focusing on safety and human rights.',
        badge: 'Strategic Management'
      },
      {
        title: 'Peace in the Countryside',
        state: 'Maranhão (MA)',
        desc: 'Initiative that integrates geographic technology to speed up land regularization processes for small farmers and sustainable settlements.',
        badge: 'Land Regularization'
      },
      {
        title: 'E.S.S.E Generation',
        state: 'Espírito Santo (ES)',
        desc: 'Innovative program for valuing, reintegrating, and leveraging the accumulated knowledge of active public servants over 60 years old.',
        badge: 'People Appreciation'
      }
    ];
  }
};

const getPreBakedQuestions = (lang: 'pt' | 'en') => {
  if (lang === 'pt') {
    return [
      "O que é a 'Dupla Habilitação' no Transferegov.br?",
      "Como a ADPF 854 do STF impacta meu município?",
      "O que é a Ordem de Pagamento da Parceria (OPP)?",
      "Como funciona o Kit de Implantação para pequenos municípios?",
      "Quais são os estados elegíveis para o piloto de Julho/2026?"
    ];
  } else {
    return [
      "What is 'Dual Qualification' in Transferegov.br?",
      "How does the STF's ADPF 854 impact my municipality?",
      "What is the Partnership Payment Order (OPP)?",
      "How does the Implementation Kit for small municipalities work?",
      "Which states are eligible for the July/2026 pilot?"
    ];
  }
};

// Content analyzed from user's PDF and video attachments
const VIDEO_SUBTITLES = [
  { start: 0, end: 12, text: "Abertura oficial do STF. Entendimento constitucional da ADPF 854.", desc: "Imagem externa do Supremo Tribunal Federal sob o céu de Brasília. Uma vinheta instrumental suave é executada." },
  { start: 12, end: 28, text: "Ministro Flávio Dino: A transparência e a rastreabilidade absoluta dos recursos públicos são pilares da democracia.", desc: "Plenário do STF. O Ministro Flávio Dino fala ao microfone, vestindo sua toga preta de ministro." },
  { start: 28, end: 44, text: "É imperioso que cada centavo repassado por emendas ou parcerias possa ser auditado pelo cidadão na ponta final.", desc: "Corte de câmera mostrando os demais ministros acompanhando o voto no plenário." },
  { start: 44, end: 60, text: "O Ministério da Gestão e Inovação (MGI) fornecerá a tecnologia e a capacitação sem custos para estados e municípios.", desc: "Gráfico explicativo na tela detalha as secretarias do MGI unidas no programa de suporte." },
  { start: 60, end: 80, text: "Com a Dupla Habilitação no Transferegov e a Ordem de Pagamento da Parceria (OPP), o controle financeiro será total.", desc: "Captura de tela simulada da interface do Transferegov com as opções de duplo repasse ativas." },
  { start: 80, end: 95, text: "Imagens georreferenciadas e vistorias fotográficas virtuais darão segurança jurídica aos fiscais e gestores de obras.", desc: "Foto aérea de um canteiro de obras com marcações geométricas de GPS e coordenadas sobrepostas." },
  { start: 95, end: 110, text: "A Rede de Parcerias está de portas abertas. Acesse o Front Door e qualifique seus servidores na Escola Virtual de Governo.", desc: "Imagem do portal de login da Rede de Parcerias e logotipo da EV.G/ENAP." },
  { start: 110, end: 120, text: "Unidos pelo pacto federativo, garantindo eficiência, controle e integridade na gestão pública. Governo Federal do Brasil.", desc: "A vinheta encerra com a assinatura visual do Ministério da Gestão e Inovação e as cores da bandeira nacional." }
];

const PDF_CHAPTERS = [
  {
    id: 'intro',
    title: '1. Fundamentação Jurídica (ADPF 854)',
    short: 'Legislação & STF',
    content: `A **Arguição de Descumprimento de Preceito Fundamental (ADPF) 854**, sob relatoria do **Ministro Flávio Dino**, consolidou a obrigatoriedade da rastreabilidade total nas transferências públicas.

### Principais Marcos Legais:
- **Eficácia Erga Omnes:** Aplicação compulsória a todos os poderes e esferas administrativas (federal, estadual, distrital e municipal).
- **Rastreabilidade Ponta a Ponta:** Todo recurso público transferido deve ter seu beneficiário final identificado, eliminando as "emendas invisíveis".
- **Pacto de Cooperação:** O Ministério da Gestão e da Inovação em Serviços Públicos (MGI) assume o papel de centralizador tecnológico e de fomento para capacitação procedimental.`,
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
    content: `O **Modelo Federal de Transparência e Rastreabilidade** baseia-se na modernização do **Transferegov.br** e na introdução do módulo de **Dupla Habilitação**:

### Ferramentas de Controle Ativo:
- **Dupla Habilitação:** Permite que o ente municipal ou estadual atue como repassador de seus recursos orçamentários próprios utilizando a plataforma federal.
- **Ordem de Pagamento da Parceria (OPP):** Garante a quitação de despesas direto na conta bancária específica do fornecedor final.
- **Georreferenciamento de Obras:** Exigência de comprovação visual (fotos por aplicativo) para cada boletim de medição liberado.
- **Painéis BI (Monitoragov.br):** Dashboards de auditoria para controle interno e tribunais de contas.`,
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
    content: `Para garantir a conformidade imediata com a ordem do STF, os entes federados devem seguir um roteiro integrado de 3 etapas fundamentais:

### Passos de Adesão:
1. **Manifestação de Interesse (Front Door):** O ente acessa o portal da Rede de Parcerias e registra o pedido de integração sistêmica.
2. **Diagnóstico e Planejamento:** O sistema avalia o porte do ente e define se utilizará o **Kit Simplificado** ou a **Integração via API (Conecta Gov.br)**.
3. **Formalização do Termo:** Assinatura do Acordo de Cooperação Técnica (ACT) e parametrização dos perfis de gestores na plataforma.`,
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
    content: `A transição sistêmica exige o preparo técnico do funcionalismo público subnacional, que é garantido pelas estruturas integradas de ensino governamental.

### Estratégia de Fortalecimento:
- **Escola Nacional de Administração Pública (ENAP):** Workshops presenciais e oficinas regionais estruturadas sob o programa "ENAP Aqui".
- **Escola Virtual de Governo (EV.G):** Trilhas formativas virtuais gratuitas com emissão de certificado imediato para gestão de parcerias e controle interno.
- **Rede de Parcerias:** Fórum permanente de governança colaborativa com mais de 280 parceiros institucionais para troca de experiências bem-sucedidas.`,
    stats: [
      { label: 'Plataforma Virtual', value: 'EV.G' },
      { label: 'Parceiros Institucionais', value: '+280 Órgãos' },
      { label: 'Certificação', value: 'Gratuita e Imediata' }
    ]
  }
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const LEGISLATIONS_DATA = [
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
];

const DOC_TEMPLATES_DATA = [
  {
    id: 'edital',
    title: 'Edital de Chamamento Público',
    desc: 'Utilizado para realizar a seleção pública e garantir igualdade de condições para as OSCs interessadas em propor parceria.',
    filename: 'modelo_edital_chamamento_publico.txt',
    templateText: `EDITAL DE CHAMAMENTO PUBLICO NE XX/202X
PROCESSO ADMINISTRATIVO NE XXXXXXX/202X
ORGANISMO DIRETOR: [Nome da Secretaria ou Ente Municipal/Estadual]

1. OBJETO
Constitui objeto do presente Edital a seleção de propostas apresentadas por Organizacoes da Sociedade Civil (OSCs) para a execucao de [descrever resumidamente o objeto/finalidade da parceria, ex: programa esportivo comunitario].

2. REQUISITOS DE PARTICIPACAO
Poderao participar deste Chamamento as OSCs que cumprirem as exigencias da Lei ne 13.019/2014, incluindo:
a) Tempo minimo de existencia ativa comprovada pelo CNPJ de no minimo:
   - 1 (um) ano, no âmbito de parcerias com o Municipio;
   - 2 (dois) anos, no âmbito de parcerias com o Estado/DF;
   - 3 (tres) anos, no âmbito de parcerias com a Uniao.
b) Apresentacao de Certidao de Regularidade Fiscal da Receita Federal (RFB).
c) Apresentacao de Certificado de Regularidade do FGTS (CRF).
d) Apresentacao de Certidao Negativa de Debitos Trabalhistas (CNDT).
e) Declaracao de Ficha Limpa dos dirigentes da OSC (ausencia de condenacoes por improbidade ou crimes publicos).

3. DA DOTACAO ORCAMENTARIA
Os recursos financeiros destinados a execucao das parcerias selecionadas somam o valor total de R$ XXXXXXX,XX (descrever por extenso), correndo por conta da dotacao orcamentaria ne XXXXXXXXXXXXXXXXXXXXXX.

4. DO PLANO DE TRABALHO
A proposta de plano de trabalho apresentada pela OSC devera demonstrar nexo causal claro, contendo:
- Descricao da realidade que servira de objeto da parceria;
- Metas a serem atingidas e atividades de execucao;
- Cronograma de desembolso financeiro;
- Previsao de receitas e despesas detalhadas.

Local/UF, data de publicacao.

__________________________________
AUTORIDADE COMPETENTE / GESTOR`
  },
  {
    id: 'fomento',
    title: 'Termo de Fomento (MROSC)',
    desc: 'Instrumento para formalizar parcerias com transferencia de recursos cujos projetos foram propostos e desenhados pelas OSCs.',
    filename: 'modelo_termo_de_fomento_mrosc.txt',
    templateText: `TERMO DE FOMENTO NE XX/202X
PROCESSO SEI NE XXXXXXXXX/202X
CONCEDENTE: [Nome do Ente Publico Repassador / Secretaria]
CONVENENTE: [Nome da Organizacao da Sociedade Civil - OSC]

Clausula Primeira - Do Objeto:
O presente Termo de Fomento tem por objeto a concessao de apoio financeiro publico para execucao do projeto "[Nome do Projeto da OSC]", de acordo com o plano de trabalho aprovado, visando [descrever finalidade social].

Clausula Segunda - Dos Recursos Financeiros:
Para a execucao do objeto deste Termo, a CONCEDENTE repassara a CONVENENTE o valor de R$ XXXXXXX,XX (descrever por extenso), que sera depositado na conta bancaria exclusiva ne XXXXXX, Agencia XXXX do Banco [do Brasil/Caixa Economica Federal].
E1e Os rendimentos de aplicacoes financeiras deverao ser aplicados no objeto da parceria.
E2e Os pagamentos aos prestadores e fornecedores finais serao efetuados exclusivamente via Ordem de Pagamento da Parceria (OPP), diretamente nas contas dos destinatarios devidamente cadastrados.

Clausula Terceira - Do Tempo de Existencia da OSC:
A CONVENENTE declara cumprir o tempo minimo de existencia de CNPJ ativo exigido pelo art. 33 da Lei ne 13.019/2014, possuindo [X] anos de atividades ininterruptas.

Clausula Quarta - Do Monitoramento e Fiscalizacao:
A CONCEDENTE monitorara a parceria de forma continua, incluindo:
a) Vistorias por georreferenciamento fotografico para comprovar as metas de infraestrutura.
b) Auditoria digital dos pagamentos via Monitoragov.br.

Local/UF, data da assinatura.

__________________________          __________________________
AUTORIDADE PUBLICA                  REPRESENTANTE DA OSC`
  },
  {
    id: 'colabora',
    title: 'Termo de Colaboração',
    desc: 'Instrumento para formalizar parcerias com transferencia de recursos cujos projetos e metas foram idealizados pela propria Administracao Publica.',
    filename: 'modelo_termo_de_colaboracao_mrosc.txt',
    templateText: `TERMO DE COLABORACAO NE XX/202X
PROCESSO SEI NE XXXXXXXXX/202X
PARCEIRO PUBLICO: [Nome do Ente Publico / Secretaria]
PARCEIRO PRIVADO: [Nome da Organizacao da Sociedade Civil - OSC]

Clausula Primeira - Do Objeto:
Constitui objeto do presente Termo de Colaboracao a execucao conjunta do programa de interesse publico "[Nome do Programa Idealizado pelo Ente]", de acordo com as diretrizes e plano de trabalho pre-estabelecidos pelo PARCEIRO PUBLICO.

Clausula Segunda - Das Metas Fisicas:
A OSC executara as metas definidas pela Administracao Publica, que incluem:
- Meta 1: [Descrever meta, ex: atendimento diario de 50 criancas].
- Meta 2: [Descrever meta, ex: realizacao de 10 oficinas mensais].

Clausula Terceira - Da Rastreabilidade Financeira (OPP):
Todo e qualquer pagamento de despesas vinculadas a este Termo deve ser liquidado diretamente na plataforma do Transferegov.br por meio de Ordem de Pagamento da Parceria (OPP), restando vedada a transferencia global ou saques para contas de livre movimentacao.

Clausula Quarta - Da Regularidade Fiscal:
A OSC conveniada obriga-se a manter, durante toda a vigencia da parceria, a regularidade de suas certidoes RFB, FGTS e CNDT.

Local/UF, data.

__________________________          __________________________
GESTOR PUBLICO                      DIRETOR DA OSC`
  },
  {
    id: 'act',
    title: 'Acordo de Cooperação Técnica',
    desc: 'Utilizado para estabelecer cooperacao mutua de interesse publico sem transferencia de recursos financeiros ou doacao de bens.',
    filename: 'modelo_acordo_cooperacao_tecnica_act.txt',
    templateText: `ACORDO DE COOPERACAO TECNICA (ACT) NE XX/202X
PARTE A: [Ministerio/Secretaria / Ente Publico Concedente]
PARTE B: [Ente Subnacional Aderente / OSC Co-participante]

Clausula Primeira - Do Objeto:
O presente Acordo de Cooperacao Tecnica tem por objeto a mutua cooperacao e intercambio de conhecimentos, metodologias, tecnologias e capacitacoes entre as partes, visando a implantacao assistida do Modulo de Gestao de Parcerias e solucoes do PNGI.

Clausula Segunda - Dos Recursos Financeiros:
Este instrumento nao enseja qualquer repasse de recursos financeiros ou doacao de bens moveis/imoveis entre os participes, correndo as despesas de pessoal e suporte tecnico por conta das dotacoes orcamentarias proprias de cada orgao.

Clausula Quarta - Das Atribuições Comuns:
As partes comprometem-se a:
a) Designar interlocutores e coordenadores da parceria;
b) Cumprir os prazos e cronograma de trabalho definidos conjuntamente;
c) Fornecer dados abertos e estatisticas sobre o andamento das metas no âmbito local.

Clausula Quinta - Do Prazo de Vigência:
O presente Acordo de Cooperacao vigorara pelo prazo de 24 (vinte e quatro) meses a contar da data de sua assinatura, podendo ser prorrogado por Termo Aditivo.

Local/UF, data.

__________________________          __________________________
AUTORIDADE PARTE A                  AUTORIDADE PARTE B`
  }
];

const LIFECYCLE_STEPS_DATA = [
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
];

export default function App() {
  // Language State
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const t = language === 'pt' ? ptTranslations : enTranslations;

  // Sidebar Mobile State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Simulator State
  const [entityType, setEntityType] = useState<EntityType>('municipality');
  const [population, setPopulation] = useState<number>(150000);
  const [hasAct, setHasAct] = useState<boolean>(false);
  const [selectedUf, setSelectedUf] = useState<string>('SP');
  const [simOutput, setSimOutput] = useState<SimulatorOutput | null>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: 'Olá! Sou o **SGP-Orientador IA**. Estou aqui para esclarecer suas dúvidas sobre a adesão ao **Programa Nacional de Gestão e Inovação (PNGI)** e a implantação do **Módulo de Gestão de Parcerias (ADPF 854)** no Transferegov.br. Como posso ajudar seu ente federado hoje?' 
    }
  ]);

  // Update initial message on language change if it has not been interactive yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ role: 'assistant', content: t.aiChat.greeting }]);
    }
  }, [language]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // UI States
  const [activeTab, setActiveTab] = useState<'tech' | 'pngi'>('tech');
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(2); // Start on pilot (Julho/2026)

  // Antigravity Integration Panel States
  const [showAntigravityJson, setShowAntigravityJson] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success'>('idle');

  // User Profile Simulation
  const [user, setUser] = useState({ email: 'marcelofernandesgarcia@gmail.com' });
  const authorizedEmails = [
    'marcelofernandesgarcia@gmail.com',
    'vitor.cesar@mgi.gov.br',
    'nayara.anjos@mgi.gov.br',
    'fernando.henrique@mgi.gov.br',
    'lili.araujo@mgi.gov.br'
  ];
  const canRegister = authorizedEmails.includes(user.email);
  const isMarcelo = user.email === 'marcelofernandesgarcia@gmail.com';

  // Sidebar Menu Selection State
  const [activeMenuSection, setActiveMenuSection] = useState<string>('gestao-parcerias');

  // Evolution Items
  const [evolutionItems, setEvolutionItems] = useState([
    {
      id: 'simulador_elegibilidade',
      namePt: '1. Simulador de Transição',
      nameEn: '1. Transition Simulator',
      descPt: 'Calcula dinamicamente a data e fases de rollout com base na população e ACT do ente.',
      descEn: 'Dynamically calculates rollout date and phases based on population and entity ACT.',
      status: 'APPROVED',
    },
    {
      id: 'assistente_cognitivo',
      namePt: '2. Chat Cognitivo (IA)',
      nameEn: '2. Cognitive Chat (AI)',
      descPt: 'Central de dúvidas procedimentais integrada ao modelo de linguagem de ponta do Gemini.',
      descEn: 'Procedural doubt center integrated with the cutting-edge Gemini language model.',
      status: 'APPROVED',
    },
    {
      id: 'exportador_pdf',
      namePt: '3. Exportação de Manuais',
      nameEn: '3. Manual Export',
      descPt: 'Geração em tempo real de PDF estruturado com jsPDF contendo cronograma e assinatura.',
      descEn: 'Real-time generation of structured PDF with jsPDF containing timeline and signature.',
      status: 'APPROVED',
    },
    {
      id: 'player_multimidia',
      namePt: '4. Player Multimídia eMAG',
      nameEn: '4. eMAG Multimedia Player',
      descPt: 'Vídeos locais ou simulados integrados com caixa de Libras e audiodescrição ativável.',
      descEn: 'Local or simulated videos integrated with Libras box and activatable audio description.',
      status: 'IN_PROGRESS',
    },
    {
      id: 'linha_tempo_interativa',
      namePt: '5. Linha do Tempo Cronológica',
      nameEn: '5. Chronological Timeline',
      descPt: 'Navegação e acompanhamento interativo das janelas e fases de transição oficial do MGI.',
      descEn: 'Interactive navigation and tracking of MGI official transition windows and phases.',
      status: 'APPROVED',
    },
    {
      id: 'catalogo_pngi',
      namePt: '6. Catálogo de Soluções PNGI',
      nameEn: '6. PNGI Solutions Catalog',
      descPt: 'Portfólio de ferramentas disponíveis para entes cooperados (CidadãoGov, BI, Modelos AGU).',
      descEn: 'Portfolio of tools available for cooperative entities (CidadãoGov, BI, AGU Models).',
      status: 'PENDING',
    }
  ]);

  // Execution modal state
  const [executingItem, setExecutingItem] = useState<any | null>(null);

  const executeInAntigravity = (item: any) => {
    setExecutingItem(item);
    console.log(`Executing ${item.id} in Antigravity for user ${user.email}`);
  };

  // Accessible Media & Documents States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLibrasActive, setIsLibrasActive] = useState<boolean>(false);
  const [isAudioDescActive, setIsAudioDescActive] = useState<boolean>(false);
  const [activePdfChapter, setActivePdfChapter] = useState<string>('intro');
  const [videoMode, setVideoMode] = useState<'official' | 'simulated' | 'local' | 'custom'>('simulated');
  const [localVideoSrc, setLocalVideoSrc] = useState<string>('/vídeo.mp4');
  const [customMediaFile, setCustomMediaFile] = useState<string>('video-promocional.mp4');
  const [customMediaInput, setCustomMediaInput] = useState<string>('');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [mediaFileList, setMediaFileList] = useState<string[]>([]);

  // New States for expanded sections
  const [selectedLawFilter, setSelectedLawFilter] = useState<'all' | 'const' | 'fed' | 'adm'>('all');
  const [activeLawId, setActiveLawId] = useState<string | null>(null);
  const [activeDocTab, setActiveDocTab] = useState<'edital' | 'fomento' | 'colabora' | 'act'>('edital');
  const [copiedDoc, setCopiedDoc] = useState<boolean>(false);
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');
  const [previewingDoc, setPreviewingDoc] = useState<any>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; title: string } | null>(null);
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [faqActiveCategory, setFaqActiveCategory] = useState<string>('Articulação e Mobilização');
  const [faqDisplayLimit, setFaqDisplayLimit] = useState<number>(10);
  const [faqOpenedId, setFaqOpenedId] = useState<string | null>(null);
  const [chatSuggestions, setChatSuggestions] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState<number>(0);
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>([]);
  const [newLogDesc, setNewLogDesc] = useState<string>('');
  const [newLogTipo, setNewLogTipo] = useState<'tecnico' | 'gerencial'>('tecnico');
  const [newLogTitulo, setNewLogTitulo] = useState<string>('');
  const [newLogParticipantes, setNewLogParticipantes] = useState<string>('');
  const [newLogDesafios, setNewLogDesafios] = useState<string>('');
  const [newLogLicoes, setNewLogLicoes] = useState<string>('');
  const [newLogIndicadores, setNewLogIndicadores] = useState<string>('');
  const [logFilterType, setLogFilterType] = useState<'all' | 'tecnico' | 'gerencial'>('all');
  const [logFilterAuthor, setLogFilterAuthor] = useState<string>('all');
  const [logSearchQuery, setLogSearchQuery] = useState<string>('');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isLogbookInfoOpen, setIsLogbookInfoOpen] = useState<boolean>(false);
  const [checkCnpj, setCheckCnpj] = useState<boolean>(false);
  const [checkRfb, setCheckRfb] = useState<boolean>(false);
  const [checkCrf, setCheckCrf] = useState<boolean>(false);
  const [checkCndt, setCheckCndt] = useState<boolean>(false);
  const [checkCapTec, setCheckCapTec] = useState<boolean>(false);
  const [checkFichaLimpa, setCheckFichaLimpa] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');
  const [contactCity, setContactCity] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const [mapFilter, setMapFilter] = useState<'all' | 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul' | 'pilot'>('all');
  // New States for API Search and Works Map
  const [cnpjSearchQuery, setCnpjSearchQuery] = useState<string>('');
  const [searchFeedback, setSearchFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [validatedViaApi, setValidatedViaApi] = useState<boolean>(false);
  const [selectedWorkId, setSelectedWorkId] = useState<string>('obra-01');

  const copyDocToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  const downloadDocAsTxt = (filename: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const MOCK_WORKS_DATA = [
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
      statusColor: 'bg-yellow-500 border-yellow-300',
      progress: 68,
      timestamp: '10/07/2026 10:14:40',
      x: '35%',
      y: '45%',
      imagePath: '/media/obra_upa_andamento.jpg'
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
      statusColor: 'bg-green-500 border-green-300',
      progress: 100,
      timestamp: '09/07/2026 15:30:12',
      x: '65%',
      y: '25%',
      imagePath: '/media/obra_creche_concluida.jpg'
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
      statusColor: 'bg-rose-500 border-rose-300',
      progress: 32,
      timestamp: '08/07/2026 08:45:00',
      x: '48%',
      y: '70%',
      imagePath: '/media/obra_quadra_atrasada.jpg'
    }
  ];

  const handleAddLogbookEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogDesc.trim()) return;
    await addLogbookEntry({
      autor: user.email,
      tipo: newLogTipo,
      descricao: newLogDesc,
      titulo: newLogTitulo,
      participantes: newLogParticipantes,
      desafios: newLogDesafios,
      licoes: newLogLicoes,
      indicadores: newLogIndicadores
    });
    setNewLogDesc('');
    setNewLogTitulo('');
    setNewLogParticipantes('');
    setNewLogDesafios('');
    setNewLogLicoes('');
    setNewLogIndicadores('');
  };

  const handleApiSearch = () => {
    setSearchFeedback(null);
    const queryClean = cnpjSearchQuery.replace(/\D/g, '').trim();
    
    const entes = [
      {
        cnpj: '04079547000178',
        siafi: '9701',
        type: 'state' as EntityType,
        uf: 'AC',
        pop: 900000,
        act: true,
        name: 'Estado do Acre (AC)'
      },
      {
        cnpj: '13927801000149',
        siafi: '3849',
        type: 'state' as EntityType,
        uf: 'BA',
        pop: 14000000,
        act: true,
        name: 'Estado da Bahia (BA)'
      },
      {
        cnpj: '46395000000139',
        siafi: '7107',
        type: 'capital' as EntityType,
        uf: 'SP',
        pop: 12200000,
        act: false,
        name: 'Município de São Paulo (SP)'
      },
      {
        cnpj: '13927801000150',
        siafi: '3349',
        type: 'capital' as EntityType,
        uf: 'BA',
        pop: 2900000,
        act: false,
        name: 'Município de Salvador (BA)'
      },
      {
        cnpj: '05182233000176',
        siafi: '0505',
        type: 'municipality' as EntityType,
        uf: 'PA',
        pop: 306000,
        act: false,
        name: 'Município de Santarém (PA)'
      },
      {
        cnpj: '16931393000143',
        siafi: '4931',
        type: 'municipality' as EntityType,
        uf: 'MG',
        pop: 74000,
        act: false,
        name: 'Município de Ouro Preto (MG)'
      }
    ];
    
    const matched = entes.find(e => e.cnpj === queryClean || e.siafi === queryClean || queryClean.includes(e.cnpj) || queryClean.includes(e.siafi));
    
    if (matched) {
      setEntityType(matched.type);
      setSelectedUf(matched.uf);
      setPopulation(matched.pop);
      setHasAct(matched.act);
      setValidatedViaApi(true);
      setSearchFeedback({
        success: true,
        message: `Sucesso: ${matched.name} importado via API da Rede de Parcerias!`
      });
    } else {
      setSearchFeedback({
        success: false,
        message: 'Ente não cadastrado na simulação local da API. Insira os parâmetros manualmente ou use CNPJ/SIAFI de teste.'
      });
    }
  };

  const activeSubtitle = VIDEO_SUBTITLES.find(sub => currentTime >= sub.start && currentTime < sub.end);

  // Listen to Project Logbook snapshots
  useEffect(() => {
    const unsubscribe = onSnapshotLogbook((list) => {
      setLogbookEntries(list);
    });
    return () => unsubscribe();
  }, []);

  // Listen to window scroll position for floating mascot wave and drift effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatically check if the local video is present and active
  useEffect(() => {
    fetch('/api/video-status')
      .then(res => res.json())
      .then(data => {
        if (data && data.exists) {
          setVideoMode('local');
          if (data.path) {
            setLocalVideoSrc(data.path);
          }
        } else {
          setVideoMode('simulated');
        }
      })
      .catch(() => {
        setVideoMode('simulated');
      });

    // Fetch dynamic list of media files in /media folder
    fetch('/api/media-files')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMediaFileList(data);
          if (data.length > 0) {
            const defaultVid = data.find(f => f.includes('Roteiro_MGI'));
            const defaultAud = data.find(f => f.includes('Transferegov_rastreia_cada_centavo'));
            if (defaultVid) {
              setCustomMediaFile(defaultVid);
            } else if (defaultAud) {
              setCustomMediaFile(defaultAud);
            } else {
              setCustomMediaFile(data[0]);
            }
          }
        }
      })
      .catch(err => console.error("Erro ao carregar lista de mídias:", err));
  }, []);

  const downloadReferenceManualPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const isPt = language === 'pt';

    const mgiText = isPt ? "MINISTÉRIO DA GESTÃO E DA INOVAÇÃO EM SERVIÇOS PÚBLICOS" : "MINISTRY OF MANAGEMENT AND INNOVATION IN PUBLIC SERVICES";
    const segesText = isPt ? "SECRETARIA DE GESTÃO E INOVAÇÃO - SEGES" : "SECRETARIAT OF MANAGEMENT AND INNOVATION - SEGES";
    const dtparText = isPt ? "DIRETORIA DE TRANSFERÊNCIAS E PARCERIAS DA UNIÃO - DTPAR" : "DIRECTORATE OF TRANSFERS AND PARTNERSHIPS OF THE UNION - DTPAR";
    const manualTitleText = isPt ? "Manual de Referência Técnica" : "Technical Reference Manual";
    const coverSub1 = isPt ? "MODELO FEDERAL DE TRANSPARÊNCIA" : "FEDERAL TRANSPARENCY MODEL";
    const coverSub2 = isPt ? "E RASTREABILIDADE (ADPF 854)" : "AND TRACEABILITY (ADPF 854)";
    const docSupportText = isPt ? "Documento de Apoio Técnico e Orientação Federativa" : "Technical Support and Federative Guidance Document";
    const recipientLabel = isPt ? "Ente Destinatário:" : "Recipient Entity:";
    const rolloutLabel = isPt ? "Nível de Rollout Recomendado:" : "Recommended Rollout Level:";
    
    const targetEntity = entityType === 'state' 
      ? (isPt ? `ESTADO DE ${selectedUf}` : `STATE OF ${selectedUf}`) 
      : entityType === 'capital' 
        ? (isPt ? `CAPITAL DO ESTADO` : `STATE CAPITAL`) 
        : (isPt ? `MUNICÍPIO COM ${population.toLocaleString('pt-BR')} HABITANTES` : `MUNICIPALITY WITH ${population.toLocaleString('en-US')} INHABITANTS`);

    const coverDesc = isPt 
      ? "Este manual consolida o plano de ação, as soluções tecnológicas e os marcos regulatórios para a implantação do Módulo de Gestão de Parcerias no Transferegov.br, em conformidade com o acórdão proferido pelo STF na ADPF 854."
      : "This manual consolidates the action plan, technological solutions, and regulatory milestones for the implementation of the Partnership Management Module in Transferegov.br, in compliance with the ruling issued by the STF in ADPF 854.";
    const specialEditionText = isPt ? "Edição Técnica Especial - Portal Rede de Parcerias" : "Special Technical Edition - Partnerships Network Portal";
    const generationDateLabel = isPt ? "Data de Geração:" : "Generation Date:";
    
    // Page 1: Cover
    // Deep blue background block
    doc.setFillColor(0, 31, 63);
    doc.rect(0, 0, pageWidth, 120, 'F');
    
    // Decorative Gold Line
    doc.setFillColor(197, 160, 89);
    doc.rect(0, 120, pageWidth, 6, 'F');
    
    // Institutional logo markings
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(mgiText, 20, 30);
    doc.text(segesText, 20, 37);
    doc.text(dtparText, 20, 44);
    
    doc.setFontSize(22);
    doc.text(manualTitleText, 20, 75);
    doc.setFontSize(18);
    doc.setTextColor(197, 160, 89);
    doc.text(coverSub1, 20, 88);
    doc.text(coverSub2, 20, 98);
    
    // Cover Details
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    doc.text(docSupportText, 20, 150);
    doc.setFont("helvetica", "bold");
    doc.text(`${recipientLabel} ${targetEntity}`, 20, 158);
    doc.text(`${rolloutLabel} ${simOutput?.rolloutPhase || 'Geral'}`, 20, 166);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const splitCoverDesc = doc.splitTextToSize(coverDesc, pageWidth - 40);
    doc.text(splitCoverDesc, 20, 185);
    
    doc.setFontSize(8.5);
    doc.setTextColor(130);
    doc.text(specialEditionText, 20, pageHeight - 35);
    doc.text(`${generationDateLabel} ${new Date().toLocaleDateString(isPt ? 'pt-BR' : 'en-US')} | SGP-Compliance`, 20, pageHeight - 28);
    
    // Page 2: Chapter 1 & 2
    doc.addPage();
    
    // Header
    doc.setFillColor(0, 31, 63);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    
    const headerTitle = isPt 
      ? "MODELO FEDERAL DE TRANSPARÊNCIA - GUIA PRÁTICO DA ADPF 854"
      : "FEDERAL TRANSPARENCY MODEL - ADPF 854 PRACTICAL GUIDE";
    doc.text(headerTitle, 20, 13);
    
    doc.setTextColor(0, 31, 63);
    doc.setFontSize(14);
    
    const cap1Title = isPt ? "1. Fundamentação Jurídica e Rastreabilidade Total" : "1. Legal Basis and Total Traceability";
    doc.text(cap1Title, 20, 38);
    doc.setDrawColor(197, 160, 89);
    doc.setLineWidth(0.8);
    doc.line(20, 42, 100, 42);
    
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50);
    
    const cap1Text = isPt
      ? "A Arguição de Descumprimento de Preceito Fundamental (ADPF) 854, sob relatoria do Ministro Flávio Dino no Supremo Tribunal Federal, estabeleceu que a transparência pública e a rastreabilidade absoluta dos recursos são obrigações constitucionais incontornáveis.\n\nTodos os recursos públicos descentralizados devem ser acompanhados com publicidade integral até o beneficiário final (fornecedores, subcontratados e prestadores de serviços na ponta). Em resposta, o Ministério da Gestão e Inovação (MGI) desenvolveu o Módulo de Parcerias, unificando a fiscalização federativa e fornecendo assistência técnica integral."
      : "The Claim of Non-Compliance with a Fundamental Precept (ADPF) 854, reported by Minister Flávio Dino in the Supreme Federal Court, established that public transparency and absolute traceability of resources are unavoidable constitutional obligations.\n\nAll decentralized public resources must be accompanied by full publicity until the final beneficiary (suppliers, subcontractors, and service providers at the end). In response, the Ministry of Management and Innovation (MGI) developed the Partnership Module, unifying federative supervision and providing comprehensive technical assistance.";
    const splitCap1 = doc.splitTextToSize(cap1Text, pageWidth - 40);
    doc.text(splitCap1, 20, 50);
    
    // Chapter 2
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 31, 63);
    const cap2Title = isPt ? "2. O Módulo de Parcerias (Dupla Habilitação)" : "2. The Partnership Module (Dual Qualification)";
    doc.text(cap2Title, 20, 120);
    doc.line(20, 124, 100, 124);
    
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50);
    
    const cap2Text = isPt
      ? "O escopo tecnológico principal centra-se na evolução sistêmica do Transferegov.br para permitir a 'Dupla Habilitação'. Tradicionalmente, o sistema gerenciava apenas os repasses federais concedidos aos estados e municípios.\n\nAgora, os entes subnacionais passam a dispor de contas de repassador, podendo gerir na plataforma federal seus próprios recursos e orçamentos locais. A Ordem de Pagamento da Parceria (OPP) vincula eletronicamente as movimentações a uma conta exclusiva, liberando recursos diretamente na conta de fornecedores previamente validados no cadastro federal."
      : "The main technological scope focuses on the systemic evolution of Transferegov.br to allow 'Dual Qualification'. Traditionally, the system only managed federal transfers granted to states and municipalities.\n\nNow, subnational entities have repasser accounts, enabling them to manage their own local resources and budgets on the federal platform. The Partnership Payment Order (OPP) electronically links movements to an exclusive account, releasing resources directly to the account of suppliers previously validated in the federal registry.";
    const splitCap2 = doc.splitTextToSize(cap2Text, pageWidth - 40);
    doc.text(splitCap2, 20, 132);
    
    // Custom recommendation box
    doc.setFillColor(245, 247, 250);
    doc.setDrawColor(200, 210, 225);
    doc.setLineWidth(0.5);
    doc.rect(20, 205, pageWidth - 40, 40, 'FD');
    
    doc.setTextColor(0, 51, 102);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const recomTitle = isPt ? "RECOMENDAÇÃO OPERACIONAL COMPLIANCE" : "COMPLIANCE OPERATIONAL RECOMMENDATION";
    doc.text(recomTitle, 25, 214);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(80);
    const recomText = isPt
      ? `Para o Ente Federativo (${targetEntity}), recomenda-se priorizar o cadastramento no portal Rede de Parcerias e treinar pelo menos três técnicos locais na Escola Virtual de Governo (EV.G) nas disciplinas de fiscalização e governança.`
      : `For the Federated Entity (${targetEntity}), it is recommended to prioritize registration in the Partnerships Network portal and train at least three local technicians in the Virtual School of Government (EV.G) in inspection and governance disciplines.`;
    const splitRecom = doc.splitTextToSize(recomText, pageWidth - 50);
    doc.text(splitRecom, 25, 222);
    
    // Page 3: Chapter 3 & 4
    doc.addPage();
    
    // Header
    doc.setFillColor(0, 31, 63);
    doc.rect(0, 0, pageWidth, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(headerTitle, 20, 13);
    
    doc.setTextColor(0, 31, 63);
    doc.setFontSize(14);
    const cap3Title = isPt ? "3. Plano de Ação Federativo e Roteiro" : "3. Federative Action Plan and Roadmap";
    doc.text(cap3Title, 20, 38);
    doc.setDrawColor(197, 160, 89);
    doc.setLineWidth(0.8);
    doc.line(20, 42, 100, 42);
    
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50);
    
    const cap3Text = isPt
      ? "A adesão e a transição operacional ocorrem em três fases integradas conduzidas pela SEGES/MGI:\n\n1. Manifestação de Interesse (Front Door): Envio de documentação inicial e designação de interlocutores técnicos locais.\n2. Planejamento e Diagnóstico Sistêmico: Avaliação se o município necessita de integração nativa de TI ou utilizará o Kit de Implantação Pronto.\n3. Pactuação e Homologação: Assinatura do Acordo de Cooperação Técnica (ACT) e ativação das credenciais na plataforma federal de parcerias."
      : "Adhesion and operational transition occur in three integrated phases led by SEGES/MGI:\n\n1. Manifestation of Interest (Front Door): Submission of initial documentation and designation of local technical focal points.\n2. Planning and Systemic Diagnosis: Evaluation of whether the municipality needs native IT integration or will use the Ready-to-Use Implementation Kit.\n3. Pact and Homologation: Signature of the Technical Cooperation Agreement (ACT) and activation of credentials on the federal partnership platform.";
    const splitCap3 = doc.splitTextToSize(cap3Text, pageWidth - 40);
    doc.text(splitCap3, 20, 50);
    
    // Chapter 4
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 31, 63);
    const cap4Title = isPt ? "4. Catálogo de Soluções e Capacitações Gratuitas" : "4. Solution Catalog and Free Training";
    doc.text(cap4Title, 20, 120);
    doc.line(20, 124, 100, 124);
    
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50);
    
    const cap4Text = isPt
      ? "O programa disponibiliza sem ônus aos entes subnacionais:\n\n- Obras Georreferenciadas: Acompanhamento fotográfico do andamento de obras pelo aplicativo Cidadãogov.br.\n- Painéis de BI: Dashboards completos para visualização ativa de repasses orçamentários, prazos de execução e metas.\n- Modelos Jurídicos da AGU: Minutas padrão e editais pré-aprovados pela AGU para reduzir riscos de questionamentos jurídicos.\n- Trilhas de Aprendizagem ENAP/EV.G: Cursos virtuais auto-instrucionais sobre o novo fluxo de convênios."
      : "The program provides at no cost to subnational entities:\n\n- Georeferenced Works: Photographic tracking of works progress through the Cidadãogov.br application.\n- BI Panels: Complete dashboards for active visualization of budget transfers, execution deadlines, and targets.\n- AGU Legal Models: Standard drafts and selection calls pre-approved by the AGU to reduce legal challenge risks.\n- ENAP/EV.G Learning Paths: Self-instructional virtual courses on the new covenant flow.";
    const splitCap4 = doc.splitTextToSize(cap4Text, pageWidth - 40);
    doc.text(splitCap4, 20, 132);
    
    // Table of Solution Catalog
    const tableHeaders = isPt 
      ? ['Código', 'Solução', 'Finalidade', 'Canal']
      : ['Code', 'Solution', 'Purpose', 'Channel'];
      
    const tableRows = isPt
      ? [
          ['SGP-01', 'Dupla Habilitação', 'Gerir recursos locais', 'Transferegov'],
          ['SGP-02', 'Ordem de Pagamento', 'Rastreabilidade financeira', 'OPP Bancária'],
          ['SGP-03', 'Georreferenciamento', 'Comprovação visual de obras', 'App Cidadãogov'],
          ['SGP-04', 'Minutas Padrão', 'Segurança e agilidade jurídica', 'Pareceres AGU']
        ]
      : [
          ['SGP-01', 'Dual Qualification', 'Manage local resources', 'Transferegov'],
          ['SGP-02', 'Payment Order', 'Financial traceability', 'OPP Bank Account'],
          ['SGP-03', 'Georeferencing', 'Visual proof of works', 'Cidadãogov App'],
          ['SGP-04', 'Standard Drafts', 'Legal security and agility', 'AGU Opinions']
        ];
    
    autoTable(doc, {
      startY: 195,
      head: [tableHeaders],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [0, 31, 63] },
      columnStyles: {
        0: { cellWidth: 20, fontStyle: 'bold', halign: 'center' },
        1: { cellWidth: 40, fontStyle: 'bold' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 35 }
      }
    });
    
    // Save
    doc.save(isPt ? `modelo_federal_transparencia_manual_${entityType}.pdf` : `federal_transparency_model_manual_${entityType}.pdf`);
  };

  const handleTimelineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to end of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Run simulation whenever parameters change
  useEffect(() => {
    runSimulation();
  }, [entityType, population, hasAct, selectedUf]);

  const runSimulation = () => {
    let eligiblePngi = false;
    let rolloutPhase = '';
    let rolloutDate = '';
    let kitType: 'completo' | 'simplificado' | 'piloto' = 'completo';
    let actionSteps: string[] = [];
    let description = '';

    // PNGI Eligibility (General PNGI is for states, capitals, or cities > 500k)
    if (entityType === 'state' || entityType === 'capital' || population >= 500000) {
      eligiblePngi = true;
    }

    if (entityType === 'state') {
      const pilotStates = ['AC', 'AL', 'AP', 'BA', 'RO', 'RN', 'RR', 'TO'];
      const isPilot = pilotStates.includes(selectedUf) || hasAct;
      
      if (isPilot) {
        rolloutPhase = 'Fase Piloto - Acordo de Cooperação Ativo';
        rolloutDate = 'Julho de 2026';
        kitType = 'piloto';
        description = `Seu Estado está classificado para a Fase Piloto do SGP. Por possuir ACT vigente ou pertencer à lista de Estados pioneiros, a disponibilização das ferramentas e o suporte técnico assistido iniciam-se de forma imediata em Julho/2026.`;
        actionSteps = [
          'Validar fluxo de testes da Dupla Habilitação junto à DTPAR/SEGES.',
          'Cadastrar operadores estaduais na Rede de Parcerias (Front Door).',
          'Acompanhar os webinários de capacitação técnica avançada.',
          'Iniciar o mapeamento orçamentário para vinculação com a OPP (Ordem de Pagamento da Parceria).'
        ];
      } else {
        rolloutPhase = 'Rollout Geral de Estados';
        rolloutDate = 'Outubro de 2026';
        kitType = 'completo';
        description = `Seu Estado participará da expansão geral em Outubro de 2026. A infraestrutura básica de rede está garantida e o treinamento de equipes ocorrerá no trimestre que antecede a liberação.`;
        actionSteps = [
          'Iniciar tratativas para formalização do Acordo de Cooperação Técnica (ACT).',
          'Designar os interlocutores locais responsáveis pela coordenação técnica junto ao MGI.',
          'Consolidar o inventário de parcerias vigentes com recursos próprios.'
        ];
      }
    } else if (entityType === 'capital') {
      rolloutPhase = 'Capitais Brasileiras';
      rolloutDate = 'Janeiro de 2027';
      kitType = 'completo';
      description = `Como capital de Estado, sua integração está planejada para Janeiro de 2027. O foco será na interoperabilidade de sistemas locais com o Transferegov.br e na estruturação de painéis de Business Intelligence (BI) para controle social.`;
      actionSteps = [
          'Analisar a viabilidade de integração sistêmica via APIs (Conecta Gov.br).',
          'Instaurar equipe local para capacitações na Escola Virtual de Governo (EV.G).',
          'Adotar as minutas e templates padrão disponibilizados pela AGU.'
      ];
    } else {
      // Municipality
      if (population >= 1000000) {
        rolloutPhase = 'Grandes Municípios (População > 1 Milhão)';
        rolloutDate = 'Abril de 2027';
        kitType = 'completo';
        description = `Seu município de grande porte inicia a internalização em Abril de 2027. Devido à alta complexidade orçamentária, será disponibilizada a Dupla Habilitação completa com suporte à integração sistêmica nativa via API.`;
        actionSteps = [
          'Preencher manifestação de interesse na plataforma Rede de Parcerias.',
          'Avaliar necessidade de adequação dos sistemas de contabilidade legados junto à TI local.',
          'Garantir reserva de recursos humanos para treinamento presencial (Enap Aqui).'
        ];
      } else if (population >= 500000) {
        rolloutPhase = 'Municípios de Médio-Grande Porte (500k a 1M)';
        rolloutDate = 'Julho de 2027';
        kitType = 'completo';
        description = `Município elegível tanto ao PNGI quanto ao Módulo de Parcerias (ADPF 854). Seu rollout está programado para Julho de 2027, usufruindo da transferência de tecnologia do MGI e capacitação continuada.`;
        actionSteps = [
          'Designar a Secretaria de Gestão/Finanças como ponto focal de articulação.',
          'Acompanhar a agenda de seminários técnicos virtuais organizados pelo DTPAR.',
          'Incentivar servidores locais a iniciarem cursos de gestão de parcerias na EV.G.'
        ];
      } else if (population >= 200000) {
        rolloutPhase = 'Municípios de Médio Porte (200k a 500k)';
        rolloutDate = 'Outubro de 2027';
        kitType = 'simplificado';
        description = `Conforme a Portaria SEGES/MGI nº 3.248/2026 (Art. 5º, VI), seu município participará do rollout em Outubro de 2027. Será fornecido o Kit de Implantação Simplificado para garantir conformidade imediata com a ADPF 854 do STF.`;
        actionSteps = [
          'Acompanhar comunicados oficiais do Sigpar para liberação do Kit Simplificado.',
          'Cadastrar interlocutores técnicos e gestores para treinamento virtual na EV.G.',
          'Ajustar regulamentos municipais internos para acolhimento do novo fluxo Transferegov.'
        ];
      } else if (population >= 100000) {
        rolloutPhase = 'Municípios de Médio-Pequeno Porte (100k a 200k)';
        rolloutDate = 'Janeiro de 2028';
        kitType = 'simplificado';
        description = `Conforme a Portaria SEGES/MGI nº 3.248/2026 (Art. 5º, VII), a transição do seu município iniciará em Janeiro de 2028. O foco é a capacitação remota e a governança local assistida.`;
        actionSteps = [
          'Cadastrar gestores locais nas trilhas formativas gratuitas da EV.G e Enap.',
          'Avaliar o inventário de parcerias locais para transição digital gradual.',
          'Preparar a documentação do representante legal e cadastro CNPJ do ente.'
        ];
      } else {
        rolloutPhase = 'Municípios de Pequeno Porte (Abaixo de 100k)';
        rolloutDate = 'Março de 2028';
        kitType = 'simplificado';
        description = `Conforme a Portaria SEGES/MGI nº 3.248/2026 (Art. 5º, VIII), seu município participará a partir de Março de 2028. Receberá o Kit Pronto com foco em usabilidade e fluxos padronizados de prestação de contas.`;
        actionSteps = [
          'Adotar o Kit de Implantação Rápida (sem necessidade de equipe ou servidores de TI locais).',
          'Cadastrar os gestores públicos locais para cursos e oficinas remotas da EV.G.',
          'Substituir processos físicos e manuais pelo trâmite digital integrado do Transferegov.'
        ];
      }
    }

    setSimOutput({
      eligiblePngi,
      rolloutPhase,
      rolloutDate,
      kitType,
      actionSteps,
      description
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || inputMessage;
    if (!queryText.trim() || isSending) return;

    const userMsg: ChatMessage = { role: 'user', content: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      // Build conversation history for server-side chat
      const contextMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: contextMessages, language })
      });

      if (!res.ok) {
        throw new Error("Erro ao obter resposta do servidor.");
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      setChatSuggestions(data.suggestions || []);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: t.aiChat.communicationError
      }]);
    } finally {
      setIsSending(false);
    }
  };

  const generateRoadmapPdf = () => {
    if (!simOutput) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const isPt = language === 'pt';

    const mgiText = isPt ? "SGP | MINISTÉRIO DA GESTÃO E DA INOVAÇÃO" : "SGP | MINISTRY OF MANAGEMENT AND INNOVATION";
    const docSupportText = isPt ? "Roteiro Técnico Personalizado - Adesão e Internalização de Parcerias" : "Personalized Technical Roadmap - Adhesion and Internalization of Partnerships";
    const dateLabel = isPt ? "Data de Emissão:" : "Issue Date:";
    
    const labelEnte = entityType === 'state' 
      ? (isPt ? `Estado (${selectedUf})` : `State (${selectedUf})`)
      : entityType === 'capital' 
        ? (isPt ? 'Capital de Estado' : 'State Capital') 
        : (isPt ? 'Município' : 'Municipality');
        
    const diagTitle = isPt ? `DIAGNÓSTICO: ${labelEnte.toUpperCase()}` : `DIAGNOSIS: ${labelEnte.toUpperCase()}`;
    const apiLabel = validatedViaApi 
      ? (isPt ? 'VALIDADO VIA API/SIAFI' : 'VALIDATED VIA API/SIAFI') 
      : (isPt ? 'PREENCHIMENTO MANUAL' : 'MANUAL FILLING');
      
    const popText = isPt 
      ? `População: ${population.toLocaleString('pt-BR')} hab. | Elegível PNGI: ${simOutput.eligiblePngi ? 'SIM' : 'NÃO (ADPF 854)'} | Fonte: ${apiLabel}`
      : `Population: ${population.toLocaleString('en-US')} inhab. | PNGI Eligible: ${simOutput.eligiblePngi ? 'YES' : 'NO (ADPF 854)'} | Source: ${apiLabel}`;
      
    const section1Title = isPt ? "1. Fase Planejada de Rollout" : "1. Planned Rollout Phase";
    const phaseLabel = isPt ? "Fase de Destinação:" : "Destination Phase:";
    const dateLabelSim = isPt ? "Data Prevista de Início:" : "Expected Start Date:";
    const kitLabel = isPt ? "Modelo de Kit Recomendado:" : "Recommended Kit Model:";
    const kitVal = isPt 
      ? `Kit de Implantação ${simOutput.kitType.toUpperCase()}`
      : `Implementation Kit ${simOutput.kitType.toUpperCase()}`;
      
    const section2Title = isPt ? "2. Diretrizes do Roteiro" : "2. Roadmap Guidelines";
    
    const tableHeader = isPt 
      ? ['Ordem', 'Ação Prática Obrigatória / Recomendada']
      : ['Order', 'Mandatory / Recommended Practical Action'];
      
    const legalText = isPt
      ? "Este documento constitui um guia orientativo emitido de forma automatizada com base nas diretrizes federais de internalização de parcerias e no Programa Nacional de Gestão e Inovação (PNGI), alinhado ao acórdão da ADPF 854 proferido pelo Supremo Tribunal Federal."
      : "This document constitutes an advisory guide issued automatically based on federal guidelines for partnership internalization and the National Program for Management and Innovation (PNGI), aligned with the ADPF 854 ruling issued by the Supreme Federal Court.";

    // Header
    doc.setFillColor(0, 51, 102); // Federal institutional blue
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(mgiText, 20, 18);
    
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text(docSupportText, 20, 26);
    doc.text(`${dateLabel} ${new Date().toLocaleDateString(isPt ? 'pt-BR' : 'en-US')}`, pageWidth - 65, 26);

    // Title
    doc.setFillColor(245, 245, 247);
    doc.rect(15, 48, pageWidth - 30, 25, 'F');
    doc.setTextColor(0, 51, 102);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    
    doc.text(diagTitle, 20, 56);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text(popText, 20, 64);

    // Roadmap Content
    doc.setTextColor(50);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(section1Title, 20, 85);
    
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    doc.text(`${phaseLabel} ${simOutput.rolloutPhase}`, 25, 93);
    doc.text(`${dateLabelSim} ${simOutput.rolloutDate}`, 25, 100);
    doc.text(`${kitLabel} ${kitVal}`, 25, 107);

    // Summary Text
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(section2Title, 20, 120);
    
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");
    const splitText = doc.splitTextToSize(simOutput.description, pageWidth - 40);
    doc.text(splitText, 20, 128);

    // Action Checklist Table
    const tableBody = simOutput.actionSteps.map((step, idx) => [`0${idx + 1}`, step]);
    
    autoTable(doc, {
      startY: 145,
      head: [tableHeader],
      body: tableBody,
      theme: 'striped',
      headStyles: { fillColor: [0, 51, 102] },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center', fontStyle: 'bold' },
        1: { cellWidth: 'auto' }
      }
    });

    // Reference Legal text at bottom
    const currentY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "oblique");
    doc.setTextColor(120);
    const splitLegal = doc.splitTextToSize(legalText, pageWidth - 40);
    doc.text(splitLegal, 20, currentY);

    // Save
    doc.save(isPt ? `roteiro_sgp_parcerias_${entityType}.pdf` : `sgp_partnerships_roadmap_${entityType}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* Official Brazil Bar */}
      <div className="bg-[#003366] text-white text-[10px] py-1.5 px-4 md:px-8 border-b border-white/10 flex items-center justify-between font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-1.5 bg-green-500 rounded-sm" />
          <span className="inline-block w-2.5 h-1.5 bg-yellow-400 rounded-sm" />
          <span className="font-semibold">{t.common.portalName}</span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <span>{t.common.mgi}</span>
          <span className="hidden md:inline">{t.common.govFederal}</span>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed top-[32px] bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 text-slate-350 flex flex-col justify-between z-50 transition-all duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 space-y-6 overflow-y-auto">
          {/* Logo and close button on mobile */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#c5a059]" />
              <span className="font-extrabold text-sm text-white tracking-tight">SGP - Parcerias da União</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-slate-800 rounded-lg text-slate-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-bold font-sans">
            <button 
              onClick={() => {
                setActiveMenuSection('gestao-parcerias');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                activeMenuSection === 'gestao-parcerias' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Building className="w-4 h-4 text-slate-500" />
              <span>{language === 'pt' ? 'Gestão de Parcerias' : 'Partnership Management'}</span>
            </button>

            <div className="pt-2 pb-1 px-3 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">
              {language === 'pt' ? 'CONHECIMENTO' : 'KNOWLEDGE'}
            </div>

            <button 
              onClick={() => {
                setActiveMenuSection('conhecimento');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                activeMenuSection === 'conhecimento' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>{language === 'pt' ? 'Base de Conhecimento' : 'Knowledge Base'}</span>
            </button>

            <div className="flex items-center gap-1 w-full">
              <button 
                onClick={() => {
                  setActiveMenuSection('diario-bordo');
                  setIsSidebarOpen(false);
                }}
                className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                  activeMenuSection === 'diario-bordo' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>{language === 'pt' ? 'Diário de Bordo' : 'Project Logbook'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLogbookInfoOpen(true);
                }}
                className="p-2.5 rounded-xl text-slate-450 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                title={language === 'pt' ? 'Como usar o Diário de Bordo' : 'How to use the Logbook'}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>

            <button 
              onClick={() => {
                setActiveMenuSection('subsidio-site');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                activeMenuSection === 'subsidio-site' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>{language === 'pt' ? 'Material do Site' : 'Site Materials'}</span>
            </button>

            <div className="pt-2 pb-1 px-3 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">
              {language === 'pt' ? 'REFERÊNCIAS' : 'REFERENCES'}
            </div>

            <button 
              onClick={() => {
                setActiveMenuSection('legislacao');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                activeMenuSection === 'legislacao' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Scale className="w-4 h-4 text-slate-500" />
              <span>{language === 'pt' ? 'Legislação' : 'Legislation'}</span>
            </button>

            <button 
              onClick={() => {
                setActiveMenuSection('solucoes-modelos');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left cursor-pointer ${
                activeMenuSection === 'solucoes-modelos' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white text-slate-400'
              }`}
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span>{language === 'pt' ? 'Soluções e Modelos' : 'Solutions & Templates'}</span>
            </button>

            <div className="pt-2 pb-1 px-3 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500">
              {language === 'pt' ? 'DIAGNÓSTICO & ASSISTÊNCIA' : 'DIAGNOSIS & SUPPORT'}
            </div>

            <button 
              onClick={() => {
                setActiveMenuSection('gestao-parcerias');
                setTimeout(() => {
                  document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
                setIsSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white text-slate-400 transition-all text-left cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-slate-500" />
              <span>{t.nav.diagnosis}</span>
            </button>

            <button 
              onClick={() => {
                setIsSidebarOpen(false);
                setIsCopilotOpen(true);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white text-slate-400 transition-all text-left cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{t.nav.aiGuide}</span>
            </button>
          </nav>
        </div>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/40">
          <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-800 text-[10px] space-y-1 leading-relaxed">
            <span className="text-slate-500 font-bold block uppercase tracking-wider">{language === 'pt' ? 'Membro da Rede' : 'Network Member'}</span>
            <span className="text-white font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              DTPAR / SEGES / MGI
            </span>
          </div>
        </div>
      </aside>

      {/* Main Page Layout Wrapper */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sticky Navigation Bar */}
        <nav className="sticky top-0 bg-white/95 border-b border-slate-200 shadow-sm z-40 py-3 px-4 md:px-8 flex justify-between items-center backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 active:scale-95 cursor-pointer flex items-center justify-center border border-slate-200"
              title={language === 'pt' ? 'Menu lateral' : 'Sidebar menu'}
            >
              {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2 lg:hidden">
              <Scale className="w-5 h-5 text-[#003366]" />
              <span className="font-bold text-xs md:text-sm text-[#003366] tracking-tight">SGP - Parcerias da União</span>
            </div>
            {/* Small active context indicator on desktop */}
            <div className="hidden lg:flex items-center gap-2 text-slate-400 text-xs font-medium">
              <span>{language === 'pt' ? 'Painel de Controle e Adesão' : 'Control and Adhesion Panel'}</span>
              <span className="text-slate-350">/</span>
              <span className="text-slate-600 font-semibold">{language === 'pt' ? 'Internalização Federativa' : 'Federative Internalization'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setLanguage(l => l === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-300 hover:border-slate-450 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-[10px] tracking-wide transition-all active:scale-95 cursor-pointer"
              title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            >
              <Languages className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold">{language.toUpperCase()}</span>
            </button>
            <a 
              href="#diagnostico" 
              className="px-3.5 py-1.5 bg-[#003366] text-white hover:bg-blue-900 font-bold rounded-lg text-[10px] tracking-wide shadow transition-all active:scale-95 cursor-pointer"
            >
              {t.common.startDiagnosis}
            </a>
          </div>
        </nav>

      {/* Hero Header */}
      {activeMenuSection === 'gestao-parcerias' && (
        <header className="bg-gradient-to-r from-[#002244] via-[#003366] to-[#0b4d8c] text-white py-12 px-6 md:px-8 border-b-4 border-[#c5a059] shadow-md relative overflow-hidden">
          {/* Background micro grid design */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-400/30 text-amber-300 rounded-full text-xs font-semibold backdrop-blur-sm">
                <Scale className="w-3.5 h-3.5 shrink-0" />
                {t.hero.badge}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {t.hero.title}<span className="text-[#c5a059] block sm:inline">{t.hero.titleHighlight}</span>{language === 'pt' ? ' no Transferegov' : ' in Transferegov'}
              </h1>
              
              <p className="text-slate-200 text-sm md:text-base max-w-2xl leading-relaxed font-sans font-normal">
                {t.hero.desc}
              </p>
              
              <div className="flex flex-wrap gap-3.5 pt-2">
                <a 
                  href="#diagnostico" 
                  className="px-5 py-2.5 bg-[#c5a059] hover:bg-[#b08d4a] text-[#002244] font-bold rounded-lg text-xs tracking-wide flex items-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  {t.hero.btnDiagnosis}
                </a>
                <button 
                  onClick={() => setIsCopilotOpen(true)}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-lg text-xs tracking-wide flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t.hero.btnAi}
                </button>
              </div>
            </div>
            
            {/* Quick numbers card */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4 self-center">
              <div className="flex items-center gap-2.5">
                <Building className="w-5 h-5 text-[#c5a059]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">{t.hero.statsTitle}</span>
              </div>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-300">{language === 'pt' ? 'Parceiros Ativos' : 'Active Partners'}</span>
                  <span className="font-mono font-bold text-[#c5a059]">{t.hero.statsActivePartners}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-300">{language === 'pt' ? 'Anos de Atuação da Rede' : 'Years of Network Activity'}</span>
                  <span className="font-mono font-bold text-[#c5a059]">{t.hero.statsYears}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-300">{language === 'pt' ? 'Módulo do Transferegov' : 'Transferegov Module'}</span>
                  <span className="font-mono font-bold text-green-400">{t.hero.statsModule}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 block leading-tight italic">
                  {t.hero.statsDisclaimer}
                </span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-12">


        {/* Section Group: Gestão de Parcerias */}
        {activeMenuSection === 'gestao-parcerias' && (
          <>
        {/* Section: Equipe de Colaboradores do Projeto */}
        <section className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e6f0fa] rounded-xl flex items-center justify-center text-[#003366]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#003366] tracking-tight">
                {language === 'pt' ? 'Equipe de Colaboração do Projeto' : 'Project Collaboration Team'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'pt' 
                  ? 'Participantes do Ministério da Gestão e da Inovação em Serviços Públicos (MGI) integrando o TRANSFEREGOV.'
                  : 'Participants from the Ministry of Management and Innovation (MGI) integrating TRANSFEREGOV.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { email: 'marcelofernandesgarcia@gmail.com', name: 'Marcelo Fernandes', rolePt: 'Diretor (DTPAR)', roleEn: 'Director (DTPAR)', color: 'bg-blue-500' },
              { email: 'vitor.cesar@mgi.gov.br', name: 'Vítor César', rolePt: 'Coordenador Técnico', roleEn: 'Technical Coordinator', color: 'bg-amber-500' },
              { email: 'nayara.anjos@mgi.gov.br', name: 'Nayara Anjos', rolePt: 'Analista de Inovação', roleEn: 'Innovation Analyst', color: 'bg-emerald-500' },
              { email: 'fernando.henrique@mgi.gov.br', name: 'Fernando Henrique', rolePt: 'Analista Regulatório', roleEn: 'Regulatory Analyst', color: 'bg-purple-500' },
              { email: 'lili.araujo@mgi.gov.br', name: 'Lili Araujo', rolePt: 'Especialista em Parcerias', roleEn: 'Partnership Specialist', color: 'bg-pink-500' }
            ].map(member => {
              const isActive = user.email === member.email;
              return (
                <div 
                  key={member.email}
                  className={`bg-white border rounded-xl p-4 flex flex-col justify-between space-y-3.5 shadow-sm transition-all duration-300 ${
                    isActive 
                      ? 'border-[#003366] ring-2 ring-[#003366]/20 bg-blue-50/5 scale-102 shadow-md' 
                      : 'border-slate-200 hover:border-slate-350 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Simulated avatar circle */}
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${member.color} text-white flex items-center justify-center font-bold text-xs shadow-inner`}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-xs text-[#003366] truncate">{member.name}</h4>
                        <span className="text-[10px] text-slate-500 block leading-tight truncate">{language === 'pt' ? member.rolePt : member.roleEn}</span>
                      </div>
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 truncate">{member.email}</div>
                  </div>

                  <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[8px] font-bold font-sans">
                    {isActive ? (
                      <span className="px-2 py-0.5 bg-blue-500/10 text-[#003366] rounded border border-blue-500/20 flex items-center gap-1 uppercase tracking-wider animate-pulse">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {language === 'pt' ? 'Você (Sessão)' : 'You (Session)'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded border border-slate-200/60 uppercase tracking-wider">
                        {language === 'pt' ? 'Membro' : 'Member'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 1: ADPF 854 Mandate Overview */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-4">
            <div className="w-12 h-12 bg-[#e6f0fa] rounded-xl flex items-center justify-center text-[#003366]">
              <Scale className="w-6 h-6" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
              {t.overview.title}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              {t.overview.desc}
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Axis 1 */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2.5 hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-blue-100 text-[#003366] rounded-lg flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h4 className="font-bold text-sm text-[#003366]">{t.overview.axis1Title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.overview.axis1Desc}
              </p>
            </div>
            {/* Axis 2 */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2.5 hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-blue-100 text-[#003366] rounded-lg flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h4 className="font-bold text-sm text-[#003366]">{t.overview.axis2Title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.overview.axis2Desc}
              </p>
            </div>
            {/* Axis 3 */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2.5 hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-blue-100 text-[#003366] rounded-lg flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h4 className="font-bold text-sm text-[#003366]">{t.overview.axis3Title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.overview.axis3Desc}
              </p>
            </div>
          </div>
        </section>


        {/* Section: Mapa de Adesão Nacional (Brasil) */}
        <section id="mapa-brasil" className="space-y-6 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
              {language === 'pt' ? 'Adesão e Integração Nacional ao Módulo de Gestão' : 'National Adherence and Integration to the Management Module'}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {language === 'pt' 
                ? 'Mapa geográfico vetorial real do Brasil renderizado programaticamente em HTML5 Canvas. Passe o cursor sobre os estados e clique para diagnóstico automático.'
                : 'Real geographic vector map of Brazil programmatically rendered in HTML5 Canvas. Hover over states and click for automatic diagnosis.'}
            </p>
          </div>

          {/* Interactive Regions Filters bar */}
          <div className="flex flex-wrap justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-4xl mx-auto">
            <button
              onClick={() => setMapFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${mapFilter === 'all' ? 'bg-[#003366] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              {language === 'pt' ? 'Todos os Estados' : 'All States'}
            </button>
            <button
              onClick={() => setMapFilter('Norte')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${mapFilter === 'Norte' ? 'bg-[#0f8a5f] text-white shadow-sm' : 'text-slate-600 hover:bg-green-50'}`}
            >
              <span className="w-2 h-2 rounded-full bg-[#0f8a5f]" />
              {language === 'pt' ? 'Norte' : 'North'}
            </button>
            <button
              onClick={() => setMapFilter('Nordeste')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${mapFilter === 'Nordeste' ? 'bg-[#e11d48] text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'}`}
            >
              <span className="w-2 h-2 rounded-full bg-[#e11d48]" />
              {language === 'pt' ? 'Nordeste' : 'Northeast'}
            </button>
            <button
              onClick={() => setMapFilter('Centro-Oeste')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${mapFilter === 'Centro-Oeste' ? 'bg-[#ea580c] text-white shadow-sm' : 'text-slate-600 hover:bg-orange-50'}`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ea580c]" />
              {language === 'pt' ? 'Centro-Oeste' : 'Central-West'}
            </button>
            <button
              onClick={() => setMapFilter('Sudeste')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${mapFilter === 'Sudeste' ? 'bg-[#d97706] text-white shadow-sm' : 'text-slate-600 hover:bg-amber-50'}`}
            >
              <span className="w-2 h-2 rounded-full bg-[#d97706]" />
              {language === 'pt' ? 'Sudeste' : 'Southeast'}
            </button>
            <button
              onClick={() => setMapFilter('Sul')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${mapFilter === 'Sul' ? 'bg-[#6366f1] text-white shadow-sm' : 'text-slate-600 hover:bg-indigo-50'}`}
            >
              <span className="w-2 h-2 rounded-full bg-[#6366f1]" />
              {language === 'pt' ? 'Sul' : 'South'}
            </button>
            <button
              onClick={() => setMapFilter('pilot')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-green-200 ${mapFilter === 'pilot' ? 'bg-green-600 text-white shadow-sm' : 'bg-white text-green-700 hover:bg-green-50 shadow-sm'}`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              {language === 'pt' ? 'Aderidos (Fase Piloto)' : 'Adherents (Pilot Phase)'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Interactive HTML5 Canvas Map */}
            <div className="lg:col-span-8 bg-[#020d1e] rounded-3xl p-6 md:p-8 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[500px] overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="flex items-center justify-between text-xs border-b border-slate-850 pb-3 mb-4 z-10">
                <span className="text-amber-500 font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
                  {language === 'pt' ? 'MAPA DE ALTA FIDELIDADE GEOGRÁFICA' : 'HIGH GEOGRAPHICAL FIDELITY MAP'}
                </span>
                <span className="text-slate-400 font-sans">{language === 'pt' ? 'Selecione estados para simulação no simulador' : 'Select states to load in the simulator'}</span>
              </div>

              {/* Dynamic HTML5 Canvas container */}
              <div className="flex-1 flex items-center justify-center p-2 relative z-10 w-full">
                <MapaRollout
                  language={language}
                  mapFilter={mapFilter}
                  entityType={entityType}
                  selectedUf={selectedUf}
                  setEntityType={setEntityType}
                  setSelectedUf={setSelectedUf}
                  setPopulation={setPopulation}
                  setHasAct={setHasAct}
                  setValidatedViaApi={setValidatedViaApi}
                  setSearchFeedback={setSearchFeedback}
                />
              </div>

              {/* Bottom Quick Status Indicator */}
              <div className="flex items-center gap-6 text-[10px] text-slate-400 font-sans border-t border-slate-850 pt-3 mt-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-full border border-green-400 animate-pulse" />
                  <span>{language === 'pt' ? 'Aderido / Fase Piloto (8)' : 'Adherent / Pilot Phase (8)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-slate-800 rounded-full border border-slate-600" />
                  <span>{language === 'pt' ? 'Rollout Geral (19)' : 'General Rollout (19)'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border-2 border-white shadow-[0_0_5px_white]" />
                  <span>{language === 'pt' ? 'Selecionado no Diagnóstico' : 'Selected in Diagnosis'}</span>
                </div>
              </div>
            </div>

            {/* Side macro-regions statistics and details panel */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block font-mono">{language === 'pt' ? 'Quadro Geral de Adesão' : 'General Framework of Adherence'}</span>
                  <h3 className="font-extrabold text-lg text-[#003366] leading-tight">{language === 'pt' ? 'Módulo de Gestão de Parcerias' : 'Partnership Management Module'}</h3>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {language === 'pt' 
                      ? 'Clique nos estados pilotos da lista abaixo ou interaja diretamente no mapa à esquerda para conferir cronogramas e diagnósticos.'
                      : 'Click on the pilot states in the list below or interact directly on the map on the left to check schedules and diagnoses.'}
                  </p>
                </div>

                {/* Highlighted States List */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">{language === 'pt' ? 'ESTADOS ADERIDOS (FASE PILOTO)' : 'ADHERENT STATES (PILOT PHASE)'}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'AC', name: 'Acre' },
                      { id: 'AL', name: 'Alagoas' },
                      { id: 'AP', name: 'Amapá' },
                      { id: 'BA', name: 'Bahia' },
                      { id: 'RN', name: 'R. G. do Norte' },
                      { id: 'RO', name: 'Rondônia' },
                      { id: 'RR', name: 'Roraima' },
                      { id: 'TO', name: 'Tocantins' }
                    ].map(uf => (
                      <button
                        key={uf.id}
                        onClick={() => {
                          setEntityType('state');
                          setSelectedUf(uf.id);
                          document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`px-2.5 py-1.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          entityType === 'state' && selectedUf === uf.id
                            ? 'bg-green-50 border-green-400 text-green-800 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                        }`}
                      >
                        <span className="text-xs">{uf.name}</span>
                        <span className="text-[9px] font-mono font-bold bg-green-500/10 border border-green-500/20 text-green-700 px-1 py-0.5 rounded uppercase">{language === 'pt' ? 'Piloto' : 'Pilot'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Statistics Box */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-mono">{language === 'pt' ? 'DADOS DO MONITORAMENTO' : 'MONITORING DATA'}</span>
                  <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                    <div>
                      <span className="text-[10px] text-slate-500 block">{language === 'pt' ? 'Estados Integrados' : 'Integrated States'}</span>
                      <strong className="text-base text-[#003366] font-extrabold block mt-0.5">8 / 27</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">{language === 'pt' ? 'Municípios Alvo' : 'Target Municipalities'}</span>
                      <strong className="text-base text-[#003366] font-extrabold block mt-0.5">5.570</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">ACTs Estaduais</span>
                      <strong className="text-base text-green-700 font-extrabold block mt-0.5">100% Piloto</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Integração Total</span>
                      <strong className="text-base text-amber-600 font-extrabold block mt-0.5">Out/2026</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 leading-relaxed font-sans mt-4">
                <strong>{language === 'pt' ? 'Nota Técnica:' : 'Technical Note:'}</strong> {language === 'pt' ? 'Gestores de estados em rollout geral podem antecipar sua adesão solicitando cooperação voluntária ao MGI.' : 'Managers of states in general rollout can anticipate their accession by requesting voluntary cooperation from MGI.'}
              </div>
            </div>

          </div>
        </section>


        {/* Section 4: Simulator (Auto-Diagnóstico) */}
        <SimuladorElegibilidade
          language={language}
          t={t}
          entityType={entityType}
          setEntityType={setEntityType}
          population={population}
          setPopulation={setPopulation}
          hasAct={hasAct}
          setHasAct={setHasAct}
          selectedUf={selectedUf}
          setSelectedUf={setSelectedUf}
          simOutput={simOutput}
          cnpjSearchQuery={cnpjSearchQuery}
          setCnpjSearchQuery={setCnpjSearchQuery}
          handleApiSearch={handleApiSearch}
          searchFeedback={searchFeedback}
          generateRoadmapPdf={generateRoadmapPdf}
        />

        {/* Obras Georreferenciadas removido desta posição e movido para a seção de Prospecção de Evoluções pós feedback do Vítor César */}

        {/* Section 5: Gemini AI Advisor Q&A */}

          </>
        )}

        {/* Section Group: Base de Conhecimento Explícito */}
        {activeMenuSection === 'conhecimento' && (
          <>
        {/* Section: Biblioteca de Minutas e Modelos Jurídicos */}
        <section id="modelos" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
                {t.templates.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl">
                {t.templates.desc}
              </p>
            </div>

            {/* Document Search Bar */}
            <div className="relative max-w-xs w-full shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t.templates.labelSearch} 
                value={docSearchQuery}
                onChange={(e) => setDocSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#003366] bg-slate-50/50 outline-none"
              />
            </div>
          </div>

          {/* Document release cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.templates.data
              .filter((doc: any) => 
                doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) || 
                doc.desc.toLowerCase().includes(docSearchQuery.toLowerCase())
              )
              .map((doc: any) => {
                const size = doc.id === 'edital' ? '4.8 KB' : doc.id === 'fomento' ? '3.5 KB' : doc.id === 'colabora' ? '3.9 KB' : '2.8 KB';
                const docType = doc.id === 'edital' ? 'EDITAL' : doc.id === 'fomento' ? 'FOMENTO' : doc.id === 'colabora' ? 'COLAB' : 'ACT';
                const badgeColor = doc.id === 'edital' ? 'bg-blue-50 border-blue-200 text-blue-700' : doc.id === 'fomento' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : doc.id === 'colabora' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-amber-50 border-amber-200 text-amber-700';

                return (
                  <div key={doc.id} className="bg-slate-50/40 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-xs transition-all duration-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-extrabold tracking-wider ${badgeColor}`}>
                          {docType}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono font-bold">{size}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 tracking-tight">{doc.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{doc.desc}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-5 pt-4 border-t border-slate-200/60">
                      <button 
                        onClick={() => setPreviewingDoc(doc)}
                        className="flex-1 py-1.5 px-3 bg-white border border-slate-200 hover:bg-slate-55 text-slate-700 font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                      >
                        <span>{t.templates.btnViewText}</span>
                      </button>
                      
                      <button 
                        onClick={() => downloadDocAsTxt(doc.filename, doc.templateText)}
                        className="py-1.5 px-3 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.templates.btnDownload}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Minuta Preview Modal */}
          <AnimatePresence>
            {previewingDoc && (
              <div className="fixed inset-0 bg-slate-955/80 backdrop-blur-xs z-55 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl relative text-left"
                >
                  <button 
                    onClick={() => setPreviewingDoc(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-750 transition-colors cursor-pointer text-sm font-bold p-1"
                  >
                    ✕
                  </button>
                  
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[9px] font-bold tracking-wider font-mono">
                      {previewingDoc.filename}
                    </span>
                    <h3 className="text-base font-bold text-[#003366] tracking-tight">{previewingDoc.title}</h3>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                      <span>{language === 'pt' ? 'ARQUIVO DE MODELO' : 'TEMPLATE FILE'}</span>
                      <span className="text-amber-500 font-bold">{language === 'pt' ? 'MINUTA OFICIAL AGU' : 'OFFICIAL AGU DRAFT'}</span>
                    </div>
                    <div className="p-4 overflow-y-auto max-h-[300px] font-mono text-[9px] text-slate-300 leading-relaxed whitespace-pre-wrap select-all scrollbar-thin">
                      {previewingDoc.templateText}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 flex-wrap">
                    <span className="text-[9px] text-slate-450 italic max-w-xs leading-relaxed">
                      {language === 'pt' ? '*Nota: Adapte o modelo com os dados específicos do seu órgão e da OSC parceira antes de publicar.' : '*Note: Adapt the model with specific data of your agency and CSO before publishing.'}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          copyDocToClipboard(previewingDoc.templateText);
                        }}
                        className="px-3.5 py-2 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 shadow-xs"
                      >
                        {copiedDoc ? t.templates.btnCopied : t.templates.btnCopy}
                      </button>
                      <button 
                        onClick={() => {
                          downloadDocAsTxt(previewingDoc.filename, previewingDoc.templateText);
                        }}
                        className="px-3.5 py-2 border border-slate-350 hover:bg-slate-55 text-slate-700 font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.templates.btnDownload}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Lightbox Modal for Infographics */}
          <AnimatePresence>
            {activeLightbox && (
              <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-55 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative max-w-5xl w-full flex flex-col items-center gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl"
                >
                  {/* Close Button */}
                  <button 
                    onClick={() => setActiveLightbox(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold p-1 bg-slate-800 rounded-lg border border-slate-700 w-8 h-8 flex items-center justify-center"
                  >
                    ✕
                  </button>

                  <div className="text-center w-full px-8">
                    <h3 className="text-xs font-bold text-slate-300 tracking-tight font-mono">{activeLightbox.title}</h3>
                  </div>

                  {/* Image Container with max sizing */}
                  <div className="w-full flex justify-center bg-slate-950 rounded-2xl overflow-hidden border border-slate-850 p-2 max-h-[75vh]">
                    <img 
                      src={activeLightbox.src} 
                      alt={activeLightbox.title} 
                      className="max-w-full max-h-[70vh] object-contain rounded-xl select-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={activeLightbox.src} 
                      download 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>{language === 'pt' ? 'Baixar Imagem' : 'Download Image'}</span>
                    </a>
                    <button
                      onClick={() => setActiveLightbox(null)}
                      className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-350 font-bold rounded-xl text-xs transition-all cursor-pointer"
                    >
                      {language === 'pt' ? 'Fechar' : 'Close'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 3: Interactive Timeline */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
              {t.timeline.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {t.timeline.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Steps list */}
            <div className="lg:col-span-5 space-y-3">
              {t.timeline.data.map((item, idx) => (
                <button 
                  key={`timeline-${idx}`}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-4 cursor-pointer ${idx === activeTimelineIdx ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'}`}
                >
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-mono font-bold text-xs ${idx === activeTimelineIdx ? 'bg-[#003366] text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400 block">{item.date}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${item.status === 'Concluído' || item.status === 'Completed' ? 'bg-green-100 text-green-800' : item.status === 'Em Andamento' || item.status === 'In Progress' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className={`font-bold text-xs md:text-sm mt-0.5 ${idx === activeTimelineIdx ? 'text-[#003366]' : 'text-slate-700'}`}>
                      {item.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Displaying details for active step */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold rounded-full uppercase tracking-wider">
                {t.timeline.stepDetails} {activeTimelineIdx + 1}
              </span>
              
              <div className="space-y-2">
                <span className="text-slate-400 font-mono text-xs block">{t.timeline.data[activeTimelineIdx].date}</span>
                <h3 className="text-lg md:text-xl font-bold text-[#003366]">
                  {t.timeline.data[activeTimelineIdx].title}
                </h3>
              </div>

              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {t.timeline.data[activeTimelineIdx].desc}
              </p>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#003366]">
                  <Info className="w-4 h-4 text-amber-500" />
                  {t.timeline.mandatoryActions}
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.timeline.data[activeTimelineIdx].details}
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{language === 'pt' ? 'Planejado sob as normas da SEGES/DTPAR e AGU.' : 'Planned under SEGES/DTPAR and AGU standards.'}</span>
              </div>
            </div>
          </div>
        </section>


        {/* Section: Videos, Podcasts e Materiais de Suporte */}
        <section id="midias" className="space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
              {t.mediaSection.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {t.mediaSection.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Podcast Card 1: Rastreabilidade */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Green) */}
                <div className="bg-[#0f8a5f] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">Podcast</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Áudio educativo' : 'Educational audio'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug">
                    {language === 'pt' ? 'O Novo Cerco Digital ao Dinheiro Público' : 'The New Digital Siege on Public Money'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Explore as estratégias digitais de controle e fiscalização do dinheiro público implementadas pelo TCU através do e-TCU e dos novos mecanismos de rastreabilidade de transferências voluntárias.'
                      : 'Explore the digital control and inspection strategies of public money implemented by the TCU through the e-TCU and the new voluntary transfer traceability mechanisms.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <audio
                  controls
                  src="/media/Transferegov_rastreia_cada_centavo_do_dinheiro_público.m4a"
                  className="w-full h-8 accent-[#0f8a5f] bg-slate-50 rounded-lg"
                />
                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-green-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Duração: 16 minutos e 46 segundos' : 'Duration: 16 minutes and 46 seconds'}
                  </div>
                  <div className="flex items-center gap-1.5 text-green-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Formato: M4A Áudio (Local)' : 'Format: M4A Audio (Local)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Video Card: Roteiro MGI */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Blue) */}
                <div className="bg-[#1d4ed8] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Vídeo Explicativo' : 'Explanatory Video'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Capacitação SGP' : 'SGP Capacity Building'}</span>
                  </div>
                </div>

                {/* Video screen */}
                <div className="aspect-video bg-black relative">
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
                    src="/media/Roteiro_MGI__Transparência.mp4"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug font-sans">
                    {language === 'pt' ? 'Roteiro MGI: Transparência e Internalização' : 'MGI Roadmap: Transparency and Internalization'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Vídeo oficial do Ministério da Gestão e Inovação (MGI) explicando as obrigações da ADPF 854 e o funcionamento do Módulo de Gestão de Parcerias.'
                      : 'Official video of the Ministry of Management and Innovation (MGI) explaining the obligations of ADPF 854 and the operation of the Partnership Management Module.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Duração: 5 minutos e 16 segundos' : 'Duration: 5 minutes and 16 seconds'}
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Formato: MP4 Vídeo (Local)' : 'Format: MP4 Video (Local)'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Cartilha de Prestação de Contas */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Purple) */}
                <div className="bg-[#7c3aed] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Cartilha Técnica' : 'Technical Booklet'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Guia Completo para Gestores' : 'Complete Guide for Managers'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug">
                    {language === 'pt' ? 'Prestação de Contas: Concedente e Repassador' : 'Accountability: Grantor and Transferrer'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Manual completo e ilustrado sobre as novas exigências fiscais, regras de glosas operacionais e fluxograma de prestação de contas.'
                      : 'Complete and illustrated manual on the new fiscal requirements, operational disallowed costs rules, and accountability flowchart.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                <a
                  href="/media/1. Tutorial – Prestação de Contas_Concedente_Repassador.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  {language === 'pt' ? 'Acessar Cartilha (PDF)' : 'Access Booklet (PDF)'}
                </a>

                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Tamanho: 3.2 MB' : 'Size: 3.2 MB'}
                  </div>
                  <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Fonte: MGI Oficial' : 'Source: Official MGI'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Como Cadastrar Usuário */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Emerald) */}
                <div className="bg-[#059669] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Tutorial Gov.br' : 'Gov.br Tutorial'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Ambiente de Homologação' : 'Homologation Environment'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug">
                    {language === 'pt' ? 'Como Cadastrar Usuário no Homologação GOV.BR' : 'How to Register User in GOV.BR Homologation'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Instruções completas para que os gestores estaduais e municipais realizem os testes operacionais no ambiente integrado do Gov.br.'
                      : 'Complete instructions for state and municipal managers to perform operational tests in the integrated Gov.br environment.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                <a
                  href="/media/Como cadastrar um usuário no ambiente de homologação do GOV BR.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  {language === 'pt' ? 'Acessar Guia de Cadastro (PDF)' : 'Access Registration Guide (PDF)'}
                </a>

                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Tamanho: 1.2 MB' : 'Size: 1.2 MB'}
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Formato: PDF de Treinamento' : 'Format: Training PDF'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Portaria 3.248 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Orange) */}
                <div className="bg-[#ea580c] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Legislação' : 'Legislation'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">Portaria SEGES/MGI</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug">
                    {language === 'pt' ? 'Portaria SEGES/MGI nº 3.248 (15/04/2026)' : 'SEGES/MGI Ordinance No. 3,248 (04/15/2026)'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Regulamentação jurídica oficial do Ministério da Gestão e Inovação para adesão ao novo Módulo de Parcerias e governança local do PNGI.'
                      : 'Official legal regulation of the Ministry of Management and Innovation for joining the new Partnership Module and local PNGI governance.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                <a
                  href="/media/PORTARIA SEGES_MGI Nº 3.248, DE 15 DE ABRIL DE 2026.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#ea580c] hover:bg-[#d97706] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  {language === 'pt' ? 'Visualizar Portaria (HTML)' : 'View Ordinance (HTML)'}
                </a>

                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-orange-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Publicado no DOU' : 'Published in DOU'}
                  </div>
                  <div className="flex items-center gap-1.5 text-orange-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Regulamentação Oficial SGP' : 'Official SGP Regulation'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Slides SGP */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Red/Rose) */}
                <div className="bg-[#e11d48] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Apresentação' : 'Presentation'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Slides SGP e e-TCE' : 'SGP and e-TCE Slides'}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug">
                    {language === 'pt' ? 'Arquitetura e Internalização do SGP' : 'SGP Architecture and Internalization'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Slides executivos de modelagem arquitetônica do módulo de parcerias e do sistema e-TCE (Tomada de Contas Especial) do TCU.'
                      : 'Executive slides of architectural modeling of the partnership module and the TCU\'s e-TCE (Special Accountability) system.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-4">
                <a
                  href="/media/ARQUITETURA E INTERNALIZAÇÃO.pptx"
                  download
                  className="w-full py-2.5 bg-[#e11d48] hover:bg-[#be123c] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  {language === 'pt' ? 'Baixar Slides (PPTX)' : 'Download Slides (PPTX)'}
                </a>

                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Tamanho: 17.5 MB' : 'Size: 17.5 MB'}
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Formato: PowerPoint' : 'Format: PowerPoint'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Infográfico 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Teal) */}
                <div className="bg-[#0f766e] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <FileImage className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Infográfico 1' : 'Infographic 1'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Guia de Parcerias' : 'Partnerships Guide'}</span>
                  </div>
                </div>

                {/* Preview Image with zoom trigger */}
                <div 
                  onClick={() => setActiveLightbox({ src: '/capacitacoes/Infografico 1.png', title: language === 'pt' ? 'Infográfico 1 - Guia de Gestão de Parcerias Públicas' : 'Infographic 1 - Public Partnerships Management Guide' })}
                  className="aspect-video bg-slate-100 relative overflow-hidden group cursor-zoom-in border-b border-slate-100"
                >
                  <img 
                    src="/capacitacoes/Infografico 1.png" 
                    alt="Infografico 1" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="px-3 py-1.5 bg-slate-900/80 text-white rounded-lg text-[10px] font-bold tracking-wide flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {language === 'pt' ? 'Clique para Ampliar' : 'Click to Zoom'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug font-sans">
                    {language === 'pt' ? 'Infográfico 1: Guia de Gestão de Parcerias Públicas' : 'Infographic 1: Public Partnerships Management Guide'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Visão geral e mapeamento conceitual das parcerias no âmbito do MROSC e das novas diretrizes de governança técnica federativa.'
                      : 'Overview and conceptual mapping of partnerships within MROSC and the new federative technical governance guidelines.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveLightbox({ src: '/capacitacoes/Infografico 1.png', title: language === 'pt' ? 'Infográfico 1 - Guia de Gestão de Parcerias Públicas' : 'Infographic 1 - Public Partnerships Management Guide' })}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-[#003366] border border-slate-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Ampliar' : 'Zoom'}
                  </button>
                  <a 
                    href="/capacitacoes/Infografico 1.png"
                    download
                    className="py-2 px-3.5 bg-[#0f766e] hover:bg-[#0d5c56] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-teal-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Tamanho: 5.7 MB' : 'Size: 5.7 MB'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Infográfico 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Sky/Blue) */}
                <div className="bg-[#0369a1] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <FileImage className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Infográfico 2' : 'Infographic 2'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Fluxo Operacional' : 'Operational Flow'}</span>
                  </div>
                </div>

                {/* Preview Image with zoom trigger */}
                <div 
                  onClick={() => setActiveLightbox({ src: '/capacitacoes/Infografico 2.png', title: language === 'pt' ? 'Infográfico 2 - Fluxo Operacional das Parcerias' : 'Infographic 2 - Partnerships Operational Flow' })}
                  className="aspect-video bg-slate-100 relative overflow-hidden group cursor-zoom-in border-b border-slate-100"
                >
                  <img 
                    src="/capacitacoes/Infografico 2.png" 
                    alt="Infografico 2" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-955/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="px-3 py-1.5 bg-slate-900/80 text-white rounded-lg text-[10px] font-bold tracking-wide flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {language === 'pt' ? 'Clique para Ampliar' : 'Click to Zoom'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug font-sans">
                    {language === 'pt' ? 'Infográfico 2: Fluxo Operacional das Parcerias' : 'Infographic 2: Partnerships Operational Flow'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Modelagem visual do fluxo de trabalho e processos ponta a ponta na Gestão de Parcerias Públicas no governo federal.'
                      : 'Visual modeling of the end-to-end workflow and processes in Public Partnerships Management in the federal government.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveLightbox({ src: '/capacitacoes/Infografico 2.png', title: language === 'pt' ? 'Infográfico 2 - Fluxo Operacional das Parcerias' : 'Infographic 2 - Partnerships Operational Flow' })}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-[#003366] border border-slate-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Ampliar' : 'Zoom'}
                  </button>
                  <a 
                    href="/capacitacoes/Infografico 2.png"
                    download
                    className="py-2 px-3.5 bg-[#0369a1] hover:bg-[#0284c7] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-sky-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Tamanho: 4.8 MB' : 'Size: 4.8 MB'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Infográfico 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Blue) */}
                <div className="bg-[#1d4ed8] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <FileImage className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Infográfico 3' : 'Infographic 3'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Implantação Regulatória' : 'Regulatory Rollout'}</span>
                  </div>
                </div>

                {/* Preview Image with zoom trigger */}
                <div 
                  onClick={() => setActiveLightbox({ src: '/capacitacoes/Infografico 3.png', title: language === 'pt' ? 'Infográfico 3 - Roteiro de Implementação ADPF 854' : 'Infographic 3 - ADPF 854 Implementation Roadmap' })}
                  className="aspect-video bg-slate-100 relative overflow-hidden group cursor-zoom-in border-b border-slate-100"
                >
                  <img 
                    src="/capacitacoes/Infografico 3.png" 
                    alt="Infografico 3" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-955/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="px-3 py-1.5 bg-slate-900/80 text-white rounded-lg text-[10px] font-bold tracking-wide flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {language === 'pt' ? 'Clique para Ampliar' : 'Click to Zoom'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug font-sans">
                    {language === 'pt' ? 'Infográfico 3: Implementação Regulatório ADPF 854' : 'Infographic 3: ADPF 854 Implementation Roadmap'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Roteiro de implantação técnica e adequação regulatória exigida para o rollout do novo módulo de parcerias da União.'
                      : 'Technical implementation roadmap and regulatory adaptation required for the rollout of the new Union partnership module.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveLightbox({ src: '/capacitacoes/Infografico 3.png', title: language === 'pt' ? 'Infográfico 3 - Roteiro de Implementação ADPF 854' : 'Infographic 3 - ADPF 854 Implementation Roadmap' })}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-[#003366] border border-slate-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Ampliar' : 'Zoom'}
                  </button>
                  <a 
                    href="/capacitacoes/Infografico 3.png"
                    download
                    className="py-2 px-3.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Tamanho: 5.2 MB' : 'Size: 5.2 MB'}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Card: Mapa Mental 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                {/* Header (Violet) */}
                <div className="bg-[#6d28d9] p-4 text-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <FileImage className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm tracking-wide font-sans">{language === 'pt' ? 'Mapa Mental 1' : 'Mind Map 1'}</h4>
                    <span className="text-[10px] opacity-90 font-medium font-sans">{language === 'pt' ? 'Marcos do SGP' : 'SGP Milestones'}</span>
                  </div>
                </div>

                {/* Preview Image with zoom trigger */}
                <div 
                  onClick={() => setActiveLightbox({ src: '/capacitacoes/Mapa Mental 1.png', title: language === 'pt' ? 'Mapa Mental 1 - Conectividade & Mind Map' : 'Mind Map 1 - Connectivity & Mind Map' })}
                  className="aspect-video bg-slate-100 relative overflow-hidden group cursor-zoom-in border-b border-slate-100"
                >
                  <img 
                    src="/capacitacoes/Mapa Mental 1.png" 
                    alt="Mapa Mental 1" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-955/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                    <span className="px-3 py-1.5 bg-slate-900/80 text-white rounded-lg text-[10px] font-bold tracking-wide flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {language === 'pt' ? 'Clique para Ampliar' : 'Click to Zoom'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-extrabold text-base text-[#003366] leading-snug font-sans">
                    {language === 'pt' ? 'Mapa Mental 1: Conectividade & Marcos do SGP' : 'Mind Map 1: Connectivity & SGP Milestones'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {language === 'pt' 
                      ? 'Esquematização visual das políticas de governança, conexões e marcos regulatórios vigentes no novo modelo.'
                      : 'Visual schematization of governance policies, connections, and regulatory milestones in force in the new model.'}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveLightbox({ src: '/capacitacoes/Mapa Mental 1.png', title: language === 'pt' ? 'Mapa Mental 1 - Conectividade & Mind Map' : 'Mind Map 1 - Connectivity & Mind Map' })}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-[#003366] border border-slate-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {language === 'pt' ? 'Ampliar' : 'Zoom'}
                  </button>
                  <a 
                    href="/capacitacoes/Mapa Mental 1.png"
                    download
                    className="py-2 px-3.5 bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                    <Check className="w-3.5 h-3.5" /> {language === 'pt' ? 'Tamanho: 1.5 MB' : 'Size: 1.5 MB'}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* Section: FAQ e Central de Conhecimento */}
        <section id="faq" className="space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight">
              {language === 'pt' ? 'Central de Conhecimento & FAQ' : 'Knowledge Center & FAQ'}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {language === 'pt' 
                ? 'Busque respostas oficiais em nossa base integrada de 200 perguntas frequentes extraídas das diretrizes de parcerias públicas.' 
                : 'Search official answers in our integrated database of 200 FAQs extracted from public partnership guidelines.'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-6">
            
            {/* Search and Category filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search input */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={faqSearchQuery}
                  onChange={(e) => {
                    setFaqSearchQuery(e.target.value);
                    setFaqDisplayLimit(10); // reset limit on search change
                  }}
                  placeholder={language === 'pt' ? 'Buscar em 200 perguntas... Ex: OPP, ADPF 854' : 'Search in 200 questions... e.g. OPP, MROSC'}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-[#003366] focus:ring-1 focus:ring-[#003366] rounded-xl text-xs outline-none transition-all text-slate-800"
                />
                {faqSearchQuery && (
                  <button 
                    onClick={() => setFaqSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Reset Filters button */}
              {(faqSearchQuery || faqActiveCategory !== 'all') && (
                <button 
                  onClick={() => {
                    setFaqSearchQuery('');
                    setFaqActiveCategory('Articulação e Mobilização');
                    setFaqDisplayLimit(10);
                  }}
                  className="text-xs font-bold text-[#003366] hover:underline cursor-pointer"
                >
                  {language === 'pt' ? 'Limpar Filtros' : 'Clear Filters'}
                </button>
              )}
            </div>

            {/* Wrapped category list */}
            <div className="flex flex-wrap gap-2">
              {/* Extract all unique categories */}
              {Array.from(new Set(faqData.map(item => item.category))).map((cat) => {
                const trans = faqCategoryTranslations[cat];
                const displayName = trans ? (language === 'pt' ? trans.pt : trans.en) : cat;
                const count = faqData.filter(x => x.category === cat).length;
                return (
                  <button 
                    key={cat}
                    onClick={() => {
                      setFaqActiveCategory(cat);
                      setFaqDisplayLimit(10);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95 duration-205 ${faqActiveCategory === cat ? 'bg-[#003366] text-white shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-[#003366]'}`}
                  >
                    {displayName} ({count})
                  </button>
                );
              })}
            </div>

            {/* Q&A List */}
            <div className="space-y-3.5">
              {(() => {
                // Filtering logic
                let filtered = faqData;
                
                if (faqActiveCategory !== 'all') {
                  filtered = filtered.filter(item => item.category === faqActiveCategory);
                }
                
                if (faqSearchQuery.trim()) {
                  const query = faqSearchQuery.toLowerCase()
                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  filtered = filtered.filter(item => {
                    const normQ = item.question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const normA = item.answer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normQ.includes(query) || normA.includes(query);
                  });
                }
                
                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      {language === 'pt' ? 'Nenhuma pergunta encontrada para os critérios de busca.' : 'No questions found for the search criteria.'}
                    </div>
                  );
                }
                
                const visibleItems = filtered.slice(0, faqDisplayLimit);

                return (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      {visibleItems.map((item) => {
                        // Extract number from id
                        const num = item.id.split('-')[1];
                        const prefix = item.id.startsWith('eixo') ? 'Eixo' : 'Grupo';
                        
                        return (
                          <div 
                            key={item.id} 
                            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:border-[#003366]/40 hover:shadow-sm transition-all duration-300 space-y-3"
                          >
                            <div className="space-y-1">
                              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-bold tracking-wider font-mono">
                                {prefix === 'Eixo' 
                                  ? (language === 'pt' ? `Eixo: ${item.category}` : `Axis: ${item.category}`) 
                                  : (language === 'pt' ? `Grupo: ${item.category}` : `Group: ${item.category}`)}
                              </span>
                              <h3 className="font-extrabold text-sm text-[#003366] leading-snug">
                                Pergunta {num}: {item.question}
                              </h3>
                            </div>
                            
                            <div className="text-xs text-slate-700 leading-relaxed font-sans select-text border-t border-slate-100 pt-3">
                              <strong className="text-[#003366] font-extrabold">Resposta:</strong> {item.answer}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Show More Button (Neon glow animation) */}
                    {filtered.length > faqDisplayLimit && (
                      <div className="text-center pt-6 pb-2">
                        <button 
                          onClick={() => setFaqDisplayLimit(prev => prev + 10)}
                          className="px-6 py-3 bg-[#020617] text-cyan-400 font-extrabold rounded-2xl text-xs transition-all active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(6,242,254,0.35)] hover:shadow-[0_0_25px_rgba(6,242,254,0.65)] hover:scale-102 border-2 border-cyan-400/50 hover:border-cyan-400 duration-300 font-sans tracking-wide animate-pulse"
                        >
                          {language === 'pt' 
                            ? `Carregar mais 10 perguntas (${filtered.length - faqDisplayLimit} restantes)` 
                            : `Load 10 more questions (${filtered.length - faqDisplayLimit} remaining)`}
                        </button>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
            
          </div>
        </section>
        

          </>
        )}

        {/* Section Group: Legislação */}
        {activeMenuSection === 'legislacao' && (
          <>
        {/* Section: Central de Legislação de Parcerias */}
        <section id="legislacao" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
                {t.legislation.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl">
                {t.legislation.desc}
              </p>
            </div>
            
            {/* Filter Pills */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 self-start md:self-end border border-slate-200/50">
              {[
                { id: 'all', label: t.legislation.filters.all },
                { id: 'const', label: t.legislation.filters.const },
                { id: 'fed', label: t.legislation.filters.fed },
                { id: 'adm', label: t.legislation.filters.adm }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedLawFilter(filter.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedLawFilter === filter.id 
                      ? 'bg-[#003366] text-white shadow' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.legislation.data
              .filter(law => selectedLawFilter === 'all' || law.category === selectedLawFilter)
              .map(law => {
                const isExpanded = activeLawId === law.id;
                return (
                  <div 
                    key={law.id} 
                    className={`bg-white border rounded-2xl p-5 transition-all flex flex-col justify-between ${
                      law.id === 'portaria3248' 
                        ? 'border-amber-500/50 ring-2 ring-amber-500/10 shadow-sm' 
                        : 'border-slate-200 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start flex-wrap gap-1.5">
                        <span className={`px-2 py-0.5 font-mono text-[9px] font-bold rounded ${
                          law.id === 'portaria3248' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-blue-50 text-blue-800 border border-blue-150'
                        }`}>
                          {law.shortCategory}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{law.scope}</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-[#003366]">{law.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {law.summary}
                      </p>

                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-100 space-y-3 text-xs">
                          <div className="space-y-1.5">
                            <span className="font-bold text-[#003366] block">{t.legislation.criticalPoints}</span>
                            <ul className="list-disc pl-4 space-y-1 text-slate-600">
                              {law.keyPoints.map((pt, pIdx) => (
                                <li key={pIdx}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-amber-50/60 border border-amber-200 p-2.5 rounded-lg text-amber-900 text-[11px] leading-relaxed">
                            <strong>{t.legislation.complianceTip}</strong> {law.complianceTips}
                          </div>

                          {law.fullLawLink !== '#' && (
                            <a 
                              href={law.fullLawLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#003366] hover:underline font-bold text-[11px]"
                            >
                              {t.legislation.viewFullText} <ArrowUpRight className="w-3.5 h-3.5 text-[#003366]" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4">
                      <button
                        onClick={() => setActiveLawId(isExpanded ? null : law.id)}
                        className={`w-full py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                          isExpanded 
                            ? 'bg-slate-100 border-slate-200 text-slate-700' 
                            : 'border-[#003366] text-[#003366] hover:bg-blue-50'
                        }`}
                      >
                        {isExpanded ? t.legislation.btnHide : t.legislation.btnShow}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>


          </>
        )}

        {/* Section Group: Soluções e Modelos */}
        {activeMenuSection === 'solucoes-modelos' && (
          <>
        {/* Section 2: Catálogo Tecnológico & Soluções PNGI Tabs */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
                {t.solutions.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl">
                {t.solutions.desc}
              </p>
            </div>
            
            {/* Tab Switched */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1 self-start md:self-end border border-slate-200/50">
              <button 
                onClick={() => setActiveTab('tech')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === 'tech' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {language === 'pt' ? 'Módulo de Parcerias (ADPF 854)' : 'Partnership Module (ADPF 854)'}
              </button>
              <button 
                onClick={() => setActiveTab('pngi')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === 'pngi' ? 'bg-[#003366] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {language === 'pt' ? 'Ecossistema Geral PNGI' : 'General PNGI Ecosystem'}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'tech' ? (
              <motion.div 
                key="tab-tech"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {/* Tech Card 1 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#003366] transition-all space-y-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#003366] rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Transferegov.br</span>
                    <h3 className="font-bold text-sm text-[#003366] mt-0.5">{language === 'pt' ? 'Dupla Habilitação' : 'Dual Qualification'}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {language === 'pt' 
                        ? 'Evolução sistêmica para que estados e municípios atuem não apenas como receptores, mas também como repassadores operando recursos de seus próprios orçamentos locais.'
                        : 'Systemic evolution for states and municipalities to act not only as recipients, but also as transferrers operating resources from their own local budgets.'}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-[11px] text-[#003366] font-medium flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {language === 'pt' ? 'Rastreabilidade via Ordem de Pagamento da Parceria (OPP)' : 'Traceability via Partnership Payment Order (OPP)'}
                  </div>
                </div>

                {/* Tech Card 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#003366] transition-all space-y-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#003366] rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{language === 'pt' ? 'Monitoramento Visual' : 'Visual Monitoring'}</span>
                    <h3 className="font-bold text-sm text-[#003366] mt-0.5">{language === 'pt' ? 'Obras Georreferenciadas' : 'Georeferenced Works'}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {language === 'pt' 
                        ? 'Garantia de controle em tempo real por meio de monitoramento fotográfico georreferenciado diretamente acoplado ao fluxo de pagamento de obras públicas.'
                        : 'Guarantee of real-time control through georeferenced photographic monitoring directly coupled with the payment flow of public works.'}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-[11px] text-[#003366] font-medium flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {language === 'pt' ? 'Transparência com Aplicativo Cidadãogov.br' : 'Transparency with Cidadãogov.br Application'}
                  </div>
                </div>

                {/* Tech Card 3 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#003366] transition-all space-y-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#003366] rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{language === 'pt' ? 'Interoperabilidade' : 'Interoperability'}</span>
                    <h3 className="font-bold text-sm text-[#003366] mt-0.5">{language === 'pt' ? 'Integração por APIs' : 'API Integration'}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {language === 'pt' 
                        ? 'Sistemas legados de contabilidade e gestão de estados e municípios podem comunicar-se de forma direta com o banco de dados federal, evitando retrabalho.'
                        : 'Legacy accounting and management systems of states and municipalities can communicate directly with the federal database, avoiding rework.'}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-[11px] text-[#003366] font-medium flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {language === 'pt' ? 'API Conecta Gov.br Inclusa' : 'Conecta Gov.br API Included'}
                  </div>
                </div>

                {/* Tech Card 4 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#003366] transition-all space-y-4">
                  <div className="w-10 h-10 bg-blue-50 text-[#003366] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">{language === 'pt' ? 'Segurança Jurídica' : 'Legal Security'}</span>
                    <h3 className="font-bold text-sm text-[#003366] mt-0.5">{language === 'pt' ? 'Modelos Jurídicos AGU' : 'AGU Legal Models'}</h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {language === 'pt' 
                        ? 'Disponibilização de minutas padronizadas, termos de fomento, editais de chamamento e convênios pré-revisados e validados legalmente pela AGU.'
                        : 'Availability of standardized drafts, promotion terms, call notices, and covenants pre-reviewed and legally validated by the Office of the Attorney General (AGU).'}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded border border-slate-100 text-[11px] text-[#003366] font-medium flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {language === 'pt' ? 'Redução de Litígios Judiciais e Pareceres' : 'Reduction of Legal Disputes and Opinions'}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="tab-pngi"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* PNGI Sol 1 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:border-[#003366] transition-all">
                  <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#003366]">{language === 'pt' ? 'Balcão Gov.br' : 'Gov.br Desk'}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === 'pt' 
                        ? 'Estruturação de apoio presencial qualificado nas sedes do governo local para facilitar o acesso de cidadãos vulneráveis à conta Gov.br unificada.'
                        : 'Structuring of qualified face-to-face support at local government headquarters to facilitate vulnerable citizens\' access to the unified Gov.br account.'}
                    </p>
                  </div>
                </div>

                {/* PNGI Sol 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:border-[#003366] transition-all">
                  <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#003366]">{language === 'pt' ? 'ProPEN (Processo Eletrônico)' : 'ProPEN (Electronic Process)'}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === 'pt' 
                        ? 'Incentivo e fornecimento de tecnologia para extinção definitiva do uso de papéis físicos, tramitando processos locais de forma inteiramente digital.'
                        : 'Incentive and technological provision for the definitive extinction of physical paper usage, processing local workflows entirely digitally.'}
                    </p>
                  </div>
                </div>

                {/* PNGI Sol 3 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:border-[#003366] transition-all">
                  <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#003366]">Contrata+Brasil</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === 'pt' 
                        ? 'Plataforma sem custos transacionais que conecta os órgãos de compras municipais e estaduais diretamente a milhares de fornecedores habilitados nacionais.'
                        : 'No-transaction-cost platform that connects municipal and state procurement agencies directly to thousands of qualified national suppliers.'}
                    </p>
                  </div>
                </div>

                {/* PNGI Sol 4 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:border-[#003366] transition-all">
                  <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#003366]">Enap Aqui & EV.G</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === 'pt' 
                        ? 'Curadoria customizada de capacitações virtuais e realização de oficinas locais integradas pela Escola Nacional de Administração Pública.'
                        : 'Custom curation of virtual capacity building and execution of integrated local workshops by the National School of Public Administration.'}
                    </p>
                  </div>
                </div>

                {/* PNGI Sol 5 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:border-[#003366] transition-all">
                  <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#003366]">{language === 'pt' ? 'Interoperabilidade de Dados' : 'Data Interoperability'}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === 'pt' 
                        ? 'Tecnologia Conecta Gov.br para cruzamento automatizado de dados federais e locais, impedindo que cidadãos apresentem certidões redundantes.'
                        : 'Conecta Gov.br technology for automated crossing of federal and local data, preventing citizens from presenting redundant certificates.'}
                    </p>
                  </div>
                </div>

                {/* PNGI Sol 6 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 hover:border-[#003366] transition-all">
                  <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#003366]">{language === 'pt' ? 'Política de Cotas para Mulheres' : 'Women Quota Policy'}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {language === 'pt' 
                        ? 'Regra de reserva compulsória de 8% de vagas em contratações públicas locais de serviços contínuos terceirizados para vítimas de violência doméstica.'
                        : 'Compulsory reservation rule of 8% of positions in local public procurement of outsourced continuous services for domestic violence victims.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>


        {/* Section: Biblioteca de Minutas e Modelos Jurídicos */}
        <section id="modelos" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
                {t.templates.title}
              </h2>
              <p className="text-xs md:text-sm text-slate-500 max-w-xl">
                {t.templates.desc}
              </p>
            </div>

            {/* Document Search Bar */}
            <div className="relative max-w-xs w-full shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t.templates.labelSearch} 
                value={docSearchQuery}
                onChange={(e) => setDocSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#003366] bg-slate-50/50 outline-none"
              />
            </div>
          </div>

          {/* Document release cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.templates.data
              .filter((doc: any) => 
                doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) || 
                doc.desc.toLowerCase().includes(docSearchQuery.toLowerCase())
              )
              .map((doc: any) => {
                const size = doc.id === 'edital' ? '4.8 KB' : doc.id === 'fomento' ? '3.5 KB' : doc.id === 'colabora' ? '3.9 KB' : '2.8 KB';
                const docType = doc.id === 'edital' ? 'EDITAL' : doc.id === 'fomento' ? 'FOMENTO' : doc.id === 'colabora' ? 'COLAB' : 'ACT';
                const badgeColor = doc.id === 'edital' ? 'bg-blue-50 border-blue-200 text-blue-700' : doc.id === 'fomento' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : doc.id === 'colabora' ? 'bg-purple-50 border-purple-200 text-purple-700' : 'bg-amber-50 border-amber-200 text-amber-700';

                return (
                  <div key={doc.id} className="bg-slate-50/40 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-xs transition-all duration-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded border text-[9px] font-extrabold tracking-wider ${badgeColor}`}>
                          {docType}
                        </span>
                        <span className="text-[9px] text-slate-400 font-mono font-bold">{size}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-800 tracking-tight">{doc.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1">{doc.desc}</p>
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-5 pt-4 border-t border-slate-200/60">
                      <button 
                        onClick={() => setPreviewingDoc(doc)}
                        className="flex-1 py-1.5 px-3 bg-white border border-slate-200 hover:bg-slate-55 text-slate-700 font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                      >
                        <span>{t.templates.btnViewText}</span>
                      </button>
                      
                      <button 
                        onClick={() => downloadDocAsTxt(doc.filename, doc.templateText)}
                        className="py-1.5 px-3 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.templates.btnDownload}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Minuta Preview Modal */}
          <AnimatePresence>
            {previewingDoc && (
              <div className="fixed inset-0 bg-slate-955/80 backdrop-blur-xs z-55 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-200 rounded-3xl p-6 max-w-2xl w-full space-y-5 shadow-2xl relative text-left"
                >
                  <button 
                    onClick={() => setPreviewingDoc(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-750 transition-colors cursor-pointer text-sm font-bold p-1"
                  >
                    ✕
                  </button>
                  
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[9px] font-bold tracking-wider font-mono">
                      {previewingDoc.filename}
                    </span>
                    <h3 className="text-base font-bold text-[#003366] tracking-tight">{previewingDoc.title}</h3>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                      <span>{language === 'pt' ? 'ARQUIVO DE MODELO' : 'TEMPLATE FILE'}</span>
                      <span className="text-amber-500 font-bold">{language === 'pt' ? 'MINUTA OFICIAL AGU' : 'OFFICIAL AGU DRAFT'}</span>
                    </div>
                    <div className="p-4 overflow-y-auto max-h-[300px] font-mono text-[9px] text-slate-300 leading-relaxed whitespace-pre-wrap select-all scrollbar-thin">
                      {previewingDoc.templateText}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 flex-wrap">
                    <span className="text-[9px] text-slate-450 italic max-w-xs leading-relaxed">
                      {language === 'pt' ? '*Nota: Adapte o modelo com os dados específicos do seu órgão e da OSC parceira antes de publicar.' : '*Note: Adapt the model with specific data of your agency and CSO before publishing.'}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          copyDocToClipboard(previewingDoc.templateText);
                        }}
                        className="px-3.5 py-2 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 shadow-xs"
                      >
                        {copiedDoc ? t.templates.btnCopied : t.templates.btnCopy}
                      </button>
                      <button 
                        onClick={() => {
                          downloadDocAsTxt(previewingDoc.filename, previewingDoc.templateText);
                        }}
                        className="px-3.5 py-2 border border-slate-350 hover:bg-slate-55 text-slate-700 font-bold rounded-lg text-[10px] tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{t.templates.btnDownload}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Lightbox Modal for Infographics */}
          <AnimatePresence>
            {activeLightbox && (
              <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-55 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative max-w-5xl w-full flex flex-col items-center gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl"
                >
                  {/* Close Button */}
                  <button 
                    onClick={() => setActiveLightbox(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold p-1 bg-slate-800 rounded-lg border border-slate-700 w-8 h-8 flex items-center justify-center"
                  >
                    ✕
                  </button>

                  <div className="text-center w-full px-8">
                    <h3 className="text-xs font-bold text-slate-300 tracking-tight font-mono">{activeLightbox.title}</h3>
                  </div>

                  {/* Image Container with max sizing */}
                  <div className="w-full flex justify-center bg-slate-950 rounded-2xl overflow-hidden border border-slate-850 p-2 max-h-[75vh]">
                    <img 
                      src={activeLightbox.src} 
                      alt={activeLightbox.title} 
                      className="max-w-full max-h-[70vh] object-contain rounded-xl select-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <a 
                      href={activeLightbox.src} 
                      download 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>{language === 'pt' ? 'Baixar Imagem' : 'Download Image'}</span>
                    </a>
                    <button
                      onClick={() => setActiveLightbox(null)}
                      className="px-4 py-2 border border-slate-700 hover:bg-slate-800 text-slate-350 font-bold rounded-xl text-xs transition-all cursor-pointer"
                    >
                      {language === 'pt' ? 'Fechar' : 'Close'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 3: Interactive Timeline */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
              {t.timeline.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {t.timeline.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Steps list */}
            <div className="lg:col-span-5 space-y-3">
              {t.timeline.data.map((item, idx) => (
                <button 
                  key={`timeline-${idx}`}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-4 cursor-pointer ${idx === activeTimelineIdx ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'}`}
                >
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-mono font-bold text-xs ${idx === activeTimelineIdx ? 'bg-[#003366] text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold text-slate-400 block">{item.date}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${item.status === 'Concluído' || item.status === 'Completed' ? 'bg-green-100 text-green-800' : item.status === 'Em Andamento' || item.status === 'In Progress' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className={`font-bold text-xs md:text-sm mt-0.5 ${idx === activeTimelineIdx ? 'text-[#003366]' : 'text-slate-700'}`}>
                      {item.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>

            {/* Displaying details for active step */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold rounded-full uppercase tracking-wider">
                {t.timeline.stepDetails} {activeTimelineIdx + 1}
              </span>
              
              <div className="space-y-2">
                <span className="text-slate-400 font-mono text-xs block">{t.timeline.data[activeTimelineIdx].date}</span>
                <h3 className="text-lg md:text-xl font-bold text-[#003366]">
                  {t.timeline.data[activeTimelineIdx].title}
                </h3>
              </div>

              <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                {t.timeline.data[activeTimelineIdx].desc}
              </p>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold text-xs text-[#003366]">
                  <Info className="w-4 h-4 text-amber-500" />
                  {t.timeline.mandatoryActions}
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {t.timeline.data[activeTimelineIdx].details}
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-400">
<Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{language === 'pt' ? 'Planejado sob as normas da SEGES/DTPAR e AGU.' : 'Planned under SEGES/DTPAR and AGU standards.'}</span>
              </div>
            </div>
          </div>
        </section>


          </>
        )}

        {/* Section Group: Diário de Bordo */}

        {activeMenuSection === 'diario-bordo' && (
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight flex items-center justify-center gap-2">
                <Calendar className="w-7 h-7 text-[#c5a059]" />
                {language === 'pt' ? 'Diário de Bordo do Projeto' : 'Project Logbook'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                {language === 'pt' 
                  ? 'Acompanhamento técnico e gerencial do Projeto de Expansão do TRANSFEREGOV. Todos os registros são sincronizados e armazenados para consultas futuras.'
                  : 'Technical and managerial tracking of the TRANSFEREGOV Expansion Project. All logs are synced and saved for future reference.'}
              </p>
            </div>

            {/* Input Form Card */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4 max-w-2xl mx-auto">
              <h3 className="text-sm font-extrabold text-[#003366]">
                {language === 'pt' ? 'Novo Registro no Diário de Bordo' : 'New Logbook Entry'}
              </h3>
              
              <form onSubmit={handleAddLogbookEntry} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="font-bold text-slate-600 block">{language === 'pt' ? 'Autor do Registro' : 'Author'}</label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 font-mono select-none">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      {user.email}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 block">{language === 'pt' ? 'Tipo de Entrada' : 'Log Type'}</label>
                    <select
                      value={newLogTipo}
                      onChange={(e) => setNewLogTipo(e.target.value as 'tecnico' | 'gerencial')}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-slate-800 font-bold outline-none cursor-pointer focus:border-[#003366]"
                    >
                      <option value="tecnico">{language === 'pt' ? 'Técnico' : 'Technical'}</option>
                      <option value="gerencial">{language === 'pt' ? 'Gerencial' : 'Managerial'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">{language === 'pt' ? 'Título ou Assunto Resumido' : 'Title or Short Summary'}</label>
                  <input 
                    type="text" 
                    placeholder={language === 'pt' ? 'Ex: Alinhamento de Conformidade AGU' : 'Ex: AGU Compliance Alignment'}
                    value={newLogTitulo} 
                    onChange={(e) => setNewLogTitulo(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none text-slate-850 placeholder:text-slate-400 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-600 block">{language === 'pt' ? 'Descrição das Atividades' : 'Description of Activities'}</label>
                  <textarea
                    rows={3}
                    placeholder={language === 'pt' ? 'Digite as atualizações operacionais, marcos atingidos ou impedimentos...' : 'Enter operational updates, milestones reached, or impediments...'}
                    value={newLogDesc}
                    onChange={(e) => setNewLogDesc(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                {/* Additional/Specific fields from Logbook manual */}
                <div className="border-t border-slate-150 pt-4 space-y-3">
                  <h4 className="font-extrabold text-[#003366] text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#c5a059] rounded-full" />
                    {language === 'pt' ? 'Campos Estruturais do Diário de Bordo (Recomendados)' : 'Structured Logbook Fields (Recommended)'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block">{language === 'pt' ? '👥 Membros Envolvidos' : '👥 Team Members'}</label>
                      <input 
                        type="text" 
                        placeholder={language === 'pt' ? 'Ex: Marcelo Fernandes, Vítor' : 'Ex: Marcelo Fernandes, Vitor'}
                        value={newLogParticipantes} 
                        onChange={(e) => setNewLogParticipantes(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block">{language === 'pt' ? '⚠️ Desafios ou Impedimentos' : '⚠️ Challenges or Blockers'}</label>
                      <input 
                        type="text" 
                        placeholder={language === 'pt' ? 'Ex: Indisponibilidade de acesso a APIs' : 'Ex: API connection issues'}
                        value={newLogDesafios} 
                        onChange={(e) => setNewLogDesafios(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block">{language === 'pt' ? '💡 Lições Aprendidas' : '💡 Lessons Learned'}</label>
                      <input 
                        type="text" 
                        placeholder={language === 'pt' ? 'Ex: Padronização evita refazer chamadas' : 'Ex: Standardizing avoids redundant calls'}
                        value={newLogLicoes} 
                        onChange={(e) => setNewLogLicoes(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-slate-500 block">{language === 'pt' ? '📊 Resultados / Indicadores' : '📊 Metrics / Results'}</label>
                      <input 
                        type="text" 
                        placeholder={language === 'pt' ? 'Ex: Habilitação de 10 novos entes' : 'Ex: Enrollment of 10 new entities'}
                        value={newLogIndicadores} 
                        onChange={(e) => setNewLogIndicadores(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-[#003366] text-white hover:bg-blue-900 font-bold rounded-xl shadow transition-all active:scale-95 cursor-pointer text-xs"
                  >
                    {language === 'pt' ? 'Salvar Registro no Diário' : 'Save Log Entry'}
                  </button>
                </div>
              </form>
            </div>

             {/* Filter Controls Bar */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              {/* Text search */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">{language === 'pt' ? 'Pesquisar Registros' : 'Search Logs'}</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={language === 'pt' ? 'Buscar por palavra-chave...' : 'Search keyword...'}
                    value={logSearchQuery}
                    onChange={(e) => setLogSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none text-slate-800 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Type filter */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">{language === 'pt' ? 'Filtrar por Categoria' : 'Filter by Category'}</label>
                <select
                  value={logFilterType}
                  onChange={(e) => setLogFilterType(e.target.value as any)}
                  className="w-full p-2 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none font-bold text-slate-800 cursor-pointer"
                >
                  <option value="all">{language === 'pt' ? 'Todos os Registros' : 'All Entries'}</option>
                  <option value="tecnico">{language === 'pt' ? 'Apenas Técnico' : 'Technical Only'}</option>
                  <option value="gerencial">{language === 'pt' ? 'Apenas Gerencial' : 'Managerial Only'}</option>
                </select>
              </div>

              {/* Author filter */}
              <div className="space-y-1">
                <label className="font-bold text-slate-500 block">{language === 'pt' ? 'Filtrar por Autor' : 'Filter by Author'}</label>
                <select
                  value={logFilterAuthor}
                  onChange={(e) => setLogFilterAuthor(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 focus:border-[#003366] rounded-xl outline-none font-bold text-slate-800 cursor-pointer"
                >
                  <option value="all">{language === 'pt' ? 'Todos os Autores' : 'All Authors'}</option>
                  <option value="marcelofernandesgarcia@gmail.com">Marcelo Fernandes</option>
                  <option value="vitor.cesar@mgi.gov.br">Vítor César</option>
                  <option value="nayara.anjos@mgi.gov.br">Nayara Anjos</option>
                  <option value="fernando.henrique@mgi.gov.br">Fernando Henrique</option>
                  <option value="lili.araujo@mgi.gov.br">Lili Araujo</option>
                </select>
              </div>
            </div>

            {/* Timeline View */}
            <div className="relative border-l-2 border-slate-200 max-w-3xl mx-auto pl-6 ml-4 md:ml-auto space-y-8 font-sans">
              {logbookEntries
                .filter(log => {
                  const matchesType = logFilterType === 'all' || log.tipo === logFilterType;
                  const matchesAuthor = logFilterAuthor === 'all' || log.autor === logFilterAuthor;
                  const matchesSearch = !logSearchQuery.trim() || 
                    log.descricao.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                    log.autor.toLowerCase().includes(logSearchQuery.toLowerCase());
                  return matchesType && matchesAuthor && matchesSearch;
                })
                .map((log) => {
                  const isTecnico = log.tipo === 'tecnico';
                const dateStr = new Date(log.createdAt).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
                  day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                });
                
                return (
                  <div key={log.id} className="relative group">
                    {/* Bullet marker */}
                    <div className={`absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 bg-white flex items-center justify-center transition-all group-hover:scale-110 ${
                      isTecnico ? 'border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]' : 'border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isTecnico ? 'bg-cyan-500' : 'bg-amber-500'}`} />
                    </div>

                    <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3 hover:shadow-md hover:border-slate-350 transition-all duration-300">
                      <div className="flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400 font-bold">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-700 font-mono">{log.autor}</span>
                          <span className="text-slate-300">•</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${
                            isTecnico ? 'bg-cyan-50 border-cyan-200 text-cyan-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                          }`}>
                            {isTecnico ? (language === 'pt' ? 'Técnico' : 'Technical') : (language === 'pt' ? 'Gerencial' : 'Managerial')}
                          </span>
                        </div>
                        <span>{dateStr}</span>
                      </div>
                      
                      <div className="space-y-1.5">
                        {log.titulo && (
                          <h4 className="text-xs font-extrabold text-[#003366] leading-tight">
                            {log.titulo}
                          </h4>
                        )}
                        <p className="text-slate-700 text-xs leading-relaxed font-normal whitespace-pre-wrap select-text">
                          {log.descricao}
                        </p>
                      </div>

                      {/* Sub-fields display */}
                      {(log.participantes || log.desafios || log.licoes || log.indicadores) && (
                        <div className="mt-2 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-sans text-slate-600 bg-slate-50/50 p-2.5 rounded-xl">
                          {log.participantes && (
                            <div>
                              <strong className="text-[#003366] font-bold block mb-0.5">{language === 'pt' ? '👥 Participantes' : '👥 Participants'}</strong>
                              <span className="text-slate-650">{log.participantes}</span>
                            </div>
                          )}
                          {log.desafios && (
                            <div>
                              <strong className="text-rose-600 font-bold block mb-0.5">{language === 'pt' ? '⚠️ Desafios / Impedimentos' : '⚠️ Challenges / Blockers'}</strong>
                              <span className="text-slate-650">{log.desafios}</span>
                            </div>
                          )}
                          {log.licoes && (
                            <div>
                              <strong className="text-emerald-600 font-bold block mb-0.5">{language === 'pt' ? '💡 Lições Aprendidas' : '💡 Lessons Learned'}</strong>
                              <span className="text-slate-650">{log.licoes}</span>
                            </div>
                          )}
                          {log.indicadores && (
                            <div>
                              <strong className="text-blue-600 font-bold block mb-0.5">{language === 'pt' ? '📊 Resultados / Indicadores' : '📊 Metrics / Results'}</strong>
                              <span className="text-slate-650">{log.indicadores}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}


        {/* Section Group: Material para Subsidiar o Site */}

        {activeMenuSection === 'subsidio-site' && (
          <section className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#003366] tracking-tight flex items-center justify-center gap-2">
                <Share2 className="w-7 h-7 text-[#c5a059]" />
                {language === 'pt' ? 'Material de Subsídio Institucional' : 'Institutional Support Kit'}
              </h2>
              <p className="text-xs md:text-sm text-slate-500">
                {language === 'pt' 
                  ? 'Recursos para embasar a página de divulgação divulgação do TRANSFEREGOV. Gráficos, premissas de conformidade e material para imprensa.'
                  : 'Resources to support the TRANSFEREGOV public dissemination page. Charts, compliance premises, and press kit.'}
              </p>
            </div>

            {/* Grid of Materials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
              
              {/* Slides / Value Propositions */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-[#003366] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  {language === 'pt' ? 'Premissas e Mensagens Chave' : 'Key Premises & Messages'}
                </h3>
                <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-[#003366] font-bold block">{language === 'pt' ? '01. Rastreabilidade Absoluta' : '01. Absolute Traceability'}</strong>
                    <span>{language === 'pt' ? 'Cada centavo investido possui nexo causal validado pelo TCU e MGI na Plataforma Transferegov.br.' : 'Every cent invested has a causal link validated by TCU and MGI on the Transferegov.br Platform.'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-[#003366] font-bold block">{language === 'pt' ? '02. Segurança Jurídica' : '02. Legal Security'}</strong>
                    <span>{language === 'pt' ? 'Garantida através da adoção das minutas padrão homologadas pela AGU no rito MROSC e ADPF 854.' : 'Guaranteed through the adoption of standard templates approved by AGU in MROSC and ADPF 854.'}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <strong className="text-[#003366] font-bold block">{language === 'pt' ? '03. Habilitação Federativa' : '03. Federative Qualification'}</strong>
                    <span>{language === 'pt' ? 'Simplificação do rito de conveniamento por meio de diagnósticos automatizados da prontidão de adesão.' : 'Simplification of the agreement process through automated diagnostics of adherence readiness.'}</span>
                  </div>
                </div>
              </div>

              {/* Press Kit / Downloads */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-extrabold text-[#003366] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    {language === 'pt' ? 'Kit para Imprensa e Divulgação' : 'Press & Dissemination Kit'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'pt' 
                      ? 'Baixe a documentação executiva oficial compilada, contendo logotipos homologados do TRANSFEREGOV, fatias de rollout, gráficos estatísticos e apresentações em slides para alimentar o site principal.'
                      : 'Download the official compiled executive documentation, including approved TRANSFEREGOV logos, rollout charts, statistical graphics, and slide presentations to power the main site.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      alert(language === 'pt' ? 'Iniciando download do Kit Executivo (Press_Kit_Transferegov.zip) contendo logotipos, slides e dados do projeto.' : 'Starting download of Executive Kit (Press_Kit_Transferegov.zip) containing logos, slides, and project data.');
                    }}
                    className="w-full py-3 bg-[#003366] hover:bg-blue-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer shadow-sm animate-pulse"
                  >
                    <Download className="w-4 h-4 text-[#c5a059]" />
                    {language === 'pt' ? 'Baixar Kit de Subsídio Executivo (.ZIP)' : 'Download Executive Support Kit (.ZIP)'}
                  </button>
                  
                  <div className="text-[10px] text-center text-slate-400">
                    {language === 'pt' ? 'Tamanho total: 12.4 MB | Formatos: PDF, PNG, PPTX e SVG' : 'Total size: 12.4 MB | Formats: PDF, PNG, PPTX, and SVG'}
                  </div>
                </div>
              </div>
            </div>

            {/* Presentation Slides */}
            {(() => {
              const slidesData = [
                {
                  titlePt: "01. Rastreabilidade Absoluta do Orçamento",
                  titleEn: "01. Absolute Budget Traceability",
                  descPt: "Cada repasse voluntário ou emenda é monitorado de ponta a ponta na Plataforma Transferegov.br, com vinculação obrigatória de notas fiscais e dados do TCU para garantir a aplicação regular dos recursos federais.",
                  descEn: "Every voluntary transfer or amendment is monitored end-to-end on the Transferegov.br Platform, with mandatory linking of invoices and TCU data to ensure the regular application of federal funds."
                },
                {
                  titlePt: "02. Segurança Jurídica com a AGU",
                  titleEn: "02. Legal Security with the AGU",
                  descPt: "Uso padronizado de minutas de editais e termos de colaboração jurídica homologados pela Advocacia-Geral da União (AGU). Redução de 87% nos riscos de apontamentos em auditorias de convênios.",
                  descEn: "Standardized use of draft public calls and collaboration terms approved by the Attorney General's Office (AGU). Reduction of 87% in audit recommendation risks."
                },
                {
                  titlePt: "03. Habilitação Federativa Simplificada",
                  titleEn: "03. Simplified Federative Qualification",
                  descPt: "Diagnóstico ágil de elegibilidade PNGI com cálculo reativo automatizado de prontidão em 3 etapas, eliminando burocracias desnecessárias e otimizando a fase de planejamento municipal.",
                  descEn: "Agile PNGI eligibility diagnosis with automated 3-step reactive readiness calculation, eliminating unnecessary red tape and optimizing the municipal planning phase."
                },
                {
                  titlePt: "04. Transparência Ativa e Obras Georreferenciadas",
                  titleEn: "04. Active Transparency & Georeferenced Works",
                  descPt: "Acompanhamento visual direto de andamento de obras locais via aplicativo Cidadãogov.br, com uploads de fotos georreferenciadas e acompanhamento da comunidade em tempo real.",
                  descEn: "Direct visual tracking of local works progress via the Cidadãogov.br app, with georeferenced photo uploads and real-time community monitoring."
                }
              ];

              return (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl max-w-4xl mx-auto space-y-6 text-white font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-[#c5a059] uppercase">{language === 'pt' ? 'APRESENTAÇÃO INTERATIVA DO PROJETO' : 'INTERACTIVE PROJECT SLIDES'}</span>
                    <span className="px-2.5 py-0.5 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded text-[9px] font-bold">
                      {language === 'pt' ? `Slide ${activeSlideIndex + 1} de ${slidesData.length}` : `Slide ${activeSlideIndex + 1} of ${slidesData.length}`}
                    </span>
                  </div>
                  
                  {/* Slide Content Card with custom transitions */}
                  <div className="bg-slate-950/60 p-8 rounded-2xl border border-slate-800 text-center space-y-6 flex flex-col items-center justify-center min-h-[220px]">
                    <Scale className="w-12 h-12 text-[#c5a059] animate-pulse" />
                    <div className="space-y-2 max-w-lg">
                      <h4 className="text-base font-extrabold text-white">
                        {language === 'pt' ? slidesData[activeSlideIndex].titlePt : slidesData[activeSlideIndex].titleEn}
                      </h4>
                      <p className="text-xs text-slate-350 leading-relaxed font-sans font-normal">
                        {language === 'pt' ? slidesData[activeSlideIndex].descPt : slidesData[activeSlideIndex].descEn}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Controls and Indicators */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-1">
                      {slidesData.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === activeSlideIndex ? 'bg-[#c5a059] w-6' : 'bg-slate-700 hover:bg-slate-500'}`}
                          title={`Slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        disabled={activeSlideIndex === 0}
                        onClick={() => setActiveSlideIndex(prev => prev - 1)}
                        className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold rounded-lg text-[10px] transition-all cursor-pointer flex items-center gap-1"
                      >
                        &larr; {language === 'pt' ? 'Voltar' : 'Back'}
                      </button>
                      <button
                        disabled={activeSlideIndex === slidesData.length - 1}
                        onClick={() => setActiveSlideIndex(prev => prev + 1)}
                        className="px-3.5 py-1.5 bg-[#c5a059] hover:bg-[#b08d4a] disabled:opacity-30 disabled:cursor-not-allowed text-slate-900 font-bold rounded-lg text-[10px] transition-all cursor-pointer flex items-center gap-1"
                      >
                        {language === 'pt' ? 'Avançar' : 'Next'} &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        )}

        {/* Section 5: Gemini AI Advisor Promotion Banner */}
        <section id="orientador" className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 scroll-mt-20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[9px] font-bold tracking-wider font-mono">
                {language === 'pt' ? 'ORIENTADOR IA INTEGRADO' : 'INTEGRATED AI ADVISOR'}
              </span>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-[#003366] tracking-tight">
              {t.aiChat.bannerTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed">
              {t.aiChat.bannerDesc}
            </p>
          </div>
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="px-5 py-3 bg-[#003366] hover:bg-[#002244] text-white font-bold rounded-xl text-xs tracking-wide shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-[#c5a059]" />
            <span>{t.aiChat.bannerBtn}</span>
          </button>
        </section>

        {/* Section 6: VitrineGov / Cases of Success */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
              {language === 'pt' ? 'VitrineGov: Boas Práticas e Casos de Sucesso' : 'VitrineGov: Best Practices and Success Cases'}
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              {language === 'pt' 
                ? 'Modelos de gestão pública inovadora, agilidade administrativa e transparência acumulados de entes já engajados na rede federativa de cooperação.'
                : 'Innovative public management models, administrative agility, and transparency accumulated from entities already engaged in the federative cooperation network.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getSuccessCases(language).map((caseItem, idx) => (
              <div key={`case-${idx}`} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-100 font-mono text-[9px] font-bold rounded">
                    {caseItem.badge}
                  </span>
                  <h3 className="font-bold text-sm text-[#003366]">{caseItem.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{caseItem.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[11px] font-mono font-bold text-slate-400">
                  <span>{language === 'pt' ? 'Ente Executor' : 'Executing Entity'}</span>
                  <span className="text-[#003366]">{caseItem.state}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Strategic Challenges & Risks */}
        <section className="bg-[#fcf8f2] border border-amber-200 rounded-2xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5.5 h-5.5 text-amber-600" />
            <h3 className="font-bold text-[#003366] text-base">{language === 'pt' ? 'Complexidade e Fatores de Risco Operacionais' : 'Operational Complexity & Risk Factors'}</h3>
          </div>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
            {language === 'pt' 
              ? 'A implementação nacional e o cumprimento integral da ordem judicial da ADPF 854 impõem desafios complexos que exigem transparência técnica sincera entre os parceiros federativos.'
              : 'National implementation and full compliance with the ADPF 854 judicial order impose complex challenges that require sincere technical transparency among federative partners.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-600 pt-2">
            <div className="space-y-1 bg-white/60 p-3.5 rounded-xl border border-amber-200/50">
              <span className="font-bold text-amber-900 block">{language === 'pt' ? 'Capacidade Operacional' : 'Operational Capacity'}</span>
              <p className="leading-relaxed">{language === 'pt' ? 'Inexistência imediata de novas dotações orçamentárias ou ampliação do quadro de servidores do MGI para esta transição. Otimização de processos é prioritária.' : 'Immediate absence of new budget allocations or expansion of the MGI staff for this transition. Process optimization is a priority.'}</p>
            </div>
            <div className="space-y-1 bg-white/60 p-3.5 rounded-xl border border-amber-200/50">
              <span className="font-bold text-amber-900 block">{language === 'pt' ? 'Heterogeneidade Tecnológica' : 'Technological Heterogeneity'}</span>
              <p className="leading-relaxed">{language === 'pt' ? 'Extrema disparidade de maturidade, sistemas e equipe técnica em pequenos municípios, exigindo suporte assistido e simplificações sistêmicas sob medida.' : 'Extreme disparity in maturity, systems, and technical staff in small municipalities, requiring assisted support and tailored systemic simplifications.'}</p>
            </div>
            <div className="space-y-1 bg-white/60 p-3.5 rounded-xl border border-amber-200/50">
              <span className="font-bold text-amber-900 block">{language === 'pt' ? 'Dependência do SERPRO' : 'Dependence on SERPRO'}</span>
              <p className="leading-relaxed">{language === 'pt' ? 'Avanços, desenvolvimento e correções na plataforma do Transferegov dependem do SERPRO, estando condicionados aos seus prazos e janelas de manutenção.' : 'Advances, development, and corrections on the Transferegov platform depend on SERPRO, being conditioned on their deadlines and maintenance windows.'}</p>
            </div>
          </div>
        </section>

        {/* Section: Banco de Prospecção de Evoluções (Pós-Fase Inicial) */}
        <section id="prospeccao-evolucoes" className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-6 md:p-8 space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-600 border border-amber-500/25 text-[9px] font-bold rounded uppercase tracking-wider">
                {language === 'pt' ? 'Banco de Prospecção de Evoluções' : 'Evolutions Prospecting Database'}
              </span>
              <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-500 border border-blue-500/25 text-[9px] font-bold rounded uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-blue-500" /> {language === 'pt' ? 'Executado via Central' : 'Executed via Center'}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#003366] tracking-tight">
              {language === 'pt' ? 'Mapeamento de Evoluções Negociais Pós-Internalização' : 'Post-Internalization Business Evolutions Mapping'}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 max-w-3xl leading-relaxed">
              {language === 'pt' 
                ? 'Esta funcionalidade de Monitoramento de Obras Georreferenciadas (via Cidadãogov.br) foi movida para este painel de prospecção após aprovação e execução da sugestão enviada pelo colaborador Vítor César, focando o fluxo principal da Landing Page nas ações obrigatórias e cronogramas imediatos de internalização.'
                : 'This Georeferenced Works Monitoring feature (via Cidadãogov.br) was moved to this prospecting panel after approval and execution of the suggestion sent by collaborator Vítor César, focusing the main flow of the Landing Page on mandatory actions and immediate internalization timelines.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Map visual mockup */}
            <div className="lg:col-span-7 bg-[#0f172a] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between relative overflow-hidden shadow-inner min-h-[350px]">
              {/* Background grid representing a blueprints/tech grid */}
              <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              <div className="relative z-10 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> {language === 'pt' ? 'MAPA DE FISCALIZAÇÃO ATIVA (SALVADOR - BA)' : 'ACTIVE INSPECTION MAP (SALVADOR - BA)'}</span>
                <span className="text-slate-500 font-bold">{language === 'pt' ? 'PROSPECÇÃO CIDADÃOGOV' : 'PROSPECTING CIDADÃOGOV'}</span>
              </div>

              {/* Graphic city blueprint representation with SVG lines */}
              <div className="flex-1 w-full relative flex items-center justify-center py-10 select-none">
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 500 300">
                  <path d="M 50,50 L 450,50 L 450,250 L 50,250 Z" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="100" y1="50" x2="100" y2="250" stroke="#334155" strokeWidth="0.5" />
                  <line x1="250" y1="50" x2="250" y2="250" stroke="#334155" strokeWidth="0.5" />
                  <line x1="400" y1="50" x2="400" y2="250" stroke="#334155" strokeWidth="0.5" />
                  <line x1="50" y1="100" x2="450" y2="100" stroke="#334155" strokeWidth="0.5" />
                  <line x1="50" y1="150" x2="450" y2="150" stroke="#334155" strokeWidth="0.5" />
                  <line x1="50" y1="200" x2="450" y2="200" stroke="#334155" strokeWidth="0.5" />
                  {/* Styled diagonal streets */}
                  <path d="M 50,80 Q 200,120 450,90" fill="none" stroke="#475569" strokeWidth="2" />
                  <path d="M 120,50 Q 250,200 220,250" fill="none" stroke="#475569" strokeWidth="2" />
                  <path d="M 380,50 C 350,150 420,220 450,230" fill="none" stroke="#475569" strokeWidth="1.5" />
                </svg>

                {/* Blinkable interactive pin drops */}
                {MOCK_WORKS_DATA.map((work) => {
                  const isSelected = selectedWorkId === work.id;
                  const localizedStatus = work.status === 'Concluído' ? (language === 'pt' ? 'Concluído' : 'Completed') : work.status === 'Em Andamento' ? (language === 'pt' ? 'Em Andamento' : 'In Progress') : (language === 'pt' ? 'Em Atraso' : 'Delayed');
                  return (
                    <button
                      key={work.id}
                      onClick={() => setSelectedWorkId(work.id)}
                      style={{ left: work.x, top: work.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-all active:scale-95"
                    >
                      {/* Blinking halo */}
                      <span className={`absolute -inset-2.5 rounded-full opacity-60 animate-ping ${
                        work.status === 'Concluído' ? 'bg-green-500' : work.status === 'Em Andamento' ? 'bg-yellow-500' : 'bg-rose-500'
                      }`} />
                      
                      {/* Main dot */}
                      <div className={`w-4 h-4 rounded-full border-2 shadow-lg flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'scale-125 bg-white border-white' 
                          : work.status === 'Concluído' ? 'bg-green-500 border-green-300' : work.status === 'Em Andamento' ? 'bg-yellow-500 border-yellow-300' : 'bg-rose-500 border-rose-300'
                      }`}>
                        <span className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                      </div>
                      
                      {/* Tooltip on hover */}
                      <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 bg-slate-900 text-white border border-slate-700 text-[9px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
                        SIAFI {work.siafi} ({localizedStatus})
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative z-10 flex gap-4 text-[9px] font-mono text-slate-500 border-t border-slate-850 pt-2 flex-wrap">
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> {language === 'pt' ? 'CONCLUÍDA' : 'COMPLETED'}</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> {language === 'pt' ? 'EM ANDAMENTO' : 'IN PROGRESS'}</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> {language === 'pt' ? 'EM ATRASO' : 'DELAYED'}</div>
                <div className="text-slate-400 ml-auto font-bold">{language === 'pt' ? '*Clique nos pins para ver os detalhes da fiscalização.' : '*Click on pins to view inspection details.'}</div>
              </div>
            </div>

            {/* Side details panel (Cidadãogov details) */}
            {(() => {
              const activeWork = MOCK_WORKS_DATA.find(w => w.id === selectedWorkId) || MOCK_WORKS_DATA[0];
              const localizedStatus = activeWork.status === 'Concluído' ? (language === 'pt' ? 'Concluído' : 'Completed') : activeWork.status === 'Em Andamento' ? (language === 'pt' ? 'Em Andamento' : 'In Progress') : (language === 'pt' ? 'Em Atraso' : 'Delayed');
              return (
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-sm">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start flex-wrap gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        activeWork.status === 'Concluído' ? 'bg-green-100 text-green-800' : activeWork.status === 'Em Andamento' ? 'bg-yellow-100 text-yellow-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {language === 'pt' ? 'Status: ' : 'Status: '}{localizedStatus}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">SIAFI ID: {activeWork.siafi}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm text-[#003366] leading-tight">{activeWork.name}</h3>
                      <span className="text-[10px] text-slate-400 block">{language === 'pt' ? 'OSC Executora: ' : 'Executing CSO: '}<strong>{activeWork.osc}</strong></span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 text-[10px] block">{language === 'pt' ? 'Valor do Convênio' : 'Agreement Value'}</span>
                        <span className="font-bold text-[#003366]">{activeWork.value}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="text-slate-400 text-[10px] block">{language === 'pt' ? 'Progresso Físico' : 'Physical Progress'}</span>
                        <span className="font-bold text-[#003366]">{activeWork.progress}%</span>
                      </div>
                    </div>

                    {/* Georeferenced Photo Simulation */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-[#003366] block font-mono">{language === 'pt' ? 'FOTO GEORREFERENCIADA ATIVA' : 'ACTIVE GEOREFERENCED PHOTO'}</span>
                      <div className="relative rounded-xl overflow-hidden border border-slate-350 aspect-[4/3] bg-slate-900 group shadow">
                        <img 
                          src={activeWork.imagePath} 
                          alt={activeWork.name}
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all"
                        />
                        {/* Overlay with stamps */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-3 font-mono text-[9px] text-green-400 leading-tight">
                          <div>LATITUDE: {activeWork.lat}</div>
                          <div>LONGITUDE: {activeWork.lng}</div>
                          <div>TIMESTAMP: {activeWork.timestamp}</div>
                          <div className="text-white font-bold text-[8px] mt-1 border-t border-white/20 pt-1 tracking-wider">{language === 'pt' ? 'COMPATÍVEL CIDADÃOGOV' : 'CIDADÃOGOV APP COMPLIANT'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/60 border border-blue-150 p-3 rounded-xl text-[11px] text-slate-600 leading-relaxed mt-4 font-sans">
                    <strong>{language === 'pt' ? 'Regra ADPF 854:' : 'ADPF 854 Rule:'}</strong> {language === 'pt' ? 'Todo pagamento de despesa em obras deve estar vinculado à comprovação física por meio de fotos coordenadas salvas no Cidadãogov.br antes da liberação do saldo.' : 'Every expense payment in works must be linked to physical proof through coordinated photos saved in Cidadãogov.br before the release of the balance.'}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 8: Módulo de Acesso Temporário & Especificações de Integração Antigravity */}
        <section id="antigravity-integration-panel" className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 space-y-8 border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/25 font-mono text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {language === 'pt' ? 'Módulo de Acesso Temporário' : 'Temporary Access Module'}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-mono text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {language === 'pt' ? 'INTEGRAÇÃO ANTIGRAVITY' : 'ANTIGRAVITY INTEGRATION'}
                </span>
              </div>
              <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white">
                {language === 'pt' ? 'Roteiro de Desenvolvimento & Especificação Técnica' : 'Development Roadmap & Technical Specification'}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 max-w-3xl leading-relaxed">
                {language === 'pt' 
                  ? 'Este painel condensa as diretrizes estruturais de conformidade, os requisitos técnicos otimizados de buffering e o roteiro de funcionalidades da Landing Page (LP), integrados ao nosso ambiente de desenvolvimento ativo.'
                  : 'This panel condenses structural compliance guidelines, optimized buffering technical requirements, and the Landing Page (LP) feature roadmap, integrated into our active development environment.'}
              </p>
            </div>
          </div>

          {/* Sync Success Alert */}
          {syncStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-xs flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="block">{language === 'pt' ? 'Conexão de Metadados Estabelecida!' : 'Metadata Connection Established!'}</strong>
                {language === 'pt' 
                  ? 'As especificações operacionais da Landing Page foram atualizadas com sucesso e injetadas no ambiente Antigravity. Todos os dados permanecem espelhados em tempo real na rota de integração' 
                  : 'Landing Page operational specifications have been successfully updated and injected into the Antigravity environment. All data remains mirrored in real time on the integration route'}{' '}
                <code className="bg-slate-900 px-1 py-0.5 rounded font-mono text-white text-[10px]">/api/antigravity</code>.
              </div>
            </motion.div>
          )}

          {/* Core Spec Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Box 1: Objetivo & Origem NotebookLM */}
            <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-white">{language === 'pt' ? 'Objetivo da LP & Fonte de Dados' : 'LP Goal & Data Source'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'pt' ? 'Centralizar e operacionalizar as regras de conformidade e transparência exigidas pelo Ministério da Gestão e Inovação.' : 'Centralize and operationalize the compliance and transparency rules required by the Ministry of Management and Innovation.'}
                </p>
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                  <span className="font-bold text-[#c5a059] block mb-1">{language === 'pt' ? 'Aviso de Referência:' : 'Reference Notice:'}</span>
                  {language === 'pt' 
                    ? 'Todo o material didático original, especificações do eMAG, cartilhas de transição técnica e fluxos operacionais estão hospedados na nossa base de conhecimento estruturada no'
                    : 'All original teaching materials, eMAG specifications, technical transition handbooks, and operational flows are hosted in our structured knowledge base in'}{' '}
                  <strong>NotebookLM</strong>{language === 'pt' ? ', servindo como alicerce conceitual contínuo do projeto.' : ', serving as the project\'s continuous conceptual foundation.'}
                </div>
              </div>
            </div>

            {/* Box 2: Marcos de Legislação */}
            <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20">
                <Scale className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">{language === 'pt' ? 'Marcos Regulatórios Atendidos' : 'Regulatory Milestones Met'}</h3>
                <div className="space-y-2.5 text-xs text-slate-400">
                  <div className="border-l-2 border-amber-500/50 pl-3">
                    <span className="font-semibold text-white block">ADPF 854 - STF</span>
                    {language === 'pt' ? 'Regra constitucional exigindo rastreabilidade financeira absoluta de transferências de emendas parlamentares na ponta da aplicação.' : 'Constitutional rule requiring absolute financial traceability of parliamentary amendment transfers at the end of application.'}
                  </div>
                  <div className="border-l-2 border-blue-500/50 pl-3">
                    <span className="font-semibold text-white block">eMAG ({language === 'pt' ? 'Acessibilidade' : 'Accessibility'})</span>
                    {language === 'pt' ? 'Atendimento integral às diretrizes do Modelo de Acessibilidade em Governo Eletrônico para inclusão digital.' : 'Full compliance with the guidelines of the Accessibility Model in Electronic Government for digital inclusion.'}
                  </div>
                  <div className="border-l-2 border-emerald-500/50 pl-3">
                    <span className="font-semibold text-white block">LGPD ({language === 'pt' ? 'Privacidade' : 'Privacy'})</span>
                    {language === 'pt' ? 'Governança e proteção dos dados sensíveis informados em consultas ou simulações.' : 'Governance and protection of sensitive data provided in consultations or simulations.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Requisitos Técnicos Otimizados */}
            <div className="bg-slate-800/40 border border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
                <Database className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-white">{language === 'pt' ? 'Requisitos de Sistema & Buffer' : 'System & Buffer Requirements'}</h3>
                <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
                  <p>
                    {language === 'pt' ? 'Para otimizar o carregamento do player multimídia local nas redes estaduais e municipais, implementamos as seguintes melhorias técnicas:' : 'To optimize the loading of the local multimedia player in state and municipal networks, we implemented the following technical improvements:'}
                  </p>
                  <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1">
                    <div>• preload="auto" ({language === 'pt' ? 'Atributo de tags de vídeo' : 'Video tag attribute'})</div>
                    <div>• playsinline ({language === 'pt' ? 'Prevenção de fullscreen mobile forçado' : 'Prevention of forced mobile fullscreen'})</div>
                    <div>• {language === 'pt' ? 'Cache-Control persistente em requisições de mídia' : 'Persistent Cache-Control on media requests'}</div>
                    <div>• {language === 'pt' ? 'Range Requests ativados no Servidor Express' : 'Range Requests enabled on Express Server'}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* User Credentials Simulation Controller (Central de Evolução Simulation) */}
          <div className="bg-slate-850 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  {language === 'pt' ? 'Central de Evolução - Controle de Permissões' : 'Evolution Center - Permissions Control'}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-white font-mono">{user.email}</span>
                  {isMarcelo ? (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[9px] font-bold rounded">
                      {language === 'pt' ? 'ADMIN (EXECUÇÃO + REGISTRO)' : 'ADMIN (EXECUTION + REGISTER)'}
                    </span>
                  ) : canRegister ? (
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/25 text-[9px] font-bold rounded">
                      {language === 'pt' ? 'COLABORADOR (REGISTRO)' : 'COLLABORATOR (REGISTER)'}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-rose-500/10 text-rose-450 border border-rose-500/25 text-[9px] font-bold rounded">
                      {language === 'pt' ? 'VISITANTE (BLOQUEADO)' : 'VISITOR (BLOCKED)'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setUser({ email: 'marcelofernandesgarcia@gmail.com' })}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    user.email === 'marcelofernandesgarcia@gmail.com' 
                      ? 'bg-blue-600 text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Marcelo (MGI)
                </button>
                <button
                  onClick={() => setUser({ email: 'vitor.cesar@mgi.gov.br' })}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    user.email === 'vitor.cesar@mgi.gov.br' 
                      ? 'bg-amber-600 text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Vítor (MGI)
                </button>
                <button
                  onClick={() => setUser({ email: 'nayara.anjos@mgi.gov.br' })}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    user.email === 'nayara.anjos@mgi.gov.br' 
                      ? 'bg-amber-600 text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Nayara (MGI)
                </button>
                <button
                  onClick={() => setUser({ email: 'fernando.henrique@mgi.gov.br' })}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    user.email === 'fernando.henrique@mgi.gov.br' 
                      ? 'bg-amber-600 text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Fernando (MGI)
                </button>
                <button
                  onClick={() => setUser({ email: 'lili.araujo@mgi.gov.br' })}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    user.email === 'lili.araujo@mgi.gov.br' 
                      ? 'bg-amber-600 text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lili (MGI)
                </button>
                <button
                  onClick={() => setUser({ email: 'visitante@governo.gov.br' })}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    user.email === 'visitante@governo.gov.br' 
                      ? 'bg-rose-600 text-white shadow' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {language === 'pt' ? 'Outro Usuário' : 'Other User'}
                </button>
              </div>
            </div>
          </div>

          {/* Roteiro de Funcionalidades Implementadas (Central de Evolução) */}
          <div className="bg-slate-800/20 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              {language === 'pt' ? 'Central de Evolução: Roteiro de Funcionalidades' : 'Evolution Center: Features Roadmap'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-slate-350">
              {evolutionItems.map(item => (
                <div key={item.id} className="bg-slate-800/30 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="font-bold text-blue-400 block">{language === 'pt' ? item.namePt : item.nameEn}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold tracking-wider border ${
                        item.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        item.status === 'IN_PROGRESS' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {language === 'pt' ? item.descPt : item.descEn}
                    </p>
                  </div>
                  
                  {/* Executar no Antigravity Button */}
                  <button 
                    disabled={!isMarcelo || item.status !== 'APPROVED'} 
                    onClick={() => executeInAntigravity(item)}
                    className={`w-full py-2 px-3 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      (!isMarcelo || item.status !== 'APPROVED')
                        ? 'bg-slate-800/50 text-slate-500 border border-slate-800/30 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-600 shadow-md active:scale-95'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    {language === 'pt' ? 'Executar no Antigravity' : 'Execute in Antigravity'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Central de Evolução Real-Time */}
          <CentralEvolucao 
            userEmail={user.email} 
            onExecute={executeInAntigravity} 
            language={language}
          />

          {/* Collapsible JSON Viewer */}
          <AnimatePresence>
            {showAntigravityJson && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden"
              >
                <div className="flex items-center justify-between bg-slate-900 px-4 py-3 border-b border-slate-800">
                  <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                    <Code className="w-4 h-4 text-emerald-400" />
                    antigravity-spec.json ({language === 'pt' ? 'Metadados de Integração do Agente' : 'Agent Integration Metadata'})
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const jsonStr = `{
  "project": "Analista de Conformidade Mtur-COAPC & Módulo de Gestão de Parcerias",
  "objective": "Centralizar, capacitar e operacionalizar as regras de conformidade e transparência para o Módulo de Gestão de Parcerias no Transferegov.br...",
  "legislations": [
    { "name": "ADPF 854 - STF", "impact": "Obrigatoriedade de rastreamento absoluto" },
    { "name": "eMAG (Acessibilidade)", "impact": "Libras e Audiodescrição" }
  ],
  "video_buffering_optimization": {
    "preload": "auto",
    "playsinline": true
  }
}`;
                        navigator.clipboard.writeText(jsonStr);
                        setCopySuccess(true);
                        setTimeout(() => setCopySuccess(false), 2000);
                      }}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          {language === 'pt' ? 'COPIADO!' : 'COPIED!'}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          {language === 'pt' ? 'COPIAR CONFIGURAÇÃO' : 'COPY CONFIGURATION'}
                        </>
                      )}
                    </button>

                    <a
                      href="/api/antigravity"
                      download="antigravity-spec.json"
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {language === 'pt' ? 'BAIXAR JSON' : 'DOWNLOAD JSON'}
                    </a>
                  </div>
                </div>
                <div className="p-4 overflow-x-auto max-h-96">
                  <pre className="font-mono text-xs text-emerald-400/90 leading-relaxed leading-5">
                    {JSON.stringify({
                      project: "Analista de Conformidade Mtur-COAPC & Módulo de Gestão de Parcerias",
                      objective: "Centralizar, capacitar e operacionalizar as regras de conformidade e transparência para o Módulo de Gestão de Parcerias no Transferegov.br...",
                      data_sources: {
                        notebooklm: "Todo o material didático original e especificações de conformidade encontram-se estruturados no NotebookLM.",
                        antigravity: "Metadados sincronizados para consumption e desenvolvimento contínuo do agente."
                      },
                      legislations: [
                        { name: "ADPF 854 - STF (Flávio Dino)", scope: "Rastreabilidade absoluta de recursos até fornecedores na ponta" },
                        { name: "eMAG", scope: "Modelo de Acessibilidade em Governo Eletrônico (Libras e Audiodescrição de cena)" },
                        { name: "LGPD", scope: "Lei Geral de Proteção de Dados Pessoais" }
                      ],
                      requirements: {
                        architecture: "Full-Stack Express + React + Vite",
                        video_optimizations: "preload='auto', playsinline, Cache-Control range requests no servidor Express"
                      },
                      features: [
                        "Simulador de Elegibilidade e Transição Regulada",
                        "Assistente Cognitivo de Dúvidas via IA (Gemini API)",
                        "Gerador e Exportador de Manual de Referência em PDF (jsPDF)",
                        "Player de Vídeo Inclusivo com Libras e Audiodescrição",
                        "Linha do Tempo Cronológica Interativa de Rollout",
                        "Catálogo Unificado de Soluções do PNGI"
                      ]
                    }, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </section>

      </main>

      {/* Footer & Organizational Structure */}
      <footer className="bg-[#001f3f] text-white/80 py-10 px-6 md:px-8 border-t border-white/10 mt-12 text-xs">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Secretaries Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-b border-white/10 pb-8 text-white/90">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">{language === 'pt' ? 'Assistência Técnica Direta' : 'Direct Technical Assistance'}</span>
              <ul className="space-y-1 font-semibold text-[11px]">
                <li className="hover:text-amber-400 transition-colors">{language === 'pt' ? 'SETE - Extraordinária para a Transformação do Estado' : 'SETE - Extraordinary for State Transformation'}</li>
                <li className="hover:text-amber-400 transition-colors">{language === 'pt' ? 'SEGES - Secretaria de Gestão e Inovação' : 'SEGES - Secretariat of Management and Innovation'}</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">{language === 'pt' ? 'Sistemas e Tecnologia' : 'Systems and Technology'}</span>
              <ul className="space-y-1 font-semibold text-[11px]">
                <li className="hover:text-amber-400 transition-colors">{language === 'pt' ? 'SGD - Secretaria de Governo Digital' : 'SGD - Secretariat of Digital Government'}</li>
                <li className="hover:text-amber-400 transition-colors">{language === 'pt' ? 'DTPAR - Diretoria de Transferências e Parcerias' : 'DTPAR - Directorate of Transfers and Partnerships'}</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">{language === 'pt' ? 'Patrimônio e Ativos' : 'Heritage and Assets'}</span>
              <ul className="space-y-1 font-semibold text-[11px]">
                <li className="hover:text-amber-400 transition-colors">{language === 'pt' ? 'SPU - Secretaria do Patrimônio da União' : 'SPU - Secretariat of Union Heritage'}</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3">{language === 'pt' ? 'Estatais e Desempenho' : 'State-Owned Enterprises and Performance'}</span>
              <ul className="space-y-1 font-semibold text-[11px]">
                <li className="hover:text-amber-400 transition-colors">{language === 'pt' ? 'SEST - Coordenação e Governança das Empresas Estatais' : 'SEST - Coordination and Governance of State-Owned Enterprises'}</li>
              </ul>
            </div>
            <div className="space-y-1.5 self-center">
              <span className="font-bold text-[#c5a059] block">{language === 'pt' ? 'FALE CONOSCO / CONTROLE' : 'CONTACT US / CONTROL'}</span>
              <p className="text-[10px] leading-relaxed text-slate-300">
                {language === 'pt' 
                  ? 'Acesse o Canal de Ouvidoria, Serviço de Informação ao Cidadão (SIC) e central de denúncias no site do MGI. Em conformidade com a LGPD.'
                  : 'Access the Ombudsman Channel, Citizen Information Service (SIC), and reports center on the MGI website. In compliance with LGPD.'}
              </p>
            </div>
          </div>

          {/* Institutional credit / bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-[#c5a059]" />
              <span>SGP-RedeParcerias © 2026 {language === 'pt' ? 'Ministério da Gestão e da Inovação em Serviços Públicos' : 'Ministry of Management and Innovation in Public Services'}</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:underline hover:text-white transition-colors">{language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}</a>
              <a href="#" className="hover:underline hover:text-white transition-colors">{language === 'pt' ? 'Políticas de Privacidade' : 'Privacy Policies'}</a>
              <a href="#" className="hover:underline hover:text-white transition-colors">{language === 'pt' ? 'Manual do Transferegov' : 'Transferegov Manual'}</a>
            </div>
          </div>

        </div>
      </footer>
      </div>

      {/* Diário de Bordo Info Modal */}
      {isLogbookInfoOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 max-w-3xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl relative text-left font-sans text-xs md:text-sm text-slate-800"
          >
            <button 
              onClick={() => setIsLogbookInfoOpen(false)} 
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer text-base font-bold p-1"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 bg-[#e6f0fa] rounded-xl flex items-center justify-center text-[#003366]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-extrabold text-[#003366]">
                  {language === 'pt' ? 'Guia do Diário de Bordo do Projeto' : 'Project Logbook Guide'}
                </h3>
                <p className="text-[10px] md:text-xs text-slate-500 font-sans">
                  {language === 'pt' ? 'Entenda o que é, os benefícios e as diretrizes de preenchimento para nossa equipe.' : 'Understand what it is, its benefits, and how to write effective logs.'}
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-700 leading-relaxed font-sans font-normal">
              {/* Seção 1: O que é */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-[#003366] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {language === 'pt' ? 'O que é um Diário de Bordo?' : 'What is a Logbook?'}
                </h4>
                <p className="text-xs text-slate-650">
                  {language === 'pt' ? (
                    <>
                      No ambiente profissional, o Diário de Bordo é usado para registrar <strong>atividades, progressos, ideias e desafios</strong> enfrentados em um projeto ou durante a rotina de trabalho. Utilizado em setores de alta governança, serve como um registro cronológico e detalhado das operações diárias, facilitando a organização de tarefas.
                    </>
                  ) : (
                    <>
                      In a professional environment, a Logbook is used to record <strong>activities, progress, ideas, and challenges</strong> faced in a project or during daily work. Used in high-governance sectors, it serves as a detailed chronological record of daily operations, making task management easy.
                    </>
                  )}
                </p>
              </div>

              {/* Seção 2: Benefícios */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-[#003366] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {language === 'pt' ? 'Por que usar? Benefícios Principais' : 'Why use it? Key Benefits'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong className="text-[#003366] font-bold block mb-1">1. Registro de Atividades</strong>
                    Histórico claro de ações e decisões para análises futuras e embasamento em auditorias e conformidade.
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong className="text-[#003366] font-bold block mb-1">2. Comunicação e Transparência</strong>
                    Melhora o alinhamento e a colaboração, garantindo que as dificuldades e progressos sejam de fácil acesso.
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong className="text-[#003366] font-bold block mb-1">3. Aumento de Produtividade</strong>
                    Permite aprender com experiências anteriores, otimizando processos e reduzindo retrabalhos.
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <strong className="text-[#003366] font-bold block mb-1">4. Gestão de Conhecimento</strong>
                    Repositório centralizado de lições aprendidas e melhores práticas acessíveis por qualquer colaborador.
                  </div>
                </div>
              </div>

              {/* Seção 3: Como fazer e Boas Práticas */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-[#003366] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {language === 'pt' ? 'Como Fazer um Registro Eficiente' : 'How to Make an Efficient Log Entry'}
                </h4>
                <ul className="list-disc pl-5 text-xs text-slate-650 space-y-1.5">
                  {language === 'pt' ? (
                    <>
                      <li><strong>Frequência:</strong> Registre as informações logo após concluir uma tarefa importante para não esquecer detalhes cruciais.</li>
                      <li><strong>Objetividade:</strong> Use uma linguagem profissional, clara e concisa. Foque no que foi feito, nos envolvidos e nos resultados.</li>
                      <li><strong>Documente Desafios:</strong> Não oculte problemas. Registrar os impedimentos permite que outros colegas vejam e ofereçam soluções coletivas.</li>
                      <li><strong>Mapeie Lições Aprendidas:</strong> Terminou um projeto ou resolveu um problema difícil? Registre como resolveu para virar referência estratégica.</li>
                    </>
                  ) : (
                    <>
                      <li><strong>Frequency:</strong> Record updates soon after finishing key tasks so you do not forget crucial details.</li>
                      <li><strong>Objectivity:</strong> Use clear, professional, and concise language. Focus on actions, stakeholders, and outcomes.</li>
                      <li><strong>Document Challenges:</strong> Do not hide blockers. Documenting impediments helps teammates notice and help resolve them.</li>
                      <li><strong>Map Lessons Learned:</strong> Finished a project or fixed a tough bug? Write down how you solved it to serve as a reference.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Seção 4: O que colocar */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-[#003366] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {language === 'pt' ? 'O que deve conter no Registro?' : 'What Should a Log Entry Contain?'}
                </h4>
                <p className="text-xs text-slate-650">
                  {language === 'pt' ? (
                    <>
                      Cada registro no SGP coleta automaticamente a <strong>Data e Hora</strong> e o <strong>Autor</strong> com base na sessão de login simulada. O usuário deve preencher o <strong>Tipo de Registro</strong> (Técnico ou Gerencial) e fornecer os <strong>Detalhes da Atividade</strong>, incluindo resultados obtidos, desafios superados e quaisquer referências úteis.
                    </>
                  ) : (
                    <>
                      Each entry in SGP automatically logs the <strong>Date/Time</strong> and <strong>Author</strong> based on the active simulated login session. The user selects the <strong>Entry Type</strong> (Technical or Managerial) and inputs <strong>Activity Details</strong>, including results, challenges, and references.
                    </>
                  )}
                </p>
              </div>

            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-end">
              <button
                onClick={() => setIsLogbookInfoOpen(false)}
                className="px-6 py-2 bg-[#003366] hover:bg-blue-900 text-white font-bold rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {language === 'pt' ? 'Entendi' : 'Understood'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Antigravity Execution Modal */}
      {executingItem && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-6 shadow-2xl relative text-left"
          >
            <button 
              onClick={() => setExecutingItem(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold p-1"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20">
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'pt' ? 'Execução no Antigravity' : 'Execution in Antigravity'}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {language === 'pt' ? `Iniciado por: ${user.email}` : `Initiated by: ${user.email}`}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[11px] text-emerald-400 space-y-2 h-48 overflow-y-auto">
                <div>[System] Connecting to Antigravity 2.0 active workspace...</div>
                <div>[System] User validated: {user.email} (Developer)</div>
                <div>[System] Status checks passed: APPROVED</div>
                <div>[Agent] Fetching item metadata for: {executingItem.id}</div>
                <div>[Agent] Processing requirements from antigravity-spec.json...</div>
                <div className="text-blue-400">[Agent] Initiating execution of: {language === 'pt' ? executingItem.namePt : executingItem.nameEn}</div>
                <div>[Agent] Compiling components and validating styling hooks...</div>
                <div className="text-emerald-300 font-bold">[Success] Execution completed successfully in workspace.</div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'pt' 
                  ? 'A funcionalidade foi simulada com sucesso dentro do ambiente Antigravity. Todos os ganchos de execução e integridade foram verificados com aprovação.'
                  : 'The feature was successfully simulated within the Antigravity environment. All execution hooks and integrity were verified with approval.'}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setExecutingItem(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {language === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Dynamic, Draggable Floating Mascot SGP-Orientador IA */}
      {(() => {
        const driftY = Math.sin(scrollY / 100) * 20;
        const driftX = Math.cos(scrollY / 150) * 12;

        return (
          <AnimatePresence>
            {!isCopilotOpen && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.2}
                whileDrag={{ scale: 1.1, cursor: "grabbing" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="fixed bottom-6 right-6 z-50 cursor-grab select-none touch-none"
                style={{ touchAction: 'none' }}
              >
                {/* Inner div that executes scroll sway animation dynamically */}
                <motion.div
                  animate={{ 
                    y: driftY,
                    x: driftX
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 15
                  }}
                  className="relative group"
                >
                  {/* Tooltip speech bubble */}
                  <div className="absolute bottom-18 right-0 bg-[#003366] text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-700/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-sans flex items-center gap-1.5 z-50">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
                    {language === 'pt' ? 'Precisa de ajuda? Arraste-me ou clique!' : 'Need help? Drag or click me!'}
                    <div className="absolute bottom-[-5px] right-6 w-2.5 h-2.5 bg-[#003366] rotate-45 border-r border-b border-slate-700/30"></div>
                  </div>

                  {/* Original Circle Robo Button */}
                  <div 
                    onClick={() => setIsCopilotOpen(true)}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#002244] to-[#003366] border-2 border-[#c5a059] shadow-2xl flex items-center justify-center relative cursor-pointer active:scale-95 transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-2xl overflow-hidden hover:scale-105"
                    title={language === 'pt' ? 'Fale com o Orientador IA' : 'Talk to the AI Advisor'}
                  >
                    <img 
                      src="/sgp_robo_mascote.jpg" 
                      className="w-full h-full object-cover scale-105 hover:scale-115 transition-all duration-500" 
                      alt="Mascote SGP" 
                    />
                    <span className="absolute top-1 right-1 flex h-3.5 w-3.5 z-10">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })()}

      {/* Retractable Lateral Copilot Panel */}
      <AnimatePresence>
        {isCopilotOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCopilotOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />

            {/* Lateral Copilot Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-slate-900 text-white shadow-2xl z-55 flex flex-col border-l border-slate-800"
            >
              {/* Header */}
              <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <Bot className="w-4.5 h-4.5 text-[#c5a059]" />
                  </div>
                  <div>
                    <span className="font-bold text-xs block">{language === 'pt' ? 'SGP-Orientador IA' : 'SGP-AI Advisor'}</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-[9px] text-slate-400 font-mono">{language === 'pt' ? 'Membro da Rede de Parcerias' : 'Partnerships Network Member'}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsCopilotOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xs font-bold p-1 bg-slate-850 rounded-lg border border-slate-800"
                >
                  ✕
                </button>
              </div>

              {/* Quick prompt chips */}
              <div className="bg-slate-950/40 px-3 py-2 border-b border-slate-800 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-none shrink-0">
                {(chatSuggestions.length > 0 ? chatSuggestions : getPreBakedQuestions(language)).map((question, qIdx) => (
                  <button 
                    key={`q-${qIdx}`}
                    onClick={() => handleSendMessage(question)}
                    className="bg-slate-950 hover:bg-[#c5a059] hover:text-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-[9px] px-2.5 py-1.5 rounded-md transition-all cursor-pointer shrink-0 font-medium font-sans"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Message stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/20">
                {messages.map((msg, index) => (
                  <div 
                    key={`msg-${index}`}
                    className={`flex gap-2.5 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-[#003366] text-white border border-blue-500/20' : 'bg-slate-850 text-[#c5a059] border border-slate-800'}`}>
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className={`p-3 rounded-xl text-[11px] leading-relaxed ${msg.role === 'user' ? 'bg-[#003366] text-white rounded-tr-none font-medium' : 'bg-slate-950 border border-slate-850 rounded-tl-none text-slate-300 shadow-sm'}`}>
                      {msg.role === 'assistant' ? (
                        <div className="markdown-body text-slate-200">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                {isSending && (
                  <div className="flex gap-2.5 max-w-[85%]">
                    <div className="w-7 h-7 rounded-lg bg-slate-850 text-[#c5a059] flex items-center justify-center shrink-0 border border-slate-800">
                      <Bot className="w-3.5 h-3.5 animate-bounce" />
                    </div>
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl rounded-tl-none text-[11px] text-slate-400 flex items-center gap-2">
                      <div className="flex gap-1 shrink-0">
                        <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1 h-1 bg-slate-500 rounded-full animate-bounce" />
                      </div>
                      <span>{language === 'pt' ? 'Analisando diretrizes...' : 'Analyzing guidelines...'}</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input field */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
                <input 
                  type="text" 
                  value={inputMessage} 
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder={language === 'pt' ? 'Pergunte ao Orientador...' : 'Ask the Advisor...'}
                  className="flex-1 p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#c5a059] text-white outline-none"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={isSending || !inputMessage.trim()}
                  className={`p-2.5 rounded-lg flex items-center justify-center transition-all ${isSending || !inputMessage.trim() ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-[#c5a059] text-slate-950 hover:bg-[#b08d4a] active:scale-95 cursor-pointer shadow font-bold'}`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
