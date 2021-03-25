## 1. 使用create-react-app创建Ts项目
```
npx create-react-app jira --template typescript
```
使用npx可以让我们直接使用npm中的包而不用下载到本地

然后进入项目目录jira
```
cd jira
```
## 2. 配置Typescript

在typescript.json中新增配置来避免相对路径
```
"baseUrl": "./src"
```

## 3. 配置Prettier格式化工具
### 3.1 安装
```
yarn add --dev --exact prettier

echo {}> .prettierrc.json

```
第二条命令会帮我们创建一个.prettierrc.json的配置文件

### 3.2 新增.prettierignore
写入以下内容
```
build
coverage
```
代表不需要格式化的文件

### 3.3 使用git提价代码时自动格式化
安装Pre-commit Hook
```
npx mrm lint-staged
```

检查package.json中，多了这样一段代码
```
"simple-git-hooks": {
    "pre-commit": "npx lint-staged"
},
"lint-staged": {
    "*.{js,css,md}": "prettier --write"
}
```

pre-commit是指在commit之前运行lint-staged去进行格式化

我们在lint-staged中增加匹配，因为我们是ts项目

```
"lint-staged": {
    "*.{js,css,md,ts,tsx}": "prettier --write"
}

```

### 3.4 如果使用了ESlint，则进行这一步
```
yarn add eslint-config-prettier -D
```

### 3.5 修改规则

在package中修改eslintConfig新增prettier,表示覆盖eslint规则

## 4. Mock数据解决方案

### 4.1 json-server来模拟数据 
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

### 4.2 新建__json_server_mock__文件夹

在文件夹中新建db.json

新建后写入想要的数据

比如

```json
{
    "user": []
}
```

### 4.3 增加scrpit命令

在package中增加script

```json
"json-server": "json-server --watch __json_server_mock__/db.json --port 3001"
```
### 4.4 运行监听
```
npm run json-server
```


## 5. 使用qs生成query语句
```
yarn add qs
```
```js
qs.stringfy()
```

## 6. 配置生成环境和上线环境
新增.env和.env.development文件，增加API地址

.env.development
```
REACT_APP_API_URL = http://localhost:3001
```

.env
```
REACT_APP_API_URL = http://online.com
```


