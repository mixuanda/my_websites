import { buildArticleTex, getExportArticle, type ExportArticleKind } from "@/lib/article-export";
import { isProductionSurface } from "@/lib/site-surface";

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

  const tex = buildArticleTex(article);
  const fileName = `${article.slug}.tex`;

  return new Response(tex, {
    headers: {
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Content-Type": "application/x-tex; charset=utf-8",
    },
  });
}
