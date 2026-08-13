/* ==========================================================================
   script.js — Painel estático IHR/CMP · Piloto HETRIN · SES-GO
   Toda a lógica roda apenas no navegador (sem rede, sem backend).
   ========================================================================== */
(function () {
  "use strict";

  const TOTAL_TELAS = 7;
  let telaAtual = 1;

  const corpo = document.querySelector(".corpo");
  const indiceLista = document.getElementById("indice-lista");
  const contadorTela = document.getElementById("contador-tela");
  const progressoBarra = document.getElementById("progresso-barra");
  const btnAnterior = document.getElementById("btn-anterior");
  const btnProximo = document.getElementById("btn-proximo");
  const btnInicio = document.getElementById("btn-inicio");

  /* ------------------------- Navegação entre telas ------------------------ */
  function irParaTela(n, { foco = true } = {}) {
    n = Math.min(Math.max(n, 1), TOTAL_TELAS);
    document.querySelectorAll(".tela").forEach((el) => {
      el.classList.toggle("ativa", Number(el.dataset.tela) === n);
    });
    document.querySelectorAll(".indice-lista button").forEach((btn) => {
      btn.setAttribute("aria-current", String(Number(btn.dataset.tela) === n));
    });
    telaAtual = n;
    contadorTela.textContent = `Tela ${n} de ${TOTAL_TELAS}`;
    progressoBarra.style.width = `${(n / TOTAL_TELAS) * 100}%`;
    btnAnterior.disabled = n === 1;
    btnProximo.disabled = n === TOTAL_TELAS;

    const painel = document.querySelector(".conteudo");
    painel.scrollTop = 0;

    if (foco) {
      const telaEl = document.querySelector(`.tela[data-tela="${n}"]`);
      const titulo = telaEl && telaEl.querySelector("h1, h2");
      if (titulo) {
        titulo.setAttribute("tabindex", "-1");
        titulo.focus({ preventScroll: true });
      }
    }

    // fecha índice em telas pequenas após navegar
    if (window.innerWidth <= 980) {
      corpo.classList.remove("indice-aberto-mobile");
    }

    salvarEstadoNaHash(n);
  }

  function salvarEstadoNaHash(n) {
    history.replaceState(null, "", `#tela-${n}`);
  }

  function lerTelaInicialDaHash() {
    const m = location.hash.match(/tela-(\d+)/);
    if (m) return Number(m[1]);
    return 1;
  }

  btnAnterior.addEventListener("click", () => irParaTela(telaAtual - 1));
  btnProximo.addEventListener("click", () => irParaTela(telaAtual + 1));
  btnInicio.addEventListener("click", () => irParaTela(1));

  document.querySelectorAll(".indice-lista button").forEach((btn) => {
    btn.addEventListener("click", () => irParaTela(Number(btn.dataset.tela)));
  });

  /* Navegação por teclado: setas, Home, End (quando não em campo de formulário) */
  document.addEventListener("keydown", (e) => {
    const alvo = e.target;
    const emCampo = ["INPUT", "SELECT", "TEXTAREA"].includes(alvo.tagName);
    if (emCampo) return;
    if (document.getElementById("modal-fundo").classList.contains("aberto")) return;

    if (e.key === "ArrowRight" || e.key === "PageDown") { irParaTela(telaAtual + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { irParaTela(telaAtual - 1); }
    else if (e.key === "Home") { irParaTela(1); }
    else if (e.key === "End") { irParaTela(TOTAL_TELAS); }
  });

  /* ------------------------------ Índice recolhível ------------------------ */
  const btnRecolherIndice = document.getElementById("btn-recolher-indice");
  const btnAbrirIndiceMobile = document.getElementById("btn-abrir-indice-mobile");

  btnRecolherIndice.addEventListener("click", () => {
    corpo.classList.toggle("indice-recolhido");
    const recolhido = corpo.classList.contains("indice-recolhido");
    btnRecolherIndice.setAttribute("aria-expanded", String(!recolhido));
  });

  btnAbrirIndiceMobile.addEventListener("click", () => {
    corpo.classList.toggle("indice-aberto-mobile");
  });

  /* ------------------------------ Tela cheia -------------------------------- */
  const btnTelaCheia = document.getElementById("btn-tela-cheia");
  btnTelaCheia.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  });

  /* ------------------------------ Impressão --------------------------------- */
  document.getElementById("btn-imprimir").addEventListener("click", () => {
    window.print();
  });

  /* ------------------------- Reduzir movimento ------------------------------ */
  const btnReduzirMovimento = document.getElementById("btn-reduzir-movimento");
  function aplicarPreferenciaMovimento(ativo) {
    document.body.classList.toggle("reduzir-movimento", ativo);
    btnReduzirMovimento.setAttribute("aria-pressed", String(ativo));
  }
  const prefereReduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  aplicarPreferenciaMovimento(prefereReduzido);
  btnReduzirMovimento.addEventListener("click", () => {
    aplicarPreferenciaMovimento(!document.body.classList.contains("reduzir-movimento"));
  });

  /* ------------------------------ Modal genérico ----------------------------- */
  const modalFundo = document.getElementById("modal-fundo");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalCorpo = document.getElementById("modal-corpo");
  const modalFechar = document.getElementById("modal-fechar");
  let elementoFocoAnterior = null;

  function abrirModal(titulo, htmlCorpo) {
    modalTitulo.textContent = titulo;
    modalCorpo.innerHTML = htmlCorpo;
    modalFundo.classList.add("aberto");
    elementoFocoAnterior = document.activeElement;
    modalFechar.focus();
    document.addEventListener("keydown", fecharComEsc);
  }
  function fecharModal() {
    modalFundo.classList.remove("aberto");
    document.removeEventListener("keydown", fecharComEsc);
    elementoFocoAnterior?.focus();
  }
  function fecharComEsc(e) {
    if (e.key === "Escape") fecharModal();
  }
  modalFechar.addEventListener("click", fecharModal);
  modalFundo.addEventListener("click", (e) => { if (e.target === modalFundo) fecharModal(); });

  /* ------------------------------------------------------------------------
     Formatação auxiliar
     ------------------------------------------------------------------------ */
  function pct(v) { return `${v.toFixed(1).replace(".", ",")}%`; }

  /* ------------------------------------------------------------------------
     Tela 5 — Dimensão (total de fichas)
     ------------------------------------------------------------------------ */
  (function preencherDimensao() {
    const el = document.getElementById("dimensao-total-texto");
    if (el) el.textContent = dadosProjeto.totalFichasDivergente.textoExibicao;
    const detalhe = document.getElementById("dimensao-divergencia");
    if (detalhe) {
      detalhe.textContent = `O relatório consolidado indica ${dadosProjeto.totalFichasDivergente.relatorio} fichas, enquanto a soma dos registros mensais totaliza ${dadosProjeto.totalFichasDivergente.somaMensal}. Até a conferência, o painel exibe o texto acima.`;
    }
  })();

  /* ------------------------------------------------------------------------
     Tabela — Tela 11 (dados do diagnóstico 2025)
     ------------------------------------------------------------------------ */
  (function preencherTabelaDiagnostico() {
    const corpoTabela = document.getElementById("tabela-diagnostico-corpo");
    if (!corpoTabela) return;
    corpoTabela.innerHTML = dadosProjeto.diagnostico2025
      .map(
        (l) => `<tr>
          <td>${l.mes}</td>
          <td>${l.fichas}</td>
          <td>${pct(l.historia)}</td>
          <td>${pct(l.inicio)}</td>
          <td>${pct(l.enzimas)}</td>
          <td>${pct(l.ecg)}</td>
          <td>${pct(l.evolucao)}</td>
        </tr>`
      )
      .join("");
  })();

  /* ------------------------------------------------------------------------
     Checklist — Tela 12
     ------------------------------------------------------------------------ */
  (function preencherChecklist() {
    const lista = document.getElementById("lista-checklist");
    if (!lista) return;
    lista.innerHTML = dadosProjeto.checklist
      .map((c) => `<li><strong>${c.campo}</strong> — ${c.descricao}</li>`)
      .join("");
  })();

  /* ------------------------------------------------------------------------
     Indicador — Tela 13
     ------------------------------------------------------------------------ */
  (function preencherIndicador() {
    const f = document.getElementById("indicador-formula");
    if (f) f.textContent = dadosProjeto.indicador.formula;
    const lim = document.getElementById("indicador-limitacoes");
    if (lim) lim.innerHTML = dadosProjeto.indicador.limitacoes.map((l) => `<li>${l}</li>`).join("");
    const meta = document.getElementById("indicador-meta");
    if (meta) meta.textContent = `${dadosProjeto.meta.metaIndicador}%`;
  })();

  /* ------------------------------------------------------------------------
     Gráfico 6 — Evolução mensal 2025 (linha) — Tela 6, com filtro de campo
     ------------------------------------------------------------------------ */
  let graficoEvolucao;
  function corDoCampo(campo) {
    return {
      historia: "#00509F",
      inicio: "#19A32A",
      enzimas: "#B45309",
      ecg: "#7C3AED",
      evolucao: "#087A35",
    }[campo];
  }
  const rotuloCampo = {
    historia: "História clínica",
    inicio: "Início dos sintomas",
    enzimas: "Enzimas",
    ecg: "ECG com data/hora",
    evolucao: "Evolução",
  };

  function montarGraficoEvolucao(camposSelecionados) {
    const ctx = document.getElementById("grafico-evolucao-2025");
    if (!ctx) return;
    const labels = dadosProjeto.diagnostico2025.map((l) => l.mes);
    const datasets = camposSelecionados.map((campo) => ({
      label: rotuloCampo[campo],
      data: dadosProjeto.diagnostico2025.map((l) => l[campo]),
      borderColor: corDoCampo(campo),
      backgroundColor: corDoCampo(campo),
      tension: 0.25,
      pointRadius: 4,
      pointHoverRadius: 6,
    }));
    datasets.push({
      label: `Meta (${dadosProjeto.meta.metaIndicador}%)`,
      data: labels.map(() => dadosProjeto.meta.metaIndicador),
      borderColor: "#DC2626",
      borderDash: [6, 4],
      pointRadius: 0,
      borderWidth: 1.5,
    });

    if (graficoEvolucao) graficoEvolucao.destroy();
    graficoEvolucao = new Chart(ctx, {
      type: "line",
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 100, ticks: { callback: (v) => `${v}%` } },
        },
        plugins: {
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              label: (item) => {
                const linha = dadosProjeto.diagnostico2025[item.dataIndex];
                if (item.dataset.label.startsWith("Meta")) return `Meta: ${dadosProjeto.meta.metaIndicador}%`;
                return `${item.dataset.label}: ${pct(item.raw)} (base: ${linha ? linha.fichas : "-"} fichas)`;
              },
            },
          },
        },
      },
    });
  }

  const filtroCampos = document.getElementById("filtro-campo-evolucao");
  if (filtroCampos) {
    filtroCampos.addEventListener("change", () => {
      const selecionados = Array.from(filtroCampos.selectedOptions).map((o) => o.value);
      montarGraficoEvolucao(selecionados.length ? selecionados : Object.keys(rotuloCampo));
    });
    montarGraficoEvolucao(Object.keys(rotuloCampo));
  }

  document.getElementById("btn-restaurar-filtro-evolucao")?.addEventListener("click", () => {
    Array.from(filtroCampos.options).forEach((o) => (o.selected = true));
    montarGraficoEvolucao(Object.keys(rotuloCampo));
  });

  /* ------------------------------------------------------------------------
     Gráfico — Completude por campo (barras horizontais) — Tela 6
     ------------------------------------------------------------------------ */
  let graficoCompletude;
  function montarGraficoCompletude(mesA, mesB) {
    const ctx = document.getElementById("grafico-completude-campo");
    if (!ctx) return;
    const linhaA = dadosProjeto.diagnostico2025.find((l) => l.mes === mesA);
    const linhaB = mesB ? dadosProjeto.diagnostico2025.find((l) => l.mes === mesB) : null;
    const campos = ["historia", "inicio", "enzimas", "ecg", "evolucao"];
    const labels = campos.map((c) => rotuloCampo[c]);

    const datasets = [
      {
        label: mesA,
        data: campos.map((c) => linhaA[c]),
        backgroundColor: "#00509F",
      },
    ];
    if (linhaB) {
      datasets.push({
        label: mesB,
        data: campos.map((c) => linhaB[c]),
        backgroundColor: "#19A32A",
      });
    }

    if (graficoCompletude) graficoCompletude.destroy();
    graficoCompletude = new Chart(ctx, {
      type: "bar",
      data: { labels, datasets },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: { x: { min: 0, max: 100, ticks: { callback: (v) => `${v}%` } } },
        plugins: {
          legend: { position: "bottom" },
          tooltip: { callbacks: { label: (item) => `${item.dataset.label}: ${pct(item.raw)}` } },
        },
      },
    });
  }

  const seletorMesA = document.getElementById("seletor-mes-a");
  const seletorMesB = document.getElementById("seletor-mes-b");
  if (seletorMesA) {
    dadosProjeto.diagnostico2025.forEach((l) => {
      seletorMesA.insertAdjacentHTML("beforeend", `<option value="${l.mes}">${l.mes}</option>`);
      seletorMesB.insertAdjacentHTML("beforeend", `<option value="${l.mes}">${l.mes}</option>`);
    });
    seletorMesA.value = "Ago/2025";
    seletorMesB.value = "Dez/2025";
    const atualizar = () => montarGraficoCompletude(seletorMesA.value, seletorMesB.value);
    seletorMesA.addEventListener("change", atualizar);
    seletorMesB.addEventListener("change", atualizar);
    atualizar();
  }

  /* ------------------------------------------------------------------------
     Gráfico — Composição (barras empilhadas conformes/não conformes)
     ------------------------------------------------------------------------ */
  (function montarGraficoComposicao() {
    const ctx = document.getElementById("grafico-composicao");
    if (!ctx) return;
    const labels = dadosProjeto.diagnostico2025.map((l) => l.mes);
    // Média dos 5 campos como proxy de "completude média" para a composição.
    const mediaCompleta = dadosProjeto.diagnostico2025.map((l) => {
      const media = (l.historia + l.inicio + l.enzimas + l.ecg + l.evolucao) / 5;
      return Number(media.toFixed(1));
    });
    const naoConforme = mediaCompleta.map((v) => Number((100 - v).toFixed(1)));

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          { label: "Conforme (média dos 5 campos)", data: mediaCompleta, backgroundColor: "#19A32A", stack: "s" },
          { label: "Não conforme", data: naoConforme, backgroundColor: "#DC2626", stack: "s" },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { stacked: true, min: 0, max: 100, ticks: { callback: (v) => `${v}%` } }, x: { stacked: true } },
        plugins: {
          legend: { position: "bottom" },
          tooltip: { callbacks: { label: (item) => `${item.dataset.label}: ${pct(item.raw)}` } },
        },
      },
    });
  })();

  /* ------------------------------------------------------------------------
     Linha do tempo — Tela 16
     ------------------------------------------------------------------------ */
  (function montarLinhaTempo() {
    const wrap = document.getElementById("linha-tempo-lista");
    if (!wrap) return;
    wrap.innerHTML = dadosProjeto.marcos
      .map(
        (m) => `<button class="marco" data-id="${m.id}" aria-haspopup="dialog">
          <div class="periodo">${m.periodo}</div>
          <div class="titulo">${m.titulo}</div>
        </button>`
      )
      .join("");
    wrap.querySelectorAll(".marco").forEach((btn) => {
      btn.addEventListener("click", () => {
        const m = dadosProjeto.marcos.find((x) => x.id === btn.dataset.id);
        abrirModal(
          m.titulo,
          `<dl>
            <dt>Período</dt><dd>${m.periodo}</dd>
            <dt>Descrição</dt><dd>${m.descricao}</dd>
          </dl>`
        );
      });
    });
  })();

  /* ------------------------------------------------------------------------
     Matriz de causas (Ishikawa) — Tela 15
     ------------------------------------------------------------------------ */
  (function montarIshikawa() {
    const grade = document.getElementById("ishikawa-grade");
    if (!grade) return;
    grade.innerHTML = dadosProjeto.causas
      .map(
        (c, i) => `<button class="categoria-causa" data-i="${i}" aria-haspopup="dialog">
          <div class="nome">${c.categoria}</div>
          <div class="contagem">${c.itens.length} hipótese(s) da equipe</div>
        </button>`
      )
      .join("");
    grade.querySelectorAll(".categoria-causa").forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = dadosProjeto.causas[Number(btn.dataset.i)];
        abrirModal(
          `${c.categoria} — hipóteses da equipe`,
          `<p style="font-size:13px;color:#64748B;margin-top:0;">Hipóteses levantadas pela equipe de melhoria; não representam causas comprovadas.</p>
           <ul>${c.itens.map((it) => `<li>${it}</li>`).join("")}</ul>`
        );
      });
    });
  })();

  /* ------------------------------------------------------------------------
     Testes realizados — Tela 17
     ------------------------------------------------------------------------ */
  (function montarTestes() {
    const wrap = document.getElementById("lista-testes");
    if (!wrap) return;
    wrap.innerHTML = dadosProjeto.pdsa
      .map(
        (t, i) => `<button class="teste-card" data-i="${i}" aria-haspopup="dialog">
          <div class="titulo">${t.titulo}</div>
        </button>`
      )
      .join("");
    wrap.querySelectorAll(".teste-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const t = dadosProjeto.pdsa[Number(btn.dataset.i)];
        abrirModal(
          t.titulo,
          `<dl>
            <dt>Hipótese</dt><dd>${t.hipotese}</dd>
            <dt>Responsável</dt><dd>${t.responsavel}</dd>
            <dt>Período</dt><dd>${t.periodo}</dd>
            <dt>Medida</dt><dd>${t.medida}</dd>
            <dt>Resultado</dt><dd>${t.resultado}</dd>
            <dt>Aprendizado</dt><dd>${t.aprendizado}</dd>
            <dt>Decisão</dt><dd>${t.decisao}</dd>
          </dl>`
        );
      });
    });
  })();

  /* ------------------------------------------------------------------------
     Painel PDSA — Tela 18 usa a mesma fonte de dados (cards resumidos)
     ------------------------------------------------------------------------ */
  (function montarPdsaResumo() {
    const wrap = document.getElementById("pdsa-resumo-lista");
    if (!wrap) return;
    wrap.innerHTML = dadosProjeto.pdsa
      .map((t) => `<li><strong>${t.titulo}:</strong> decisão — ${t.decisao}</li>`)
      .join("");
  })();

  /* ------------------------------------------------------------------------
     Download local de dados agregados em CSV (sem envio a servidor)
     ------------------------------------------------------------------------ */
  document.getElementById("btn-exportar-csv")?.addEventListener("click", () => {
    const cabecalho = ["Mes", "Fichas", "Historia(%)", "Inicio(%)", "Enzimas(%)", "ECG(%)", "Evolucao(%)"];
    const linhas = dadosProjeto.diagnostico2025.map((l) =>
      [l.mes, l.fichas, l.historia, l.inicio, l.enzimas, l.ecg, l.evolucao].join(";")
    );
    const csv = [cabecalho.join(";"), ...linhas].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagnostico_2025_completude_fichas.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  /* ------------------------------------------------------------------------
     Restaurar filtros (geral)
     ------------------------------------------------------------------------ */
  document.getElementById("btn-restaurar-filtros-geral")?.addEventListener("click", () => {
    if (filtroCampos) {
      Array.from(filtroCampos.options).forEach((o) => (o.selected = true));
      montarGraficoEvolucao(Object.keys(rotuloCampo));
    }
    if (seletorMesA && seletorMesB) {
      seletorMesA.value = "Ago/2025";
      seletorMesB.value = "Dez/2025";
      montarGraficoCompletude(seletorMesA.value, seletorMesB.value);
    }
  });

  /* ------------------------------------------------------------------------
     Rodapé — metadados
     ------------------------------------------------------------------------ */
  (function preencherMetadadosRodape() {
    document.querySelectorAll("[data-meta='ultimaAtualizacao']").forEach((el) => (el.textContent = dadosProjeto.meta.ultimaAtualizacao));
    document.querySelectorAll("[data-meta='periodoAnalisado']").forEach((el) => (el.textContent = dadosProjeto.meta.periodoAnalisado));
    document.querySelectorAll("[data-meta='fonte']").forEach((el) => (el.textContent = dadosProjeto.meta.fonte));
    document.querySelectorAll("[data-meta='versaoPainel']").forEach((el) => (el.textContent = dadosProjeto.meta.versaoPainel));
  })();

  /* ------------------------------------------------------------------------
     Inicialização
     ------------------------------------------------------------------------ */
  irParaTela(lerTelaInicialDaHash(), { foco: false });
})();
