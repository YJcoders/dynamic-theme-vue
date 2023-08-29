## 动态主题切换

页面自定义变量（css 变量） + 组件主题切换

### ant-design-vue V1.7.8 版本

### 一、组件主题切换，实现步骤

- 导出 ant-design-vue 内置样式
- 在 index.html 文件中 引入上一步导出的 less 文件，并将 less 方法挂载在 window
- 通过 less.modifyVars 修改变量

#### 1、导出 ant-design-vue 内置样式

使用 [antd-theme-generator](https://github.com/mzohaibqc/antd-theme-generator#readme) 插件 进行导出

此插件必须导入 antd 的样式，并且 darken 颜色变量方法 ant-design-vue 不支持，所以，此处，抽出源码，进行注释改造，使用方法一致

新建 antdThemeGenerator.js 代码位置： src/scripts/
新建 generateTheme.js 代码如下：

```js
const fs = require("fs");
const path = require("path");
// const { generateTheme } = require("antd-theme-generator");
// 原组件，必须引用 antd, 并且 darken 方法不支持，所以此处，抽离源码，进行注释修改
const { generateTheme } = require("./antdThemeGenerator");

// 自定义样式，且引入ant-design-vue 内部变量，需要写到此处
const customFilePath = path.join(__dirname, "../theme/custom.less");
const outputFilePath = path.join(__dirname, "../../public/theme.less");
const options = {
  // ant design路径
  antDir: path.join(__dirname, "../../node_modules/ant-design-vue"),
  // 定制主题的less文件路径
  stylesDir: path.join(__dirname, "../theme"),
  // 动态切换的less变量文件路径
  varFile: path.join(__dirname, "../theme/variables.less"),
  // 定义外部文件使用到的变量，名称要和 ant-design-vue 内部变量一致
  themeVariables: [
    "@primary-color",
    "@header-back-color",
    // "@text-color",
    // "@bg-color",
  ],
  // 生成less文件路径
  outputFilePath,
};

generateTheme(options)
  .then((less) => {
    // 读取提取的ant样式
    const themeLess = less.toString();
    // 读取自定义的样式
    const customLess = fs.readFileSync(customFilePath).toString();
    // 自定义样式与ant主题样式合并
    fs.writeFileSync(outputFilePath, themeLess + customLess);
    console.log("主题导出成功");
  })
  .catch((error) => {
    console.log("Error", error);
  });
```

根据生成脚本的配置，创建对应文件
文件内的变量名称，必须是 ant-design-vue 内部定义的，否则不生效
执行脚本，生成导出的 less 主题文件

```sh
# 执行之后，会在 public 文件夹生成 theme.less
node ./scripts/generateTheme.js
```

#### 2、在 index.html 中引入生成的 theme.less，并添加 less 方法到全局

```html
<body>
  <link rel="stylesheet/less" type="text/css" href="./theme.less" />
  <script>
    window.less = {
      async: false,
      env: "production",
      javascriptEnabled: true,
    };
  </script>
</body>
```

#### 3、切换主题

```js
methods: {
  onChangeTheme(color) {
    // 切换 @primary-color 组件主题色都会变化
    // 切换 @header-back-color @bg-color 这些是使用到的变量，需要根据项目实际情况，可进行对应修改处理
    window.less.modifyVars({
      '@primary-color': color,
      "@header-back-color": color,
      "@bg-color": color
    })

    // 切换 自定义变量
    const theme = { '--custom-success-color': 'red', '--custom-error-color': 'green', '--custom-text-color': 'pink', '--custom-border-color': 'red' }
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(key, theme[key])
    })
  }
}
```

### 二、自定义全局变量切换，实现步骤

- 定义好默认全局 css 变量
- 页面位置按需使用
- 切换主题时，切换 css 变量

#### 1、定义自定义变量

在 theme 文件夹下新建 index.less

```less
:root {
  // 自定义全局变量颜色
  --custom-success-color: green;
  --custom-error-color: red;
  --custom-text-color: blue;
  --custom-border-color: yellow;
}
```

#### 2、页面使用

```less
.card-success {
  background-color: var(--custom-success-color);
}
.card-error {
  background-color: var(--custom-error-color);
}
```

#### 3、切换主题，修改变量

```js
methods: {
  onChangeTheme(color) {
    // 切换 自定义变量
    const theme = { '--custom-success-color': 'red', '--custom-error-color': 'green', '--custom-text-color': 'pink', '--custom-border-color': 'red' }
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(key, theme[key])
    })
  }
}
```
