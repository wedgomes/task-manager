# 📋 Task Manager - Desafio Técnico (Software Engineer)

Este projeto é uma aplicação de gerenciamento de tarefas desenvolvida como parte do processo seletivo para a vaga de Software Engineer. O objetivo foi criar uma solução simples, porém funcional e performática, utilizando a stack moderna do React.

## 🚀 Tecnologias Utilizadas

O projeto foi construído sobre a **T3 Stack** (conceitual), priorizando Type Safety e performance:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Components)
- **Comunicação Client-Server:** [tRPC](https://trpc.io/) (End-to-end type safety sem necessidade de gerar esquemas API manualmente)
- **Gerenciamento de Estado/Cache:** [TanStack Query](https://tanstack.com/query/latest)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Validação de Dados:** [Zod](https://zod.dev/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
-

## ✨ Funcionalidades

- **CRUD Completo:** Criação, Listagem e Exclusão de tarefas.
- **Infinite Scroll:** Carregamento incremental de tarefas à medida que o usuário rola a página (Paginação via cursor).
- **Validação Robusta:** Feedback visual imediato para campos obrigatórios e erros de validação.
- **Server-Side Rendering (SSR):** A estrutura do Next.js App Router garante que o conteúdo inicial seja renderizado no servidor.
- **Banco de Dados em Memória:** Simulação de persistência assíncrona com delay artificial para demonstrar estados de "loading" (Skeleton/Spinners).

## 🛠️ Instalação e Execução

Pré-requisitos: Node.js (v18 ou superior).

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/wedgomes/task-manager
   cd task-manager

2. **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install

3. **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev

4. **Acesse a aplicação:**s

    Abra http://localhost:3000 no seu navegador.



🏗️ Decisões de Arquitetura
1. Por que tRPC?
A escolha do tRPC elimina a necessidade de uma API REST tradicional ou GraphQL para este escopo. Ele permite chamar funções do backend diretamente no frontend com autocompletar e tipagem garantida, acelerando o desenvolvimento e reduzindo bugs de contrato de API.

2. Persistência de Dados (In-Memory)
Conforme solicitado no desafio, não há banco de dados real.

    Nota: Os dados são armazenados em uma variável global no servidor. Ao reiniciar o projeto (npm run dev), as tarefas voltarão ao estado inicial.

    Foi implementado um delay artificial (setTimeout) nas operações do "banco" para simular latência de rede e permitir a visualização dos estados de carregamento (loading states) e feedback ao usuário.

3. Infinite Scroll vs Paginação
Optei por Infinite Scroll em vez de paginação tradicional para oferecer uma experiência mais fluida (UX), típica de feeds modernos e listas de tarefas.

    

Desenvolvido por Wédson Gomes


---

### Print da Tela

![Preview do Projeto](/public/preview.png)
    
