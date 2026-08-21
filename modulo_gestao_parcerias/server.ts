import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { faqData } from "./src/data/faqData";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SGP_SYSTEM_PROMPT = `
# ATUAÇÃO
Você é o SGP-Compliance - Analista de Conformidade de Parcerias IA, um Auditor Federal sênior especializado no Marco Regulatório das Organizações da Sociedade Civil (MROSC - Lei nº 13.019/2014) e em Transferências Voluntárias da União (Decreto nº 11.531/2023 e Portaria Interministerial 424/2016).

Sua missão é realizar uma análise rigorosa e objetiva de conformidade de documentos relativos à celebração de parcerias com o Poder Público (ex: Termos de Fomento, Termos de Colaboração, Acordos de Cooperação, Convênios).

# PROTOCOLO DE AUDITORIA (SKILLS OPERACIONAIS)
Para qualquer conjunto de documentos carregado, execute o seguinte protocolo:

- **SKL-1 [Rito e Enquadramento]:** Identifica o proponente, CNPJ e o rito aplicável. Enquadra a parceria: MROSC (Lei 13.019/14) se for Organização da Sociedade Civil (OSC), ou Convênio se for consórcio público ou ente federado.
- **SKL-2 [Validação de Existência da OSC]:** Para MROSC, verifica se a OSC cumpre o tempo mínimo de existência exigido por lei: no mínimo 1 ano (municipal), 2 anos (estadual/DF) ou 3 anos (federal). Sinalize [DIVERGÊNCIA] se o tempo de existência for inferior ao exigido pelo nível da parceria.
- **SKL-3 [Regularidade Fiscal e Trabalhista]:** Analisa a validade de certidões essenciais: Receita Federal (RFB), FGTS (CRF) e Trabalhista (CNDT). Alerta se alguma certidão estiver vencida ou não localizada.
- **SKL-4 [Capacidade Técnica/Operacional]:** Verifica se há comprovação de experiência prévia da OSC na execução de objeto semelhante ao da parceria (através de relatórios, declarações de outras entidades ou clipping de projetos passados).
- **SKL-5 [Nexo Causal e Plano de Trabalho]:** Confronta as metas descritas no Plano de Trabalho com a previsão de custos e itens de despesa. Cada centavo previsto deve ter correlação direta com a execução de uma meta da parceria.
- **SKL-8 [Calculadora de Glosas]:** Quantifica financeiramente as inadequações encontradas: itens com valores acima da média de mercado, despesas inelegíveis (tarifas bancárias, multas, taxas, despesas com publicidade não institucional) ou itens sem nexo causal.
- **SKL-9 [Matriz de Risco]:** Classifica cada achado em Baixo, Médio ou Alto Risco, baseado no impacto de uma fiscalização do Tribunal de Contas da União (TCU).
- **SKL-10 [Integridade de Assinaturas]:** Verifica se as minutas, estatutos ou certidões apresentam evidências de assinaturas válidas (eletrônica ICP-Brasil, assinaturas de gestores ou autenticidade SEI).

# REGRAS RÍGIDAS DE COMPLIANCE (JURISPRUDÊNCIA TCU)
- **Ficha Limpa:** Os administradores da OSC não podem ter condenações por improbidade administrativa ou crimes contra a administração pública.
- **Duplicidade:** É vedada a celebração de parcerias com objetos idênticos financiados pelo mesmo ente público no mesmo período (bis in idem).
- **Taxas Administrativas:** Despesas administrativas e de pessoal (como salários de pessoal de apoio) na OSC são aceitáveis, desde que previstas no plano de trabalho e limitadas a valores proporcionais ao mercado.

# FORMATO DE SAÍDA (OUTPUT EXPECTED)
Você deve retornar estritamente um objeto JSON com as chaves:
1. \`preliminaryInfo\`: Objeto estruturado com resumo das análises (atendendo ao schema configurado).
2. \`finalReport\`: Parecer Técnico minucioso e formal no formato TXT.
3. \`mermaidFlowchart\`: Código Mermaid (graph LR) representando o fluxo lógico de aprovação/tramitação da parceria.

# REGRAS DE REDAÇÃO DO PARECER (finalReport)
- Use redação oficial, formal e impessoal (evite gírias, contrações e primeira pessoa do singular ou plural).
- Organize o relatório em seções claras: 
  1. IDENTIFICAÇÃO DA PARCERIA
  2. ADMISSABILIDADE E RITO APLICÁVEL
  3. REGULARIDADE DA PROPONENTE (Tempo de Existência e Certidões)
  4. ANÁLISE DO PLANO DE TRABALHO E NEXO CAUSAL
  5. APURAÇÃO DE GLOSAS E RISCOS (Se houver)
  6. CONCLUSÃO E RECOMENDAÇÃO (Aprovação, Aprovação com Ressalvas ou Reprovação/Diligência)
`;

// FAQ Search and Matching Helpers
function findBestFaqMatch(query: string): { item: any; score: number } | null {
  const normalizedQuery = query.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, '');
  
  if (!normalizedQuery.trim()) return null;
  const queryTokens = normalizedQuery.split(/\s+/).filter(t => t.length > 2);
  
  let bestMatch = null;
  let bestScore = 0;
  
  for (const item of faqData) {
    const normQuestion = item.question.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/gi, '');
      
    // Exact or direct substring match
    if (normQuestion.includes(normalizedQuery) || normalizedQuery.includes(normQuestion)) {
      return { item, score: 1.0 };
    }
    
    if (queryTokens.length > 0) {
      let matchCount = 0;
      for (const token of queryTokens) {
        if (normQuestion.includes(token)) {
          matchCount++;
        }
      }
      
      const score = matchCount / queryTokens.length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
  }
  
  if (bestScore > 0.45) {
    return { item: bestMatch, score: bestScore };
  }
  
  return null;
}

function getSuggestionsForQuery(query: string, excludeId?: string): string[] {
  const normalizedQuery = query.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/gi, '');
    
  const queryTokens = normalizedQuery.split(/\s+/).filter(t => t.length > 2);
  const matches: { item: any; score: number }[] = [];
  
  for (const item of faqData) {
    if (item.id === excludeId) continue;
    
    const normQuestion = item.question.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/gi, '');
      
    let matchCount = 0;
    if (queryTokens.length > 0) {
      for (const token of queryTokens) {
        if (normQuestion.includes(token)) {
          matchCount++;
        }
      }
    }
    
    if (matchCount > 0) {
      matches.push({ item, score: matchCount });
    }
  }
  
  // Sort by highest match score
  matches.sort((a, b) => b.score - a.score);
  
  const suggestions = matches.slice(0, 3).map(m => m.item.question);
  
  // Fallbacks if we don't have enough suggestions
  const defaults = [
    "O que é a 'Dupla Habilitação' no Transferegov.br?",
    "Como a ADPF 854 do STF impacta meu município?",
    "O que é a Ordem de Pagamento da Parceria (OPP)?",
    "Como funciona o Kit de Implantação para pequenos municípios?",
    "Quais são os estados elegíveis para o piloto de Julho/2026?"
  ];
  for (const d of defaults) {
    if (suggestions.length >= 3) break;
    if (!suggestions.includes(d)) {
      suggestions.push(d);
    }
  }
  
  return suggestions;
}

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, language } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "O corpo da requisição deve conter uma lista de mensagens." });
    }

    const isEn = language === 'en';
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    const query = lastUserMsg ? lastUserMsg.content : "";
    
    // Check if query is a greeting
    const normQuery = query.toLowerCase().trim();
    if (normQuery === "ola" || normQuery === "oi" || normQuery === "bom dia" || normQuery === "boa tarde" || normQuery === "boa noite" || normQuery === "hello" || normQuery === "hi") {
      const greeting = isEn
        ? "Hello! I am the **SGP-Advisor AI**. I am here to clarify your doubts about the adhesion to the **National Management and Innovation Program (PNGI)** and the implementation of the **Partnership Management Module (ADPF 854)** in Transferegov.br. How can I help your federated entity today?"
        : "Olá! Sou o **SGP-Orientador IA**. Estou aqui para esclarecer suas dúvidas sobre a adesão ao **Programa Nacional de Gestão e Inovação (PNGI)** e a implantação do **Módulo de Gestão de Parcerias (ADPF 854)** no Transferegov.br. Como posso ajudar seu ente federado hoje?";
      
      const suggestions = isEn
        ? [
            "What is 'Dual Qualification' in Transferegov.br?",
            "How does the STF ADPF 854 impact my municipality?",
            "What is the Partnership Payment Order (OPP)?"
          ]
        : [
            "O que é a 'Dupla Habilitação' no Transferegov.br?",
            "Como a ADPF 854 do STF impacta meu município?",
            "O que é a Ordem de Pagamento da Parceria (OPP)?"
          ];

      return res.json({ text: greeting, suggestions });
    }

    // Check if query is about the Diário de Bordo
    if (
      normQuery.includes("diario de bordo") || 
      normQuery.includes("diário de bordo") || 
      normQuery.includes("diariodebordo") || 
      normQuery.includes("diario") ||
      normQuery.includes("logbook")
    ) {
      const responseText = isEn
        ? `### 📔 Project Logbook: What it is, What is in it, and How to use it\n\n` +
          `A **Logbook** is a professional tool used to record activities, progress, ideas, and challenges faced in a project or during daily work. It serves as a detailed chronological log of operations to facilitate task tracking.\n\n` +
          `#### ❓ Why use it?\n` +
          `1. **Detailed Activity Record**: Keeps a clear history of decisions and actions, fundamental for audits.\n` +
          `2. **Communication & Transparency**: Shares work progress accessibly within the team.\n` +
          `3. **Project Management Support**: Identifies bottlenecks and tracks deadlines.\n` +
          `4. **Knowledge Repository**: Documents lessons learned and best practices.\n` +
          `5. **Audit Support**: Serves as evidence of compliance in regulated sectors.\n\n` +
          `#### 🛠️ How to make a good entry?\n` +
          `* **Choose a platform**: SGP includes an integrated digital logbook that persists to disk.\n` +
          `* **Structure**: Each entry must include the date/time, author email, category (technical or managerial), and activity description.\n` +
          `* **Be objective**: Keep entries clear and informative. Jot down details as soon as possible so you don't forget them.\n` +
          `* **Document challenges**: Report blockers so the team can collaborate on solutions.`
        : `### 📔 Diário de Bordo: O que é, O que contém e Como fazer\n\n` +
          `O **Diário de Bordo** no ambiente profissional é usado para registrar de forma sistemática as atividades, progressos, ideias e desafios enfrentados em um projeto. Serve como um registro cronológico e detalhado das operações diárias, facilitando a organização e o acompanhamento de tarefas.\n\n` +
          `#### ❓ Por que usar e quais os Benefícios?\n` +
          `1. **Registro detalhado de atividades**: Mantém um histórico claro de ações e decisões, fundamental para análises futuras e auditorias.\n` +
          `2. **Facilitação da comunicação e transparência**: Melhora o alinhamento e o compartilhamento de aprendizados entre todos os membros.\n` +
          `3. **Melhoria na gestão de projetos**: Permite avaliar o progresso, identificar gargalos e planejar estrategicamente.\n` +
          `4. **Aumento da produtividade e eficiência**: Ajuda a equipe a aprender com experiências anteriores e a otimizar processos.\n` +
          `5. **Gestão do conhecimento**: Serve como um repositório centralizado de lições aprendidas e melhores práticas.\n` +
          `6. **Suporte para auditorias e conformidade**: Oferece evidências claras e organizadas de conformidade com procedimentos e ritos (como MROSC e ADPF 854).\n\n` +
          `#### 🛠️ Como fazer e o que deve conter?\n` +
          `* **Definir formato**: O portal SGP possui um diário digital integrado que grava diretamente em disco.\n` +
          `* **Estrutura essencial**: Cada registro deve ter data e hora, autor, detalhes concisos da atividade (reuniões, decisões, código), resultados obtidos, desafios/impedimentos e lições aprendidas.\n` +
          `* **Regras de preenchimento**: Estabeleça o hábito de preencher no início ou término do expediente. Evite ocultar desafios, pois reportá-los ajuda na colaboração técnica e gerencial.`;

      const suggestions = isEn
        ? [
            "How do I add a log entry?",
            "Filter logs by author",
            "What is 'Compliance Eixo 1'?"
          ]
        : [
            "Como adicionar um registro no diário?",
            "Como filtrar os logs por autor?",
            "O que é o 'Eixo 1' de conformidade?"
          ];

      return res.json({ text: responseText, suggestions });
    }

    // Try to find matching Q&A in the 200 items database
    const match = findBestFaqMatch(query);
    
    if (match) {
      const item = match.item;
      const num = item.id.split('-')[1];
      const prefix = item.id.startsWith('eixo') ? 'Eixo' : 'Grupo';
      
      const responseText = `**Pergunta ${num} (${prefix} - ${item.category}): ${item.question}**\n\nResposta: ${item.answer}`;
      const suggestions = getSuggestionsForQuery(query, item.id);
      
      return res.json({ text: responseText, suggestions });
    }

    // Default system prompt for Gemini fallback if no exact FAQ matched
    const systemPrompt = `
Você é o Assistente Virtual do SGP-RedeParcerias, um especialista em Políticas de Gestão, Parcerias e no Programa Nacional de Gestão e Inovação (PNGI) do Ministério da Gestão e da Inovação em Serviços Públicos (MGI).
Sua função é orientar de forma didática, prestativa e institucional os representantes dos entes federados (Estados, Distrito Federal e Municípios) sobre a adesão ao PNGI, as soluções tecnológicas e, especialmente, sobre o processo de Internalização da Gestão de Parcerias em atendimento à decisão do STF na ADPF 854 (Relator Ministro Flávio Dino).

# DIRETRIZES DE ATENDIMENTO
- Seja sempre formal, institucional, acolhedor e focado no fortalecimento do pacto federativo.
- Nunca crie informações falsas ou fictícias. Use como base absoluta as informações de referência abaixo.
- Explique de forma simples termos técnicos como "Dupla Habilitação", "Ordem de Pagamento da Parceria (OPP)", "Lei MROSC" ou "Rede de Parcerias".

# CONTEXTO TÉCNICO E PROGRAMÁTICO (SUA BASE DE CONHECIMENTO)

1. PROGRAMA NACIONAL DE GESTÃO E INOVAÇÃO (PNGI)
   - O que é: Ecossistema de cooperação técnica e soluções tecnológicas gratuitas liderado pelo MGI.
   - Objetivo: Modernizar a administração pública subnacional (estados e municípios).
   - Elegibilidade PNGI Geral: Estados, capitais ou municípios com mais de 500 mil habitantes.
   - Prazo de Execução: Plano de trabalho de 2 anos a partir do Acordo de Adesão. Exige compromissos de governança e contrapartida de recursos humanos.

2. GESTÃO DE PARCERIAS - INTERNALIZAÇÃO (MÓDULO DO TRANSFEREGOV.BR)
   - Fundamento Legal: Decisão vinculante do STF na ADPF 854 (Ministro Flávio Dino). O MGI deve auxiliar os entes federados a implementar o modelo federal de transparência e rastreabilidade no plano subnacional.
   - Porta de Entrada Principal: A Rede de Parcerias (RedeParcerias) que possui mais de 280 parceiros e 10 anos de experiência acumulada. Será a central única para recebimento e triagem de pedidos.
   - O Escopo Tecnológico Principal (O Módulo):
     * Adaptação do Transferegov.br (Dupla Habilitação): Evolução sistêmica para que estados e municípios operem o Transferegov como REPASSADORES de seus próprios recursos orçamentários. Garante rastreabilidade via Ordem de Pagamento da Parceria (OPP), transparência ativa e fiscalização de obras por georreferenciamento.
     * Painéis Gerenciais & Aplicativos: Monitoragov.br (para gestores) e Cidadãogov.br (para o controle social).

3. CRONOGRAMA DE IMPLANTAÇÃO (ROLLOUT ESCALONADO)
   - Março/2026: Webinários e materiais didáticos de fluxos processuais.
   - Junho/2026: Entrada de pedidos de adesão na Rede de Parcerias e modelos jurídicos padrão validados pela AGU.
   - Julho/2026: Piloto com os Estados que já possuem Acordo de Cooperação Técnica (ACT) vigente: Acre (AC), Alagoas (AL), Amapá (AP), Bahia (BA), Rondônia (RO), Rio Grande do Norte (RN), Roraima (RR) e Tocantins (TO).
   - Outubro/2026: Demais Estados brasileiros.
   - Janeiro/2027: Capitais brasileiras (foco em métricas e transparência).
   - Abril/2027 a Março/2028: Municípios escalonados por faixas populacionais. Municípios menores receberão "Kits de Implantação Prontos" com foco em simplicidade, sem requerer integrações complexas.

4. LEGISLAÇÕES E MARCOS REGULATÓRIOS
   - ADPF 854 (STF): Relatada pelo Ministro Flávio Dino, exige rastreabilidade financeira total ponta a ponta e publicidade de todos os recursos públicos descentralizados.
   - Lei MROSC (Lei nº 13.019/2014): Define o Marco Regulatório das Organizações da Sociedade Civil (OSCs) para parcerias com o poder público. Exige tempo mínimo de existência, regularidade fiscal e trabalhista e capacidade técnica comprovada.

${isEn 
  ? "Respond in clear, friendly, welcoming and professional English. Translate all technical terms and concepts into English. Use bullet lists and bold formatting to keep the response readable."
  : "Responda em linguagem clara, amigável, no idioma Português (Brasil). Use marcações de lista e negritos para manter a resposta legível e profissional."}
`;

    const chatMessages = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    let responseText = "";
    let apiSuccess = false;

    // Try primary model (gemini-3.5-flash)
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatMessages,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.2,
        }
      });
      if (response.text) {
        responseText = response.text;
        apiSuccess = true;
      }
    } catch (primaryErr: any) {
      console.warn("Primary model gemini-3.5-flash failed. Trying fallback model gemini-3.1-flash-lite...", primaryErr.message || primaryErr);
      
      try {
        const responseFallback = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: chatMessages,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2,
          }
        });
        if (responseFallback.text) {
          responseText = responseFallback.text;
          apiSuccess = true;
        }
      } catch (fallbackErr: any) {
        console.error("Both models failed. Using local Q&A fallback matching.", fallbackErr.message || fallbackErr);
      }
    }

    if (!apiSuccess) {
      // Fallback matching using tokens
      const fallbackMatches = getSuggestionsForQuery(query);
      const fallbackFaq = faqData.find(x => x.question === fallbackMatches[0]);
      if (fallbackFaq) {
        const num = fallbackFaq.id.split('-')[1];
        const prefix = fallbackFaq.id.startsWith('eixo') ? 'Eixo' : 'Grupo';
        responseText = `*(Modo Contingência)*\n\n**Pergunta ${num} (${prefix} - ${fallbackFaq.category}): ${fallbackFaq.question}**\n\nResposta: ${fallbackFaq.answer}`;
      } else {
        responseText = isEn
          ? "I am currently experiencing connection difficulties. Please ask specifically about Dual Qualification, ADPF 854, Rollout Timelines, or Partnership Payment Order (OPP)."
          : "Estou enfrentando dificuldades temporárias de conexão com os servidores centrais do Gemini. Sinta-se à vontade para perguntar especificamente sobre a Dupla Habilitação, ADPF 854, Cronograma de Implantação ou Ordem de Pagamento da Parceria (OPP).";
      }
    }

    const suggestions = getSuggestionsForQuery(query);
    res.json({ text: responseText, suggestions });
  } catch (err: any) {
    console.error("Critical Chat Error on Server:", err);
    res.status(500).json({ error: err.message || "Erro interno no processamento da conversa." });
  }
});

// Route to check if any MP4 video exists in the root directory or in the media directory
app.get("/api/video-status", (req, res) => {
  const rootDir = process.cwd();
  const mediaDir = path.join(rootDir, "media");
  
  // Ensure 'media' directory exists in the workspace
  if (!fs.existsSync(mediaDir)) {
    try {
      fs.mkdirSync(mediaDir, { recursive: true });
    } catch (err) {
      console.error("Failed to create media directory:", err);
    }
  }

  const searchDirs = [
    { dir: rootDir, webPrefix: "" },
    { dir: mediaDir, webPrefix: "/media" }
  ];

  try {
    for (const item of searchDirs) {
      if (!fs.existsSync(item.dir)) continue;
      const files = fs.readdirSync(item.dir);
      const videoFile = files.find(f => {
        const lower = f.toLowerCase();
        return (
          lower === "video.mp4" ||
          lower === "vídeo.mp4" ||
          lower === "video-promocional.mp4" ||
          f.normalize("NFD") === "vídeo.mp4".normalize("NFD") ||
          f.normalize("NFC") === "vídeo.mp4".normalize("NFC") ||
          f.normalize("NFD") === "video-promocional.mp4".normalize("NFD") ||
          f.normalize("NFC") === "video-promocional.mp4".normalize("NFC")
        );
      });

      if (videoFile) {
        const fullPath = path.join(item.dir, videoFile);
        if (fs.existsSync(fullPath)) {
          const stats = fs.statSync(fullPath);
          return res.json({ 
            exists: true, 
            filename: videoFile, 
            size: stats.size,
            path: `${item.webPrefix}/${videoFile}`
          });
        }
      }
    }
  } catch (e) {
    console.error("Error reading directory for video status:", e);
  }
  return res.json({ exists: false });
});

// Route to serve video.mp4 / vídeo.mp4 directly from root directory with caching headers and range requests
app.get(["/video.mp4", "/vídeo.mp4"], (req, res) => {
  const rootDir = process.cwd();
  try {
    const files = fs.readdirSync(rootDir);
    const videoFile = files.find(f => {
      const lower = f.toLowerCase();
      return (
        lower === "video.mp4" ||
        lower === "vídeo.mp4" ||
        f.normalize("NFD") === "vídeo.mp4".normalize("NFD") ||
        f.normalize("NFC") === "vídeo.mp4".normalize("NFC")
      );
    });

    if (videoFile) {
      const fullPath = path.join(rootDir, videoFile);
      if (fs.existsSync(fullPath)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        return res.sendFile(fullPath, { acceptRanges: true });
      }
    }
  } catch (e) {
    console.error("Error serving video from root:", e);
  }
  return res.status(404).send("Vídeo não encontrado");
});

// Route to serve files from /media folder with caching headers and range requests
app.get("/media/:filename", (req, res) => {
  const filename = req.params.filename;
  const fullPath = path.join(process.cwd(), "media", filename);
  if (fs.existsSync(fullPath)) {
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.sendFile(fullPath, { acceptRanges: true });
  }
  return res.status(404).send("Mídia não encontrada");
});

// Route to retrieve list of actual media files in the /media folder
app.get("/api/media-files", (req, res) => {
  const mediaDir = path.join(process.cwd(), "media");
  if (!fs.existsSync(mediaDir)) {
    return res.json([]);
  }
  try {
    const files = fs.readdirSync(mediaDir);
    const mediaFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.mp4', '.webm', '.mp3', '.wav', '.m4a', '.aac', '.ogg'].includes(ext);
    });
    return res.json(mediaFiles);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao ler a pasta de mídias." });
  }
});

// Route for temporary developer access and integration spec for Antigravity agent
app.get("/api/antigravity", (req, res) => {
  const specPath = path.join(process.cwd(), "antigravity-spec.json");
  if (fs.existsSync(specPath)) {
    try {
      const data = fs.readFileSync(specPath, "utf-8");
      res.setHeader("Content-Type", "application/json");
      return res.send(data);
    } catch (err) {
      return res.status(500).json({ error: "Falha ao ler o arquivo de especificações do Antigravity." });
    }
  }
  return res.status(404).json({ error: "Arquivo de especificações do Antigravity não encontrado." });
});

// Mock DB Store for multi-user real-time simulation without Firebase keys setup
interface MockDoc {
  id: string;
  autor: string;
  descricao: string;
  status: string;
  createdAt: string;
  votos: number;
}

let mockDbStore: MockDoc[] = [
  {
    id: 'idea-1',
    autor: 'marcelofernandesgarcia@gmail.com',
    descricao: 'Integrar mapa de calor regional com dados do TCU',
    status: 'APPROVED',
    votos: 14,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'idea-2',
    autor: 'visitante@governo.gov.br',
    descricao: 'Adicionar tradução para espanhol no simulador',
    status: 'PENDING',
    votos: 3,
    createdAt: new Date().toISOString(),
  }
];

// Project Logbook (Diário de Bordo) store and parser
interface LogbookEntry {
  id: string;
  autor: string;
  tipo: 'tecnico' | 'gerencial';
  descricao: string;
  createdAt: string;
  titulo?: string;
  participantes?: string;
  desafios?: string;
  licoes?: string;
  indicadores?: string;
}

let logbookDbStore: LogbookEntry[] = [];

try {
  const filePath = path.join(__dirname, "public", "diario_bordo.txt");
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const blocks = fileContent.split("\n\n").filter(Boolean);
    blocks.forEach((block, idx) => {
      const match = block.match(/^\[(.*?)\]\s+\[(.*?)\]\s+\[(.*?)\]\n([\s\S]*)$/);
      if (match) {
        const [, dateStr, tipoStr, autorStr, descStr] = match;
        
        let titulo = '';
        let descricao = descStr.trim();
        let participantes = '';
        let desafios = '';
        let licoes = '';
        let indicadores = '';
        
        const lines = descStr.split("\n");
        let parsedStructured = false;
        const keys: Record<string, string> = {};
        let currentKey = '';
        
        lines.forEach(line => {
          const keyMatch = line.match(/^(Título|Descrição|Participantes|Desafios|Lições|Indicadores|Title|Description|Participants|Challenges|Lessons|Metrics):\s*(.*)$/i);
          if (keyMatch) {
            currentKey = keyMatch[1].toLowerCase();
            keys[currentKey] = keyMatch[2];
            parsedStructured = true;
          } else if (currentKey) {
            keys[currentKey] += '\n' + line;
          }
        });
        
        if (parsedStructured) {
          titulo = keys['título'] || keys['title'] || '';
          descricao = keys['descrição'] || keys['description'] || '';
          participantes = keys['participantes'] || keys['participants'] || '';
          desafios = keys['desafios'] || keys['challenges'] || '';
          licoes = keys['lições'] || keys['lessons'] || '';
          indicadores = keys['indicadores'] || keys['metrics'] || '';
        }
        
        logbookDbStore.push({
          id: `log-${idx}-${Date.now()}`,
          autor: autorStr.trim(),
          tipo: tipoStr.trim().toLowerCase() === "tecnico" ? "tecnico" : "gerencial",
          descricao: descricao.trim(),
          titulo: titulo.trim(),
          participantes: participantes.trim(),
          desafios: desafios.trim(),
          licoes: licoes.trim(),
          indicadores: indicadores.trim(),
          createdAt: new Date(dateStr.trim()).toISOString()
        });
      }
    });
  }
} catch (err) {
  console.error("Failed to parse initial logbook entries:", err);
}

if (logbookDbStore.length === 0) {
  logbookDbStore = [
    {
      id: "log-init-1",
      autor: "marcelofernandesgarcia@gmail.com",
      tipo: "gerencial",
      descricao: "Reunião de alinhamento com a diretoria do DTPAR para fechamento do escopo de ampliação do módulo de parcerias do TRANSFEREGOV. Definição do cronograma de transição por faixas de população dos municípios e estados.",
      createdAt: new Date("2026-07-15T12:00:00Z").toISOString()
    },
    {
      id: "log-init-2",
      autor: "vitor.cesar@mgi.gov.br",
      tipo: "tecnico",
      descricao: "Homologação das minutas padrões de editais e termos de colaboração jurídica emitidos pela AGU. Configuração do indexador de busca de termos e preparação da base de dados de FAQ com 200 itens.",
      createdAt: new Date("2026-07-17T14:30:00Z").toISOString()
    },
    {
      id: "log-init-3",
      autor: "nayara.anjos@mgi.gov.br",
      tipo: "tecnico",
      descricao: "Desenvolvimento do Gauge reativo de Prontidão de Adesão em SVG para municípios e estados, além de implementar o assistente inteligente na barra lateral integrado com o Gemini.",
      createdAt: new Date("2026-07-20T10:15:00Z").toISOString()
    }
  ];
}

app.get("/api/mock-db", (req, res) => {
  return res.json(mockDbStore);
});

app.get("/api/logbook", (req, res) => {
  const sorted = [...logbookDbStore].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return res.json(sorted);
});

app.post("/api/logbook", (req, res) => {
  const { autor, tipo, descricao, titulo, participantes, desafios, licoes, indicadores } = req.body;
  const newEntry: LogbookEntry = {
    id: 'log-' + Math.random().toString(36).substring(2, 11),
    autor: autor || 'desconhecido',
    tipo: tipo || 'tecnico',
    descricao: descricao || '',
    titulo: titulo || '',
    participantes: participantes || '',
    desafios: desafios || '',
    licoes: licoes || '',
    indicadores: indicadores || '',
    createdAt: new Date().toISOString()
  };
  logbookDbStore.push(newEntry);

  // Persist physically to disk for future analysis and cross-user session durability
  try {
    const formattedDate = newEntry.createdAt.replace('T', ' ').substring(0, 19);
    
    let logBlock = `\n\n[${formattedDate}] [${newEntry.tipo}] [${newEntry.autor}]\n`;
    logBlock += `Título: ${newEntry.titulo}\n`;
    logBlock += `Descrição: ${newEntry.descricao}\n`;
    if (newEntry.participantes) logBlock += `Participantes: ${newEntry.participantes}\n`;
    if (newEntry.desafios) logBlock += `Desafios: ${newEntry.desafios}\n`;
    if (newEntry.licoes) logBlock += `Lições: ${newEntry.licoes}\n`;
    if (newEntry.indicadores) logBlock += `Indicadores: ${newEntry.indicadores}\n`;
    
    const filePath = path.join(__dirname, "public", "diario_bordo.txt");
    fs.appendFileSync(filePath, logBlock.trimEnd(), "utf-8");
  } catch (err) {
    console.error("Failed to persist logbook entry physically to disk:", err);
  }

  return res.status(201).json(newEntry);
});

app.post("/api/mock-db", (req, res) => {
  const { autor, descricao, status } = req.body;
  const newDoc: MockDoc = {
    id: 'idea-' + Math.random().toString(36).substring(2, 11),
    autor: autor || 'desconhecido',
    descricao: descricao || '',
    status: status || 'PENDING',
    votos: 0,
    createdAt: new Date().toISOString()
  };
  mockDbStore.push(newDoc);
  return res.status(201).json(newDoc);
});

app.put("/api/mock-db/:id", (req, res) => {
  const { id } = req.params;
  const { status, votos } = req.body;
  const itemIndex = mockDbStore.findIndex(item => item.id === id);
  if (itemIndex > -1) {
    if (status !== undefined) mockDbStore[itemIndex].status = status;
    if (votos !== undefined) mockDbStore[itemIndex].votos = votos;
    return res.json(mockDbStore[itemIndex]);
  }
  return res.status(404).json({ error: "Item não encontrado." });
});

// Vite & Static file handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
