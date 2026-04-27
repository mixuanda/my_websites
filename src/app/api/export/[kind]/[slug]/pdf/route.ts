import { buildArticlePdf } from "@/lib/article-pdf";
import { getExportArticle, type ExportArticleKind } from "@/lib/article-export";
import { isProductionSurface } from "@/lib/site-surface";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{
    kind: string;
    slug: string;
  }>;
}

export async function GET(_: Request, { params }: RouteContext) {
  const { kind, slug } = await params;

  if (isProductionSurface()) {
    return new Response("Article not found", { status: 404 });
  }

  if (!["blog", "notes", "projects"].includes(kind)) {
    return new Response("Unsupported export type", { status: 400 });
  }

  const article = getExportArticle(kind as ExportArticleKind, slug);
  if (!article) {
    return new Response("Article not found", { status: 404 });
  }

  const pdf = await buildArticlePdf(article);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Disposition": `attachment; filename="${article.slug}.pdf"`,
      "Content-Type": "application/pdf",
    },
  });
}
