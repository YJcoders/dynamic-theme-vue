const fs = require("fs");
const path = require("path");
// const { generateTheme } = require("antd-theme-generator");
// 原组件，必须引用 antd, 并且 darken 方法不支持，所以此处，抽离源码，进行注释修改
const { generateTheme } = require("./antdThemeGenerator");

const customFilePath = path.join(__dirname, "../theme/custom.less");
const outputFilePath = path.join(__dirname, "../../public/theme.less");
const options = {
  // ant design路径
  antDir: path.join(__dirname, "../../node_modules/ant-design-vue"),
  // 定制各种主题的less文件路径
  stylesDir: path.join(__dirname, "../theme"),
  // 动态切换的less变量文件路径
  varFile: path.join(__dirname, "../theme/variables.less"),
  // 定义要修改的变量，名称要和 ant-design-vue 提供的对应
  themeVariables: [
    "@primary-color",
    "@header-back-color",
    // "@secondary-color",
    // "@text-color",
    // "@text-color-secondary",
    // "@heading-color",
    // "@layout-body-background",
    // "@layout-header-background",
    // "@border-radius-base",
    // "@border-color",
    // "@bg-color",
  ],
  // 生成less文件路径
  outputFilePath,
};

generateTheme(options)
  .then((less) => {
    console.log("配置主题成功");
    // 读取提取的ant样式
    const themeLess = less.toString();
    // 读取自定义的样式
    const customLess = fs.readFileSync(customFilePath).toString();
    // 自定义样式与ant主题样式合并
    fs.writeFileSync(outputFilePath, themeLess + customLess);
    // 重新覆盖themeCss
    console.log(`🌈 主题覆盖成功. OutputFile: ${outputFilePath}`);
  })
  .catch((error) => {
    console.log("Error", error);
  });
