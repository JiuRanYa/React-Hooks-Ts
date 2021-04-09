## 1. 使用 create-react-app 创建 Ts 项目

```
npx create-react-app jira --template typescript
```

使用 npx 可以让我们直接使用 npm 中的包而不用下载到本地

然后进入项目目录 jira

```
cd jira
```

## 2. 配置 Typescript

在 typescript.json 中新增配置来避免相对路径

```
"baseUrl": "./src"
```

## 3. 配置 Prettier 格式化工具

### 3.1 安装

```
yarn add --dev --exact prettier

echo {}> .prettierrc.json

```

第二条命令会帮我们创建一个.prettierrc.json 的配置文件

### 3.2 新增.prettierignore

写入以下内容

```
build
coverage
```

代表不需要格式化的文件

### 3.3 使用 git 提价代码时自动格式化

安装 Pre-commit Hook

```
npx mrm lint-staged
```

检查 package.json 中，多了这样一段代码

```
"simple-git-hooks": {
    "pre-commit": "npx lint-staged"
},
"lint-staged": {
    "*.{js,css,md}": "prettier --write"
}
```

pre-commit 是指在 commit 之前运行 lint-staged 去进行格式化

我们在 lint-staged 中增加匹配，因为我们是 ts 项目

```
"lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
}

```

### 3.4 如果使用了 ESlint，则进行这一步

```
yarn add eslint-config-prettier -D
```

### 3.5 修改规则

在 package 中修改 eslintConfig 新增 prettier,表示覆盖 eslint 规则

## 4. Mock 数据解决方案

### 4.1 json-server 来模拟数据

先运行

```
npm i json -server -g
```

然后运行

```
npm i json-server -D

or

yarn add json-server -D
```

### 4.2 新建**json_server_mock**文件夹

在文件夹中新建 db.json

新建后写入想要的数据

比如

```json
{
  "user": []
}
```

### 4.3 增加 scrpit 命令

在 package 中增加 script

```json
"json-server": "json-server --watch __json_server_mock__/db.json --port 3001"
```

### 4.4 运行监听

```
npm run json-server
```

## 5. 使用 qs 生成 query 语句

```
yarn add qs
```

```js
qs.stringfy();
```

## 6. 配置生成环境和上线环境

新增.env 和.env.development 文件，增加 API 地址

.env.development

```
REACT_APP_API_URL = http://localhost:3001
```

.env

```
REACT_APP_API_URL = http://online.com
```

## 7. 引入 antd 的 less 文件，并且覆盖默认样式的颜色

### 7.1 引入 craco

```
yarn add @craco/craco
```

### 7.2 在 package.json 文件中替换

```
"start": "craco start",
"build": "craco build",
"test": "craco test",
```

### 7.3 在根目录新建 craco.config.js

```js
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

## 8.css in js 解决方案： Emotion

```
yarn add @emotion/react @emotion/styled
```

## 9. 日期处理库 dayjs

```
yarn add dayjs
```

## 10. 路由处理react-router@6.x.x

```
yarn add react-router@6 react-router-dom@6 history
```

## 11. 无线循环库：why-did-you-render

```
yarn add @welldone-software/why-did-you-render
```

### 11.1 在 src 下新建 wdyr.ts

### 11.2 在 index.tsx 下引入 wdyr.ts,并且改配置为 false(默认为跟踪全部组件)

### 11.3 如果想要跟踪某个组件，则输入下面的配置信息

```
ProjectListScreen.whyDidYouRender = true
```

### 12.redux-toolkit

```
yarn add react-redux @reduxjs/toolkit
```

### 13. immutable state library : Immer

### 14. React-query 缓存更新数据库

```

```
