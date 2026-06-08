import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SearchResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

declare global {
  interface Window {
    pagefind?: {
      init: () => Promise<void>;
      search: (query: string) => Promise<{ results: PagefindRawResult[] }>;
    };
  }
}

interface PagefindRawResult {
  data: () => Promise<SearchResult>;
}

let pagefindReady = false;

async function loadPagefind() {
  if (pagefindReady || window.pagefind) {
    pagefindReady = true;
    return true;
  }
  try {
    // Construct path at runtime so Vite never statically analyzes it
    const path = ["", "pagefind", "pagefind.js"].join("/");
    // @ts-ignore
    const pf = await import(/* @vite-ignore */ path);
    window.pagefind = pf;
    await pf.init();
    pagefindReady = true;
    return true;
  } catch {
    return false;
  }
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Open on Cmd/Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setUnavailable(false);
    }
  }, [open]);

  async function handleInput(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const ok = await loadPagefind();
      if (!ok) {
        setUnavailable(true);
        setLoading(false);
        return;
      }

      const raw = await window.pagefind!.search(value);
      const top = raw.results.slice(0, 8);
      const data = await Promise.all(top.map((r) => r.data()));
      setResults(data);
      setLoading(false);
    }, 200);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Search site"
        title="Search (⌘K)"
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-nav-text/75 hover:text-primary border border-transparent hover:border-primary/30 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline text-xs opacity-60">⌘K</span>
      </button>
    );
  }

  const overlay = (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden"
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border)",
        }}
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Search
            className="w-4 h-4 shrink-0"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Search pages, publications, people, research…"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--color-text)" }}
          />
          {loading && (
            <span
              className="text-xs animate-pulse"
              style={{ color: "var(--color-text-muted)" }}
            >
              Searching…
            </span>
          )}
          <button onClick={() => setOpen(false)} aria-label="Close search">
            <X
              className="w-4 h-4"
              style={{ color: "var(--color-text-muted)" }}
            />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {unavailable && (
            <div
              className="px-5 py-10 text-center text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Search index not found.{" "}
              <span style={{ color: "var(--color-text-secondary)" }}>
                Run{" "}
                <code
                  className="font-mono text-xs px-1 py-0.5 rounded"
                  style={{ background: "var(--color-bg-alt)" }}
                >
                  npm run build
                </code>{" "}
                first to generate the search index.
              </span>
            </div>
          )}

          {!unavailable && query && !loading && results.length === 0 && (
            <div
              className="px-5 py-10 text-center text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              No results for{" "}
              <strong style={{ color: "var(--color-text)" }}>"{query}"</strong>
            </div>
          )}

          {results.map((r, i) => (
            <a
              key={i}
              href={r.url}
              onClick={() => setOpen(false)}
              className="flex flex-col gap-1 px-5 py-4 transition-colors"
              style={{
                borderBottom:
                  i < results.length - 1
                    ? "1px solid var(--color-border)"
                    : undefined,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--color-bg-alt)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                {r.meta?.title ?? r.url}
              </span>
              <span
                className="text-xs leading-relaxed line-clamp-2"
                style={{ color: "var(--color-text-muted)" }}
                dangerouslySetInnerHTML={{ __html: r.excerpt }}
              />
            </a>
          ))}

          {!query && (
            <div
              className="px-5 py-8 text-center text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Type to search across all pages, publications, people, and
              research areas.
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div
          className="px-4 py-2 flex gap-4 text-[11px] border-t"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          <span>
            <kbd className="font-mono">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="font-mono">↵</kbd> open
          </span>
          <span>
            <kbd className="font-mono">esc</kbd> close
          </span>
          <span className="ml-auto">Powered by Pagefind</span>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
