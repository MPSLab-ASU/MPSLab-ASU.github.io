import Fuse from 'fuse.js';
import { Filter, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Publication } from './PublicationCard';
import PublicationCard from './PublicationCard';

interface Props {
    papers: Publication[];
    validAuthors?: string[];
    validTags?: string[];
}

export default function PublicationSearch({ papers, validAuthors = [], validTags = [] }: Props) {
    const [query, setQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [tagFilter, setTagFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    // Initialize query from URL parameters if present
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const q = params.get('q');
            if (q) {
                setQuery(q);
            }
        }
    }, []);

    // Reset to page 1 when any filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [query, yearFilter, authorFilter, typeFilter, tagFilter]);

    const years = useMemo(() => {
        const y = [...new Set(papers.map(p => p.entryTags.year).filter(Boolean))].sort().reverse();
        return y as string[];
    }, [papers]);

    const authors = useMemo(() => {
        return [...validAuthors].sort();
    }, [validAuthors]);

    const types = useMemo(() => {
        return [...new Set(papers.map(p => p.entryTags.category).filter(Boolean))].sort() as string[];
    }, [papers]);

    const tags = useMemo(() => {
        return [...validTags].sort();
    }, [validTags]);

    const fuse = useMemo(() => new Fuse(papers, {
        keys: [
            { name: 'entryTags.title', weight: 0.4 },
            { name: 'entryTags.author', weight: 0.3 },
            { name: 'entryTags.research', weight: 0.2 },
            { name: 'entryTags.year', weight: 0.1 },
            { name: 'entryTags.booktitle', weight: 0.1 },
            { name: 'entryTags.journal', weight: 0.1 },
        ],
        threshold: 0.4,
        includeScore: true,
    }), [papers]);

    const filtered = useMemo(() => {
        let results = query ? fuse.search(query).map(r => r.item) : papers;
        if (yearFilter) {
            results = results.filter(p => p.entryTags.year === yearFilter);
        }
        if (authorFilter) {
            results = results.filter(p => p.entryTags.author?.includes(authorFilter));
        }
        if (typeFilter) {
            results = results.filter(p => p.entryTags.category === typeFilter);
        }
        if (tagFilter) {
            results = results.filter(p => p.entryTags.research?.includes(tagFilter));
        }
        return results;
    }, [query, yearFilter, authorFilter, typeFilter, tagFilter, papers, fuse]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedResults = useMemo(() => {
        return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filtered, startIndex]);

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                    type="text"
                    placeholder="Search publications by title, author, or research areas..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border bg-[var(--color-bg-card)] text-[var(--color-text)] border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <select
                        value={yearFilter}
                        onChange={e => setYearFilter(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-lg border bg-[var(--color-bg-card)] text-[var(--color-text)] text-sm border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none appearance-none cursor-pointer"
                    >
                        <option value="">All Years</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <select
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-lg border bg-[var(--color-bg-card)] text-[var(--color-text)] text-sm border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none appearance-none cursor-pointer capitalize"
                    >
                        <option value="">All Types</option>
                        {types.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <select
                        value={authorFilter}
                        onChange={e => setAuthorFilter(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-lg border bg-[var(--color-bg-card)] text-[var(--color-text)] text-sm border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none appearance-none cursor-pointer"
                    >
                        <option value="">All Authors</option>
                        {authors.map(a => <option key={a} value={a}>{a.length > 25 ? a.substring(0, 25) + "..." : a}</option>)}
                    </select>
                </div>

                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
                    <select
                        value={tagFilter}
                        onChange={e => setTagFilter(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-lg border bg-[var(--color-bg-card)] text-[var(--color-text)] text-sm border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none appearance-none cursor-pointer"
                    >
                        <option value="">All Tags</option>
                        {tags.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-[var(--color-text-muted)]">
                Showing {filtered.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} publications
            </p>

            {/* Publication List */}
            <div className="space-y-4">
                {paginatedResults.map(pub => (
                    <PublicationCard
                        key={pub.citationKey}
                        pub={pub}
                        validTags={validTags}
                        onTypeClick={setTypeFilter}
                        onTagClick={setTagFilter}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-6">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-[var(--color-text-muted)] font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text)] hover:bg-[var(--color-bg-alt)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}

            {
                filtered.length === 0 && (
                    <div className="text-center py-12">
                        <Search className="w-12 h-12 mx-auto text-[var(--color-text-muted)] opacity-50 mb-4" />
                        <p className="text-[var(--color-text-muted)]">No publications match your search.</p>
                    </div>
                )
            }
        </div >
    );
}
