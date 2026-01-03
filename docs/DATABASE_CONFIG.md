# 📊 数据库配置详细指南

本指南详细说明如何为私密内容（日记）配置数据库。

## 概览

项目默认使用内存存储（开发用）。生产环境建议选择以下数据库之一：

| 数据库 | 难度 | 优势 | 推荐场景 |
|--------|------|------|---------|
| **Firebase Firestore** | ⭐ 简单 | 实时数据库、自动扩展、无需管理服务器 | 小到中型个人项目 |
| **Supabase** | ⭐⭐ 中等 | 开源、SQL、用户认证集成、免费额度充足 | 需要复杂查询的项目 |
| **MongoDB** | ⭐⭐⭐ 复杂 | 灵活的文档模型、强大的查询能力 | 大型项目或需要高级功能 |
| **PostgreSQL** | ⭐⭐⭐ 复杂 | 完全的 SQL 能力、可靠稳定 | 企业级应用 |

---

## 1. Firebase Firestore（推荐）

### 优势
- 实时数据库，自动同步
- 无需管理服务器
- 免费额度充足（25k 读、20k 写、1GB 存储）
- 与 Firebase Auth 完美集成

### 设置步骤

#### 1.1 创建 Firebase 项目

1. 访问 [Firebase Console](https://console.firebase.google.com)
2. 点击 "添加项目"
3. 输入项目名称（如 `personal-site`）
4. 选择位置，完成创建

#### 1.2 启用 Firestore

1. 在项目中点击 "Firestore Database"
2. 选择 "Create database"
3. 选择位置（离你最近）
4. 选择安全规则：
   - 开发模式：仅用于测试，任何人可读写
   - 生产模式：需要认证规则

#### 1.3 设置安全规则

编辑 Firestore 规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户可以读写自己的日记
    match /users/{userId}/diaries/{document=**} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // 管理员可以读写所有数据
    match /{document=**} {
      allow read, write: if request.auth.uid in get(/databases/$(database)/documents/admins).data.uids;
    }
  }
}
```

#### 1.4 获取凭证

1. 进入 "项目设置" → "服务账户"
2. 选择 "Node.js"，点击 "生成新私钥"
3. 保存下载的 JSON 文件内容

#### 1.5 配置环境变量

```env
# .env.local
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email@...iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
```

#### 1.6 实现数据库服务

```typescript
// src/lib/db.ts
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { Diary, DiaryInput, DiaryDatabase } from './db'

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

const firestore = getFirestore(app)

export const firestoreDb: DiaryDatabase = {
  async getAll(userId: string): Promise<Diary[]> {
    const snapshot = await firestore
      .collection('users')
      .doc(userId)
      .collection('diaries')
      .orderBy('createdAt', 'desc')
      .get()

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Diary[]
  },

  async getById(userId: string, id: string): Promise<Diary | null> {
    const doc = await firestore
      .collection('users')
      .doc(userId)
      .collection('diaries')
      .doc(id)
      .get()

    if (!doc.exists) return null

    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    } as Diary
  },

  async create(userId: string, input: DiaryInput): Promise<Diary> {
    const now = new Date()
    const diary = {
      ...input,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    }

    const doc = await firestore
      .collection('users')
      .doc(userId)
      .collection('diaries')
      .add(diary)

    return {
      id: doc.id,
      ...diary,
      createdAt: now,
      updatedAt: now,
    } as Diary
  },

  async update(userId: string, id: string, input: Partial<DiaryInput>): Promise<Diary> {
    const now = new Date()
    await firestore
      .collection('users')
      .doc(userId)
      .collection('diaries')
      .doc(id)
      .update({
        ...input,
        updatedAt: Timestamp.fromDate(now),
      })

    return this.getById(userId, id) as Promise<Diary>
  },

  async delete(userId: string, id: string): Promise<void> {
    await firestore
      .collection('users')
      .doc(userId)
      .collection('diaries')
      .doc(id)
      .delete()
  },

  async search(userId: string, query: string): Promise<Diary[]> {
    // Firestore 不支持全文搜索，建议使用 Algolia
    // 这里提供简单的前端过滤
    const all = await this.getAll(userId)
    return all.filter(
      (d) =>
        d.title.includes(query) ||
        d.content.includes(query)
    )
  },
}

// 导出使用
export const db = firestoreDb
```

---

## 2. Supabase

### 优势
- 开源 PostgreSQL
- 内置身份认证
- 实时功能
- SQL + RESTful API
- 免费额度充足（500MB）

### 设置步骤

#### 2.1 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 连接 GitHub 或用邮箱注册
4. 创建新项目，选择位置和密码

#### 2.2 创建数据库表

在 SQL 编辑器中执行：

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 日记表
CREATE TABLE diaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[] DEFAULT '{}',
  mood TEXT CHECK (mood IN ('happy', 'neutral', 'sad', 'excited', 'tired')),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_diaries_user_id ON diaries(user_id);
CREATE INDEX idx_diaries_created_at ON diaries(created_at DESC);
```

#### 2.3 启用行级安全 (RLS)

```sql
-- 启用 RLS
ALTER TABLE diaries ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能访问自己的日记
CREATE POLICY "Users can access own diaries"
ON diaries
FOR ALL
USING (user_id = auth.uid());

-- 创建策略：用户可以创建日记
CREATE POLICY "Users can create diaries"
ON diaries
FOR INSERT
WITH CHECK (user_id = auth.uid());
```

#### 2.4 配置环境变量

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### 2.5 实现数据库服务

```typescript
// src/lib/db.ts
import { createClient } from '@supabase/supabase-js'
import { Diary, DiaryInput, DiaryDatabase } from './db'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const supabaseDb: DiaryDatabase = {
  async getAll(userId: string): Promise<Diary[]> {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Diary[]
  },

  async getById(userId: string, id: string): Promise<Diary | null> {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (error) return null
    return data as Diary
  },

  async create(userId: string, input: DiaryInput): Promise<Diary> {
    const { data, error } = await supabase
      .from('diaries')
      .insert([
        {
          user_id: userId,
          ...input,
          excerpt: input.content.slice(0, 100) + '...',
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data as Diary
  },

  async update(userId: string, id: string, input: Partial<DiaryInput>): Promise<Diary> {
    const { data, error } = await supabase
      .from('diaries')
      .update(input)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    return data as Diary
  },

  async delete(userId: string, id: string): Promise<void> {
    const { error } = await supabase
      .from('diaries')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error
  },

  async search(userId: string, query: string): Promise<Diary[]> {
    const { data, error } = await supabase
      .from('diaries')
      .select('*')
      .eq('user_id', userId)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)

    if (error) throw error
    return data as Diary[]
  },
}

export const db = supabaseDb
```

---

## 3. MongoDB

### 优势
- 灵活的文档数据库
- 强大的查询能力
- 天然支持 JavaScript/TypeScript
- 免费集群（512MB）

### 设置步骤

#### 3.1 创建 MongoDB 集群

1. 访问 [mongodb.com/cloud](https://mongodb.com/cloud)
2. 注册或登录账户
3. 创建免费集群
4. 添加数据库用户和访问权限
5. 获取连接字符串

#### 3.2 配置环境变量

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personal-site?retryWrites=true&w=majority
```

#### 3.3 实现数据库服务（使用 Mongoose）

```bash
npm install mongoose
```

```typescript
// src/lib/db.ts
import mongoose from 'mongoose'
import { Diary, DiaryInput, DiaryDatabase } from './db'

// 连接 MongoDB
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI!).then((mongoose) => {
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

// 定义 Schema
const DiarySchema = new mongoose.Schema({
  userId: String,
  title: String,
  content: String,
  excerpt: String,
  tags: [String],
  mood: String,
  isPublic: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const DiaryModel = mongoose.model('Diary', DiarySchema)

export const mongoDb: DiaryDatabase = {
  async getAll(userId: string): Promise<Diary[]> {
    await connectDB()
    return DiaryModel.find({ userId }).sort({ createdAt: -1 }) as any
  },

  async getById(userId: string, id: string): Promise<Diary | null> {
    await connectDB()
    return DiaryModel.findOne({ _id: id, userId }) as any
  },

  async create(userId: string, input: DiaryInput): Promise<Diary> {
    await connectDB()
    const diary = new DiaryModel({
      userId,
      ...input,
      excerpt: input.content.slice(0, 100) + '...',
    })
    await diary.save()
    return diary as any
  },

  async update(userId: string, id: string, input: Partial<DiaryInput>): Promise<Diary> {
    await connectDB()
    return DiaryModel.findByIdAndUpdate(
      { _id: id, userId },
      { ...input, updatedAt: new Date() },
      { new: true }
    ) as any
  },

  async delete(userId: string, id: string): Promise<void> {
    await connectDB()
    await DiaryModel.deleteOne({ _id: id, userId })
  },

  async search(userId: string, query: string): Promise<Diary[]> {
    await connectDB()
    return DiaryModel.find({
      userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }) as any
  },
}

export const db = mongoDb
```

---

## 环境变量配置文件示例

在 `.env.local` 中选择一个数据库配置：

```env
# ============================================
# 仅选择一个数据库配置
# ============================================

# --- Firebase (推荐) ---
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-email@iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# --- Supabase ---
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=your-key

# --- MongoDB ---
# MONGODB_URI=mongodb+srv://username:password@cluster...
```

---

## 迁移数据

### Firebase 导出数据

```bash
# 使用 Firebase 命令行
firebase firestore:export gs://bucket-name/export
```

### Supabase 导入数据

```bash
# 使用 pg_dump 导出 PostgreSQL 数据
pg_dump -h host -U user dbname > backup.sql

# 使用 psql 导入
psql -h host -U user dbname < backup.sql
```

---

## 常见问题

### Q: 如何选择数据库？
A: 
- 简单项目：Firebase Firestore
- 需要 SQL：Supabase
- 复杂查询：MongoDB

### Q: 数据加密了吗？
A: 
- Firebase：传输时使用 SSL，存储已加密
- Supabase：传输时使用 SSL，建议在应用层加密敏感数据
- MongoDB Atlas：传输和存储都已加密

### Q: 如何处理大数据量？
A: 
- 使用分页查询
- 添加数据库索引
- 考虑使用缓存（Redis）

### Q: 如何备份数据？
A:
- Firebase：自动备份，支持导出
- Supabase：标准 PostgreSQL 备份工具
- MongoDB：MongoDB Backup Service

---

## 参考链接

- [Firebase 文档](https://firebase.google.com/docs)
- [Supabase 文档](https://supabase.com/docs)
- [MongoDB 文档](https://docs.mongodb.com)
- [Auth.js 数据库适配器](https://authjs.dev/guides/databases)
