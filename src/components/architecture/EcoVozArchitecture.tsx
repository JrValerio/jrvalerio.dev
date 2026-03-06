"use client";

import { useMemo, useState, type MouseEvent } from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  type Edge,
  type Node,
} from "reactflow";

type EcoNodeData = {
  label: string;
  description: string;
  responsibilities: string[];
};

const baseNodeStyle = {
  border: "1px solid var(--jr-border)",
  borderRadius: "12px",
  background: "color-mix(in srgb, var(--jr-surface) 94%, transparent)",
  color: "var(--jr-text)",
  width: 190,
  padding: 12,
  fontSize: 12,
  lineHeight: 1.4,
};

const baseNodes: Node<EcoNodeData>[] = [
  {
    id: "user",
    position: { x: 10, y: 160 },
    data: {
      label: "User",
      description: "Pessoa utilizando o fluxo assistivo.",
      responsibilities: [
        "Interacao por voz, teclado e controles visuais",
        "Consumo de feedback textual e sonoro",
      ],
    },
    style: baseNodeStyle,
  },
  {
    id: "web-app",
    position: { x: 250, y: 160 },
    data: {
      label: "Web App (Next.js)",
      description: "Camada de apresentacao e fluxo de experiencia.",
      responsibilities: [
        "Renderizacao de UI acessivel",
        "Orquestracao de interacoes do usuario",
      ],
    },
    style: baseNodeStyle,
  },
  {
    id: "api-gateway",
    position: { x: 490, y: 160 },
    data: {
      label: "API Gateway (Node.js)",
      description: "Camada de entrada para rotas e politicas de dominio.",
      responsibilities: [
        "Validacao e normalizacao de requests",
        "Rate limit, logging e controle de sessao",
      ],
    },
    style: baseNodeStyle,
  },
  {
    id: "ai-engine",
    position: { x: 730, y: 160 },
    data: {
      label: "AI Engine (Python)",
      description: "Camada de inferencia e processamento multimodal.",
      responsibilities: [
        "Reconhecimento de voz e gestos",
        "Pipeline de inferencia e resposta contextual",
      ],
    },
    style: baseNodeStyle,
  },
  {
    id: "data",
    position: { x: 490, y: 330 },
    data: {
      label: "Data Layer (PostgreSQL)",
      description: "Persistencia de contexto e dados de uso.",
      responsibilities: [
        "Historico de interacoes e perfis",
        "Armazenamento de configuracoes assistivas",
      ],
    },
    style: baseNodeStyle,
  },
];

const edges: Edge[] = [
  {
    id: "user-web",
    source: "user",
    target: "web-app",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "var(--jr-accent)", strokeWidth: 1.5 },
  },
  {
    id: "web-api",
    source: "web-app",
    target: "api-gateway",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "var(--jr-accent)", strokeWidth: 1.5 },
  },
  {
    id: "api-ai",
    source: "api-gateway",
    target: "ai-engine",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "var(--jr-accent)", strokeWidth: 1.5 },
  },
  {
    id: "api-data",
    source: "api-gateway",
    target: "data",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "var(--jr-border)", strokeWidth: 1.2 },
  },
  {
    id: "ai-data",
    source: "ai-engine",
    target: "data",
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "var(--jr-border)", strokeWidth: 1.2 },
  },
];

export default function EcoVozArchitecture() {
  const [activeNodeId, setActiveNodeId] = useState("web-app");

  const nodes = useMemo(
    () =>
      baseNodes.map((node) => {
        const isActive = node.id === activeNodeId;
        return {
          ...node,
          style: {
            ...node.style,
            borderColor: isActive ? "var(--jr-accent)" : "var(--jr-border)",
            boxShadow: isActive ? "0 0 0 1px var(--jr-accent)" : "none",
          },
        };
      }),
    [activeNodeId]
  );

  const activeNode = useMemo(
    () => nodes.find((node) => node.id === activeNodeId) ?? nodes[0],
    [nodes, activeNodeId]
  );

  const handleNodeClick = (_event: MouseEvent, node: Node<EcoNodeData>) => {
    setActiveNodeId(node.id);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.6fr,1fr]">
      <div className="jr-surface-card h-[460px] overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.6}
          onNodeClick={handleNodeClick}
          defaultEdgeOptions={{ type: "smoothstep" }}
          proOptions={{ hideAttribution: true }}
        >
          <MiniMap
            pannable
            zoomable
            nodeColor={() => "rgba(255,255,255,0.35)"}
            maskColor="rgba(0,0,0,0.45)"
            style={{
              background: "rgba(10, 10, 10, 0.78)",
              border: "1px solid var(--jr-border)",
            }}
          />
          <Controls />
          <Background color="rgba(255,255,255,0.10)" gap={24} />
        </ReactFlow>
      </div>

      <aside className="jr-surface-card p-5">
        <p className="jr-meta mb-2">Selected Node</p>
        <h3 className="text-lg font-semibold text-[var(--jr-text)]">{activeNode.data.label}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--jr-muted)]">{activeNode.data.description}</p>
        <ul className="mt-4 grid gap-2">
          {activeNode.data.responsibilities.map((item) => (
            <li
              key={`${activeNode.id}-${item}`}
              className="rounded-lg border border-[var(--jr-border)] px-3 py-2 text-sm text-[var(--jr-muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
