import { GlassCard, GlassPanel } from "@/components/glass";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Mail, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "关于",
  description: "了解更多关于我的信息",
};

export default function AboutPage() {
  const skills = [
    { category: "前端", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "后端", items: ["Node.js", "Python", "Go"] },
    { category: "工具", items: ["Git", "Docker", "VS Code"] },
    { category: "其他", items: ["数学", "机器学习", "数据分析"] },
  ];

  const timeline = [
    { year: "2024", title: "开始个人博客之旅", description: "创建了这个个人网站" },
    { year: "2023", title: "深入学习 AI", description: "研究机器学习和深度学习" },
    { year: "2022", title: "全栈开发", description: "开始学习后端和全栈开发" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Card */}
      <GlassCard variant="elevated" className="p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <Avatar className="w-32 h-32 ring-4 ring-white/20">
            <AvatarImage src="/avatar.png" alt="Avatar" />
            <AvatarFallback className="text-4xl">EA</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Evanalysis</h1>
            <p className="text-muted-foreground mb-4">
              开发者 / 数学爱好者 / 终身学习者
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> 中国
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> 2024 年加入
              </span>
            </div>
            <div className="flex gap-3 justify-center md:justify-start">
              <Link
                href="https://github.com"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:example@example.com"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* About Me */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold mb-4">关于我</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            你好！我是一名热爱技术和数学的开发者。我喜欢探索新技术，解决复杂问题，
            并将学到的知识通过博客和项目分享出来。
          </p>
          <p>
            这个网站是我的数字花园，在这里我记录学习笔记、分享技术文章、展示个人项目。
            我相信通过持续学习和分享，我们可以共同成长。
          </p>
          <p>
            当我不在编码时，我喜欢阅读数学书籍、探索算法，或者学习新的编程语言。
            如果你对我的项目感兴趣或者想要交流，欢迎联系我！
          </p>
        </div>
      </GlassCard>

      {/* Skills */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold mb-4">技能</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.category}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Timeline */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-semibold mb-4">时间线</h2>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-primary" />
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>
              <div className="pb-6">
                <span className="text-sm text-muted-foreground">{item.year}</span>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
