# EcoVoz Roadmap

Data de referencia: **Marco 2026**

Posicionamento oficial:

> **EcoVoz e uma plataforma de comunicacao assistiva multimodal.**

Objetivo do MVP:

> Permitir que pessoas com dificuldade de comunicacao se expressem usando voz,
> gestos e AAC em um unico sistema.

## Fase 1 - Estabilizacao da plataforma (Concluida)

PRs finalizados:

- PR-54: Observability (Sentry + Pino logs)
- PR-55: Security hardening (helmet + rate limit)
- PR-56: E2E regression (Playwright)
- PR-58: Voice FSM

Correcoes criticas resolvidas:

- C-1 ownership check
- C-2 auth middleware endpoints
- C-3 websocket security
- C-4 CORS configuration
- C-5 error contract
- C-6 enum consistency

Resultado:

- API segura
- Infra observavel
- Regressao protegida

## Fase 2 - Produto funcional (MVP) (Em execucao)

Escopo travado oficialmente:

1. Assistive Profile
2. AAC Board
3. Voice Module
4. Gesture Module
5. Communication History

Entrega alvo: **Q2 2026**

## Fase 3 - Piloto clinico (Planejada)

Objetivo:

- Validar uso real em contexto terapeutico

Entrega alvo: **Q3 2026**

## Fase 4 - Monetizacao SaaS (Planejada)

Objetivo:

- Habilitar assinaturas e operacao clinica

Entrega alvo: **Q4 2026**

## North Star Metric

**Successful communication events**

Definicao:

- Quantidade de interacoes em que o usuario conseguiu se expressar com sucesso.

## Objetivo final

Transformar o EcoVoz em uma plataforma robusta de comunicacao assistiva
multimodal com suporte a:

- Voz
- Gestos
- AAC
- Acessibilidade web
