import "./Bookmarks.css";

interface BookmarkLink {
  label: string;
  url: string;
  description?: string;
}

interface BookmarkGroup {
  category: string;
  links: BookmarkLink[];
}

// Add/edit your links here — grouped by category.
const BOOKMARK_GROUPS: BookmarkGroup[] = [
  {
    category: "General",
    links: [
      {
        label: "Example Link",
        url: "https://example.com",
        description: "Replace this with a real bookmark",
      },
    ],
  },
];

export default function Bookmarks() {
  return (
    <div className="bookmarks-page">
      <header className="bookmarks-header">
        <h1>Bookmarks</h1>
        <p>Personal links &amp; resources.</p>
      </header>

      <main>
        {BOOKMARK_GROUPS.map((group) => (
          <section className="bookmarks-group" key={group.category}>
            <h2>{group.category}</h2>
            <ul>
              {group.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                  {link.description && (
                    <span className="bookmarks-desc">
                      {" "}
                      — {link.description}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
