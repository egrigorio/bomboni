import os
import sys
import subprocess
from google import genai

def run_cmd(cmd):
    return subprocess.check_output(cmd, shell=True, text=True).strip()

def main():
    pr_number = os.environ.get("PR_NUMBER")
    api_key = os.environ.get("GEMINI_API_KEY")

    if not api_key:
        print("ERRO: GEMINI_API_KEY nao configurada.")
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    # Obter diff em relacao a main
    diff = run_cmd("git diff origin/main...HEAD")
    if not diff:
        print("Nenhuma alteracao detectada no diff.")
        sys.exit(0)

    # Ler diretrizes do projeto
    rules = ""
    if os.path.exists("AGENTS.md"):
        with open("AGENTS.md", "r", encoding="utf-8") as f:
            rules = f.read()

    prompt = f"""
    Voce e um gatekeeper senior de qualidade de software em um pipeline autonomo.
    Analise o diff abaixo e tome uma decisao estrita: APROVADO ou REPROVADO.

    Regras obrigatorias do projeto (AGENTS.md):
    {rules}

    Criterios de REPROVACAO imediata:
    1. Alterou app.js, index.html ou styles.css SEM atualizar a versao de cache do service-worker.js.
    2. Editou diretamente arquivos em public/ (a pasta correta e src/bomboni/adapters/web/static/).
    3. Brechas de seguranca graves (ex: XSS via innerHTML sem sanitizacao).
    4. Quebra clara de logica de negocio.

    DIFF:
    {diff}

    Responda EXATAMENTE no seguinte formato:
    DECISAO: [APROVADO ou REPROVADO]
    MOTIVO: [Breve explicacao de 1 a 2 frases]
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    result = response.text.strip()
    print("Avaliacao da IA:\n", result)

    # Posta comentario no PR
    with open("review.txt", "w", encoding="utf-8") as f:
        f.write(f"### 🛡️ Guardrail Semantico\n\n{result}")
    run_cmd(f"gh pr comment {pr_number} --body-file review.txt")

    if "DECISAO: REPROVADO" in result:
        print("Gatekeeper IA reprovou as mudancas.")
        sys.exit(1)

    print("Gatekeeper IA aprovou o PR com sucesso.")

if __name__ == "__main__":
    main()
