import Fuse from "fuse.js";
import { ChevronDown, Filter, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Publication } from "./PublicationCard";
import PublicationCard from "./PublicationCard";

interface Props {
  papers: Publication[];
  validAuthors?: string[];
  validTags?: string[];
}

interface SearchableFilterFieldProps {
  placeholder: string;
  allLabel: string;
  value: string;
  inputValue: string;
  options: string[];
  onInputChange: (value: string) => void;
  onValueChange: (value: string) => void;
}

function SearchableFilterField({
  placeholder,
  allLabel,
  value,
  inputValue,
  options,
  onInputChange,
  onValueChange,
}: SearchableFilterFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const visibleOptions = useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.toLowerCase().includes(q));
  }, [options, inputValue]);

  const handleSelectOption = (selectedValue: string) => {
    onInputChange(selectedValue);
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    onInputChange("");
    onValueChange("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-text-muted)] pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onInputChange(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] p-1"
          aria-label={`Toggle ${allLabel} options`}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && options.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-xl">
          <button
            type="button"
            onClick={handleClearFilter}
            className={`w-full text-left px-3 py-2 text-sm transition-colors border-b border-[var(--color-border)] ${
              value === ""
                ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-medium"
                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-alt)]"
            }`}
          >
            {allLabel}
          </button>

          <div className="max-h-48 overflow-y-auto">
            {visibleOptions.length > 0 ? (
              visibleOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-[var(--color-bg-alt)] ${
                    value === option
                      ? "bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-medium"
                      : "text-[var(--color-text)]"
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-[var(--color-text-muted)]">
                No matches found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicationSearch({
  papers,
  validAuthors = [],
  validTags = [],
}: Props) {
  const [query, setQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [yearSearch, setYearSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  // Initialize query and tag filter from URL parameters if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) {
        setQuery(q);
      }
      const tag = params.get("tag");
      if (tag) {
        setTagFilter(tag);
      }
    }
  }, []);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, yearFilter, authorFilter, typeFilter, tagFilter]);

  const years = useMemo(() => {
    const y = [...new Set(papers.map((p) => p.entryTags.year).filter(Boolean))]
      .sort()
      .reverse();
    return y as string[];
  }, [papers]);

  const authors = useMemo(() => {
    return [...validAuthors].sort();
  }, [validAuthors]);

  const types = useMemo(() => {
    return [
      ...new Set(papers.map((p) => p.entryTags.category).filter(Boolean)),
    ].sort() as string[];
  }, [papers]);

  const tags = useMemo(() => {
    return [...validTags].sort();
  }, [validTags]);

  const filteredYears = useMemo(() => {
    const q = yearSearch.trim().toLowerCase();
    if (!q) return years;
    return years.filter((y) => y.toLowerCase().includes(q));
  }, [years, yearSearch]);

  const filteredTypes = useMemo(() => {
    const q = typeSearch.trim().toLowerCase();
    if (!q) return types;
    return types.filter((t) => t.toLowerCase().includes(q));
  }, [types, typeSearch]);

  const filteredAuthors = useMemo(() => {
    const q = authorSearch.trim().toLowerCase();
    if (!q) return authors;
    return authors.filter((a) => a.toLowerCase().includes(q));
  }, [authors, authorSearch]);

  const filteredTags = useMemo(() => {
    const q = tagSearch.trim().toLowerCase();
    if (!q) return tags;
    return tags.filter((t) => t.toLowerCase().includes(q));
  }, [tags, tagSearch]);

  const fuse = useMemo(
    () =>
      new Fuse(papers, {
        keys: [
          { name: "entryTags.displayTitle", weight: 0.45 },
          { name: "entryTags.title", weight: 0.4 },
          { name: "entryTags.author", weight: 0.3 },
          { name: "entryTags.research", weight: 0.2 },
          { name: "entryTags.year", weight: 0.1 },
          { name: "entryTags.booktitle", weight: 0.1 },
          { name: "entryTags.journal", weight: 0.1 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [papers],
  );

  const filtered = useMemo(() => {
    let results = query ? fuse.search(query).map((r) => r.item) : papers;
    if (yearFilter) {
      const q = yearFilter.toLowerCase();
      results = results.filter((p) =>
        p.entryTags.year?.toLowerCase().includes(q),
      );
    }
    if (authorFilter) {
      const q = authorFilter.toLowerCase();
      results = results.filter((p) =>
        p.entryTags.author?.toLowerCase().includes(q),
      );
    }
    if (typeFilter) {
      const q = typeFilter.toLowerCase();
      results = results.filter((p) =>
        p.entryTags.category?.toLowerCase().includes(q),
      );
    }
    if (tagFilter) {
      const q = tagFilter.toLowerCase();
      results = results.filter((p) =>
        p.entryTags.research?.toLowerCase().includes(q),
      );
    }
    return results;
  }, [query, yearFilter, authorFilter, typeFilter, tagFilter, papers, fuse]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = useMemo(() => {
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, startIndex]);

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    setTypeSearch(value);
  };

  const handleTagFilterChange = (value: string) => {
    setTagFilter(value);
    setTagSearch(value);
  };

  const paginationControls =
    totalPages > 1 ? (
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-[var(--color-text-muted)] font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    ) : null;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
        <input
          type="text"
          placeholder="Search publications by title, author, or research areas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-[var(--color-bg-card)] text-[var(--color-text)] border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Year
          </p>
          <SearchableFilterField
            placeholder="All Years"
            allLabel="All Years"
            value={yearFilter}
            inputValue={yearSearch}
            options={filteredYears}
            onInputChange={setYearSearch}
            onValueChange={setYearFilter}
          />
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Type
          </p>
          <SearchableFilterField
            placeholder="All Types"
            allLabel="All Types"
            value={typeFilter}
            inputValue={typeSearch}
            options={filteredTypes}
            onInputChange={setTypeSearch}
            onValueChange={setTypeFilter}
          />
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Author
          </p>
          <SearchableFilterField
            placeholder="All Authors"
            allLabel="All Authors"
            value={authorFilter}
            inputValue={authorSearch}
            options={filteredAuthors}
            onInputChange={setAuthorSearch}
            onValueChange={setAuthorFilter}
          />
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Tag
          </p>
          <SearchableFilterField
            placeholder="All Tags"
            allLabel="All Tags"
            value={tagFilter}
            inputValue={tagSearch}
            options={filteredTags}
            onInputChange={setTagSearch}
            onValueChange={setTagFilter}
          />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-[var(--color-text-muted)]">
        Showing {filtered.length > 0 ? startIndex + 1 : 0}-
        {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of{" "}
        {filtered.length} publications
      </p>

      {paginationControls}

      {/* Publication List */}
      <div className="space-y-4">
        {paginatedResults.map((pub, index) => (
          <PublicationCard
            key={`${pub.citationKey}-${startIndex + index}`}
            pub={pub}
            validTags={validTags}
            onTypeClick={handleTypeFilterChange}
            onTagClick={handleTagFilterChange}
          />
        ))}
      </div>

      {totalPages > 1 && <div className="pt-2">{paginationControls}</div>}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto text-[var(--color-text-muted)] opacity-50 mb-4" />
          <p className="text-[var(--color-text-muted)]">
            No publications match your search.
          </p>
        </div>
      )}
    </div>
  );
}
