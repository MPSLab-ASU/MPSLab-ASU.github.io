type BibEntryTags = Record<string, string | undefined> & {
  title?: string;
  displayTitle?: string;
};

const COMMAND_REPLACEMENTS: Record<string, string> = {
  alpha: "alpha",
  beta: "beta",
  gamma: "gamma",
  delta: "delta",
  epsilon: "epsilon",
  theta: "theta",
  lambda: "lambda",
  mu: "mu",
  pi: "pi",
  sigma: "sigma",
  phi: "phi",
  omega: "omega",
};

const MATHCAL_MAP: Record<string, string> = {
  A: "𝒜",
  B: "ℬ",
  C: "𝒞",
  D: "𝒟",
  E: "ℰ",
  F: "ℱ",
  G: "𝒢",
  H: "ℋ",
  I: "ℐ",
  J: "𝒥",
  K: "𝒦",
  L: "ℒ",
  M: "ℳ",
  N: "𝒩",
  O: "𝒪",
  P: "𝒫",
  Q: "𝒬",
  R: "ℛ",
  S: "𝒮",
  T: "𝒯",
  U: "𝒰",
  V: "𝒱",
  W: "𝒲",
  X: "𝒳",
  Y: "𝒴",
  Z: "𝒵",
  a: "𝒶",
  b: "𝒷",
  c: "𝒸",
  d: "𝒹",
  e: "ℯ",
  f: "𝒻",
  g: "ℊ",
  h: "𝒽",
  i: "𝒾",
  j: "𝒿",
  k: "𝓀",
  l: "𝓁",
  m: "𝓂",
  n: "𝓃",
  o: "ℴ",
  p: "𝓅",
  q: "𝓆",
  r: "𝓇",
  s: "𝓈",
  t: "𝓉",
  u: "𝓊",
  v: "𝓋",
  w: "𝓌",
  x: "𝓍",
  y: "𝓎",
  z: "𝓏",
};

function toMathcalUnicode(value: string): string {
  return value
    .split("")
    .map((char) => MATHCAL_MAP[char] ?? char)
    .join("");
}

function decodeLatex(input: string): string {
  let text = input;

  // Drop math delimiters while keeping content.
  text = text.replace(/\$/g, "");

  // Preserve \mathcal visual styling using script Unicode characters.
  text = text.replace(/\\mathcal\s*\{([^{}]+)\}/g, (_match, value: string) =>
    toMathcalUnicode(value),
  );

  // Commands that wrap plain text should keep just the wrapped content.
  const unwrapPattern =
    /\\(?:mathcal|mathbb|mathbf|mathrm|mathit|mathsf|textrm|texttt|textbf|textit|emph)\s*\{([^{}]*)\}/g;
  let previous = "";
  while (previous !== text) {
    previous = text;
    text = text.replace(unwrapPattern, "$1");
  }

  text = text.replace(/\\xspace\b/g, " ");

  // Replace escaped characters like \&, \_, \%.
  text = text.replace(/\\([#$%&_{}])/g, "$1");

  // Replace simple command tokens with readable fallbacks where possible.
  text = text.replace(/\\([A-Za-z]+)\b/g, (_match, cmd: string) => {
    return COMMAND_REPLACEMENTS[cmd] ?? "";
  });

  // Remove braces used for BibTeX capitalization grouping.
  text = text.replace(/[{}]/g, "");

  return text.replace(/\s+/g, " ").trim();
}

export function toDisplayTitle(title?: string): string | undefined {
  if (!title) return undefined;
  const decoded = decodeLatex(title);
  return decoded || title;
}

export function withDisplayTitles<
  T extends { entryTags?: Record<string, string | undefined> },
>(entries: T[]): T[] {
  return entries.map((entry) => {
    const tags = (entry.entryTags ?? {}) as BibEntryTags;
    return {
      ...entry,
      entryTags: {
        ...tags,
        displayTitle: toDisplayTitle(tags.title),
      },
    } as T;
  });
}
