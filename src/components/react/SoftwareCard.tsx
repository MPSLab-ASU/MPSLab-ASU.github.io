import { ExternalLink, Github } from "lucide-react";

interface SoftwareProject {
  name: string;
  url: string;
  description: string;
  researchGroup: string;
  image: string;
}

export default function SoftwareCard({
  project,
}: {
  project: SoftwareProject;
}) {
  // Clean up leading colons/dashes from description
  let desc = project.description.trim();
  if (desc.startsWith(":") || desc.startsWith("-")) {
    desc = desc.substring(1).trim();
  }

  const isGithub = project.url.toLowerCase().includes("github.com");

  return (
    <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:shadow-md transition-all duration-200 group flex flex-col h-full">
      <div className="flex-1 min-w-0 mb-4">
        {/* Header: image + title */}
        <div className="flex items-start gap-4 mb-3">
          {project.image && (
            <img
              src={project.image}
              alt={project.name}
              className="w-14 h-14 rounded-lg object-contain border border-[var(--color-border)] bg-white p-1 flex-shrink-0"
            />
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-lg text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
              {project.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text-secondary)] mt-1">
              {project.researchGroup}
            </span>
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="mt-auto pt-3">
        <div className="flex flex-wrap gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-alt)] border border-transparent hover:border-[var(--color-border)] transition-all"
            title={isGithub ? "Source Code" : "Project Website"}
          >
            {isGithub ? (
              <Github className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
            <span className="capitalize">
              {isGithub ? "Repository" : "Website"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
