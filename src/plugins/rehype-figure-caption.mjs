import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that converts <img> elements followed by text
 * (within the same <p>) into <figure> + <figcaption>.
 *
 * Markdown pattern:
 *   ![Alt text](/path/to/image.png)
 *   This text becomes the caption.
 *
 * (No blank line between image and caption text.)
 */
export default function rehypeFigureCaption() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent) return;

      // Find if this <p> contains an <img> followed by text / inline nodes
      const children = node.children || [];
      const imgIndex = children.findIndex(
        (child) => child.type === 'element' && child.tagName === 'img'
      );

      if (imgIndex === -1) return;

      // Collect everything after the <img> as caption content
      // Skip any leading line-break / whitespace-only text nodes
      let captionStart = imgIndex + 1;
      while (captionStart < children.length) {
        const c = children[captionStart];
        if (c.type === 'text' && c.value.trim() === '') {
          captionStart++;
        } else if (c.type === 'element' && c.tagName === 'br') {
          captionStart++;
        } else {
          break;
        }
      }

      const captionNodes = children.slice(captionStart);
      if (captionNodes.length === 0) return; // No caption text, leave as-is

      // Trim leading newline from the first text node if present
      if (captionNodes[0] && captionNodes[0].type === 'text') {
        captionNodes[0] = {
          ...captionNodes[0],
          value: captionNodes[0].value.replace(/^\n+/, ''),
        };
      }

      const imgNode = children[imgIndex];

      // Build <figure> with <img> and <figcaption>
      const figure = {
        type: 'element',
        tagName: 'figure',
        properties: { className: ['research-figure'] },
        children: [
          imgNode,
          {
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: captionNodes,
          },
        ],
      };

      // Replace the <p> node with the <figure>
      parent.children[index] = figure;
    });
  };
}
