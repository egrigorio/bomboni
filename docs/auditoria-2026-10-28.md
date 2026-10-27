# Auditoria e backlog imediato do Bomboni

Data: 28/10/2026. Base: `origin/main` em `fb2bec6`.

## Escopo e conclusão

Revisão de código da PWA, comunidade, transporte MCP, funções Vercel, tradução, armazenamento, CI e testes. Este PR entrega diagnóstico e tarefas; não altera o comportamento do produto. Não foram enviados e-mails reais, realizados ataques contra produção, inspecionados valores de segredos ou validados DNS, configuração do provedor SMTP e proteção de branches no GitHub. A avaliação de UX abaixo é uma hipótese baseada na estrutura e nos fluxos do código, a validar com pessoas e navegação móvel.

A prioridade é consolidar identidade e verificação no servidor antes de ampliar a comunidade. O projeto possui dois sistemas de conta: um local, com senha em texto puro e verificação no cliente, e outro persistente, com hash de senha e sessões. A ativação do segundo depende de uma consulta assíncrona de status. Isso cria diferenças de segurança e comportamento conforme disponibilidade/configuração da comunidade.

Há boas bases a preservar: domínio separado dos transportes, SQL parametrizado nas operações examinadas, hashes PBKDF2 com salt, comparação segura, tokens aleatórios armazenados por hash no servidor, limite de tentativas por código, concorrência limitada nas consultas de menus e APIs fora do cache do service worker. Essas proteções não eliminam os problemas abaixo.

Prioridades: **P0** = corrigir antes de promover cadastro/comunidade; **P1** = próximo ciclo; **P2** = simplificação e manutenção após contenção. Tamanhos relativos: P = pequeno, M = médio, G = grande; não são estimativas em dias.

## P0 — segurança e confiança

| ID | Evidência e risco confirmado | To do | Aceite | Porte |
| --- | --- | --- | --- | --- |
| SEC-01 | `static/app.js`, handlers de `auth-form`/`auth-verify-form`: `user.password !== password`, `saveUsers`, `emailVerified: true` e comparação local de código. Senhas ficam em `bomboni-users`; a identidade local não comprova titularidade. | Remover autenticação local e manter um único fluxo de conta no backend. Continuar permitindo consulta e favoritos como visitante. Apagar o armazenamento legado de senhas sem enviá-las ao servidor; pedir nova autenticação/cadastro. | Nenhuma senha/código persistido no navegador; falha/desativação de comunidade nunca ativa login local; testes para status lento, erro e indisponibilidade. | G |
| SEC-02 | `api/send_code.py` e `adapters/web/server.py`: `/api/send-code` retorna `code`, ignora o booleano de entrega e não limita frequência. O cliente também gera código com `Math.random()` e anuncia envio mesmo após falha. | Desativar/remover o endpoint legado após migrar consumidores; centralizar solicitação e verificação no serviço de identidade. | Respostas e logs de produção sem códigos; erro SMTP não gera sucesso; contrato local/Vercel idêntico. | M |
| SEC-03 | `community/http.py:community_api`: sem `SMTP_HOST` em produção, `verify_email=False`; `request_signup` emite sessão para conta não verificada. Os testes atuais exigem esse comportamento. | Exigir verificação em produção ou bloquear cadastro com erro recuperável se e-mail estiver indisponível. Definir transição para contas já não verificadas e restringir participação até validação. | Ausência/falha de SMTP nunca permite conta marcada como verificada ou participação autenticada irrestrita; substituir os testes que legitimam o bypass. | M |
| SEC-04 | `community/service.py:request_signup/login`: sem throttling de autenticação; reenvio apaga o registro pendente e reinicia `attempts`. Cinco erros por código não impedem novas tentativas por reenvio. | Aplicar limites persistentes por conta/e-mail e origem, cooldown e orçamento de envios; limite de tentativas entre reenvios e tratamento de enumeração. | Testes de múltiplas instâncias, reenvios e concorrência; resposta 429 coerente; janela de bloqueio não permite derrubar permanentemente conta de terceiros. | G |
| SEC-05 | `community/service.py:follow/profile`: qualquer usuário pode seguir sem aprovação e `visible = is_me or following or not is_private`. `get_list` não verifica privacidade; contagens/badges saem antes do bloqueio de visibilidade. | Definir semântica de privado e aplicá-la em perfil, feed, listas, fotos, encontros e agregados. Implementar aprovação de seguidores ou impedir que seguir libere conteúdo privado. | Matriz anônimo/dono/terceiro/seguidor não aprovado/aprovado; acesso direto por ID não contorna a política; definir explicitamente o que permanece público. | G |

Observação: SEC-01/02 comprometem a confiança do fluxo local; não demonstram, por si, obtenção de um token válido do backend da comunidade. O interceptador de formulário em `community.js` só é instalado após `/api/community/status` responder com `enabled: true`.

## P1 — SMTP e ciclo de conta

SMTP já existe em `adapters/web/server.py:send_verification_email`: suporta SSL na porta 465, STARTTLS nas demais, autenticação e timeout. A necessidade é completar e tornar confiável essa implementação, não começar do zero.

- [ ] **MAIL-01 (M)** Extrair envio de e-mail para adaptador próprio, injetado no serviço. Hoje comunidade importa uma função do servidor web. Validar configuração e usar contexto TLS explícito com validação de certificado. Aceite: testes de SSL/STARTTLS, credenciais ausentes, certificado inválido, timeout e rejeição; nenhum fallback para conexão aberta.
- [ ] **MAIL-02 (M)** Configurar remetente e domínio no provedor escolhido; verificar SPF, DKIM, DMARC e caixa de teste. Aceite: entrega real autorizada em ambiente de homologação, cabeçalhos de autenticação verificados e procedimento documentado. Configuração externa ainda não examinada.
- [ ] **MAIL-03 (M)** Separar falhas temporárias/permanentes e a confirmação de aceite SMTP da entrega na caixa. Hoje `send_message()` não tem seu retorno de destinatários recusados inspecionado. Adicionar eventos sem senha/código/corpo e métricas de falha; avaliar fila/outbox e retentativas limitadas conforme volume, sem criar infraestrutura desnecessária. Aceite: falhas não anunciam envio concluído e repetição não cria contas ou mensagens ilimitadas.
- [ ] **MAIL-04 (M)** Trocar código de quatro dígitos por desafio de maior entropia, de uso único, expiração e tentativas atômicas. Tornar explícito o modo de desenvolvimento; não inferi-lo apenas de variáveis ausentes. Aceite: código antigo invalidado, concorrência não consome duas vezes, nenhum código em logs/respostas de produção.
- [ ] **MAIL-05 (G)** Implementar recuperação/troca de senha, revogação de sessões e exclusão de conta com reautenticação para ações sensíveis. Aceite: respostas não revelam existência de conta; tokens de recuperação expiram e não são reutilizados; exclusão aplica política de retenção definida.
- [ ] **MAIL-06 (M)** Traduzir assunto, corpo, validade e erros do e-mail conforme idioma validado do usuário, com fallback explícito. Hoje assunto e corpo são fixos em português. Aceite: versões revisadas para os sete idiomas da interface e ausência de conteúdo inserido como cabeçalho pelo usuário.

## P1 — outras superfícies de risco

- [ ] **SEC-06 (M)** Revisar duração de 90 dias e token da comunidade em `localStorage`. Definir expiração, revogação e sessões por dispositivo. Para a PWA de mesma origem, avaliar cookie HttpOnly/Secure/SameSite com proteção CSRF; não migrar para cookie sem revisar esse contrato. Aceite: logout e revogação testados, nenhum token em HTML/URL/log, XSS tratado em todas as renderizações de conteúdo externo.
- [ ] **SEC-07 (M)** Em `add_photo`, validar conteúdo real e dimensões: hoje MIME vem da data URL e apenas base64/tamanho são validados. Reencodar imagens e remover metadados quando aplicável. Rever fotos com cache público imutável de um ano: exclusão/moderação não recolhe cópias já cacheadas. Aceite: MIME falso, imagem inválida, dimensões abusivas e conteúdo removido tratados por política explícita; considerar armazenamento de objetos em vez de base64 no banco.
- [ ] **SEC-08 (M)** Padronizar limites e validação HTTP: `api/mcp.py` lê `Content-Length` sem limite de aplicação; outros endpoints têm limites diferentes. Validar objeto JSON, tipos, datas reais, números finitos, IDs existentes e parâmetros máximos antes de processar. Aceite: negativos, não numéricos, arrays no lugar de objetos e cargas excessivas resultam em 4xx, sem stack trace ou trabalho desnecessário.
- [ ] **SEC-09 (M)** Definir quotas/orçamentos para tradução e busca ampla de menus. A tradução permite até 120 textos e oito workers por chamada; cache é por processo, insuficiente contra abuso entre instâncias. MCP público tem CORS `*`, o que não é falha por si em API pública, mas requer política consciente de origem e custo. Aceite: limite de trabalho por chamada/cliente, cancelamento/timeout e testes de saturação controlados.
- [ ] **SEC-10 (M)** Revisar cabeçalhos de segurança no HTML e imagens, CSP compatível com scripts existentes, `frame-ancestors`, referrer e erros públicos. `vercel.json` configura cache, sem esses cabeçalhos; vários handlers devolvem `detail: str(exc)`. Aceite: erros com identificador de correlação e detalhes restritos ao servidor; CSP testada sem quebrar PWA/MCP. Conferir também cabeçalhos efetivos da hospedagem antes de concluir ausência em produção.
- [ ] **SEC-11 (M)** Revisar pipeline de merge: `.github/workflows/autonomous-pr.yml` aprova e tenta merge com `--admin` após testes. Não presumir que a chamada tenha sucesso; ela configura uma tentativa de contornar proteções. Exigir revisão de alterações sensíveis, permissões mínimas e checks de segurança. Aceite: PR externo não recebe poder de escrita indevido; nenhum bypass administrativo automático; branch protections verificadas no GitHub.
- [ ] **SEC-12 (G)** Tornar criação/verificação de conta e limites transacionais. `Store.run` confirma cada instrução separadamente; exclusão de pendência, criação de usuário e sessão não formam uma transação única. Adicionar migrações versionadas, integridade referencial e limpeza de sessões/pendências expiradas. Aceite: testes Postgres reais de concorrência/rollback e recuperação de conexão; backup/restauração ensaiados.
- [ ] **SEC-13 (M)** Revisar moderação e abuso: três denúncias ocultam conteúdo e contas sem verificação facilitam manipulação; dados de restaurante enviados pelo cliente são aceitos como rótulos e IDs. Aceite: autorização por recurso, controles contra contas abusivas, referências de restaurante validadas e processo de revisão/restauração de conteúdo definido.
- [ ] **SEC-14 (M)** Inventariar dados pessoais e persistência local: localização salva, histórico, faculdade, relações e fotos. Definir exportação, exclusão, retenção e consentimento por recurso; auditar segredos e dependências sem publicar valores. Aceite: limpeza local e exclusão remota têm escopos claros; inventário de variáveis apenas com nomes; varredura de dependências e segredos no CI.

## P1 — idiomas e qualidade dos dados

- [ ] **I18N-01 (M)** Criar catálogo verificável para `translations`, `featureCopy` e textos de `community.js`, hoje mantidos separadamente. Aceite: paridade de chaves, tipos/funções e placeholders nos sete idiomas (`pt/en/es/de/it/fr/ca`); falha de CI para chave ausente; sem introduzir bundler.
- [ ] **I18N-02 (M)** Cobrir texto visível, erros, aria-labels, placeholders, estados vazios, spinner, datas e e-mails. Há fallbacks em português e `semester_range` devolve `inverno/verão` no backend. Retornar identificadores/datas e localizar na apresentação. Aceite: fluxo inteiro não mistura idiomas; `document.lang`, moeda, plural e datas corretos; revisão humana especialmente para termos alimentares.
- [ ] **I18N-03 (M)** Testar fallback e persistência: idioma inicial hoje é português; escolher regra de produto para idioma do navegador + preferência salva + fallback. Tratar acesso indisponível/corrompido a storage (há leitura direta de `bomboni-language`). Aceite: app inicia em modo privado/storage indisponível e rejeita preferência inválida; troca de idioma atualiza também painéis já abertos.
- [ ] **I18N-04 (M)** Validar tradução como tradução, não como verdade nutricional: preservar original esloveno, rótulo de tradução automática e falha por item. Cobrir diacríticos, HTML escapado, textos multibyte acima do limite em bytes e provedor que muda/mescla linhas. Aceite: falha não aparenta tradução válida; nenhum prato é ligado à tradução de outro; alertas sobre ingredientes continuam acessíveis.
- [ ] **I18N-05 (M)** Definir envio de texto comunitário ao tradutor externo. O modo `source=auto` já existe; documentar quais textos podem sair e evitar envio de conteúdo privado/dados de conta. Aceite: payloads de tradução restritos ao conteúdo permitido e idioma aceito pelo backend; provedor indisponível mantém o original utilizável.

## P1 — testes e validação contínua

- [ ] **TEST-01 (G)** Substituir testes que confirmam as falhas atuais por regressões de SEC-01 a SEC-05. `test_signup_without_email_service_creates_unverified_account` e a parametrização SMTP atualmente exigem o bypass. Aceite: testes falham no comportamento vulnerável e passam na correção; não basta manter a suíte verde.
- [ ] **TEST-02 (G)** Ampliar E2E com contratos reais/mocks fiéis de comunidade ligada, desligada, lenta e indisponível. O smoke de cadastro atual usa `/api/send-code`, e o mock genérico não ativa a comunidade, portanto verifica o fluxo legado. Aceite: login/cadastro/reenvio/expiração/logout/revogação e importação testados no fluxo servidor; erro não é tratado como lista vazia.
- [ ] **TEST-03 (M)** Adicionar matriz de idiomas nos fluxos Explorar, Favoritos, Sorteio, Perfil e Comunidade; hoje há teste multilíngue concentrado na página MCP. Incluir viewport estreito, textos longos, teclado e foco em modais. Aceite: nomes acessíveis e ações principais corretos em cada idioma.
- [ ] **TEST-04 (M)** Testar PWA offline/atualização: `/api/*` e MCP nunca em cache, shell antigo atualizado, URLs `/mcp` e detalhes navegáveis, falha durante troca de versão. Aceite: APIs retornam erro offline explícito e nenhum menu antigo aparece como atual; cache/query strings sincronizados automaticamente.
- [ ] **TEST-05 (M)** Acrescentar integração Postgres e equivalência entre rotas locais/Vercel para menus, datas, erros e limites. Aceite: fixtures controladas sem depender de site externo; incluir mudanças de dia e horário de verão em Ljubljana, datas impossíveis e ano bissexto (semestre hoje termina em 28/02 fixo).
- [ ] **TEST-06 (P)** Tornar ambiente de testes reproduzível e módulos obrigatórios no CI. Validar todos os JS, inclusive `community.js`, executar build de assets e reportar skips explicitamente. Aceite: CI instala extras/browser/MCP e não aprova ausência de módulos essenciais; fixar versões de dependências de desenvolvimento conforme política do projeto.

## P2 — minimizar interface e melhorar UX

Preservar as quatro abas exigidas pelo projeto e Comunidade condicional. A proposta é reduzir conteúdo e decisões dentro delas; alterar essa navegação requer rever o contrato de produto no AGENTS.md.

| Área | Simplificação proposta | Como validar |
| --- | --- | --- |
| Explorar | Uma tarefa dominante: encontrar onde comer hoje. Busca visível, cidade/localização compreensível e um botão de filtros. Mostrar filtros avançados sob demanda; evitar muitos chips concorrentes. Manter busca/topo e reset de scroll previstos. | Comparar tarefa “almoço até X euros perto de mim” com fluxo atual: conclusão, cliques e erros. |
| Cartão de restaurante | Priorizar nome, copagamento, distância quando conhecida e status com fonte/horário. Uma ação principal para menu e favorito secundário. Mover dados sociais e detalhes para o restaurante. | Usuário identifica custo e abre menu sem interpretar ícones; “horário desconhecido” não vira “fechado”. |
| Menu | Prato traduzido como leitura principal, original acessível, ação de Google Imagens preservada. Agrupar avaliar, foto, registrar refeição e comunidade em ações secundárias progressivas. | Ver um prato exige poucos passos; uma única ação dominante por contexto; aviso alimentar localizável. |
| Favoritos | Usar mesmo padrão de cartão de Explorar; separar restaurantes/pratos com controle simples, sem repetir filtros e hierarquia de navegação. | Encontrar e remover um salvo com clareza; manter estado entre visitas. |
| Sorteio | Uma ação “Sortear” com preferências recolhidas. Após resultado, “Ver menu” e “Sortear novamente”. Usar bombom oficial no processamento. | Entender por que um restaurante é elegível e refazer sem perder restrições. |
| Perfil | Visitante usa favoritos sem conta. Conta para sincronização e participação. Resumo recente primeiro; calendário, estatísticas, badges e recap sob demanda. Separar preferências de uso de conta/privacidade. | Pessoa entende o benefício de entrar; distingue apagar dados locais de excluir conta. |
| Comunidade | Começar por avaliações e fotos no contexto do restaurante. Feed, pessoas, encontros, listas, ranking, perguntas e badges competem pela atenção: recolher recursos menos usados após medição. Usar flags por recurso com estados previsíveis. | Testar utilidade com estudantes; medir uso antes de remover; não adicionar novas subabas para cada recurso. |
| MCP | Manter integração acessível via rodapé/ajuda; na página, mostrar primeiro URL + copiar, deixando configuração detalhada expansível. | Visitante comum não precisa conhecer protocolo para usar refeições; cliente MCP ainda encontra instruções completas. |

- [ ] **UX-01 (M)** Prototipar esses ajustes preservando linguagem visual, safe area, inputs mobile de 16px e spinner oficial. Aceite: navegação por teclado, foco e toque, contraste e conteúdo sem cobertura pela tab bar em telas pequenas.
- [ ] **UX-02 (M)** Fazer sessão com estudantes em três tarefas: achar refeição com orçamento, ler menu em outro idioma e salvar/retomar favorito. Medir tempo, conclusão, erros e pedidos de ajuda; só definir metas numéricas após baseline.
- [ ] **UX-03 (M)** Padronizar carregamento, vazio, indisponível e erro recuperável. Evitar toast de sucesso antes de resposta real e estados que somem silenciosamente (`community.js` contém catches que limpam blocos). Aceite: usuário entende o que aconteceu e tem uma tentativa de recuperação clara.
- [ ] **TECH-01 (M)** Dividir `app.js` (~3.200 linhas) por responsabilidade usando JS nativo; retirar lógica duplicada de conta e localização/traduções redundantes antes de abstrair. Aceite: sem bundler, contratos estáveis e testes passando; redução de código medida, sem exigir migração de framework.

## Sequência sugerida de PRs

1. **Identidade e contenção:** SEC-01/02/03 + regressões TEST-01/02. Planejar juntos para não deixar UI chamando endpoint removido.
2. **SMTP confiável e proteção contra abuso:** SEC-04 + MAIL-01/03/04/06, configuração externa MAIL-02 em homologação.
3. **Privacidade e sessões:** SEC-05/06 + matriz de autorização; recuperação e exclusão MAIL-05.
4. **Transporte, uploads e operação:** SEC-07 a SEC-14 em PRs pequenos, iniciando por limites HTTP e pipeline.
5. **Idiomas e contratos:** I18N-01 a I18N-05 + TEST-03/05/06.
6. **Simplificação visual:** UX-01/02/03 e TECH-01, mantendo testes PWA TEST-04 e invalidação obrigatória de cache.

Não executar todos os itens em um único PR. Segurança e SMTP precedem promoção de recursos sociais; protótipos de UX podem ocorrer em paralelo, sem ampliar a superfície pública.

## Validação e limites

Sintaxe de `app.js`, `community.js` e `service-worker.js` aprovada; `compileall` em `src/tests/scripts` e `scripts/prepare_vercel.py` concluídos. Nenhuma edição direta em `public/` e nenhuma alteração de frontend neste PR; bump de cache não se aplica.

O Python padrão do sistema não possui MCP/Playwright: na revisão inicial, 67 testes passaram e dois módulos foram ignorados; as primeiras falhas de servidor eram restrições de socket do sandbox e desapareceram na execução autorizada. Na base final indicada acima, `.venv/bin/python -m pytest -q -rs` concluiu com **99 testes aprovados e nenhum skip**. Testes verdes não representam comprovação de entrega SMTP real nem auditoria de produção.

Referências de implementação: [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) para throttling, respostas e ciclo de autenticação; [documentação smtplib do Python](https://docs.python.org/3/library/smtplib.html) para TLS, timeout e semântica de envio. As constatações específicas do Bomboni vêm dos arquivos citados, e não de inferência sobre o ambiente publicado.
