"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
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
      const renderedHtml = marked.parse(processedMarkdown);
      setHtml(typeof renderedHtml === "string" ? renderedHtml : "");
    }
  }, [markdown]);

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
