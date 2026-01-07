
# Loja Online (React + Vite)

Pequena aplicação de e-commerce construída com React e Vite. Mostra uma listagem de produtos, detalhe do produto, carrinho com persistência e fluxo de finalização simples.

**Tecnologias principais**: React, Vite, React Router, react-hot-toast, react-confetti.

**API e Endpoints Usados**

- **API escolhida**: FakeStoreAPI (https://fakestoreapi.com). A integração está centralizada em `src/services/api.js`.
- **Endpoints consumidos**:
	- **GET /products**: lista todos os produtos (função `getAllProducts`).
	- **GET /products/:id**: detalhes de um produto por ID (função `getProductById`).
	- **GET /products/categories**: lista de categorias disponíveis (função `getCategories`).
	- **GET /products/category/:category**: produtos filtrados por categoria (função `getProductsByCategory`).

> Observação: para alterar a URL base, edite `src/services/api.js` e atualize `BASE_URL`.

**Instalação & Execução**

- **Pré-requisitos**: Node.js (recomenda-se Node 16+), npm.
- Clonar / obter o projeto e instalar dependências:

```bash
npm install
```

- Rodar em modo desenvolvimento:

```bash
npm run dev
```

- Build de produção:

```bash
npm run build
```

- Servir build localmente (preview):

```bash
npm run preview
```

- Lint (ESLint):

```bash
npm run lint
```

As portas e comportamento seguem o padrão do Vite; ajuste com variáveis de ambiente se necessário.

**Funcionalidades implementadas**

- **Listagem de produtos**: página principal busca e exibe todos os produtos (`src/pages/Home.jsx`, `src/components/ProductCard.jsx`).
- **Busca por texto**: campo de busca para filtrar por título (não sensível a maiúsculas/minúsculas).
- **Filtro por categoria**: select com categorias obtidas da API (`getCategories`).
- **Detalhe do produto**: página de detalhe com imagem, descrição, preço e botão para adicionar ao carrinho (`src/pages/ProductDetail.jsx`).
- **Adicionar ao carrinho**: botão para adicionar produto; se já existir, incrementa a quantidade (`src/context/CartContext.jsx`).
- **Carrinho persistente**: estado do carrinho salvo em `localStorage` (persistência entre recarregamentos).
- **Atualizar quantidade / remover item / esvaziar carrinho**: controles na página do carrinho (`src/pages/Cart.jsx`).
- **Resumo do pedido**: cálculo dinâmico de subtotal/total e contagem de itens (derivados em `CartContext`).
- **Notificações**: feedback visual com `react-hot-toast` ao adicionar/remover itens.
- **Página de sucesso (checkout)**: fluxo simples de finalização com redirecionamento (`src/pages/CheckoutSuccess.jsx`) e confetti (`react-confetti`).
- **Tratamento de carregamento e erros**: estados `loading` e `error` nas páginas que fazem fetch (`Home.jsx`, `ProductDetail.jsx`).
- **Navegação**: barra superior com link para produtos e ícone do carrinho que mostra a quantidade atual (`src/components/Navbar.jsx`).

**Onde alterar / pontos úteis**

- `src/services/api.js`: centraliza chamadas à FakeStoreAPI.
- `src/context/CartContext.jsx`: lógica do carrinho (adicionar, remover, atualizar, persistência).
- `src/pages/*` e `src/components/*`: responsabilidades de UI e composição.


