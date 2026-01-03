import { allPosts, allNotes, allProjects } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/notes`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
  ];

  const postPages = allPosts
    .filter((post) => post.published)
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    }));

  const notePages = allNotes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(note.date),
  }));

  const projectPages = allProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
  }));

  // Get unique tags and categories
  const allTags = new Set<string>();
  allPosts.forEach((p) => p.tags.forEach((t) => allTags.add(t)));
  allNotes.forEach((n) => n.tags.forEach((t) => allTags.add(t)));

  const tagPages = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  const allCategories = new Set<string>();
  allPosts.forEach((p) => p.category && allCategories.add(p.category));
  allNotes.forEach((n) => n.category && allCategories.add(n.category));

  const categoryPages = Array.from(allCategories).map((cat) => ({
    url: `${baseUrl}/categories/${encodeURIComponent(cat)}`,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...postPages,
    ...notePages,
    ...projectPages,
    ...tagPages,
    ...categoryPages,
  ];
}
