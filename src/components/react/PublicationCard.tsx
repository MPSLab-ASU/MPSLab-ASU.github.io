import { Check, Clipboard, FileText, Image as ImageIcon, Link, PlaySquare, Presentation, Quote } from 'lucide-react';
import { useState } from 'react';

export interface Publication {
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

interface PublicationCardProps {
    pub: Publication;
    validTags?: string[];
    onTypeClick?: (type: string) => void;
    onTagClick?: (tag: string) => void;
}

export default function PublicationCard({ pub, validTags = [], onTypeClick, onTagClick }: PublicationCardProps) {
    const [expandedBibtex, setExpandedBibtex] = useState<string | null>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const getVenue = (p: Publication) => p.entryTags.booktitle || p.entryTags.journal || '';

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
        <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:shadow-md transition-all duration-200 group">
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
                            onTypeClick ? (
                                <button
                                    onClick={() => onTypeClick(pub.entryTags.tppubtype!)}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)] capitalize cursor-pointer hover:bg-[var(--color-border)] hover:text-[var(--color-text)] transition-colors"
                                >
                                    {pub.entryTags.tppubtype}
                                </button>
                            ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)] capitalize">
                                    {pub.entryTags.tppubtype}
                                </span>
                            )
                        )}
                        <span className="text-xs text-[var(--color-text-muted)] italic truncate">
                            {getVenue(pub)}
                        </span>
                    </div>
                    {pub.entryTags.keywords && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {pub.entryTags.keywords.split(',').map(t => t.trim())
                                .filter(t => validTags.length === 0 || validTags.some(v => v.toLowerCase() === t.toLowerCase()))
                                .map(kw => (
                                    onTagClick ? (
                                        <button
                                            key={kw}
                                            onClick={() => onTagClick(kw)}
                                            className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-alt)] text-[var(--color-text-muted)] cursor-pointer hover:bg-[var(--color-primary)] hover:text-white transition-colors text-left"
                                        >
                                            {kw}
                                        </button>
                                    ) : (
                                        <span key={kw} className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-alt)] text-[var(--color-text-muted)]">
                                            {kw}
                                        </span>
                                    )
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
    );
}
