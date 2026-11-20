"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../cx";

export type TabItem = { id: string; label: string; panel: ReactNode };

type Props = { label: string; items: TabItem[]; defaultId?: string; className?: string };

/** WAI-ARIA tabs with automatic activation and roving tabindex. */
export default function Tabs({ label, items, defaultId, className }: Props) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function focusTab(index: number) {
    const next = (index + items.length) % items.length;
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      focusTab(moves[event.key]);
    }
  }

  return (
    <div className={cx("flex flex-col gap-6", className)}>
      <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">
        {items.map((item, index) => {
          const selected = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cx(
                "min-h-[44px] rounded-full border px-5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--jv-accent)]",
                selected
                  ? "border-[var(--jv-cta-bg)] bg-[var(--jv-cta-bg)] text-[var(--jv-cta-fg)]"
                  : "border-[var(--jv-border)] text-[var(--jv-fg)] hover:border-[var(--jv-accent)]",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== activeId}
          tabIndex={0}
        >
          {item.panel}
        </div>
      ))}
    </div>
  );
}
