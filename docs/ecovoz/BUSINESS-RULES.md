# EcoVoz Regras de Negocio

Data de referencia: **Marco 2026**

## Modelo de negocio

EcoVoz segue modelo **Freemium SaaS**.

### Plano Free

- AAC board basico
- Voz basica
- Gestos basicos
- Historico limitado

### Plano Premium

- Gestos avancados
- Voz premium
- Analytics terapeutico
- Perfis multiplos

### Plano Clinico

Para terapeutas e clinicas.

- Dashboard de pacientes
- Historico completo
- Configuracao de terapias
- Exportacao de dados

## Estrategia de monetizacao (faixa inicial)

- Free: R$ 0
- Premium: R$ 29 - R$ 49 / mes
- Clinical: R$ 99 - R$ 199 / mes

## Regras de autenticacao e seguranca

- Todos os endpoints privados exigem JWT e `authMiddleware`.
- Validacao e rate limit obrigatorios no gateway.
- Ownership check obrigatorio para recursos de usuario.

## Regras de privacidade

Regra critica:

- Nao armazenar audio bruto.
- Nao armazenar frames de video.

Armazenar somente:

- Transcricao
- Gesto identificado
- Metadados necessarios para historico e analise

## Regras LGPD

Obrigatorio:

- Consentimento explicito para tratamento de dados.

Direitos do usuario:

- Baixar dados
- Excluir conta

## Politica de custos de IA

- IA externa apenas via feature flag.
- Fallback local obrigatorio para continuidade funcional.

## Politica de APIs externas

Prioridades futuras:

- VLibras
- Voiceitt

Condicao:

- Integracao somente apos MVP funcional validado.

## Governanca final

Toda evolucao deve respeitar:

- Roadmap
- Plano de produto
- Regras de negocio e governanca

Nenhuma feature nova entra sem:

- Registro em backlog
- Priorizacao formal
