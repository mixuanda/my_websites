export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <meta httpEquiv="refresh" content="0;url=/admin/index.html" />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">正在跳转到编辑器...</p>
          <p className="text-xs text-muted-foreground mt-2">
            如果没有自动跳转，请
            <a href="/admin/index.html" className="underline">点击这里</a>
          </p>
        </div>
      </div>
    </div>
  );
}
