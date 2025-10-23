# APP 图标生成说明

## 📱 图标文件

我已经创建了 `icon.svg` 文件，但 PWA 需要 PNG 格式的多种尺寸图标。

## 🎨 方法1: 使用在线工具生成（推荐）⭐

### 推荐工具：PWA Asset Generator

**网址**: https://www.pwabuilder.com/imageGenerator

**步骤**：
1. 打开网站
2. 上传 `icon.svg` 文件（或使用下面的临时图标）
3. 点击 "Generate" 生成所有尺寸
4. 下载 ZIP 文件
5. 解压到当前 `icons` 文件夹

### 其他在线工具：
- https://favicon.io/favicon-converter/
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

## 🖼️ 方法2: 使用 Photoshop/Figma

如果您有设计软件，需要生成以下尺寸：

```
72x72.png
96x96.png
128x128.png
144x144.png
152x152.png
192x192.png
384x384.png
512x512.png
```

## 🔧 方法3: 使用命令行工具

如果您熟悉命令行，可以使用 ImageMagick：

```bash
# 安装 ImageMagick
# Windows: 从官网下载安装
# Mac: brew install imagemagick
# Linux: apt-get install imagemagick

# 生成所有尺寸
convert icon.svg -resize 72x72 icon-72x72.png
convert icon.svg -resize 96x96 icon-96x96.png
convert icon.svg -resize 128x128 icon-128x128.png
convert icon.svg -resize 144x144 icon-144x144.png
convert icon.svg -resize 152x152 icon-152x152.png
convert icon.svg -resize 192x192 icon-192x192.png
convert icon.svg -resize 384x384 icon-384x384.png
convert icon.svg -resize 512x512 icon-512x512.png
```

## ⚠️ 临时方案：使用占位图标

如果暂时无法生成图标，PWA 仍然可以安装，只是图标会显示为默认样式。

您可以稍后再添加图标，不影响 APP 的其他功能。

## 📋 图标命名规范

生成后的文件应该放在 `icons` 文件夹，命名为：
```
icons/icon-72x72.png
icons/icon-96x96.png
icons/icon-128x128.png
icons/icon-144x144.png
icons/icon-152x152.png
icons/icon-192x192.png
icons/icon-384x384.png
icons/icon-512x512.png
```

## 🎯 图标设计建议

- **简洁明了**：图标应该一眼就能看出是 3D 立方体应用
- **高对比度**：确保在各种背景下都清晰可见
- **居中对齐**：主要图形应该在中心位置
- **留白适当**：边缘留出 10-15% 的空白
- **颜色鲜明**：使用品牌渐变色（紫色系）

## 💡 提示

即使没有图标，PWA 功能依然完整可用：
- ✅ 可以安装到主屏幕
- ✅ 离线访问
- ✅ 全屏显示
- ⚠️ 只是图标显示为默认样式

**添加图标后，用户需要重新安装 APP 才能看到新图标。**
