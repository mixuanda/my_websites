import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    toc: { type: 'boolean', default: true },
    published: { type: 'boolean', default: true },
    image: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}`,
    },
  },
}))

export const Note = defineDocumentType(() => ({
  name: 'Note',
  filePathPattern: `notes/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    toc: { type: 'boolean', default: true },
    series: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('notes/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/notes/${doc._raw.flattenedPath.replace('notes/', '')}`,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    image: { type: 'string', required: false },
    link: { type: 'string', required: false },
    github: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
    },
  },
}))

export const TextbookUnit = defineDocumentType(() => ({
  name: 'TextbookUnit',
  filePathPattern: `textbook/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    chapterId: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/')[2] ?? '',
    },
    course: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/')[1] ?? '',
    },
    locale: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/')[4] ?? '',
    },
    unitSlug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/')[3] ?? '',
    },
    unitId: {
      type: 'string',
      resolve: (doc) => {
        const [, course, chapterId, unitSlug] = doc._raw.flattenedPath.split('/');
        return `${course}.${chapterId}.${unitSlug}`;
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const [, course, chapterId, unitSlug, locale] = doc._raw.flattenedPath.split('/');
        return `/${locale}/notes/${course}/${chapterId}/${unitSlug}`;
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Note, Project, TextbookUnit],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})
