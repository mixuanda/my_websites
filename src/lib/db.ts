/**
 * 数据库接口示例
 * 
 * 此文件提供了私密内容存储的接口定义和示例实现
 * 实际使用时，请根据你选择的数据库进行配置：
 * - Firestore: 推荐配合 Firebase Auth 使用
 * - Supabase: SQL + Dashboard，易于管理
 * - MongoDB: 灵活的文档数据库
 * - PostgreSQL: 配合 Prisma 使用
 */

import { firebaseEnabled, firestore, firestoreModule } from "./firebase-admin";

// ============================================
// 类型定义
// ============================================

export interface Diary {
  id: string;
  userId: string;
  title: string;
  content: string;
  excerpt?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  mood?: "happy" | "neutral" | "sad" | "excited" | "tired";
  isPublic: boolean;
}

export interface DiaryInput {
  title: string;
  content: string;
  tags?: string[];
  mood?: Diary["mood"];
  isPublic?: boolean;
}

// ============================================
// 数据库接口（抽象）
// ============================================

export interface DiaryDatabase {
  // 获取用户所有日记
  getAll(userId: string): Promise<Diary[]>;
  
  // 获取单篇日记
  getById(userId: string, id: string): Promise<Diary | null>;
  
  // 创建日记
  create(userId: string, input: DiaryInput): Promise<Diary>;
  
  // 更新日记
  update(userId: string, id: string, input: Partial<DiaryInput>): Promise<Diary>;
  
  // 删除日记
  delete(userId: string, id: string): Promise<void>;
  
  // 搜索日记
  search(userId: string, query: string): Promise<Diary[]>;
}

// ============================================
// 内存数据库（开发/演示用）
// ============================================

const memoryStore: Map<string, Diary[]> = new Map();

export const memoryDb: DiaryDatabase = {
  async getAll(userId: string): Promise<Diary[]> {
    return memoryStore.get(userId) || [];
  },

  async getById(userId: string, id: string): Promise<Diary | null> {
    const diaries = memoryStore.get(userId) || [];
    return diaries.find((d) => d.id === id) || null;
  },

  async create(userId: string, input: DiaryInput): Promise<Diary> {
    const diary: Diary = {
      id: crypto.randomUUID(),
      userId,
      title: input.title,
      content: input.content,
      excerpt: input.content.slice(0, 100) + "...",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: input.tags || [],
      mood: input.mood,
      isPublic: input.isPublic || false,
    };
    
    const diaries = memoryStore.get(userId) || [];
    diaries.push(diary);
    memoryStore.set(userId, diaries);
    
    return diary;
  },

  async update(userId: string, id: string, input: Partial<DiaryInput>): Promise<Diary> {
    const diaries = memoryStore.get(userId) || [];
    const index = diaries.findIndex((d) => d.id === id);
    
    if (index === -1) {
      throw new Error("Diary not found");
    }
    
    const updated = {
      ...diaries[index],
      ...input,
      excerpt: input.content ? input.content.slice(0, 100) + "..." : diaries[index].excerpt,
      updatedAt: new Date(),
    };
    
    diaries[index] = updated;
    memoryStore.set(userId, diaries);
    
    return updated;
  },

  async delete(userId: string, id: string): Promise<void> {
    const diaries = memoryStore.get(userId) || [];
    const filtered = diaries.filter((d) => d.id !== id);
    memoryStore.set(userId, filtered);
  },

  async search(userId: string, query: string): Promise<Diary[]> {
    const diaries = memoryStore.get(userId) || [];
    const lowerQuery = query.toLowerCase();
    return diaries.filter(
      (d) =>
        d.title.toLowerCase().includes(lowerQuery) ||
        d.content.toLowerCase().includes(lowerQuery)
    );
  },
};

// ============================================
// Firestore 实现（需要配置 Firebase 服务账号）
// ============================================

const normalizeDiary = (docId: string, data: any): Diary => {
  const Timestamp = firestoreModule?.Timestamp;
  const created = Timestamp && data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt);
  const updated = Timestamp && data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date(data.updatedAt);

  return {
    id: docId,
    userId: data.userId,
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    tags: data.tags,
    mood: data.mood,
    isPublic: data.isPublic,
    createdAt: created,
    updatedAt: updated,
  };
};

function createFirestoreDb(): DiaryDatabase | null {
  // 必须在函数内部捕获 firestore 引用，确保 TypeScript 知道它不为 null
  const fs = firestore;
  if (!fs) return null;

  return {
    async getAll(userId: string): Promise<Diary[]> {
      const snapshot = await fs
        .collection("users")
        .doc(userId)
        .collection("diaries")
        .orderBy("createdAt", "desc")
        .get();

      return snapshot.docs.map((doc) => normalizeDiary(doc.id, doc.data()));
    },

    async getById(userId: string, id: string): Promise<Diary | null> {
      const doc = await fs
        .collection("users")
        .doc(userId)
        .collection("diaries")
        .doc(id)
        .get();

      if (!doc.exists) return null;
      return normalizeDiary(doc.id, doc.data());
    },

    async create(userId: string, input: DiaryInput): Promise<Diary> {
      const now = new Date();
      const docRef = fs
        .collection("users")
        .doc(userId)
        .collection("diaries")
        .doc();

      await docRef.set({
        ...input,
        userId,
        excerpt: input.content.slice(0, 100) + "...",
        createdAt: now,
        updatedAt: now,
        isPublic: input.isPublic ?? false,
      });

      return {
        id: docRef.id,
        userId,
        ...input,
        excerpt: input.content.slice(0, 100) + "...",
        createdAt: now,
        updatedAt: now,
        isPublic: input.isPublic ?? false,
      } as Diary;
    },

    async update(userId: string, id: string, input: Partial<DiaryInput>): Promise<Diary> {
      const docRef = fs
        .collection("users")
        .doc(userId)
        .collection("diaries")
        .doc(id);

      await docRef.update({
        ...input,
        updatedAt: new Date(),
      });

      const doc = await docRef.get();
      return normalizeDiary(doc.id, doc.data());
    },

    async delete(userId: string, id: string): Promise<void> {
      await fs
        .collection("users")
        .doc(userId)
        .collection("diaries")
        .doc(id)
        .delete();
    },

    async search(userId: string, query: string): Promise<Diary[]> {
      const all = await this.getAll(userId);
      const lowerQuery = query.toLowerCase();
      return all.filter(
        (d) =>
          d.title.toLowerCase().includes(lowerQuery) ||
          d.content.toLowerCase().includes(lowerQuery)
      );
    },
  };
}

const firestoreDb = createFirestoreDb();

// ============================================
// 导出当前使用的数据库实例
// ============================================

export const usingFirestore = Boolean(firestoreDb && firebaseEnabled);
export const db: DiaryDatabase = usingFirestore && firestoreDb ? firestoreDb : memoryDb;

// 初始化示例数据（仅开发用）
export function initSampleData(userId: string) {
  const sampleDiaries: DiaryInput[] = [
    {
      title: "今日心情",
      content: `今天是个美好的一天。

早上起来天气晴朗，阳光透过窗帘洒进房间，心情特别好。

完成了一些重要的工作：
- 写完了博客文章
- 修复了几个 bug
- 学习了新的技术

晚上和朋友聚餐，聊了很多有趣的话题。

总的来说，这是充实而愉快的一天。期待明天！`,
      mood: "happy",
      tags: ["生活", "工作"],
    },
    {
      title: "工作总结",
      content: `今天的工作总结：

## 完成的任务
1. 项目代码重构
2. 文档更新
3. 代码审查

## 遇到的问题
- 性能优化还需要继续
- 需要更多测试覆盖

## 明天计划
- 继续优化性能
- 添加单元测试`,
      mood: "neutral",
      tags: ["工作", "技术"],
    },
    {
      title: "周末计划",
      content: `这个周末打算好好休息一下：

1. 睡个懒觉
2. 看一部电影
3. 整理房间
4. 准备下周的工作

希望能有个愉快的周末！`,
      mood: "excited",
      tags: ["生活", "计划"],
    },
  ];

  sampleDiaries.forEach((diary) => {
    memoryDb.create(userId, diary);
  });
}
