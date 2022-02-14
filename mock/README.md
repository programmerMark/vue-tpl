### mock 数据使用说明

#### 一、用法

项目根目录下运行 `yarn mock` 或者`npm run mock`，将启动 mock 数据服务，mock 服务会监听同级目录下的 `db.json` 文件并生成一个 mock 服务。

#### 二、用法示例

1. 在 db.json 文件中添加一个对象或者对象数组，如：

```
"locations": [
    {
        "id": "1001",
        "province": "广东省",
        "city": "深圳市",
        "county": "南山区",
        "address": "金地威新软件科技园二栋"
    },
    {
        "id": "1002",
        "province": "湖北省",
        "city": "武汉市",
        "county": "洪山区",
        "address": "花城大道武汉软件新城A栋B座3楼"
    },
]
```

2. 由于 mock 服务会监测 `db.json` 的变化，即使服务已启动后手动新增数据也会生效，此时在项目可以通过`/api/locations`请求到新增的 mock 数据，返回新增的数据；根据 restful api 数据的规则，也可以通过下列方式请求到相应的数据：

请求 url： /api/locations
得到`locations`对象下的所有数据，返回：

```
[
    {
        "id": "1001",
        "province": "广东省",
        "city": "深圳市",
        "county": "南山区",
        "address": "金地威新软件科技园二栋"
    },
    {
        "id": "1002",
        "province": "湖北省",
        "city": "武汉市",
        "county": "洪山区",
        "address": "花城大道武汉软件新城A栋B座3楼"
    },
]
```

请求 url： /api/locations/1001
返回`id=1001`的那一条数据：

```
{
    "id": "1001",
    "province": "广东省",
    "city": "深圳市",
    "county": "南山区",
    "address": "金地威新软件科技园二栋"
},

```

请求 url： /api/locations?city=深圳市
返回`id=1001`的那一条数据：

```
{
    "id": "1001",
    "province": "广东省",
    "city": "深圳市",
    "county": "南山区",
    "address": "金地威新软件科技园二栋"
}

```

插入一条数据，请求 url：/api/locations，
请求数据：

```
{
    "province": "广东省",
    "city": "深圳市",
    "county": "南山区",
    "address": "金地威新软件科技园二栋1"
}

```

注意，mock 数据默认以 id 字段为唯一标识，id 不可以重复，所以插入数据时不应当插入 id，mock 服务会自动生成一个不相同的随机 id，如果插入 id 而且 db.json 中存在相同的 id 的数据，就会报错。

返回（注：下方返回结果中的随机 id 是示例，实际使用者返回的 id 不一定是这个值）：

```
{
    "id": "9a_eCS8",
    "province": "广东省",
    "city": "深圳市",
    "county": "南山区",
    "address": "金地威新软件科技园二栋1"
}

```

删除一条数据，请求 url：/api/locations/1001，method：delete
返回，删除成功，返回结果为空：

```
{

}

```

#### 三、重写默认路由

mock 服务的默认路由规则遵循 restful api，如果需要修改默认的路由规则，可以在同级目录下的`routes.json`下修改。

`routers.json`默认内容为：

```
{
  "/mock/*": "/$1",
  "/man/:name": "/persons?name=:name",
  "/man?id=:id": "/persons/:id"
}
```

左侧为自定义的规则，右侧为 mock 服务默认支持的规则。规则解读如下：

1. 第一行代码的意思是，把`/mock`开头的路由转化为不需要`/mock`开头的服务；
2. 第二行是把`/man/:name`, 如：`/mock/man/赵子龙`的请求转化为`/persons?name=赵子龙`的实际请求；
3. 第三行是反过来，把`/man?id=:id`，如`/man?id=1001`转化为`/persons/1001`;

开发者可以自定义额外的路由规则，或者完全按照 restful api 的规则请求。

#### 四、注意和说明

1. 在根目录的配置文件`vite.config.ts`中配置了请求代理，把`/mock`开头的请求代理到本地服务的`http://127.0.0.1:4000`下的`/mock`请求，同时本地的 mock 服务启动的端口也是`http://127.0.0.1:4000`，所以代码中发出的请求为`/mock/man/赵子龙`会请求到 mock 服务下的`/persons?name=赵子龙`。

2. 修改本地代理服务（`vite.config.ts下的server`）的 mock 配置时，同时需要修改`package.json`中启动本地服务的相关命令，如：修改代理端口为 5000 时，需要同时修改`package.json`中`script`下的`mock`脚本。
