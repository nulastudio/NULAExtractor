提取器
===

提取器用于使用特定的规则匹配提取数据

接口定义
--------

### IExtractor
<!--rehype:wrap-class=col-span-3-->

```ts
interface IExtractor<T, I, O> {
    extractOne(selector: T, content: I): O;
    extractAll(selector: T, content: I): O[];
}
```

内置提取器
--------

### CSSExtractor
<!--rehype:wrap-class=col-span-3-->

`CSSExtractor` 使用CSS选择器提取数据，底层使用`cheerio`库，由于`cheerio`和`jQuery`选择器的实现几乎是相同的，所以几乎所有的`jQuery`选择器都可直接使用。

由于CSS选择器是用于匹配元素的，无法用于提取元素的属性，因此`CSSExtractor`特意扩展了`@property`以及`@outerHTML`语法用于提取元素的属性，具体使用方法见示例。

#### 使用示例

```ts
import { CSSExtractor } from 'nula-extractor';

const html = `
<h1>这是标题</h1>
<author>LiesAuer</author>
<div id="meta">
    <div id="time" timestamp="1660392672">2022-08-13 20:11:12</div>
</div>
<div id="content">test</div>
`;

const extractor = new CSSExtractor();

const title = extractor.extractOne('h1', html);
const author = extractor.extractOne('author', html);

// 提取outerHTML内容
const timeHtml = extractor.extractOne('#time @outerHTML', html);
const date = extractor.extractOne('#time', timeHtml);
// 提取timestamp属性
const timestamp = extractor.extractOne('#time @timestamp', timeHtml);

const content = extractor.extractOne('div#content', html);

console.log(JSON.stringify({
    title,
    author,
    timeHtml,
    date,
    timestamp,
    content,
}, null, 4));
```

#### 输出

```json
{
    "title": "这是标题",
    "author": "LiesAuer",
    "timeHtml": "<div id=\"time\" timestamp=\"1660392672\">2022-08-13 20:11:12</div>",
    "date": "2022-08-13 20:11:12",
    "timestamp": "1660392672",
    "content": "test"
}
```

### XPathExtractor
<!--rehype:wrap-class=col-span-3-->

`XPathExtractor` 使用XPath选择器提取数据，底层使用`jsdom`以及`xpath-ts`库。

同CSS选择器，特意扩展了`@outerHTML`语法用于提取元素的`outerHTML`，而`@property`语法XPath已原生支持，具体使用方法见示例。

#### 使用示例

```ts
import { XPathExtractor } from 'nula-extractor';

const html = `
<h1>这是标题</h1>
<author>LiesAuer</author>
<div id="meta">
    <div id="time" timestamp="1660392672">2022-08-13 20:11:12</div>
</div>
<div id="content">test</div>
`;

const extractor = new XPathExtractor();

const title = extractor.extractOne('//h1', html);
const author = extractor.extractOne('//author', html);

// 提取outerHTML内容
const timeHtml = extractor.extractOne('//*[@id="time"]/@outerHTML', html) as string;
const date = extractor.extractOne('//*[@id="time"]', timeHtml);
// 提取timestamp属性
const timestamp = extractor.extractOne('//*[@id="time"]/@timestamp', timeHtml);

const content = extractor.extractOne('//div[@id="content"]', html);

console.log(JSON.stringify({
    title,
    author,
    timeHtml,
    date,
    timestamp,
    content,
}, null, 4));
```

#### 输出

```json
{
    "title": "这是标题",
    "author": "LiesAuer",
    "timeHtml": "<div id=\"time\" timestamp=\"1660392672\">2022-08-13 20:11:12</div>",
    "date": "2022-08-13 20:11:12",
    "timestamp": "1660392672",
    "content": "test"
}
```

### RegexExtractor
<!--rehype:wrap-class=col-span-3-->

`RegexExtractor` 使用Regex正则表达式提取数据。

#### 使用示例

```ts
import { RegexExtractor } from 'nula-extractor';

const html = `
<h1>这是标题</h1>
<author>LiesAuer</author>
<div id="meta">
    <div id="time" timestamp="1660392672">2022-08-13 20:11:12</div>
</div>
<div id="content">test</div>
`;

const extractor = new RegexExtractor();

const title = extractor.extractOne('<h1>(.*?)</h1>', html);
const author = extractor.extractOne('<author>(.*?)</author>', html);

const date = extractor.extractOne('<div id="time" timestamp="\\d+">(.*?)</div>', html);
const timestamp = extractor.extractOne('timestamp="(\\d+)"', html);

const content = extractor.extractOne('<div id="content">(.*?)</div>', html);

console.log(JSON.stringify({
    title,
    author,
    date,
    timestamp,
    content,
}, null, 4));
```

#### 输出

```json
{
    "title": "这是标题",
    "author": "LiesAuer",
    "date": "2022-08-13 20:11:12",
    "timestamp": "1660392672",
    "content": "test"
}
```

### JSONPathExtractor
<!--rehype:wrap-class=col-span-3-->

`JSONPathExtractor` 使用JSONPath表达式提取数据。

#### 使用示例

```ts
import { JSONPathExtractor } from 'nula-extractor';

const json = JSON.parse(`
{
    "title":"这是标题",
    "author":"LiesAuer",
    "time":"2022-08-13 20:11:12",
    "timestamp":"1660392672",
    "content":"test"
}
`);

const extractor = new JSONPathExtractor();

const title = extractor.extractOne('$.title', json);
const author = extractor.extractOne('$.author', json);

const date = extractor.extractOne('$.time', json);
const timestamp = extractor.extractOne('$.timestamp', json);

const content = extractor.extractOne('$.content', json);

console.log(JSON.stringify({
    title,
    author,
    date,
    timestamp,
    content,
}, null, 4));
```

#### 输出

```json
{
    "title": "这是标题",
    "author": "LiesAuer",
    "date": "2022-08-13 20:11:12",
    "timestamp": "1660392672",
    "content": "test"
}
```

### JMESPathExtractor
<!--rehype:wrap-class=col-span-3-->

`JMESPathExtractor` 使用JMESPath表达式提取数据，JMESPath表达式相比JSONPath表达式而言，拥有更多的高级语法，并且支持使用函数。

#### 使用示例

```ts
import { JMESPathExtractor } from 'nula-extractor';

const json = JSON.parse(`
{
    "title":"这是标题",
    "author":"LiesAuer",
    "time":"2022-08-13 20:11:12",
    "timestamp":"1660392672",
    "content":"test"
}
`);

const extractor = new JMESPathExtractor();

const title = extractor.extractOne('title', json);
const author = extractor.extractOne('author', json);

const date = extractor.extractOne('time', json);
const timestamp = extractor.extractOne('timestamp', json);

const content = extractor.extractOne('content', json);

console.log(JSON.stringify({
    title,
    author,
    date,
    timestamp,
    content,
}, null, 4));
```

#### 输出

```json
{
    "title": "这是标题",
    "author": "LiesAuer",
    "date": "2022-08-13 20:11:12",
    "timestamp": "1660392672",
    "content": "test"
}
```

### TextExtractor
<!--rehype:wrap-class=col-span-3-->

`TextExtractor` 非常巧妙的使用了数学上的区间符号`()`以及`[]`来提取数据，完整语法为`(左边文本,右边文本)`或`[左边文本,右边文本]`，其含义为提取符合`左边文本`以及`右边文本`的`中间文本`，`(`表示提取结果中不包含`左边文本`，`[`则包含，`)`表示提取结果中不包含`右边文本`，`]`则包含。

#### 使用示例

```ts
import { TextExtractor } from 'nula-extractor';

const html = `
<h1>这是标题</h1>
<author>LiesAuer</author>
<div id="meta">
    <div id="time">2022-08-13 20:11:12</div>
</div>
<div id="content">test</div>
`;

const extractor = new TextExtractor();

const title = extractor.extractOne('(<h1>,</h1>)', html);
const author = extractor.extractOne('(<author>,</author>)', html);

const date = extractor.extractOne('(<div id="time">,</div>)', html);

const content = extractor.extractOne('(<div id="content">,</div>)', html);

console.log(JSON.stringify({
    title,
    author,
    date,
    content,
}, null, 4));
```

#### 输出

```json
{
    "title": "这是标题",
    "author": "LiesAuer",
    "date": "2022-08-13 20:11:12",
    "content": "test"
}
```

### RawExtractor
<!--rehype:wrap-class=col-span-3-->

特殊用处，将要提取的内容原封不动的返回，不做任何提取动作。

自定义提取器
--------

### MyExtractor
<!--rehype:wrap-class=col-span-3-->

通过编写自定义提取器可扩展适用于自己的数据提取方式。
