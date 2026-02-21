import Fuse from 'fuse.js';
import { Check, Clipboard, FileText, Filter, Image as ImageIcon, Link, PlaySquare, Presentation, Quote, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Publication {
    citationKey: string;
    entryType: string;
    entryTags: {
        author?: string;
        title?: string;
        booktitle?: string;
        journal?: string;
        year?: string;
        keywords?: string;
        url?: string;
        tppubtype?: string;
    };
}

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
    const [expandedBibtex, setExpandedBibtex] = useState<string | null>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const ITEMS_PER_PAGE = 20;

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
        return [...new Set(papers.map(p => p.entryTags.tppubtype).filter(Boolean))].sort() as string[];
    }, [papers]);

    const tags = useMemo(() => {
        return [...validTags].sort();
    }, [validTags]);

    const fuse = useMemo(() => new Fuse(papers, {
        keys: [
            { name: 'entryTags.title', weight: 0.4 },
            { name: 'entryTags.author', weight: 0.3 },
            { name: 'entryTags.keywords', weight: 0.2 },
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
            results = results.filter(p => p.entryTags.tppubtype === typeFilter);
        }
        if (tagFilter) {
            results = results.filter(p => p.entryTags.keywords?.includes(tagFilter));
        }
        return results;
    }, [query, yearFilter, authorFilter, typeFilter, tagFilter, papers, fuse]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedResults = useMemo(() => {
        return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filtered, startIndex]);

    const getVenue = (p: Publication) => p.entryTags.booktitle || p.entryTags.journal || '';

    // Parse the space/comma-separated URL field: e.g. "https://url1, pdf https://url2, slides"
    const parseUrls = (urlString?: string) => {
        if (!urlString) return [];
        const parts = urlString.split(/(?=https?:\/\/)/);
        return parts.map(p => {
            const raw = p.trim();
            if (!raw) return null;
            const commaIdx = raw.indexOf(',');
            if (commaIdx !== -1) {
                const url = raw.substring(0, commaIdx).trim();
                let label = raw.substring(commaIdx + 1).trim() || 'Link';

                // Normalize labels according to user request
                const lowerLabel = label.toLowerCase();
                if (lowerLabel.includes('pdf')) label = 'Paper';
                else if (lowerLabel.includes('ppt') || lowerLabel.includes('slide')) label = 'Slides';

                return { url, label };
            }
            return { url: raw, label: 'Link' };
        }).filter(Boolean) as { url: string, label: string }[];
    };

    const getIconForLabel = (label: string) => {
        const l = label.toLowerCase();
        if (l.includes('pdf')) return <FileText className="w-4 h-4" />;
        if (l.includes('slide') || l.includes('ppt')) return <Presentation className="w-4 h-4" />;
        if (l.includes('poster')) return <ImageIcon className="w-4 h-4" />;
        if (l.includes('teaser') || l.includes('video')) return <PlaySquare className="w-4 h-4" />;
        return <Link className="w-4 h-4" />;
    };

    const generateBibtex = (pub: Publication) => {
        let result = `@${pub.entryType}{${pub.citationKey},\n`;
        for (const [key, value] of Object.entries(pub.entryTags)) {
            // Omit custom/injected 'url' handling for the raw bibtex output
            if (value !== undefined && value !== null && key !== 'url') {
                result += `  ${key} = {${value}},\n`;
            }
        }
        result += `}`;
        return result;
    };

    const handleCopyBibtex = async (pub: Publication) => {
        const bibtex = generateBibtex(pub);
        try {
            await navigator.clipboard.writeText(bibtex);
            setCopiedKey(pub.citationKey);
            setTimeout(() => setCopiedKey(null), 2000);
        } catch (err) {
            console.error('Failed to copy bibtex: ', err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                <input
                    type="text"
                    placeholder="Search publications by title, author, or keywords..."
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
                    <div
                        key={pub.citationKey}
                        className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
                                    {pub.entryTags.title || pub.citationKey}
                                </h3>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                                    {pub.entryTags.author?.replace(/ and /ig, '; ')}
                                </p>
                                <div className="flex items-center gap-3 mt-2 flex-wrap">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-primary)] text-white"
                                        style={{ opacity: 0.9 }}>
                                        {pub.entryTags.year}
                                    </span>
                                    {pub.entryTags.tppubtype && (
                                        <button
                                            onClick={() => setTypeFilter(pub.entryTags.tppubtype!)}
                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)] capitalize cursor-pointer hover:bg-[var(--color-border)] hover:text-[var(--color-text)] transition-colors"
                                        >
                                            {pub.entryTags.tppubtype}
                                        </button>
                                    )}
                                    <span className="text-xs text-[var(--color-text-muted)] italic truncate">
                                        {getVenue(pub)}
                                    </span>
                                </div>
                                {pub.entryTags.keywords && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {pub.entryTags.keywords.split(',').map(t => t.trim()).filter(t => validTags.some(v => v.toLowerCase() === t.toLowerCase())).map(kw => (
                                            <button
                                                key={kw}
                                                onClick={() => setTagFilter(kw)}
                                                className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition-colors text-left"
                                            >
                                                {kw}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex-shrink-0 flex flex-col gap-2 items-end">
                                <div className="flex flex-wrap justify-end gap-2">
                                    {parseUrls(pub.entryTags.url).map((resource, i) => (
                                        <a
                                            key={i}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] border border-transparent hover:border-[var(--color-border)] transition-all"
                                            title={resource.label}
                                        >
                                            {getIconForLabel(resource.label)}
                                            <span className="capitalize hidden sm:inline">{resource.label}</span>
                                        </a>
                                    ))}
                                    <button
                                        onClick={() => setExpandedBibtex(expandedBibtex === pub.citationKey ? null : pub.citationKey)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all border ${expandedBibtex === pub.citationKey
                                            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                                            : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] border-transparent hover:border-[var(--color-border)]'
                                            }`}
                                        title="Cite via BibTeX"
                                    >
                                        <Quote className="w-4 h-4" />
                                        <span className="capitalize hidden sm:inline">Cite</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Expandable BibTeX Output */}
                        {expandedBibtex === pub.citationKey && (
                            <div className="mt-4 p-4 rounded-lg bg-[#0d1117] border border-[#30363d] relative animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-mono text-gray-400">BibTeX</span>
                                    <button
                                        onClick={() => handleCopyBibtex(pub)}
                                        className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        {copiedKey === pub.citationKey ? (
                                            <>
                                                <Check className="w-3.5 h-3.5 text-green-400" />
                                                <span className="text-green-400">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Clipboard className="w-3.5 h-3.5" />
                                                <span>Copy</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="text-sm font-mono text-gray-300 overflow-x-auto pb-2 custom-scrollbar">
                                    <code>{generateBibtex(pub)}</code>
                                </pre>
                            </div>
                        )}
                    </div>
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
