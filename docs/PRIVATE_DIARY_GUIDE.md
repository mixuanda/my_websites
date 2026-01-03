# 🔐 私密区使用指南

本指南说明如何使用日记和私密内容功能。

## 目录

- [登录方式](#登录方式)
- [日记管理](#日记管理)
- [数据导出](#数据导出)
- [隐私与安全](#隐私与安全)

---

## 登录方式

### 支持的登录方法

项目支持三种安全的登录方式：

#### 1. **Passkey（推荐）** 🔑

最安全的登录方式，使用你设备的生物识别（指纹、面部识别）或 PIN 码。

**优势:**
- ✅ 无密码登录
- ✅ 最高安全性
- ✅ 快速方便
- ✅ 无需记住密码

**如何使用:**
1. 打开登录页面 `/login`
2. 点击 "使用 Passkey 登录"
3. 使用你的生物识别或 PIN 码验证
4. 首次使用会提示注册新 Passkey

**支持的设备:**
- iPhone/iPad (Face ID, Touch ID)
- Android (指纹识别、面部识别、PIN)
- Windows Hello
- Mac Touch ID
- 安全钥匙（USB 安全密钥）

---

#### 2. GitHub 登录 👨‍💻

通过 GitHub 账户登录。

**优势:**
- ✅ 无需新账户
- ✅ GitHub 账户管理
- ✅ 支持双因素认证

**如何使用:**
1. 点击 "GitHub" 登录按钮
2. 授权连接你的 GitHub 账户
3. 自动登录并重定向

**配置说明:**
在 `.env.local` 中设置：
```env
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

---

#### 3. Google 登录 🔍

通过 Google 账户登录。

**优势:**
- ✅ 快速登录
- ✅ Google 账户安全
- ✅ 双因素认证支持

**如何使用:**
1. 点击 "Google" 登录按钮
2. 选择你的 Google 账户
3. 自动登录

**配置说明:**
在 `.env.local` 中设置：
```env
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

---

### 首次登录

**第一次登录时：**

1. 选择任意登录方式
2. 如果是 Passkey，系统会提示注册
3. 如果是 OAuth，会跳转到授权页面
4. 授权后自动登录
5. 重定向到私密区首页

**授权管理：**

在浏览器设置或 GitHub/Google 账户中管理授权的应用：
- [管理 GitHub 授权](https://github.com/settings/applications)
- [管理 Google 授权](https://myaccount.google.com/permissions)

---

## 日记管理

### 创建日记

#### 方法 1: 从日记列表页创建

1. 登录后访问 `/diary`
2. 点击 "+ 新日记" 按钮
3. 填写信息：
   - **标题**: 日记标题（必填）
   - **内容**: 日记正文（必填）
   - **心情**: 今日心情（可选）
     - 😊 开心
     - 😐 平常
     - 😢 难过
     - 😃 兴奋
     - 😴 疲劳
   - **标签**: 日记标签，如 "#工作 #生活"（可选）
   - **是否公开**: 是否展示给他人（可选）
4. 点击 "保存" 或 "发布"

#### 方法 2: 从快捷菜单创建

如果已安装 PWA，可以使用：
- Android: 长按应用图标 → "新建日记"
- iOS: 从主屏幕 → "新日记"

#### 示例

```
标题: 今日反思
内容: 
今天完成了重要的项目，收获很多。
学到了新的技术，计划继续深造。

心情: 😃 兴奋
标签: #工作 #学习
```

### 编辑日记

1. 进入日记详情页
2. 点击编辑按钮
3. 修改内容
4. 点击 "保存更改"

### 删除日记

1. 打开日记详情
2. 点击 "删除" 按钮
3. 确认删除（不可恢复）

### 日记列表

**日记按以下方式排序:**
- 最新的日记在最上面
- 显示日期、标题、心情、摘要

**过滤选项:**
- 按日期范围筛选
- 按标签筛选
- 按心情筛选

**搜索日记:**
1. 使用顶部搜索框
2. 输入标题或内容关键词
3. 实时显示匹配结果

---

## 数据导出

### 导出为 JSON

```javascript
// 1. 打开浏览器 DevTools (F12)
// 2. 进入 Console 标签
// 3. 执行以下代码

// 获取所有日记数据
const response = await fetch('/api/diary/export');
const data = await response.json();
console.log(data);

// 下载为 JSON 文件
const dataStr = JSON.stringify(data, null, 2);
const dataBlob = new Blob([dataStr], { type: 'application/json' });
const url = URL.createObjectURL(dataBlob);
const link = document.createElement('a');
link.href = url;
link.download = `diaries-${new Date().toISOString()}.json`;
link.click();
```

### 导出为 CSV

使用任意 JSON 转 CSV 工具，如 [convertcsv.com](https://www.convertcsv.com/json-to-csv.html)

### 备份数据库

根据你使用的数据库：

**Firebase:**
```bash
firebase firestore:export ./backup
```

**Supabase:**
```bash
pg_dump postgresql://user:password@host/db > backup.sql
```

**MongoDB:**
```bash
mongodump --uri "mongodb+srv://..." --out ./backup
```

---

## 隐私与安全

### 数据安全

**传输安全:**
- ✅ 所有通信使用 HTTPS 加密
- ✅ 防 CSRF 攻击
- ✅ 防 XSS 攻击

**存储安全:**
- ✅ 数据库加密存储
- ✅ 敏感信息脱敏
- ✅ 定期备份

**认证安全:**
- ✅ Passkey 无密码认证
- ✅ OAuth 安全授权
- ✅ Session 自动过期（30 天）

### 隐私设置

#### 控制日记可见性

1. 进入日记详情
2. 点击 "分享设置"
3. 选择：
   - **私密**: 仅自己可见
   - **公开**: 所有人可见

#### 导出个人数据

执行欧盟 GDPR 要求，随时导出你的数据：

1. 进入 `/diary` 设置
2. 点击 "导出我的数据"
3. 自动下载 ZIP 包含所有信息

#### 删除账户

要删除账户和所有数据：

1. 进入账户设置
2. 滚到底部
3. 点击 "删除我的账户"
4. 输入邮箱确认
5. 所有数据将被永久删除

### 密码与会话管理

**Passkey 管理:**
1. 在手机设置中管理已注册的 Passkey
2. 删除不再使用的 Passkey
3. 为每个设备创建不同 Passkey

**会话管理:**
1. 进入 `/diary/sessions`
2. 查看活跃会话
3. 远程登出其他设备

**退出登录:**
1. 点击侧边栏用户菜单
2. 选择 "登出"
3. 当前设备会话结束

---

## 常见问题

### Q: 忘记登录方式怎么办？

**A:** 
- 如果是 Passkey: 使用另一个已注册的 Passkey
- 如果是 OAuth: 使用相同的 GitHub/Google 账户重新登录
- 如果都忘记: 联系管理员重置

### Q: 能否修改关联的 GitHub/Google 账户？

**A:** 
在账户设置中可以：
1. 断开现有连接
2. 连接新账户

### Q: 日记数据会备份吗？

**A:** 是的，所有数据：
- 自动备份到数据库服务商
- 支持定期导出备份
- 可以从备份恢复

### Q: 能否分享日记？

**A:** 
1. 将日记设为公开
2. 复制日记的分享链接
3. 发送给他人

### Q: 离线也能写日记吗？

**A:** 是的，PWA 支持离线编写：
1. 在离线时打开日记页面
2. 在离线状态下编写
3. 网络恢复后自动同步

### Q: 日记数据存储在哪里？

**A:** 取决于配置的数据库：
- **Firebase**: Google 云存储（美国/欧洲）
- **Supabase**: AWS 云存储
- **MongoDB Atlas**: 全球多个数据中心

可在 `SETUP.md` 中查看详细配置。

---

## 最佳实践

### 日记使用建议

✅ **推荐做法:**
- 定期写日记，保持记录
- 标签分类，便于回顾
- 设置心情，记录情绪变化
- 定期导出备份重要内容
- 使用 Passkey 登录最安全

❌ **避免做法:**
- 在公用设备上勾选"记住我"
- 分享账户给他人
- 将私人信息写在公开日记
- 忽视安全警告
- 长时间不更新 Passkey

### 数据整理

**建议标签体系:**
```
工作类: #工作 #项目 #会议 #学习
生活类: #生活 #健康 #运动 #饮食
情感类: #开心 #难过 #思考 #反思
```

**心情跟踪:**
定期查看心情统计，了解自己的情绪模式。

---

## 获取帮助

**问题反馈:**
1. GitHub Issues: 报告 bug
2. 讨论区: 功能建议
3. 联系管理员: 账户问题

**相关文档:**
- [设置指南](./SETUP.md)
- [后台管理](./BACKEND_CONTROL.md)
- [数据库配置](./DATABASE_CONFIG.md)
