# Roosevelt Contabilidade

Website institucional moderno para a **Roosevelt Contabilidade**, escritório com 61 anos de tradição em serviços contábeis estratégicos.

## Visão Geral

O projeto foi desenvolvido para oferecer uma experiência de usuário premium, performática e responsiva, substituindo o antigo site estático. O foco está na apresentação clara dos serviços (Fiscal, Pessoal, Contábil, Societário), prova social (depoimentos) e história da empresa.

### Tecnologias

*   **Frontend**: React, Vite, TypeScript
*   **Estilização**: Tailwind CSS, Shadcn/UI
*   **Animações**: Framer Motion
*   **IA**: Integração com OpenAI (GPT-4o-mini) via Vercel AI SDK para atendimento automatizado.
*   **Deploy**: Vercel (Recomendado)

## Estrutura do Projeto

```
src/
├── api/             # Serverless Functions (Vercel)
├── components/
│   ├── chat/        # Widget de Chatbot
│   ├── layout/      # Header, Footer
│   ├── sections/    # Seções da Landing Page (Hero, Services, etc.)
│   └── ui/          # Componentes base (Shadcn)
├── content/         # Gerenciamento de conteúdo (JSON)
├── lib/             # Utilitários e configurações
└── pages/           # Rotas da aplicação
```

## Como Rodar Localmente

1.  **Instalar dependências**:
    ```bash
    npm install
    ```

2.  **Configurar Variáveis de Ambiente**:
    Crie um arquivo `.env` na raiz com sua chave da OpenAI (necessária para o Chat):
    ```env
    OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxx
    ```

3.  **Rodar servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

## Deploy

O projeto está configurado para deploy contínuo na Vercel.

1.  Conecte o repositório GitHub à Vercel.
2.  Adicione a variável de ambiente `OPENAI_API_KEY` nas configurações do projeto na Vercel.
3.  O deploy ocorrerá automaticamente a cada push na branch `main`.
