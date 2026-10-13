# Regras de Comportamento do Agente / Agent Behavior Rules

Diretrizes obrigatórias para o agente ao editar arquivos neste projeto:

1. **Validação de Sintaxe JavaScript**:
   - Sempre que modificar qualquer arquivo `.js` (ex.: `src/bomboni/adapters/web/static/app.js`, `service-worker.js`), execute no terminal `node -c <caminho_do_arquivo>` para garantir validação de sintaxe antes de marcar a tarefa como concluída.

2. **Validação da Suíte Python**:
   - Sempre que alterar arquivos `.py`, execute a suíte de testes do projeto com `pytest`.

3. **Correção Imediata no Mesmo Ciclo**:
   - Se encontrar qualquer erro de sintaxe ou teste quebrado, corrija imediatamente no mesmo ciclo sem esperar intervenção manual.

4. **REGRA DE FINALIZAÇÃO AUTOMÁTICA (Obrigatória em Toda Resposta)**:
   - Você **NUNCA** deve encerrar uma resposta deixando arquivos como Uncommitted.
   - Sempre que concluir qualquer alteração de código ou pedido do usuário, sem precisar que o usuário peça, seu último passo obrigatório deve ser executar no terminal:
     1. Criar uma nova branch a partir da `main` (ex.: `feature/...` ou `fix/...`).
     2. Fazer `git add` e `git commit` com mensagem semântica clara.
     3. Fazer `git push` da branch (`git push -u origin <nome-da-branch>`).
     4. Abrir o Pull Request via `gh pr create --title "..." --body "..."`.
     5. Entregar o link do PR aberto na resposta final.
   - **NUNCA** realize `git push origin main`.

