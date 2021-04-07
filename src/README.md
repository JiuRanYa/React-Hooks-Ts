# 一. 收藏点击自动触发 reloading 逻辑

使用 useProjects()方法获取了 Projects 的 data, 但是我们在点击收藏之后,向服务器发送了修改 Projects
的请求, data 没用自动更新, 此时我们期望有一个 reloading 方法,如果修改了 Projects, 调用 reloading 方法
重新更新外层的 Project 中的 data

- 1. 点击星星图标，发送 mutate 请求，mutate 调用了 run 方法修改 Projects 中的收藏字段(mutation)
- 2. 第一次使用 useProjects 加载 Projects 的时候, 将加载 Promise 的方法保存在 reloading 中
- 3. 后面调用 mutation 时, 直接执行 reloading 方法更新数据

初始化:

```
reloading: () => {}
```

第一次请求 Project 时调用, 保存了请求 Projects 的函数:

```
reloading: () => client(firstFetchProjects)
```

当调用 mutate 结束之后，重新加载 Projects

```
调用了reloading中保存的加载Projects的run(Promise)
```
