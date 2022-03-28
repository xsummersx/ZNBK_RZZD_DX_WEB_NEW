# README

# 项目基础模板

## Vue3 + Vite 

- 使用 Vue3 `<script setup>` 单文件组件, 查看文档[script setup docs](https://staging-cn.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- [vite文档](https://vitejs.cn)

## IDE

- [VSCode](https://code.visualstudio.com/) + [`Volar`插件](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) + `Eslint` + `Prettier` + [`Devtools`安装](https://devtools.vuejs.org/)
- 安装Stylelint插件，在VSCode settings中填下如下设置
  ```json
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "editor.codeActionsOnSave": {
      "source.fixAll.stylelint": true
  },
  "stylelint.validate": ["css", "postcss", "scss", "vue", "sass"],

## 部分工具介绍

- [Pinia](https://pinia.vuejs.org/)：状态管理，代替`Vuex`
- [Vue Router](https://router.vuejs.org/zh/index.html)：路由
- [`WindiCSS`英文文档(推荐)](https://windicss.org/) [中文文档](https://cn.windicss.org/)：CSS框架 配合[VSCode插件使用](https://marketplace.visualstudio.com/items?itemName=voorjaar.windicss-intellisense)
- [VueUse](https://vueuse.org/)：一组基于组合式API的实用函数
- [VueRequest](https://www.attojs.com/)：一个Vue请求库，可搭配`axios`使用
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

## 项目的本地运行及打包

- 开发环境：`yarn dev`/`npm run dev`
- 生产环境：
  - 打包：`yarn build`/`npm run build`
  - 打包完成后本地预览：`yarn preview`/`npm run preview`



