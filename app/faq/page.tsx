import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FAQ_DOC } from "@/lib/content/faq";

// Document-tuned markdown styling (Tailwind needs the class strings spelled out).
// `#` sections get a divider above; `##` are the questions; the spoken *lines*
// stay italic and dark so they pop. First child is flush to the top.
const MD =
  "space-y-3 text-[15px] leading-relaxed text-ink/85 " +
  "[&_h1]:mt-12 [&_h1]:mb-2 [&_h1]:border-t [&_h1]:border-line [&_h1]:pt-8 [&_h1]:font-display [&_h1]:text-xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-ink " +
  "[&_h2]:mt-8 [&_h2]:mb-1 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-ink " +
  "[&_h3]:mt-4 [&_h3]:font-bold [&_h3]:text-ink " +
  "[&_p]:text-ink/85 " +
  "[&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_li]:pl-1 [&_li]:marker:text-faint " +
  "[&_strong]:font-bold [&_strong]:text-ink [&_em]:italic [&_em]:text-ink/90 " +
  "[&_hr]:my-10 [&_hr]:border-line " +
  "[&>*:first-child]:mt-0 [&>*:first-child]:border-t-0 [&>*:first-child]:pt-0";

export default function FaqPage() {
  return (
    <main className="mx-auto w-full max-w-2xl lg:max-w-3xl">
      <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
        Playbook · McMahon × MEDDPICC × Force Management
      </p>
      <article className={MD}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{FAQ_DOC}</ReactMarkdown>
      </article>
    </main>
  );
}
