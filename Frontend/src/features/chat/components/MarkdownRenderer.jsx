import ReactMarkdown from "react-markdown";
    import remarkGfm from "remark-gfm";
    
    export const MarkdownRenderer = ({ content }) => {
      if (!content) return null;
    
      return (
        <div className="text-sm leading-relaxed space-y-2">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 1. Headings (# Title, ## Subtitle)
              h1: ({ children }) => (
                <h1 className="text-lg font-bold text-white mt-3 mb-1 pb-1 border-b border-
  white/10">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-base font-semibold text-clarion-primary mt-3 mb-1">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-semibold text-white mt-2 mb-1">
                  {children}
                </h3>
              ),
    
              // 2. Paragraphs
              p: ({ children }) => (
                <p className="mb-2 last:mb-0 leading-relaxed text-clarion-textMain">
                  {children}
                </p>
              ),
    
              // 3. Bullet & Numbered Lists (- list item, 1. item)
              ul: ({ children }) => (
                <ul className="list-disc list-outside ml-5 space-y-1 my-2 text-clarion-textLight">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside ml-5 space-y-1 my-2 text-clarion-
  textLight">
                  {children}
                </ol>
              ),
    
              // 4. Links ([Google](https://google.com))
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-clarion-primary underline underline-offset-2 hover:brightness-
  125 transition"
                >
                  {children}
                </a>
              ),
    
              // 5. Code (inline `code` & code blocks ```code```)
              code: ({ children, className }) => {
                const isBlock = Boolean(className) || String(children).includes("\n");
                
                if (isBlock) {
                  return (
                    <pre className="my-2 p-3.5 rounded-xl bg-[#0b1120] border border-white/10
  overflow-x-auto text-xs font-mono text-cyan-300">
                      <code>{children}</code>
                    </pre>
                  );
                }
                return (
                  <code className="bg-white/10 text-clarion-primary px-1.5 py-0.5 rounded font-
  mono text-xs">
                    {children}
                  </code>
                );
              },
    
              // 6. Blockquote (> Note)
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-clarion-primary pl-3 py-1 my-2 bg-white/5
  rounded-r text-xs italic text-clarion-textLight">
                  {children}
                </blockquote>
              ),
    
              // 7. Tables
              table: ({ children }) => (
                <div className="my-2 overflow-x-auto rounded-lg border border-white/10">
                  <table className="w-full border-collapse text-xs text-left">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="bg-white/5 text-clarion-primary px-3 py-2 border-b border-white/10
  font-semibold">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 border-b border-white/5 text-clarion-textLight">
                  {children}
                </td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    };
    
    export default MarkdownRenderer;