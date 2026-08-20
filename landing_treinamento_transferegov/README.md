# README — Landing Page de Treinamento TRANSFEREGOV

## 1. Objetivo do Projeto

Esta landing page é um **material de treinamento oficial** para nivelamento conceitual e capacitação de futuros entes (Estados e Municípios) que utilizarão o TRANSFEREGOV para internalização de Transferências Simplificadas no âmbito da Esteira de Parcerias.

O conteúdo é apresentado como uma **trilha de aprendizagem sequencial** com 8 módulos progressivos. Cada módulo constrói o conhecimento necessário para o seguinte, garantindo assimilação completa da sistemática — desde o conceito inicial até a execução prática.

---

## 2. Caso Exemplar — FNMA

O Fundo Nacional do Meio Ambiente (FNMA) é utilizado como **exemplo real de parceria bem-sucedida** ao longo de toda a trilha. Todas as referências ao FNMA servem exclusivamente como **ilustração didática** — demonstrando na prática como a parametrização, a jornada e os fluxos funcionam.

A sistemática apresentada é **genérica e aplicável** a qualquer política pública que utilize o TRANSFEREGOV.

---

## 3. Regras de Produção

### 3.1 Anonimização

- NÃO identificar o órgão atendido nas fontes originais
- Substituir qualquer referência por "[ÓRGÃO]"
- O material deve funcionar para qualquer ente que utilize o TRANSFEREGOV
- O nome "Vitor" pode ser citado como condutor do atendimento original
- O FNMA é referência didática, não exclusiva

### 3.2 Linguística

- Português do Brasil, norma culta (Acordo Ortográfico de 2009)
- Grafia oficial obrigatória:

| Termo | Grafia Correta | Grafia Incorreta |
|---|---|---|
| Sistema | TRANSFEREGOV | Transfergov, TransferGov, Transferegov |
| Sigla | SIORG | ciorg, Ciorg, SIORGS |
| Ministério | MGI | — |
| Instrumento | convênio | comnônio, convenio |
| Processo | homologação | Hamologação |
| Configuração | parametrização | parametrizacao |
| Contabilidade | prestação de contas | prestação de contaz |
| Documentos | Relatórios de Execução | Reinfários |
| Ação | diretamente | oiratamente |
| Análise | análise | análiee |
| Dados | dados | dadus |
| Acesso | login | legio |
| Eventos | incêndios | incônidas |
| Necessidade | precisa | Pracisa |

### 3.3 Verificação Factual

- Toda informação técnica deve ter base nas fontes fornecidas
- NÃO inventar funcionalidades, fluxos, papéis ou integrações
- Se uma informação não puder ser confirmada: escrever "Informação não confirmada nas fontes"
- Cross-check: cada afirmação técnica deve ter base na fala do Vitor ou no conteúdo das fontes
- Toda sigla deve ser definida na primeira menção

### 3.4 Tom e Estilo

- Didático, técnico-acessível, claro
- Sem coloquialismos ou jargão desnecessário
- Frases curtas e diretas
- O ente deve terminar a trilha com confiança para operar o sistema

---

## 4. Estrutura da Trilha de Aprendizagem — 8 Módulos

| Módulo | Título | Arquivo | Conteúdo |
|---|---|---|---|
| 1 | Abertura e Contexto | `mod1_abertura.txt` | Headline, propósito, público-alvo |
| 2 | O que é a Esteira de Parcerias | `mod2_contexto.txt` | Política, MGI, TRANSFEREGOV, caso FNMA |
| 3 | Transferência Simplificada vs. Convênio | `mod3_comparativo.txt` | Comparativo, Alternador de Mindset |
| 4 | Jornada da Transferência | `mod4_jornada.txt` | Linha do tempo em 4 etapas |
| 5 | Parametrização por Política | `mod5_parametrizacao.txt` | Playground interativo, caso FNMA |
| 6 | Papéis e Responsabilidades | `mod6_papeis.txt` | Tabela de perfis e permissões |
| 7 | Dúvidas Frequentes e Erros Comuns | `mod7_faq_erros.txt` | FAQ Accordion, Evite/Faça |
| 8 | Glossário e Encerramento | `mod8_glossario_encerramento.txt` | 8 termos, CTAs finais |

---

## 5. Elementos Interativos

| Elemento | Função Pedagógica | Módulo |
|---|---|---|
| Alternador de Mindset | Demonstrar diferença entre convênio e transferência simplificada | 3 |
| Linha do Tempo Animada | Percorrer a jornada em ritmo controlado pelo usuário | 4 |
| Playground de Parametrização | Simular cenários reais e entender causa-efeito das regras | 5 |
| Tabela Interativa de Papéis | Identificar responsabilidade de cada ator | 6 |
| FAQ Accordion | Consulta rápida sem sobrecarga cognitiva | 7 |

---

## 6. Design e Estética

### Tema Visual

"Preservação Tecnológica" — combina tons de floresta/meio ambiente com precisão de sistemas governamentais digitais.

### Esquema de Cores

| Elemento | Cor | Código |
|---|---|---|
| Fundo Primário | Azul escuro profundo | `hsl(222, 47%, 10%)` |
| Destaque Ambiental | Verde Esmeralda | `hsl(150, 75%, 45%)` |
| Destaque Sistema | Ciano | `hsl(195, 95%, 50%)` |
| Painéis e Cards | Glassmorphism | `rgba(22, 30, 46, 0.7)` com `blur(12px)` |

---

## 7. Estrutura de Pastas `/landing_treinamento_transferegov/`

```
/landing_treinamento_transferegov/
├── /conteudo/
│   ├── mod1_abertura.txt
│   ├── mod2_contexto.txt
│   ├── mod3_comparativo.txt
│   ├── mod4_jornada.txt
│   ├── mod5_parametrizacao.txt
│   ├── mod6_papeis.txt
│   ├── mod7_faq_erros.txt
│   ├── mod8_glossario_encerramento.txt
│   └── caso_fnma_exemplos.txt
├── /midia/
│   ├── /imagens/
│   ├── /icones/
│   └── /diagramas/
├── /referencias/
│   ├── mapa_mental.txt
│   ├── infografico.txt
│   ├── jornada_simplificada.txt
│   └── roteiros.txt
└── README.md
```

### Descrição das Pastas

- **/conteudo/** — Textos finais prontos para uso na landing page, organizados por módulo. O arquivo `caso_fnma_exemplos.txt` concentra todos os exemplos didáticos do FNMA para fácil atualização.
- **/midia/** — Recursos visuais (imagens, ícones, diagramas) separados por tipo para facilitar a montagem no Antigravity.
- **/referencias/** — Materiais de origem produzidos no NotebookLM (mapa mental, infográfico, jornada simplificada, roteiros de áudio e vídeo) para consulta durante a produção.

---

## 8. Materiais Complementares

Os materiais abaixo foram produzidos no NotebookLM e servem como apoio à landing page:

| Material | Formato | Público | Uso Recomendado |
|---|---|---|---|
| Análise Técnica | Texto estruturado | Equipe técnica | Documento base de consulta |
| Mapa Mental | Mapa visual | Entes em capacitação | Visão panorâmica da sistemática |
| Infográfico | Gráfico estático | Entes em capacitação | Consulta rápida impressa/digital |
| Apresentação de Slides | PPTX | Treinamento presencial | Apoio ao instrutor |
| Áudio (Audio Overview) | Podcast | Entes em deslocamento | Capacitação passiva/auditiva |
| Vídeo Explicativo | MP4 | Entes em capacitação | Trilha complementar |
| Relatório Técnico | Documento | Gestores e coordenadores | Tomada de decisão |

---

## 9. Ordem de Uso no Antigravity

1. Carregar os arquivos de `/conteudo/` na sequência dos módulos (1 a 8)
2. Carregar os recursos de `/midia/` conforme referenciados em cada módulo
3. Consultar `/referencias/` para validar informações técnicas
4. O arquivo `caso_fnma_exemplos.txt` deve ser inserido como bloco exemplificativo dentro dos módulos 2, 4 e 5
5. Aplicar o esquema de cores (Seção 6) em toda a interface
6. Implementar os elementos interativos (Seção 5) nos módulos correspondentes

---

## 10. Fontes Consultadas

- Vídeo de atendimento gravado (servidor Vitor como condutor)
- Transcrição do vídeo
- Mapa mental gerado no NotebookLM
- Infográfico "Jornada da Transferência Simplificada"
- Análise técnica em 7 seções

---

## 11. Versionamento e Revisão

### Controle de Versão

| Versão | Data | Alteração | Responsável |
|---|---|---|---|
| 1.0 | 19/08/2026 | Criação inicial do README | Antigravity |

### Checklist de Revisão (a cada atualização)

- [ ] Ortografia verificada (Acordo Ortográfico de 2009)
- [ ] Grafia de termos técnicos conferida (Seção 3.2)
- [ ] Nenhum órgão identificado (regra de anonimização)
- [ ] Informações técnicas verificadas nas fontes
- [ ] Siglas definidas na primeira menção
- [ ] Consistência terminológica em todos os módulos
- [ ] Exemplos do FNMA marcados como ilustrativos
- [ ] Links e CTAs funcionais

---

## 12. Glossário Essencial

| Termo | Definição |
|---|---|
| TRANSFEREGOV | Plataforma de gerenciamento das transferências da União |
| SIORG | Sistema de Informações Organizacionais do Governo Federal |
| MGI | Ministério da Gestão e da Inovação em Serviços Públicos |
| Esteira de Parcerias | Política de disponibilização de produtos do MGI |
| Transferência Simplificada | Modalidade de repasse sem convênio tradicional |
| Cláusula Suspensiva | Condição que suspende efeitos do instrumento |
| ACT | Acordo de Cooperação Técnica |
| Defeso Eleitoral | Período em que transferências voluntárias são vedadas |
| Metas Padronizadas | Conjunto de objetivos pré-definidos por política |
| Relatório de Execução Simplificado | Prestação de contas simplificada via TRANSFEREGOV |

---

## 13. Contatos e Links de Apoio

- Portal oficial: https://www.gov.br/transferegov/pt-br
- Material interativo: https://view.genially.com/64a7210e93025a00186a920a
- Suporte ao projeto: suporte.esteira@[ÓRGÃO].gov.br

---

**IMPORTANTE:** Este README deve ser atualizado a cada modificação nos materiais da landing page. Mantenha o checklist de revisão (Seção 11) sempre atualizado antes de publicar qualquer alteração.
