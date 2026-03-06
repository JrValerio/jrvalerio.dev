"use client";

import { Command } from "cmdk";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getSearchIndex } from "../../data/searchIndex";
import { type V2Locale, type V2Messages } from "../../i18n/v2";

type CommandPaletteProps = {
  locale: V2Locale;
  prefixed: boolean;
  messages: V2Messages["commandPalette"];
};

export default function CommandPalette({ locale, prefixed, messages }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchIndex = useMemo(() => getSearchIndex(locale, prefixed), [locale, prefixed]);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["title", "description", "keywords"],
        threshold: 0.38,
        ignoreLocation: true,
      }),
    [searchIndex]
  );

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex;
    return fuse.search(query.trim()).map((result) => result.item);
  }, [fuse, query, searchIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() !== "k") return;

      event.preventDefault();
      setOpen((current) => !current);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      shouldFilter={false}
      label="Command Menu"
    >
      <div className="border-b border-[var(--jr-border)] px-3 py-2">
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder={messages.placeholder}
        />
      </div>

      <Command.List>
        {results.length === 0 ? <Command.Empty>{messages.empty}</Command.Empty> : null}
        {results.map((item) => (
          <Command.Item
            key={item.path}
            value={`${item.title} ${item.description} ${item.keywords.join(" ")}`}
            onSelect={() => {
              router.push(item.path);
              setOpen(false);
            }}
          >
            <div className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-xs text-[var(--jr-muted)]">{item.description}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded border border-[var(--jr-border)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--jr-muted)]">
                {item.group === "Page" ? messages.groups.page : messages.groups.project}
              </span>
              <span className="jr-meta text-xs">{item.path}</span>
            </div>
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
