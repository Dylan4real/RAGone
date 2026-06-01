# DESIGN.md — Claude Design System

> 来源：[awesome-design-md](https://github.com/VoltAgent/awesome-design-md) — Anthropic Claude 的设计系统规范

---

## 概述

Claude.com 采用温暖的编辑式美学，区别于常见的冷色调 AI 产品。基础画布是暖奶油色 (#faf9f5)，搭配板衬线显示字体和人文无衬线正文字体，营造文学杂志质感。

品牌核心：奶油色 + 珊瑚色 (#cc785c) 组合，刻意区别于竞品的冷蓝/石板色方案。三种表面模式交替使用：奶油画布、浅奶油卡片、深海军蓝表面。

---

## 色彩系统

### 品牌与强调色

| 令牌 | 色值 | 用途 |
|------|------|------|
| Coral | `#cc785c` | 主 CTA、标注卡片、文字标记强调 |
| Coral Active | `#a9583e` | 悬停/按下状态 |
| Coral Disabled | `#e6dfd8` | 去饱和奶油色禁用态 |
| Teal | `#5db8a6` | 终端指示器、连接点（谨慎使用） |
| Amber | `#e8a55a` | 分类徽章的温暖辅助色 |

### 表面调色板

| 令牌 | 色值 | 用途 |
|------|------|------|
| Canvas | `#faf9f5` | 默认暖奶油页面背景 |
| Surface Soft | `#f5f0e8` | 区域分隔、柔和带状区域 |
| Surface Card | `#efe9de` | 功能/内容卡片 |
| Cream Strong | `#e8e0d2` | 选中标签、强调带状区域 |
| Surface Dark | `#181715` | 代码编辑器、模型卡片、页脚 |
| Dark Elevated | `#252320` | 深色区域内的提升卡片 |
| Dark Soft | `#1f1e1b` | 深色卡片内的代码块背景 |
| Hairline | `#e6dfd8` | 奶油表面的 1px 边框 |
| Hairline Soft | `#ebe6df` | 几乎不可见的分隔线 |

### 文本颜色

| 令牌 | 色值 | 用途 |
|------|------|------|
| Ink | `#141413` | 标题、主文本（暖黑） |
| Body Strong | `#252523` | 强调段落 |
| Body | `#3d3d3a` | 默认正文 |
| Muted | `#6c6a64` | 次要文本、面包屑 |
| Muted Soft | `#8e8b82` | 说明文字、细则 |
| On Primary | `#ffffff` | 珊瑚背景上的文字 |
| On Dark | `#faf9f5` | 深色表面的奶油白 |
| On Dark Soft | `#a09d96` | 页脚正文、深色次要标签 |

### 语义色

| 令牌 | 色值 | 用途 |
|------|------|------|
| Success | `#5db872` | 成功状态 |
| Warning | `#d4a017` | 警告状态 |
| Error | `#c64545` | 错误状态 |

---

## 字体系统

### 字体家族

| 用途 | 字体 | 备选方案 |
|------|------|----------|
| Display | Copernicus / Tiempos Headline (板衬线) | Cormorant Garamond / EB Garamond |
| Body/UI | StyreneB / Inter (人文无衬线) | Inter |
| Code | JetBrains Mono | — |

**回退链：**
- 衬线：Tiempos Headline → Garamond → "Times New Roman" → serif
- 无衬线：Inter → system fonts → sans-serif

### 字体比例（14 个令牌）

| 令牌 | 大小 | 行高 | 字距 | 用途 |
|------|------|------|------|------|
| display-xl | 64px | 1.05 | -1.5px | 首页主标题 |
| display-lg | 48px | 1.1 | -1px | 区域标题 |
| display-md | 36px | 1.15 | -0.5px | 子区域标题、模型名称 |
| display-sm | 28px | 1.2 | -0.3px | 定价名称、标注标题 |
| title-lg | 22px | 500 | 1.3 | 定价标签 |
| title-md | 18px | 500 | 1.4 | 功能卡片标题 |
| title-sm | 16px | 500 | 1.4 | 连接瓦片标题 |
| body-md | 16px | 400 | 1.55 | 默认正文 |
| body-sm | 14px | 400 | 1.55 | 页脚正文、细则 |
| caption | 13px | 500 | 1.4 | 徽章标签 |
| caption-uppercase | 12px | 500 | 1.5px tracking | 分类标签 |
| code | 14px | 400 | 1.6 | 代码块 (JetBrains Mono) |
| button | 14px | 500 | 1.0 | 按钮标签 |
| nav-link | 14px | 500 | 1.4 | 导航项 |

### 原则

- Display 永远使用 weight 400，不要 bold
- 所有 display 尺寸必须使用负字距
- 衬线/无衬线分割是品牌核心，不可替换
- 开源替代：Cormorant Garamond (衬线)、Inter (无衬线)

---

## 布局系统

### 间距（4px 基础单位）

| 令牌 | 值 |
|------|-----|
| xxs | 4px |
| xs | 8px |
| sm | 12px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| xxl | 48px |
| section | 96px |

### 网格

- 最大内容宽度 ~1200px，居中，12 列
- Hero：6/6 分割（标题左、插图右）
- 功能卡片：桌面 3 列、平板 2 列、移动 1 列
- 连接瓦片：桌面 4-6 列、平板 2 列、移动 1 列
- 定价：桌面 3 列、移动 1 列

### 留白哲学

充裕的内边距和统一的 96px 区域间距创造编辑杂志节奏，而非典型营销模板感。

---

## 阴影与深度

系统以**色块优先、阴影极少**为主。大多数深度来自奶油色与深色表面的对比，而非投影。

五个层级：

| 层级 | 描述 |
|------|------|
| Flat | 无阴影、无边框（正文区域、导航、hero） |
| Soft hairline | 1px 边框（输入框、子导航） |
| Cream card | surface-card 背景、无阴影 |
| Dark surface card | surface-dark 背景、无阴影 |
| Subtle drop shadow | 仅用于悬停状态 |

---

## 形状与圆角

| 令牌 | 值 | 用途 |
|------|-----|------|
| xs | 4px | 小徽章 |
| sm | 6px | 小按钮 |
| md | 8px | CTA、输入框 |
| lg | 12px | 内容卡片 |
| xl | 16px | Hero 容器 |
| pill | 9999px | 徽章、图标按钮 |

---

## 组件规范

### 导航

**top-nav** — 64px 奶油色导航栏，包含品牌标记、水平菜单（产品、解决方案、用例、定价、研究、公司），右侧"登录"文字链接 + 珊瑚色"Try Claude"按钮。

### 按钮（6 种变体）

| 变体 | 描述 |
|------|------|
| button-primary | 珊瑚背景、白字、14px/500、12×20px 内边距、40px 高、8px 圆角 |
| button-primary-active | 加深至 #a9583e |
| button-primary-disabled | 奶油色去饱和态 |
| button-secondary | 奶油色带发丝边框、墨色文字 |
| button-secondary-on-dark | 深色提升表面 (#252320)、奶油色文字 |
| button-text-link | 内联、无背景 |
| button-icon-circular | 36px 圆形、奶油色背景 |
| text-link | 正文中的内联珊瑚色链接 |

### 卡片与容器（12 种类型）

| 类型 | 描述 |
|------|------|
| hero-band | 96px 垂直内边距、6-6 网格布局 |
| hero-illustration-card | 右侧 hero 元素、16px 圆角 |
| feature-card | 奶油卡片背景 (#efe9de)、12px 圆角、32px 内边距 |
| product-mockup-card-dark | 深海军蓝用于 Claude 产品 UI 片段 |
| code-window-card | 深色卡片 + JetBrains Mono 代码、行号、内部深色块 |
| model-comparison-card | 奶油色带发丝边框用于 Opus/Sonnet/Haiku 比较 |
| pricing-tier-card | 奶油色带发丝边框、衬线显示价格、无衬线功能列表 |
| pricing-tier-card-featured | 深色表面（深色背景即为特色信号） |
| callout-card-coral | 全珊瑚色 (#cc785c)、白字、48px 内边距 |
| connector-tile | 奶油色带发丝边框用于集成网格瓦片 |
| cta-band-coral | 页脚前珊瑚色带、64px 内边距、衬线标题 |
| cta-band-dark | 开发者页面的替代页脚前区域 |

### 输入框与表单

| 类型 | 描述 |
|------|------|
| text-input | 奶油背景、墨色文字、40px 高、8px 圆角、发丝边框 |
| text-input-focused | 珊瑚色边框 + 微妙外环 |
| cookie-consent-card | 右下角深色浮动横幅 |

### 标签/徽章

| 类型 | 描述 |
|------|------|
| badge-pill | 奶油卡片背景、药丸形、说明文字 |
| badge-coral | 珊瑚色填充用于 "NEW"/"BETA" 标签、大写说明带字距 |

### 标签页

| 类型 | 描述 |
|------|------|
| category-tab | 透明、静音文字 |
| category-tab-active | 奶油卡片背景、墨色文字 |

### 页脚

深海军蓝 (#181715)、奶油色次要文字、桌面端 4 列链接网格、64px 垂直内边距、顶部品牌标记。

---

## 设计守则

**核心规则：**
- ✅ 始终锚定在奶油色画布上
- ✅ 始终使用衬线 display + 负字距
- ✅ 珊瑚色仅用于主 CTA 和全出血标注卡片
- ✅ 在深色 mockup 中展示真实产品 chrome
- ✅ 连续带状区域交替表面模式（奶油 → 卡片 → 深色 → 奶油 → 珊瑚 → 深色页脚）

**禁止：**
- ❌ 不要将衬线 display 加粗
- ❌ 不要使用冷蓝色作为品牌强调色
- ❌ 不要引入第四种表面色调

---

## 响应式行为

| 断点 | 范围 | 策略 |
|------|------|------|
| Mobile | <768px | 汉堡导航、hero 从 64 缩至 32px、单列堆叠、代码块水平滚动 |
| Tablet | 768–1024px | 收紧水平导航、2 列功能卡、3 列连接瓦片 |
| Desktop | 1024–1440px | 完整导航、3 列功能、4-6 列连接、3 列定价 |
| Wide | >1440px | 同桌面但更多呼吸空间、1200px 最大宽度限制 |

**触摸目标：** 按钮最小 40×40px、图标按钮 36×36px、输入框 40px 高、连接瓦片完全可点击。

**折叠策略：** 减少列数而非缩放卡片；代码窗口通过水平滚动保持可读性。

---

## 迭代指南

- 一次处理一个组件，使用 YAML 令牌引用
- 变体需要单独条目
- 不要内联十六进制色值
- 仅记录默认和激活/按下状态（无悬停）
- 衬线/无衬线分割不可破坏
- 奶油 + 珊瑚 + 深海军蓝三色组不应增加第四种表面色调

---

## 已知缺口

- Copernicus 和 StyreneB 是 Anthropic 授权字体，需要记录替代方案
- 品牌标记是内联 SVG 资产，未作为系统令牌形式化
- 动画/过渡时间不在范围内
- 超出聚焦状态的表单验证未提取
- Claude 产品表面 (claude.ai 聊天界面) 共享部分令牌但有额外产品特定组件
- 动画演示卡片未完全捕获在静态规范中

---

## Tailwind CSS 适配参考

```javascript
// tailwind.config.js 扩展
module.exports = {
  theme: {
    extend: {
      colors: {
        // 品牌色
        coral: {
          DEFAULT: '#cc785c',
          active: '#a9583e',
          disabled: '#e6dfd8',
        },
        teal: '#5db8a6',
        amber: '#e8a55a',

        // 表面色
        canvas: '#faf9f5',
        'surface-soft': '#f5f0e8',
        'surface-card': '#efe9de',
        'cream-strong': '#e8e0d2',
        'surface-dark': '#181715',
        'dark-elevated': '#252320',
        'dark-soft': '#1f1e1b',
        hairline: '#e6dfd8',
        'hairline-soft': '#ebe6df',

        // 文本色
        ink: '#141413',
        'body-strong': '#252523',
        body: '#3d3d3a',
        muted: '#6c6a64',
        'muted-soft': '#8e8b82',

        // 语义色
        success: '#5db872',
        warning: '#d4a017',
        error: '#c64545',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Garamond', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.05', letterSpacing: '-1.5px' }],
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-1px' }],
        'display-md': ['36px', { lineHeight: '1.15', letterSpacing: '-0.5px' }],
        'display-sm': ['28px', { lineHeight: '1.2', letterSpacing: '-0.3px' }],
        'title-lg': ['22px', { lineHeight: '1.3', fontWeight: '500' }],
        'title-md': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'title-sm': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-md': ['16px', { lineHeight: '1.55' }],
        'body-sm': ['14px', { lineHeight: '1.55' }],
        caption: ['13px', { lineHeight: '1.4', fontWeight: '500' }],
        'caption-uppercase': ['12px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '1.5px' }],
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
    },
  },
}
```
