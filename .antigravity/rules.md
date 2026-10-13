# Regras de Comportamento do Agente / Agent Behavior Rules

Diretrizes obrigatórias para o agente ao editar arquivos neste projeto:

1. **Validação de Sintaxe JavaScript**:
   - Sempre que modificar qualquer arquivo `.js` (ex.: `src/bomboni/adapters/web/static/app.js`, `service-worker.js`), execute no terminal `node -c <caminho_do_arquivo>` para garantir validação de sintaxe antes de marcar a tarefa como concluída.

2. **Validação da Suíte Python**:
   - Sempre que alterar arquivos `.py`, execute a suíte de testes do projeto com `pytest`.

3. **Correção Imediata no Mesmo Ciclo**:
   - Se encontrar qualquer erro de sintaxe ou teste quebrado, corrija imediatamente no mesmo ciclo sem esperar intervenção manual.

4. **Fluxo Obrigatório de Git e Pull Request (Nunca push na main)**:
   - **NUNCA** realize `git push origin main`.
   - Ao concluir qualquer tarefa pedida pelo usuário:
     1. Crie uma branch com nome descritivo (ex.: `feature/...` ou `fix/...`).
     2. Faça o commit das alterações realizadas.
     3. Dê push na nova branch (`git push -u origin <nome-da-branch>`).
     4. Abra o Pull Request automaticamente utilizando o comando:
        `gh pr create --title "..." --body "..."`
     5. Informe ao usuário apenas o link do PR criado para que a esteira automática assuma o controle.

