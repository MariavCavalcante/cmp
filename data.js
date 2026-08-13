/* ==========================================================================
   dados.js — Painel estático · Projeto IHR/CMP — Piloto HETRIN
   --------------------------------------------------------------------------
   ATENÇÃO — PARA ATUALIZAR O PAINEL:
   1. Edite somente os valores abaixo (dados agregados e já validados).
   2. Nunca inclua nome de paciente, CNS, número de protocolo, telefone,
      endereço ou qualquer outro identificador pessoal.
   3. Após editar, publique novamente o site (não há atualização automática).
   4. Atualize também "ultimaAtualizacao" e "periodoAnalisado" abaixo.
   ========================================================================== */

const dadosProjeto = {

  // ---- Metadados exibidos no cabeçalho/rodapé -----------------------------
  meta: {
    metaIndicador: 80, // meta percentual de completude (%)
    ultimaAtualizacao: "13/08/2026",
    periodoAnalisado: "agosto/2025 a julho/2026",
    fonte: "SES-GO — Regulação Estadual / HUGOL / HETRIN",
    versaoPainel: "v1.0",
  },

  // ---- 11. Diagnóstico ampliado (ago–dez/2025) -----------------------------
  // Solicitações da Macrorregião Centro-Oeste encaminhadas ao HUGOL,
  // processadas pela Regulação Estadual. Exclui solicitações por Cota Direta.
  // Pendência de validação: relatório cita 157 fichas; soma mensal = 156.
  // Até a conferência, o painel exibe "mais de 150 fichas analisadas".
  diagnostico2025: [
    { mes: "Ago/2025", fichas: 28, historia: 82.1, inicio: 67.9, enzimas: 57.1, ecg: 85.7, evolucao: 100.0 },
    { mes: "Set/2025", fichas: 19, historia: 94.7, inicio: 63.2, enzimas: 31.6, ecg: 63.2, evolucao: 94.7 },
    { mes: "Out/2025", fichas: 36, historia: 80.6, inicio: 66.7, enzimas: 52.8, ecg: 77.8, evolucao: 72.2 },
    { mes: "Nov/2025", fichas: 33, historia: 90.9, inicio: 75.8, enzimas: 60.6, ecg: 87.9, evolucao: 78.8 },
    { mes: "Dez/2025", fichas: 40, historia: 97.5, inicio: 80.0, enzimas: 65.0, ecg: 90.0, evolucao: 92.5 },
  ],
  totalFichasDivergente: { relatorio: 157, somaMensal: 156, textoExibicao: "mais de 150 fichas analisadas" },

  // ---- Piloto HETRIN (jan/2026 em diante) ----------------------------------
  // Somente solicitações provenientes do HETRIN. Ainda SEM dados mensais
  // validados (maio, jun e jul/2026 pendentes de confirmação — ver prompt
  // mestre, item 15.6). NÃO INVENTAR VALORES: manter vazio até validação.
  pilotoHetrin2026: [
    // Exemplo de formato a preencher após validação:
    // { mes: "Mai/2026", fichas: 0, historia: 0, inicio: 0, enzimas: 0, ecg: 0, evolucao: 0 },
  ],

  // ---- Linha do tempo -------------------------------------------------------
  // Datas exatas ainda não confirmadas para todos os marcos; períodos
  // aproximados são sinalizados como tal (não inventar precisão que não existe).
  marcos: [
    { id: "imersoes", periodo: "2º semestre de 2025 (aprox.)", titulo: "Imersões", descricao: "Imersões da equipe de melhoria com a Regulação Estadual para reconhecimento do problema." },
    { id: "mentorias", periodo: "2º semestre de 2025 (aprox.)", titulo: "Mentorias", descricao: "Ciclos de mentoria em Ciência da Melhoria (metodologia IHI) com a equipe técnica." },
    { id: "diagnostico", periodo: "ago–dez/2025", titulo: "Diagnóstico ampliado", descricao: "Levantamento das fichas de regulação da Macrorregião Centro-Oeste encaminhadas ao HUGOL." },
    { id: "instrumento", periodo: "2º semestre de 2025 (aprox.)", titulo: "Instrumento de coleta", descricao: "Estruturação do instrumento para avaliação da completude dos campos clínicos essenciais." },
    { id: "relatorio", periodo: "dez/2025 (aprox.)", titulo: "Relatório de diagnóstico", descricao: "Consolidação dos resultados do diagnóstico ampliado e identificação das fragilidades." },
    { id: "ishikawa", periodo: "dez/2025 (aprox.)", titulo: "Diagrama de Ishikawa", descricao: "Construção coletiva das hipóteses de causas para as fragilidades identificadas." },
    { id: "hetrin", periodo: "jan/2026", titulo: "Seleção do HETRIN", descricao: "Hospital Estadual de Trindade selecionado como parceiro para o piloto de melhoria." },
    { id: "oficio", periodo: "fev/2026 (aprox.)", titulo: "Ofício nº 2160/2026/SES", descricao: "Formalização institucional da parceria e do início do piloto com o HETRIN." },
    { id: "reuniao", periodo: "10/02/2026", titulo: "Reunião de alinhamento", descricao: "Reunião de pactuação de fluxos e responsabilidades para o início do piloto." },
    { id: "checklist", periodo: "1º trimestre de 2026 (aprox.)", titulo: "Checklist clínico", descricao: "Elaboração e pactuação do checklist mínimo de completude da ficha de regulação." },
    { id: "simpleqi", periodo: "2026", titulo: "Simple QI", descricao: "Adoção de ferramenta simplificada de monitoramento de qualidade para acompanhamento dos testes." },
    { id: "revisao", periodo: "2026", titulo: "Revisão do indicador", descricao: "Revisão de numerador, denominador e critérios de inclusão do indicador de completude." },
    { id: "sustentabilidade", periodo: "2026 (em curso)", titulo: "Sustentabilidade", descricao: "Definição de ações de governança para sustentar os ganhos alcançados após o piloto." },
  ],

  // ---- Matriz de causas (Ishikawa) — hipóteses da equipe, NÃO comprovadas --
  causas: [
    {
      categoria: "Método",
      itens: [
        "Ausência de checklist padronizado no momento do preenchimento da ficha.",
        "Fluxo de registro não integrado entre admissão, avaliação clínica e regulação.",
      ],
    },
    {
      categoria: "Mão de obra",
      itens: [
        "Rotatividade de profissionais responsáveis pelo preenchimento.",
        "Variabilidade de conhecimento sobre os campos clínicos essenciais do IAM.",
      ],
    },
    {
      categoria: "Máquina/Tecnologia",
      itens: [
        "Sistema de regulação sem campos obrigatórios para os itens essenciais.",
        "Ausência de alerta eletrônico para campos incompletos antes do envio.",
      ],
    },
    {
      categoria: "Material/Estrutura",
      itens: [
        "Prontuário e ficha de regulação em suportes distintos, dificultando a conferência.",
        "Disponibilidade limitada de laudo de enzimas e ECG no momento do registro.",
      ],
    },
    {
      categoria: "Meio ambiente",
      itens: [
        "Fluxo de urgência com alta demanda concorrente no momento do registro.",
        "Comunicação entre unidade solicitante e regulação sujeita a ruídos.",
      ],
    },
    {
      categoria: "Medida",
      itens: [
        "Indicador de completude ainda em fase de validação de numerador e denominador.",
        "Ausência histórica de monitoramento sistemático da completude das fichas.",
      ],
    },
  ],

  // ---- Painel PDSA — ciclos de teste ----------------------------------------
  // Campos ainda não integralmente confirmados para publicação (ver prompt
  // mestre, item 15.7). Estrutura pronta; preencher apenas com dados validados.
  pdsa: [
    {
      titulo: "Comunicação do checklist às equipes",
      hipotese: "Pendente de validação para publicação.",
      responsavel: "A confirmar",
      periodo: "A confirmar",
      medida: "A confirmar",
      resultado: "A confirmar",
      aprendizado: "A confirmar",
      decisao: "A confirmar",
    },
    {
      titulo: "Implantação do checklist clínico",
      hipotese: "Pendente de validação para publicação.",
      responsavel: "A confirmar",
      periodo: "A confirmar",
      medida: "A confirmar",
      resultado: "A confirmar",
      aprendizado: "A confirmar",
      decisao: "A confirmar",
    },
    {
      titulo: "Devolutiva às equipes do HETRIN",
      hipotese: "Pendente de validação para publicação.",
      responsavel: "A confirmar",
      periodo: "A confirmar",
      medida: "A confirmar",
      resultado: "A confirmar",
      aprendizado: "A confirmar",
      decisao: "A confirmar",
    },
    {
      titulo: "Monitoramento contínuo",
      hipotese: "Pendente de validação para publicação.",
      responsavel: "A confirmar",
      periodo: "A confirmar",
      medida: "A confirmar",
      resultado: "A confirmar",
      aprendizado: "A confirmar",
      decisao: "A confirmar",
    },
    {
      titulo: "Uso do Simple QI para acompanhamento",
      hipotese: "Pendente de validação para publicação.",
      responsavel: "A confirmar",
      periodo: "A confirmar",
      medida: "A confirmar",
      resultado: "A confirmar",
      aprendizado: "A confirmar",
      decisao: "A confirmar",
    },
  ],

  // ---- Indicador --------------------------------------------------------
  indicador: {
    formula: "Percentual de completude = campos clínicos essenciais preenchidos ÷ total de campos clínicos essenciais avaliados × 100",
    numerador: "Em validação",
    denominador: "Em validação",
    periodicidade: "Mensal",
    limitacoes: [
      "Numerador, denominador e definição de \"ficha completa\" ainda em validação técnica.",
      "Meta não deve ser lida como mediana ou média histórica.",
      "Comparabilidade entre diagnóstico ampliado (2025) e piloto HETRIN (2026) depende da confirmação de que os mesmos critérios de inclusão, campos, fórmula, denominador, fonte e unidade de análise se aplicam a ambos os conjuntos.",
    ],
  },

  // ---- Checklist clínico mínimo (campos avaliados) ------------------------
  checklist: [
    { campo: "História clínica", descricao: "Registro da história clínica relacionada ao quadro de dor torácica/IAM." },
    { campo: "Início dos sintomas", descricao: "Data e hora de início dos sintomas." },
    { campo: "Enzimas cardíacas", descricao: "Resultado de marcadores de necrose miocárdica (enzimas)." },
    { campo: "ECG com data/hora", descricao: "Eletrocardiograma registrado com data e horário de realização." },
    { campo: "Evolução clínica", descricao: "Registro da evolução do paciente até a decisão de regulação." },
  ],
};

// Congela o objeto para reforçar que o painel é somente leitura (estático).
Object.freeze(dadosProjeto);
