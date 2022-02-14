<h1 align="center">Welcome to vue-tpl 👋</h1>

## 安装

```sh
# 根目录安装项目依赖
npm install or yarn install
```

## 使用

```
# 本地运行
npm run dev or yarn dev

# 开启mock服务
npm run mock or yarn mock

# 项目打包
npm run build or yarn build


```

## 项目架构

该项目模板主要使用了 vue3 + vite 来搭建，配合 vue-router、pinia、vue-query 实现页面路由和状态管理等功能。由于项目中使用了 vue3 的相关生态而`vue3不支持IE11`，这意味着这个模板项目不适用于需要兼容 IE 的项目，适用于将会运行在现代浏览器的项目。 具体的功能和库的对照如下：

### 1. 项目中库的使用

`vue`: 负责页面渲染，使用当前默认版本 vue3；

`vue-router`: 负责页面路由；

`pinia`: 更轻量的 vue 状态管理器，语法简洁，对 typescript 支持度好；

`pinia-plugin-persistedstate`: 负责对 pinia 中的状态进行持久化，默认同步到 local storage；

`vue-query`: 负责管理服务端状态，保证页面数据与服务端状态的同步；

`vite + @vitejs/plugin-vue`: 负责开发环境的热更新，生产环境的打包，代替 webpack；

`json-server`: 负责项目中的前端数据 mock 服务；

`element-plus`: web 端的 UI 组件库，已配置按需引入和自动导入插件，支持主题色定制，定制主题色请修改`/src/common/css/element.scss`；

`axios`: 负责 ajax 请求；

`typescript`: 项目支持 typescript，支持类型校验；

`eslint + prettier`: 提供代码校验和代码格式化；

`tailwindcss`: css 库，提供了许多原子化的 css 类，大大减少写 css 代码的时间，本项目中使用了最新版本，添加自定义原子类或者添加变体请修改`/src/common/css/tailwind.css`；

### 2. 项目中已实现的功能

#### 1. 状态管理

在阐述项目中的状态管理架构之前，先说明一下对于项目中状态的区分。
首先，我们都知道项目中的状态可以笼统分为两种，一种是在组件和页面中的内部状态，一种是存储在全局的`全局状态`，其中`全局状态`可以在组件、页面中自由引用，一般我们用状态管理器来管理全局状态，如 vuex、pinia 等。

`全局状态`通常包括一些页面、组件间共享的状态，这些状态是静态的，称为`客户端状态`，`客户端状态`通常存储在状态管理器中；存储的一些来自于服务器的状态称为`服务端状态`，`服务器状态`通常是动态的，客户端很难确保存储在客户端的状态和服务端是同步的。

通常，我们会把`服务端状态`也存储到状态管理器中，但是`服务端状态`通常并不是由一个客户端控制的，比如：读者正在阅读一篇文章，如果在阅读过程中作者更新了这篇文章，如果读者不刷新读的还会是更新前的内容。由于客户端存储的`服务器状态`很难保证与服务器实时的数据保持同步，所以这里需要专门的工具来帮助我们管理`服务器状态`。

目前，已知的提供服务器状态管理的 react 库包括：react-query、swr、apollo client、RTK-Query 等，其中最火热的的就是 react- query。而 vue-query 是 react-query 的 vue3 版本，概念和用法上基本一致。在熟悉使用 react-query 的基础上，对照着 vue-query 文档即可。值得注意的就是在`query-keys`这一节，由于 vue 的响应式的原理，可变的参数需要是`ref`或者`computed`从而保持响应性，使得参数变化时 vue-query 回自动更新状态。
文档地址：[https://vue-query.vercel.app/#/guides/query-keys](https://vue-query.vercel.app/#/guides/query-keys)

1. vue-query 官方文档：[https://vue-query.vercel.app/#/](https://vue-query.vercel.app/#/)
2. react-query 中文文档：[https://cangsdarm.github.io/react-query-web-i18n/](https://cangsdarm.github.io/react-query-web-i18n/)
3. react-query 英文文档：[https://react-query.tanstack.com/overview](https://react-query.tanstack.com/overview)
4. 视频教程（youtube）: [https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2](https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2)
5. react-query 作者介绍 react-query(youtube): [https://www.youtube.com/watch?v=seU46c6Jz7E](https://www.youtube.com/watch?v=seU46c6Jz7E)

综上所述，在本项目中，使用 pinia 来管理`客户端状态`，主要处理一些页面、组件间共享的状态，vue-query 处理`服务端状态`（不强制要求）。

#### 2. mock 数据服务

项目中的 mock 数据服务使用`json-server`提供，使用它可以开启一个本地持久化的数据 mock 服务，简单来说就是对数据的增删改都会实际地更新数据。
相关代码在项目的`/src/mock`目录下，在里面定义相关的示例代码和 README 文档（`/src/mock/README.md`），项目中`/src/pages`目录下示例代码也是使用 mock 服务做了数据的增删改查，里面也包含了相关的用法，建议查阅 README 文档同时参考示例代码。
json-server 启动的 mock 服务完全遵循 restful api 的规则。

如有需要，也可以参考官方文档。
json-server 文档：[https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)

#### 3. 使用 tailwind css

项目引用了`tailwind css`这个 css 库来减少开发者编写 css 代码工作量。
当然，使用它也存在着一定的学习成本，但一旦入门将大大提升开发者编写样式代码的效率。学习推荐官方视频教程，即可完全入门，推荐学习下方的第一个视频教程并将教程中的代码实现一次。下方介绍 tailwindcss3.0 的视频教程，可以根据需要学习，3.0 完全兼容 2.0 并提供了一些新功能，尤其是 JIT 编译效率的提升。
下面是官方文档和推荐的官方视频教程：

1. 中文文档(2.x 版本)：[https://www.tailwindcss.cn/docs](https://www.tailwindcss.cn/docs)
2. 英文文档(最新版，3.x 版本)：[https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)
3. 视频教程(总时长 90 分钟左右)： [https://www.youtube.com/watch?v=elgqxmdVms8&list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0](https://www.youtube.com/watch?v=elgqxmdVms8&list=PL5f_mz_zU5eXWYDXHUDOLBE0scnuJofO0)
4. tailwindcss3.0 新功能视频教程(总时长 26 分钟左右)： [What's new in Tailwind CSS v3.0?](https://www.youtube.com/watch?v=mSC6GwizOag)

同理，使用 tailwind css 提供的原子类，可以大大减少我们写 css class 的代码，但并不意味着我们完全不写 css （大多数情况下还真不用写 css）。对于特性的 css 样式，也可以使用自定义的 class。工具是用来服务人提升效率的，请灵活使用。

## Author

👤 **programmermark**
