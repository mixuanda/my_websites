// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // 从 Tina Cloud 获取（生产环境需要）
  // NEXT_PUBLIC_TINA_CLIENT_ID 用于客户端，TINA_TOKEN 仅用于服务端
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  // 内容模型定义
  schema: {
    collections: [
      // 博客文章集合
      {
        name: "post",
        label: "\u535A\u5BA2\u6587\u7AE0",
        path: "content/blog",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "\u6807\u9898",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "\u53D1\u5E03\u65E5\u671F",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "\u63CF\u8FF0",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "category",
            label: "\u5206\u7C7B"
          },
          {
            type: "string",
            name: "tags",
            label: "\u6807\u7B7E",
            list: true
          },
          {
            type: "image",
            name: "image",
            label: "\u5C01\u9762\u56FE\u7247"
          },
          {
            type: "boolean",
            name: "toc",
            label: "\u663E\u793A\u76EE\u5F55"
          },
          {
            type: "boolean",
            name: "published",
            label: "\u5DF2\u53D1\u5E03",
            default: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "\u5185\u5BB9",
            isBody: true,
            templates: [
              {
                name: "Callout",
                label: "\u63D0\u793A\u6846",
                ui: {
                  defaultItem: {
                    type: "callout"
                  }
                },
                fields: [
                  {
                    name: "type",
                    label: "\u7C7B\u578B",
                    type: "string",
                    options: ["info", "warning", "error", "success"]
                  },
                  {
                    name: "title",
                    label: "\u6807\u9898",
                    type: "string"
                  },
                  {
                    name: "body",
                    label: "\u5185\u5BB9",
                    type: "rich-text"
                  }
                ]
              }
            ]
          }
        ]
      },
      // 笔记集合
      {
        name: "note",
        label: "\u5B66\u4E60\u7B14\u8BB0",
        path: "content/notes",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "\u6807\u9898",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "\u65E5\u671F",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "\u63CF\u8FF0",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "category",
            label: "\u5206\u7C7B"
          },
          {
            type: "string",
            name: "tags",
            label: "\u6807\u7B7E",
            list: true
          },
          {
            type: "string",
            name: "series",
            label: "\u7CFB\u5217"
          },
          {
            type: "boolean",
            name: "toc",
            label: "\u663E\u793A\u76EE\u5F55",
            default: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "\u5185\u5BB9",
            isBody: true
          }
        ]
      },
      // 项目集合
      {
        name: "project",
        label: "\u9879\u76EE",
        path: "content/projects",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "\u9879\u76EE\u540D\u79F0",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "\u9879\u76EE\u63CF\u8FF0",
            required: true,
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "\u65E5\u671F",
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "\u6807\u7B7E",
            list: true
          },
          {
            type: "image",
            name: "image",
            label: "\u9879\u76EE\u5C01\u9762"
          },
          {
            type: "string",
            name: "link",
            label: "\u9879\u76EE\u94FE\u63A5"
          },
          {
            type: "string",
            name: "github",
            label: "GitHub \u94FE\u63A5"
          },
          {
            type: "boolean",
            name: "featured",
            label: "\u7CBE\u9009\u9879\u76EE",
            default: false
          },
          {
            type: "rich-text",
            name: "body",
            label: "\u9879\u76EE\u8BE6\u60C5",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
