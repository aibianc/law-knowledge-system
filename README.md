# 📚 知识学习系统

一个集成化的知识学习平台，包含公安专业知识系统和法律知识体系两大模块，提供现代化、系统化的学习体验。

## 🎯 系统组成

### 1️⃣ 主页（home.html）
- 精美的动态渐变背景
- 两大系统的入口选择
- 系统特性展示

### 2️⃣ 公安专业知识系统（index.html）
- 5大章节完整知识体系
- 详细的考点总结与概括
- 智能搜索与高亮显示
- 可折叠的知识点卡片

### 3️⃣ 法律知识体系（法律知识体系完整版.html）
- 系统化的知识结构
- 可视化知识图谱
- 多视图展示模式
- 知识点关联对比

## 🌟 核心特性

- ✨ 现代化的 UI 设计，使用渐变色和流畅动画
- 🔄 两大系统无缝切换，一键跳转
- 📑 **侧边导航栏**，实时高亮当前阅读位置
- 🔍 强大的搜索功能，支持关键词高亮
- 📖 可折叠展开的知识点卡片
- 🖨️ 支持打印功能
- 📱 响应式设计，支持移动端
- ⚡ 快速导航和平滑滚动
- ⌨️ 键盘快捷键支持（Ctrl/Cmd + K 搜索，Esc 清空）
- 📊 阅读进度条
- 🔝 滚动到顶部按钮

## 📖 内容结构

### 第一章 实务工作能力
- 巡逻（权力、职责、组织实施）
- 接警和处警
- 安全检查和安全保护

### 第二章 群众工作能力
- 群众工作的内涵
- 宣传教育
- 沟通协调
- 组织动员
- 服务群众

### 第三章 行政管理能力
- 调查研究
- 纠纷化解
- 风险识别
- 风险防范

### 第四章 信息工作能力
- 公安情报信息工作
- 信息收集
- 信息分析
- 信息应用

### 第五章 应急处理能力
- 突发事件
- 公安应急处理能力

## 🚀 快速开始

### 在线访问

访问 GitHub Pages: [https://your-username.github.io/your-repo-name/](https://your-username.github.io/your-repo-name/)

**推荐入口：** 从 `home.html` 开始，选择您需要的学习系统

### 本地运行

1. 克隆仓库
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. 打开主页开始使用
```bash
# Windows
start home.html

# macOS
open home.html

# Linux
xdg-open home.html
```

或者使用本地服务器：
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js http-server
npx http-server
```

然后在浏览器中访问 `http://localhost:8000`

## 📁 项目结构

```
.
├── home.html                      # 系统主页（推荐入口）
├── index.html                     # 公安专业知识系统
├── 法律知识体系完整版.html       # 法律知识体系
├── data.js                        # 公安知识点数据
├── app.js                         # 公安系统应用逻辑
├── 1.csv                          # 原始数据源
├── README.md                      # 项目说明
└── .gitignore                     # Git忽略配置
```

## 🎨 技术栈

- 纯原生 HTML5
- 纯原生 JavaScript (ES6+)
- CSS3 动画和过渡效果
- 无需任何框架和依赖

## ⚙️ 功能说明

### 搜索功能
- 输入关键词即可实时搜索
- 自动展开匹配的章节
- 关键词高亮显示

### 键盘快捷键
- `Ctrl/Cmd + K`: 聚焦搜索框
- `Esc`: 清空搜索

### 导航
- 精美的主页系统选择界面
- 顶部固定导航栏，支持系统切换
- **侧边目录导航**：
  - 左侧固定导航栏，显示所有章节
  - 点击章节标题展开/收起小节列表
  - 点击小节快速跳转并自动展开内容
  - 滚动时自动高亮当前阅读位置
  - 移动端支持滑出/收起（点击左下角☰按钮）
- 快速导航卡片
- 平滑滚动到锚点
- 滚动到顶部按钮

### 打印支持
- 点击打印按钮或使用浏览器打印功能
- 自动优化打印样式
- 展开所有内容便于打印

### 系统切换
- 每个系统顶部都有快速切换按钮
- 一键返回主页
- 在公安知识和法律知识间自由切换

## 🔧 自定义

### 修改颜色主题

在 `app.js` 中修改 `colorConfig` 对象：

```javascript
const colorConfig = {
    blue: { from: '#4facfe', to: '#00f2fe', accent: '#4facfe', icon: '🔵' },
    // 添加或修改颜色配置
};
```

### 添加新的知识点

在 `data.js` 中的 `knowledgeData` 数组中添加新的章节或知识点。

## 📝 部署到 GitHub Pages

1. 创建 GitHub 仓库

2. 推送代码
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

3. 启用 GitHub Pages
   - 进入仓库 Settings
   - 找到 Pages 选项
   - Source 选择 `main` 分支
   - 保存并等待部署完成

4. 访问你的网站
   - https://your-username.github.io/your-repo-name/

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过 GitHub Issues 联系。

---

**祝学习顺利！📚✨**
