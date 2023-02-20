API
===

类型
----

### 主要类型
<!--rehype:wrap-class=col-span-3-->

```ts
type Dictionary<T = any> = {
    [index: string]: T,
}

type Config = {
    maxNestedLevel?: number;

    fields?: Field;

    export?: ExportConfig;
}

type ExportConfig = {
    name: string;
}

type Field = Dictionary<Query>

type Query = string | {
    areaType?: string,
    area?: Selector,
    type?: string,
    selector?: Selector,
    fields?: Field,
    repeated?: boolean,
    recursive?: boolean,
    callback?: ((field: any) => any),
} | CallbackSelector

type CallbackSelector<I = any, O = any> = (content: I) => O | O[]

type Selector = string | RegExp | CallbackSelector
```

### UrlMatch
<!--rehype:wrap-class=col-span-3-->

```ts
type UrlAbsoluteMatch = string

type UrlRegexMatch = RegExp

type UrlCallbackMatch = (url: string) => boolean

type UrlMatch = UrlAbsoluteMatch | UrlRegexMatch | UrlCallbackMatch
```

方法
-----

### Extractor<I, O>
<!--rehype:wrap-class=col-span-3-->

方法名 | 说明
:- | -
`registerExtractor(name: string, extractor: IExtractor): void`        | 注册一个提取器
`registerExporter(name: string, exporter: IExporter): void`           | 注册一个导出器
`findExtractor(name: string): IExtractor<any, I, O>`                  | 从已注册的提取器列表中获取指定名字的提取器
`findExporter(name: string): IExporter<O>`                            | 从已注册的导出器列表中获取指定名字的导出器
`findUrls(content: string): string[]`                                 | 使用`css:a[href] @href`选择器从`content`中提取出所有的`url`
`isUrlMatch(url: string, patterns: UrlMatch[]): boolean`              | 判断指定的`url`是否满足任一`UrlMatch`模式
`parseSelector(selector: string): { type: string, selector: string }` | 解析字符串形式的`TypedSelector`
`fetchSingleField(type: string, selector: any, content: I): O`        | 使用指定的选择器提取单个字段
`fetchRepeatedField(type: string, selector: any, content: I): O[]`    | 使用指定的选择器提取单个重复字段
`extract(content: I, fields?: Field): O`                              | 从`content`中提取多个字段
`export(data: O, name?: string): void`                                | 使用指定的或默认导出器导出数据
<!--rehype:className=show-header-->

### IExtractor<T, I, O>
<!--rehype:wrap-class=col-span-2-->

方法名 | 说明
:- | -
`extractOne(selector: T, content: I): O`   | 提取单个字段
`extractAll(selector: T, content: I): O[]` | 提取单个重复字段
<!--rehype:className=show-header-->

### Util
<!--rehype:wrap-class=row-span-2-->

方法名 | 说明
:- | -
`simpleCloneDeep<T>(data: T): T`         | 深拷贝（仅支持基本可序列化类型）
`isEmpty(obj: object \| any[]): boolean` | 判断`obj`是否为空数组或空对象
<!--rehype:className=show-header-->

### IExporter<T>
<!--rehype:wrap-class=col-span-2-->

方法名 | 说明
:- | -
`export(data: T, config: ExportConfig): void`   | 导出数据
<!--rehype:className=show-header-->
