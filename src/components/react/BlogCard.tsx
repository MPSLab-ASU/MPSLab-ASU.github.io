import { BookOpen, ExternalLink } from "lucide-react";

interface BlogPost {
  title: string;
  url: string;
  description: string;
  date: Date;
  authors?: string;
  tags?: string[];
  image?: string;
}

// Frontmatter dates parse as UTC midnight, so format in UTC to keep the month
function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const isColab = post.url.toLowerCase().includes("colab.research.google.com");

  return (
    <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:shadow-md transition-all duration-200 group flex flex-col h-full">
      <div className="flex-1 min-w-0 mb-4">
        {/* Header: image + title */}
        <div className="flex items-start gap-4 mb-3">
          {post.image ? (
            <img
              src={post.image}
              alt=""
              className="w-14 h-14 rounded-lg object-contain border border-[var(--color-border)] bg-white p-1 flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {post.authors && `${post.authors} · `}
              {formatDate(post.date)}
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-auto pt-3">
        <div className="flex flex-wrap gap-2">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] border border-transparent hover:border-[var(--color-border)] transition-all"
            title={isColab ? "Open in Google Colab" : "Read Post"}
          >
            <ExternalLink className="w-4 h-4" />
            <span>{isColab ? "Open in Colab" : "Read"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
