# Regras de Comportamento do Agente / Agent Behavior Rules

Diretrizes obrigatórias para o agente ao editar arquivos neste projeto:

1. **Validação de Sintaxe JavaScript**:
   - Sempre que modificar qualquer arquivo `.js` (ex.: `src/bomboni/adapters/web/static/app.js`, `service-worker.js`), execute no terminal `node -c <caminho_do_arquivo>` para garantir validação de sintaxe antes de marcar a tarefa como concluída.

2. **Validação da Suíte Python**:
   - Sempre que alterar arquivos `.py`, execute a suíte de testes do projeto com `pytest`.

3. **Correção Imediata no Mesmo Ciclo**:
   - Se encontrar qualquer erro de sintaxe ou teste quebrado, corrija imediatamente no mesmo ciclo sem esperar intervenção manual.
