# Bomboni — Roadmap / TO-DO List

Esta lista documenta as funcionalidades e integrações planeadas para implementações futuras no Bomboni.

## 1. Sistema de Ratings Híbrido (Próprio + Google)
- [ ] **Ratings Próprios**:
  - Permitir aos utilizadores autenticados atribuir notas e comentários públicos aos restaurantes de boni.
  - Calcular média ponderada das avaliações dos estudantes.
- [ ] **Importação de Ratings do Google**:
  - Conectar à API de Google Places (ou cache de sincronização com bounded concurrency) para obter a classificação e total de avaliações do Google.
- [ ] **Apresentação Lado a Lado**:
  - Exibir no cabeçalho do restaurante e nos cartões:
    - Selo de classificação Bomboni (estudantes): ex. `★ 4.8 (34 boni)`
    - Selo de classificação Google: ex. `G ★ 4.5 (1.2k)`

## 2. Integração com o Aplicativo Oficial Študentska Prehrana
- [ ] **Deep Linking / Redirecionamento**:
  - Validar e implementar o esquema de URL (`intent://`, `studentska-prehrana://` ou universal links em iOS/Android) para que, ao clicar na seta/link do restaurante, o utilizador seja redirecionado diretamente para a página correspondente no app oficial Študentska Prehrana instalado no dispositivo.
  - Manter fallback para a página web oficial (`https://www.studentska-prehrana.si/en/restaurant/Details/{id}`) quando o aplicativo não estiver instalado.

## 3. Internacionalização: Suporte a Catalão (Català - `ca`)
- [ ] Adicionar `ca` como idioma suportado no seletor de idiomas:
  - Dicionário de tradução da interface (labels, navegação, filtros, estados).
  - Suporte à tradução de nomes de pratos e categorias (`Carn`, `Peix`, `Sense carn`, etc.).
  - Preservar os termos e nomes originais em esloveno no detalhe dos pratos.
