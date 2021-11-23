module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 新增代码
  plugins: [
    [
      "import",
      {
        libraryName: 'element-plus',
        customStyleName: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        }
      }
    ]
  ]
}