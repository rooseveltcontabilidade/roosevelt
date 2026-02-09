# Implementação do Chat IA Roosevelt

Este documento descreve como configurar e rodar o Chat IA integrado ao site.

## 1. Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com as chaves de API:

```bash
# OpenAI (Padrão)
OPENAI_API_KEY=sk-proj-...

# Groq (Opcional - Llama 3 via Groq)
# Para ativar o Groq, descomente as linhas abaixo:
# USE_GROQ=true
# GROQ_API_KEY=gsk_...
```

### Arquivos Importantes
- `src/lib/ai/config.ts`: **Cérebro da IA**. Contém o Prompt do Sistema e a Base de Conhecimento (extraída de `Informacoes_IA.md`). Edite este arquivo para alterar preços ou regras.
- `api/chat.ts`: **Backend**. Endpoint Serverless que processa as mensagens.
- `src/components/chat/ChatWidget.tsx`: **Frontend**. Interface visual do chat.

## 2. Como Rodar Localmente

Como este projeto utiliza **Vite** (frontend) e **Vercel Functions** (backend em `api/`), o comando `npm run dev` (que roda apenas o Vite) **NÃO servirá a API do chat**.

Para testar o chat localmente com a API funcionando, você deve usar o **Vercel CLI**:

1. Instale o Vercel CLI globalmente (se não tiver):
   ```bash
   npm i -g vercel
   ```

2. Rode o projeto usando o Vercel Dev:
   ```bash
   vercel dev
   ```
   Isso iniciará tanto o frontend (Vite) quanto as funções serverless (API).

## 3. Implantação (Deploy)

Ao fazer deploy na Vercel:
1. Conecte o repositório GitHub.
2. Nas configurações do projeto na Vercel, adicione as variáveis de ambiente (`OPENAI_API_KEY`, etc).
3. O Vercel detectará automaticamente a pasta `api/` e criará as rotas serverless.

## 4. Atualizando o Conhecimento

Para atualizar preços ou regras:
1. Edite `src/lib/ai/config.ts`.
2. Altere a constante `KNOWLEDGE_BASE`.
3. Faça commit e push.
