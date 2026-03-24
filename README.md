## ISPCAN - Portal React

Migracao do portal institucional para React com Vite, mantendo os assets existentes e aplicando um visual moderno, responsivo e profissional.

## Scripts

- `npm run dev` inicia o ambiente de desenvolvimento.
- `npm run build` gera o build de producao.
- `npm run preview` executa uma pre-visualizacao local do build.

## Estrutura Principal

- `index.html`: ponto de entrada da aplicacao.
- `src/main.jsx`: bootstrap React.
- `src/App.jsx`: rotas, conteudos e componentes das paginas.
- `src/styles.css`: sistema visual completo, responsivo e animado.
- `src/data/news.json`: noticias editaveis sem alterar o componente React.
- `src/data/libraries.json`: livros e acervos da biblioteca por departamento.

## Rotas React

- `/`: pagina inicial institucional.
- `/cursos`: oferta formativa e requisitos.
- `/noticias`: lista de noticias.
- `/noticias/:slug`: detalhes de cada noticia.
- `/biblioteca`: entrada da biblioteca online.
- `/biblioteca/:departmentId`: acervo por departamento com busca e filtro.
- `/radio`: pagina da radio online.
- `/sobre`: pagina institucional.

## Melhorias de UX/UI

- Navegacao interna com React Router.
- Menu mobile com abertura e fecho suave.
- Transicao visual entre rotas.
- Layout responsivo para desktop, tablet e mobile.

## Edicao de Conteudo

- Para adicionar ou alterar noticias, edite `src/data/news.json`.
- Para actualizar livros e departamentos da biblioteca, edite `src/data/libraries.json`.
- Os caminhos de imagens e ficheiros devem ser definidos a partir da raiz do projeto, por exemplo: `/imagens/...` ou `/nav/...`.
 
