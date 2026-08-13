# Painel Institucional Estático — Projeto IHR/CMP · Piloto HETRIN (SES-GO)

Apresentação web **estática** e interativa (interações somente no navegador) do
projeto *Integração Hospitalar em Rede — Ciência da Melhoria na Prática*:
qualificação das fichas de regulação de pacientes com Infarto Agudo do
Miocárdio, experiência-piloto com o Hospital Estadual de Trindade (HETRIN).

O conteúdo está organizado em **7 telas** (consolidação de todos os pontos do
prompt mestre, que originalmente descrevia 20 telas, agora agrupados por
tema para facilitar a leitura e a navegação):

1. Capa
2. Contexto e problema — informação e cuidado, o problema, escopo e dimensão
3. Diagnóstico 2025 — gráficos obrigatórios, tabela de apoio e aprendizados
4. Piloto HETRIN — objetivo, Modelo de Melhoria, diagrama direcionador, checklist e indicador
5. Resultados e causas potenciais — resultados do piloto e Ishikawa
6. Linha do tempo e testes — marcos, testes realizados e próximos PDSA
7. Governança e compromisso

> **Painel estático.** Não há backend, banco de dados, API, login ou
> atualização automática. Todos os dados agregados estão embutidos no
> arquivo `data.js`. Qualquer atualização exige editar esse arquivo e
> publicar novamente o site.

## Arquivos

```
index.html        Estrutura das 20 telas
styles.css         Identidade visual oficial de Goiás e layout responsivo
script.js          Navegação, gráficos, filtros, modais e acessibilidade
data.js            ÚNICO local com os dados agregados do projeto
assets/chart.min.js  Cópia local do Chart.js (não depende de CDN)
assets/brasao-goias.png  Brasão oficial do Estado de Goiás
```

## Como atualizar os dados

1. Abra `data.js`.
2. Edite apenas os valores dentro de `dadosProjeto` (nunca inclua nome de
   paciente, CNS, número de protocolo, telefone, endereço ou qualquer outro
   identificador pessoal — somente dados agregados e validados).
3. Atualize `meta.ultimaAtualizacao` e `meta.periodoAnalisado`.
4. Salve e publique novamente (veja abaixo).

## Brasão oficial

O arquivo oficial do brasão do Estado de Goiás já está incluído em
`assets/brasao-goias.png` e é exibido no cabeçalho. Para trocá-lo por uma
versão diferente, basta substituir esse arquivo (mantendo o nome) ou alterar
o atributo `src` da tag `<img class="brasao-imagem">` em `index.html`.

## Executar localmente

Basta abrir `index.html` no navegador. Para evitar eventuais bloqueios de
`file://` em alguns navegadores, você também pode servir a pasta localmente:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Publicar no GitHub e na Vercel

```bash
git init
git add .
git commit -m "Painel estático IHR/CMP — piloto HETRIN"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

Na Vercel: **New Project → Import Git Repository** → selecione o
repositório. Como é um site estático (sem framework), use:
- Build Command: (vazio)
- Output Directory: `.`

Qualquer alteração exige um novo `git push` para gerar nova publicação.

## Pendências de validação técnica (ver `data.js`)

- Divergência entre o total de 157 fichas do relatório e a soma mensal de
  156 (o painel exibe "mais de 150 fichas analisadas" até a conferência).
- Resultados mensais do piloto HETRIN (maio, junho e julho/2026) ainda não
  confirmados — a tela "Resultados do piloto" está propositalmente vazia.
- Campos detalhados dos testes PDSA (hipótese, responsável, medida,
  resultado, aprendizado, decisão) pendentes de validação para publicação.
- Confirmação entre "sete campos" e instrumento ampliado do checklist
  clínico.
- Numerador, denominador e definição de "ficha completa" do indicador.

Essas pendências estão sinalizadas no próprio painel (avisos amarelos) e
**não devem ser preenchidas com dados inventados** — apenas com informações
validadas pela equipe técnica.

## Limitações conhecidas

- Sem funcionalidade de edição pública; qualquer alteração é feita no
  código-fonte.
- Sem `localStorage` para dados clínicos ou pessoais.
- Testado em Chrome/Chromium; recomenda-se testar também em Edge, Firefox e
  Safari antes da publicação final, incluindo impressão/exportação para PDF,
  navegação por teclado e tela cheia.
