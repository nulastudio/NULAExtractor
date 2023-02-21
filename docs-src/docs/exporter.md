导出器
===

导出器用于将提取器提取到的数据进一步地导出或存储

接口定义
--------

### IExporter
<!--rehype:wrap-class=col-span-3-->

```ts
interface IExporter<T> {
    export(data: T, config: ExportConfig): void;
}
```

内置导出器
--------

### DumpExporter
<!--rehype:wrap-class=col-span-3-->

`DumpExporter` 使用内置的 `JSON.stringify` 以及 `console.debug` 将其打印输出，方便调试查看数据。

#### 使用示例

```ts
import { Config, Extractor } from 'nula-extractor';

const content = `
<h1>这是标题</h1>
<author>LiesAuer</author>
<div id="content">test</div>
`;

const config: Config = {
    fields: {
        'title': 'css:h1',
        'author': 'css:author',
        'content': 'css:div#content',
    },

    export: { name: 'dump' },
};

const extractor = new Extractor(config);
const data = extractor.extract(content);
extractor.export(data);
```

#### 输出

```json
{
    "title": "这是标题",
    "author": "LiesAuer",
    "content": "test"
}
```

### NullExporter
<!--rehype:wrap-class=col-span-3-->

`NullExporter` 对数据不作任何导出处理。

自定义导出器
--------

### MyExporter
<!--rehype:wrap-class=col-span-3-->

通过编写自定义导出器可实现数据导出到数据库、文件等任意位置。

#### 示例

```ts
import * as fs from 'fs';
import { Config, ExportConfig, Extractor, IExporter } from 'nula-extractor';

const content = `
<h1>这是标题</h1>
<author>LiesAuer</author>
<div id="content">test</div>
`;

const config: Config = {
    fields: {
        'title': 'css:h1',
        'author': 'css:author',
        'content': 'css:div#content',
    },

    // 配置使用“toFile”自定义导出器，并导出数据到“article.json”
    export: <MyExportConfig>{
        name: 'toFile',
        file: 'article.json'
    },
};

// 定义自定义导出器配置类型，以便更好的语法提示
type MyExportConfig = {
    file: string,
} & ExportConfig

// 编写自定义导出器，实现导出数据到文件
class MyExporter<T = any> implements IExporter<T> {
    public export(data: T, config: MyExportConfig) {
        fs.writeFileSync(config.file, JSON.stringify(data));
    }
}

const extractor = new Extractor(config);

// 注册名为“toFile”的自定义导出器
extractor.registerExporter('toFile', new MyExporter());

const data = extractor.extract(content);
extractor.export(data);
```