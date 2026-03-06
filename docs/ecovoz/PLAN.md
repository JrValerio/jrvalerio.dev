# EcoVoz Plano de Produto

Data de referencia: **Marco 2026**

## Escopo MVP multimodal (travado)

1. Assistive Profile
2. AAC Board
3. Voice Module
4. Gesture Module
5. Communication History

## Arquitetura oficial

```text
Frontend
Next.js + React

↓

Gesture Engine
MediaPipe (browser)

↓

Voice Engine
Web Speech API

↓

API Gateway
Node.js

↓

Data Layer
PostgreSQL
```

Regra de arquitetura:

- AI engine nunca exposto diretamente ao client.

## Modulos do MVP

### 1) Assistive Profile

Modelo central de personalizacao da experiencia.

Campos principais:

```ts
type AssistiveProfile = {
  id: string;
  userId: string;
  displayName: string;
  communicationModes: string[];
  voiceEnabled: boolean;
  gestureEnabled: boolean;
  aacEnabled: boolean;
  preferredLanguage: string;
  voiceSpeed: number;
  voicePitch: number;
  motorLimitations?: string;
  speechLimitations?: string;
  cognitiveLevel?: string;
};
```

Funcao:

- Adaptar UI e interacoes por perfil assistivo.

### 2) AAC Board

Componentes:

- Categories
- Phrases
- Quick phrases
- Prediction engine

Funcao:

- Permitir comunicacao rapida com suporte a gesto e voz.

### 3) Voice Module

Funcao:

- Text to speech
- Speech to text

Stack inicial:

- Web Speech API

Evolucao planejada:

- Whisper
- Google Speech

### 4) Gesture Module

Tecnologia:

- MediaPipe Hands

Gestos iniciais:

- Open hand
- Closed fist
- Point

Fluxo:

```text
Camera
→ Gesture detection
→ Action trigger
→ Phrase output
```

### 5) Communication History

Dados armazenados:

- Phrase
- Timestamp
- Communication mode
- Context

Objetivo:

- Melhorar predicao
- Suportar analise terapeutica

## Product Flywheel

```text
User communicates
↓
System learns patterns
↓
Predictions improve
↓
Communication becomes easier
↓
More usage
```

## Regra de priorizacao

Nenhuma feature nova entra sem passar por:

- Backlog
- Priorizacao
- Validacao com roadmap e regras de governanca
