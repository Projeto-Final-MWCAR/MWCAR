# Cronograma de Desenvolvimento — MWCar

# [Link Figma](https://www.figma.com/make/V7uJXkS5cSGnmhyQDV5v97/Site-completo-para-MWCar?t=esZzf3N2eqij9qaw-1)

**Stack:** React (Front-end) · Node.js/JavaScript (Back-end) · Firebase (Auth + Firestore + Storage)

Este documento pode ser copiado direto para o **README** do repositório ou quebrado em **Issues/Project Board** no GitHub (recomendo criar um board com colunas: `Backlog`, `Em progresso`, `Em revisão`, `Concluído`).

---

## Sprint 0 — Setup do Projeto (Base)
> Objetivo: deixar o ambiente pronto para todo mundo trabalhar sem conflito.

| Task | Descrição | Sugestão de responsável |
|---|---|---|
| Criar repositório e estrutura de pastas | `/frontend` (React) e `/backend` (Node/Express) | Tech Lead |
| Configurar Firebase (projeto novo) | Criar projeto no console, ativar Authentication, Firestore e Storage | Backend |
| Configurar variáveis de ambiente (.env) | Chaves do Firebase, portas, URLs | Backend |
| Configurar ESLint/Prettier | Padronizar código entre a equipe | Qualquer membro |
| Criar board no GitHub Projects | Colunas + labels (`frontend`, `backend`, `bug`, `urgente`) | Tech Lead |
| Definir modelagem de dados no Firestore | Coleções: `cars`, `users` (admins) | Backend |

---

## Sprint 1 — Autenticação
> Objetivo: tela de login funcional conectada ao Firebase Auth.

| Task | Descrição |
|---|---|
| Criar tela de Login (React) | Baseado no protótipo Figma: campos Login/Senha, fundo preto |
| Integrar Firebase Authentication | Login por e-mail/senha |
| Criar rota protegida (Admin) | Redirecionar para dashboard só se autenticado |
| Middleware/hook de autenticação | `useAuth` ou similar para checar sessão do usuário |
| Tratamento de erros de login | Mensagens (senha errada, usuário não existe, etc.) |

---

## Sprint 2 — Home Page (parte estática)
> Objetivo: montar a estrutura visual da Home conforme o Figma.

| Task | Descrição |
|---|---|
| Componente Nav | Menu fixo, logo, links, botão de login |
| Componente Header/Hero | Banner principal com CTA |
| Seção "Quem Somos" | Conteúdo institucional |
| Seção Localização | Embed do mapa (Google Maps API ou iframe) + endereço |
| Componente Footer | Links, redes sociais, contato |
| Responsividade geral (mobile/tablet) | Testar em diferentes breakpoints |

---

## Sprint 3 — Catálogo de Carros (parte dinâmica)
> Objetivo: exibir os carros cadastrados no Firestore na Home.

| Task | Descrição |
|---|---|
| Criar componente Card de Carro | Imagem, modelo, ano, preço, botão "ver detalhes" |
| Buscar dados do Firestore | Listar coleção `cars` na Home |
| Página/Modal "Detalhes do Carro" | Mais informações + galeria de imagens |
| Filtros de busca (marca, preço, ano) | Filtro client-side ou query no Firestore |
| Loading states / tratamento de erro | Skeleton ou spinner enquanto carrega dados |

---

## Sprint 4 — Painel Admin (CRUD)
> Objetivo: painel para o admin gerenciar o catálogo.

| Task | Descrição |
|---|---|
| Layout do Dashboard | Sidebar + área de conteúdo, conforme Figma |
| Listagem de carros (tabela) | Miniatura, modelo, ano, preço, status, ações |
| **Create:** Formulário "Adicionar Carro" | Upload de imagem (Firebase Storage) + dados no Firestore |
| **Update:** Edição de carro existente | Reaproveitar formulário de criação, preenchido |
| **Delete:** Exclusão de carro | Modal de confirmação antes de excluir |
| Validação de formulário | Campos obrigatórios, tipos, tamanho de imagem |
| Regras de segurança do Firestore/Storage | Garantir que só admin autenticado escreve dados |

---

## Sprint 5 — Integração, Testes e Deploy
> Objetivo: unir tudo, testar e publicar.

| Task | Descrição |
|---|---|
| Testes manuais de fluxo completo | Login → Catálogo → Admin CRUD |
| Ajustes de UI/UX pós-teste | Corrigir divergências com o protótipo do Figma |
| Configurar regras finais de segurança (Firebase) | Revisão de Firestore Rules e Storage Rules |
| Deploy do front-end | Firebase Hosting ou Vercel |
| Deploy do back-end (se separado) | Railway, Render ou Firebase Functions |
| Documentação final (README) | Como rodar o projeto localmente, variáveis de ambiente, etc. |

---

## Sugestão de divisão de papéis (se a equipe tiver 3–4 pessoas)

- **Pessoa 1 (Front-end Home):** Sprints 2 e parte do 3 (UI estática + integração de catálogo)
- **Pessoa 2 (Front-end Admin):** Sprint 4 (Dashboard/CRUD)
- **Pessoa 3 (Back-end/Firebase):** Sprint 0, Sprint 1 (Auth), regras de segurança
- **Pessoa 4 (ou rotativo):** Sprint 3 (catálogo dinâmico) + Sprint 5 (integração/deploy)

> Dica: cada linha da tabela pode virar uma **Issue** no GitHub, com o Sprint como **Milestone**. Assim dá pra acompanhar o progresso pelo board automaticamente.

---

## Modelagem do Firestore

### Coleção `cars`

Catálogo de carros da loja, exposto publicamente para leitura (`GET /api/cars`) e editável só por admin autenticado.

| Campo | Tipo | Descrição |
|---|---|---|
| `model` | string | Modelo do carro (obrigatório) |
| `brand` | string | Marca (obrigatório) |
| `year` | number | Ano do carro (obrigatório) |
| `price` | number | Preço (obrigatório) |
| `description` | string | Descrição livre do carro |
| `images` | string[] | URLs das imagens (hospedadas no Cloudinary) |
| `status` | `"disponivel"` \| `"reservado"` | Situação de venda do carro |
| `createdAt` | string (ISO 8601) | Data de criação |
| `updatedAt` | string (ISO 8601) | Data da última edição |

### Coleção `users`

Perfil complementar dos admins. O login em si (email/senha) fica no **Firebase Authentication** — esta coleção guarda dados extras vinculados ao mesmo UID do Auth. O ID do documento é sempre igual ao `uid` do usuário autenticado.

| Campo | Tipo | Descrição |
|---|---|---|
| `uid` | string | UID do Firebase Authentication (= ID do documento) |
| `email` | string | E-mail do admin |
| `name` | string | Nome do admin |
| `role` | `"admin"` | Papel do usuário (hoje só existe admin) |
| `createdAt` | string (ISO 8601) | Data de criação do perfil |

Regras de segurança completas em [`firestore.rules`](./firestore.rules): leitura de `cars` é pública, escrita exige autenticação; `users` só pode ser lido/escrito pelo próprio dono do UID.
