# Project Context for Coding Agents (Google Jules, Bolt & Antigravity)

## Purpose

Build and maintain a reusable Python data layer for the public restaurant directory and menu pages at `studentska-prehrana.si`, exposed via a fast PWA and an MCP adapter. Domain and extraction logic remain strictly decoupled from presentation/transport layers.

---

## 1. Stack e Arquitetura

### Frontend (PWA & Client-side)
- **Vanilla JavaScript**: O frontend é desenvolvido em JavaScript puro (ES6+), HTML5 semântico e CSS3 puro, sem frameworks pesados (sem React, Vue ou Angular).
- **Zero Bundler**: Não utilizamos Webpack, Vite, Parcel, Rollup, Babel ou compilações npm. Os arquivos são servidos e executados diretamente pelo navegador.
- **PWA & Service Worker**:
  - `src/bomboni/adapters/web/static/service-worker.js`: implementa o cache offline para o shell da aplicação (HTML, CSS, JS, manifest e ícones) e política estritamente **network-only** para `/api/*`.
  - Invalidação controlada por versão de cache e query strings nos assets (`?v=...`).
- **Arquivos Canônicos da UI**:
  - `src/bomboni/adapters/web/static/index.html`
  - `src/bomboni/adapters/web/static/app.js`
  - `src/bomboni/adapters/web/static/styles.css`
  - `src/bomboni/adapters/web/static/service-worker.js`
  - `src/bomboni/adapters/web/static/manifest.webmanifest`

### Backend e Build (Python 3.11+)
- **Estrutura Modular em Camadas**:
  - `core/`: modelos de domínio (`Restaurant`, `Menu`, `Dish`), protocolos e serviços de negócio (`RestaurantService`). Desacoplado de transportes (zero imports de MCP ou frameworks web).
  - `data_sources/studentska_prehrana/`: cliente HTTP (`httpx`) e parser HTML (`BeautifulSoup4`) para listagens e cardápios diários do portal oficial.
  - `data_sources/translation/`: adaptadores de tradução preservando o texto esloveno original junto às traduções.
  - `adapters/web/`: servidor HTTP leve para a PWA local e endpoints JSON (`/api/restaurants`, `/api/restaurants/{id}/menu`, `/api/restaurant-hours`, `/api/draw`).
  - `adapters/mcp/`: servidor do protocolo Model Context Protocol (MCP) para integração com assistentes de IA.
  - `api/`: funções serverless Vercel (finas, apenas delegando para `RestaurantService`).
- **Scripts de Build e Sincronização de Assets**:
  - `scripts/prepare_vercel.py`: Valida a sintaxe de todos os arquivos JS com `node -c` e copia o conteúdo de `src/bomboni/adapters/web/static/` para a pasta de distribuição `public/` (usada pelo deploy na Vercel).
  - `scripts/setup_git_hooks.py`: Instala hooks nativos de Git para validação pré-commit de JS (`node -c`) e Python (`pytest`).

---

## 2. Regras Críticas de Não Regressão

### 1. Validação Obrigatória de Sintaxe JavaScript
- **Regra**: Qualquer alteração em arquivos `.js` (`app.js`, `service-worker.js`) **deve** ser validada com `node -c <caminho>` antes de qualquer commit ou abertura de Pull Request.
- Na ausência de um bundler com transpile, qualquer erro de sintaxe passa direto para o navegador e quebra a inicialização do app silenciosamente.
- Validação rápida:
  ```bash
  node -c src/bomboni/adapters/web/static/app.js && node -c src/bomboni/adapters/web/static/service-worker.js
  ```

### 2. Cuidados Estritos com Service Worker e Invalidação de Cache
- **Regra**: Toda alteração em arquivos de frontend (`app.js`, `styles.css`, `index.html` ou `service-worker.js`) **exige obrigatoriamente** a atualização das versões de cache.
- **Passos ao modificar o frontend**:
  1. No `src/bomboni/adapters/web/static/service-worker.js`:
     - Incrementar `CACHE` (ex: de `'bomboni-shell-v19'` para `'bomboni-shell-v20'`).
     - Atualizar as query strings no array `SHELL` (ex: `'/styles.css?v=v20'`, `'/app.js?v=v20'`).
  2. No `src/bomboni/adapters/web/static/index.html`:
     - Atualizar as referências de link e script (`href="/styles.css?v=v20"`, `src="/app.js?v=v20"`).
     - Atualizar o registro do Service Worker (`register('/service-worker.js?v=20')`).
- **Por que isso é crítico?** PWAs instaladas no dispositivo mantêm o cache ativo; sem o bump de versão, os usuários continuarão no shell antigo (stale cache).
- **APIs Network-Only**: As rotas `/api/*` **nunca** devem ser salvas em cache pelo Service Worker; cardápios e horários são dinâmicos e dependentes de data.

### 3. Fonte Canônica de Assets vs. Diretório `public/`
- **Regra de Ouro**: O código-fonte canônico reside exclusivamente em `src/bomboni/adapters/web/static/`.
- O diretório `public/` na raiz é um artefato gerado por `scripts/prepare_vercel.py` e ignorado pelo controle de versão (`.gitignore`).
- **NUNCA** edite arquivos diretamente em `public/`.
- Após qualquer modificação em `src/bomboni/adapters/web/static/`, execute:
  ```bash
  python3 scripts/prepare_vercel.py
  ```

### 4. Guardrails de UI e Design System
- **Visual e Cores**: Canvas off-white acolhedor (`#f5f3ed`), tipografia verde escuro, detalhes em verde suave, cartões com bordas sutis e cantos arredondados.
- **Formatação de CSS**: Mantenha formatação limpa e legível em `src/bomboni/adapters/web/static/styles.css`. Não concentre múltiplos blocos de componentes em linhas únicas de vários kilobytes.
- **Mobile Safe Areas e Tab Bar**: Barra de navegação inferior flutuante (Liquid Glass) com 4 abas estáveis: **Explorar**, **Favoritos**, **Sorteio**, **Perfil**. A barra deve respeitar a `env(safe-area-inset-bottom)` e nunca cobrir o conteúdo dos cartões.
- **Inputs no Safari iOS**: Mantenha sempre `font-size: 16px` em todos os `<input>` e `<select>` mobile para impedir o zoom automático forçado do Safari no iPhone.
- **Scroll Container**: A listagem de restaurantes deve ser contida em `.restaurant-scroll-area`, mantendo a busca e topo fixos. Ao aplicar filtros ou pesquisar, resete `scrollTop = 0`.
- **Spinner Oficial**: Operações assíncronas (busca, sorteio, carregamento de cardápio) **devem** utilizar o spinner de bombom giratório oficial (`.bonbon-spinner`), nunca textos simples, emojis ou símbolos de faísca/IA.

---

## 3. Definição de Done (DoD) para Pull Requests

Antes de submeter qualquer Pull Request (pelo Jules ou seus sub-agentes como Bolt), o seguinte checklist **deve** ser cumprido rigorosamente:

1. **[ ] Sintaxe JavaScript Validada**:
   ```bash
   node -c src/bomboni/adapters/web/static/app.js && node -c src/bomboni/adapters/web/static/service-worker.js
   ```
2. **[ ] Sintaxe Python Validada**:
   ```bash
   python3 -m compileall -q src tests scripts
   ```
3. **[ ] Suíte Completa de Testes Aprovada**:
   ```bash
   pytest
   ```
   (Todos os testes em `tests/` devem passar com sucesso).
4. **[ ] Invalidação de Cache Efetuada (se o frontend foi alterado)**:
   - Bump da versão `CACHE` e `SHELL` em `service-worker.js`.
   - Bump das query strings de versão em `index.html`.
5. **[ ] Build de Assets Executado**:
   ```bash
   python3 scripts/prepare_vercel.py
   ```
6. **[ ] Integridade e Git Clean**:
   - Nenhum arquivo editado diretamente em `public/`.
   - Nenhum artefato temporário (`__pycache__`, `.DS_Store`, etc.) comitado.
   - Nenhuma credencial ou log sensível adicionado.

---

## 4. Web API Route Contract & Source Behavior

- O frontend solicita cardápios via `/api/restaurants/{restaurant_id}/menu?date=YYYY-MM-DD`. O servidor local atende a essa rota diretamente; a Vercel a reescreve para `/api/menu?restaurant_id=...&date=...`.
- Mantenha a URL do frontend, a rota do adaptador local e a reescrita da Vercel estritamente em sincronia.
- `/api/restaurant-hours?ids=...` aceita até 20 IDs e busca horários das páginas de detalhe oficiais de forma assíncrona/concorrente bounded, calculando aberto/fechado pelo fuso `Europe/Ljubljana`.
- Cada cartão de prato mantém ação de busca de imagem abrindo o Google Imagens com o nome original em esloveno em nova aba.
- Menus são datados e voláteis: retorne a data solicitada e timestamp de busca junto com os resultados.
- Trate IDs de restaurante como chaves estáveis e nomes como rótulos de exibição, nunca como identificadores únicos.

---

## 5. Answering student meal questions in Antigravity

- Trate perguntas sobre *boni*, restaurantes conveniados, cardápios e copagamentos como consultas para dados do Bomboni.
- O Bomboni é a fonte da verdade para esses fatos. Utilize as ferramentas MCP disponíveis (`search_restaurants`, `get_restaurant_menu`, `search_menu_items`).
- Apresente os dados com precisão: nomes dos estabelecimentos, endereços, copagamentos, data do menu e pratos correspondentes.
- Se não houver dados disponíveis ou resultados forem truncados, informe com clareza sem tentar deduzir ou adivinhar.
