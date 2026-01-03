# Callout 组件修复说明

## 问题
在部署时出现以下错误：
```
Error: Expected component Callout to be defined: you likely forgot to import, pass, or provide it.
```

## 根本原因
在 MDX 文件中使用 JSX 组件（如 `<Callout />`）时，必须在文件中显式导入该组件。虽然 `Callout` 组件在 `Mdx.tsx` 中被定义并提供给 MDX 渲染器，但在编译时 MDX 编译器无法识别这些组件。

## 解决方案

### 1. 导出 Callout 组件 ([src/components/Mdx.tsx](src/components/Mdx.tsx))
- 将 `Callout` 函数改为 `export function`，使其可以被外部导入

### 2. 在 MDX 文件中导入组件 ([content/blog/hello-world.mdx](content/blog/hello-world.mdx))
- 在 front matter 之后添加：
  ```mdx
  import { Callout } from '@/components/Mdx'
  ```

### 3. 更新组件使用方式
- 将 `body` 属性改为使用 `children`：
  ```mdx
  <Callout
    type="info"
    title="测试"
  >
    测试测试
  </Callout>
  ```

### 4. 更新 contentlayer 配置 ([contentlayer.config.ts](contentlayer.config.ts))
- 添加 `mdxOptions` 配置以支持 JSX 导入

## 如何在其他 MDX 文件中使用 Callout

在任何 MDX 文件的顶部添加导入：
```mdx
---
title: 文章标题
---

import { Callout } from '@/components/Mdx'

# 标题

<Callout type="info" title="提示">
  这是一个提示信息
</Callout>

<Callout type="warning" title="警告">
  这是一个警告信息
</Callout>

<Callout type="error" title="错误">
  这是一个错误信息
</Callout>

<Callout type="success" title="成功">
  这是一个成功信息
</Callout>
```

## 修改文件列表
1. [src/components/Mdx.tsx](src/components/Mdx.tsx) - 导出 Callout 组件，添加 as const 类型
2. [content/blog/hello-world.mdx](content/blog/hello-world.mdx) - 添加导入，更新组件用法
3. [contentlayer.config.ts](contentlayer.config.ts) - 添加 mdxOptions 配置和 rehype 插件支持
