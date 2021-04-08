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

# 二. 如何解决 prop drilling 问题, 合理使用 Component Composition

- 我们 authenticated-app 使用状态提升定义了一个公共的 prop, 并把它层层传递给了子组件
- 缺点一: state definition is far away the place where the state is being used 高耦合
- 缺点二: 我们这里使用状态提升定义了一个公共的 prop, 并把它层层传递给了子组件，(下钻)

Component Composition 把公共的 JSX.Element 当作变量传递给了子组件

- 可以将 state 和子组件解耦合,子组件不再依赖父组件中传入的更改 state 的函数
- 无需在 interface 层层更改 state 定义

Component Composition 实际上也是一种状态提升的手段，并不是适合每个场景，因为这样可能会让父组件变得更加复杂

这种对组件的`控制反转`减少了应用中传递的 props 数量，使代码更加干净，对根组件把控更深，特别是当我们使用 Ts 来进行类型控制的时候，中间传递者再也不需要考虑 props 如何消费，只负责传递即可

那么我们来看看什么是`控制反转`

# 三. 控制反转,合理使用进行代码解耦合

如果我们有个 car 类, 需要使用到 engine(引擎)和 tires(轮胎)

```js
import engine from "engine";
import tires from "tires";

class Car {
  constructor() {
    this.engine = new engine();
    this.tires = tires.getInstance();
  }
}
```

可以看到，engine 是通过 new 创建实例的，而 tires 是通过工厂模式的 getInstance 获取实例的,这样会有什么坏处呢

car 与 engine 和 tires 获取实例的方法高度耦合，倘如我们更改了 tires 获取实例的办法，那么需要找到使用了 tires 的地方全部进行修改

此时我们可以定义一个容器

```js
import engine from "engine";
import tires from "tires";
import Container from "contanier";

// 充当中间人
const container = new Container();
container.bind("engine", engine);
container.bind("tires", tires);

class Car {
  constructor() {
    // 只需关注中间人传过来的值即可
    this.engine = container.get("engine");
    this.tires = container.get("tires");
  }
}
```

这样我们就利用 container 实现了解耦合

其实上面的 Component Composition 也是控制反转的一种设计模式

# 四. 使用 Typescript 中的 as const

# 五. Custom Hook tips

- 如果我们在 Custom hooks 中要 return 函数，最好给他加上 useCallback 来避免不必要的渲染

- 当 hook 中有多个 state, 并且这些 state 是互相影响的, 就可以把它合并为一个 state

```ts
const [past, setPast] = useState<T[]>([]);
const [present, setPresent] = useState(initialPresent);
const [future, setFuture] = useState<T[]>([]);
```

↓

```ts
const [state, setState] = useState<{
  past: T[];
  present: T;
  future: T[];
}>({
  past: [],
  present: initialPresent,
  future: [],
});
```
