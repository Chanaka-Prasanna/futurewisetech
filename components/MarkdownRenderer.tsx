"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Modern dark theme
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

interface MarkdownRendererProps {
  markdown: string;
  className?: string;
}

export default function MarkdownRenderer({
  markdown,
  className = "",
}: MarkdownRendererProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (markdown) {
      // Process any LaTeX first before passing to marked
      let processedMarkdown = processLatex(markdown);

      // Then process the markdown
      let renderedHtml = marked.parse(processedMarkdown);

      // Post-process HTML to add Prism classes to code blocks
      if (typeof renderedHtml === "string") {
        renderedHtml = processCodeBlocks(renderedHtml);
      }

      setHtml(typeof renderedHtml === "string" ? renderedHtml : "");
    }
  }, [markdown]);

  useEffect(() => {
    // Apply Prism highlighting after component has mounted and HTML is set
    if (html) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }, [html]);

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// Process LaTeX in the markdown content
function processLatex(text: string): string {
  // Process block math ($$...$$)
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, expr) => {
    try {
      return `<div class="math-display">${katex.renderToString(expr.trim(), {
        displayMode: true,
      })}</div>`;
    } catch (error: any) {
      console.error("KaTeX error:", error);
      return `<div class="math-error">Error rendering LaTeX: ${error.message}</div>`;
    }
  });

  // Process inline math ($...$)
  // This regex tries to match $ but not $$ (already processed)
  text = text.replace(/\$([^\$]+?)\$/g, (match, expr) => {
    try {
      return katex.renderToString(expr.trim(), { displayMode: false });
    } catch (error: any) {
      console.error("KaTeX error:", error);
      return `<span class="math-error">Error rendering LaTeX: ${error.message}</span>`;
    }
  });

  return text;
}

// Post-process HTML to add Prism classes to code blocks
function processCodeBlocks(html: string): string {
  // Find and replace <pre><code class="language-xxx"> with Prism-compatible classes
  return html.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (match, language, code) => {
      return `<pre class="language-${language}"><code class="language-${language}">${code}</code></pre>`;
    }
  );
}
