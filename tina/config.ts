/**
 * TinaCMS 配置文件
 * 
 * TinaCMS 是一个 Git-backed 的内容管理系统
 * 它允许你在可视化编辑器中编辑 MDX 内容
 */

import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // 从 Tina Cloud 获取（生产环境需要）
  // NEXT_PUBLIC_TINA_CLIENT_ID 用于客户端，TINA_TOKEN 仅用于服务端
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  // 内容模型定义
  schema: {
    collections: [
      // 博客文章集合
      {
        name: "post",
        label: "博客文章",
        path: "content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "发布日期",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "category",
            label: "分类",
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
          },
          {
            type: "image",
            name: "image",
            label: "封面图片",
          },
          {
            type: "boolean",
            name: "toc",
            label: "显示目录",
          },
          {
            type: "boolean",
            name: "published",
            label: "已发布",
          },
          {
            type: "rich-text",
            name: "body",
            label: "内容",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "提示框",
                ui: {
                  defaultItem: {
                    type: "callout",
                  },
                },
                fields: [
                  {
                    name: "type",
                    label: "类型",
                    type: "string",
                    options: ["info", "warning", "error", "success"],
                  },
                  {
                    name: "title",
                    label: "标题",
                    type: "string",
                  },
                  {
                    name: "body",
                    label: "内容",
                    type: "rich-text",
                  },
                ],
              },
            ],
          },
        ],
      },

      // 笔记集合
      {
        name: "note",
        label: "学习笔记",
        path: "content/notes",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "标题",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "日期",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "描述",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "category",
            label: "分类",
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
          },
          {
            type: "string",
            name: "series",
            label: "系列",
          },
          {
            type: "boolean",
            name: "toc",
            label: "显示目录",
          },
          {
            type: "rich-text",
            name: "body",
            label: "内容",
            isBody: true,
          },
        ],
      },

      // 项目集合
      {
        name: "project",
        label: "项目",
        path: "content/projects",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "项目名称",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "项目描述",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "日期",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
          },
          {
            type: "image",
            name: "image",
            label: "项目封面",
          },
          {
            type: "string",
            name: "link",
            label: "项目链接",
          },
          {
            type: "string",
            name: "github",
            label: "GitHub 链接",
          },
          {
            type: "boolean",
            name: "featured",
            label: "精选项目",
            default: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "项目详情",
            isBody: true,
          },
        ],
      },
    ],
  },
});
