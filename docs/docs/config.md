配置
===

配置
----

### Config
<!--rehype:wrap-class=col-span-1 row-span-3-->

属性 | 说明
:- | :-
`maxNestedLevel` | 最大嵌套提取层数，`-1`表示允许无限嵌套，默认最大100层
`fields` | 提取器配置
`export` | 导出器配置


### Field
<!--rehype:wrap-class=col-span-2-->

最核心的提取配置，由一个字典对象构成，键名为提取输出的字段名，值为`Query`提取配置

### Query
<!--rehype:wrap-class=col-span-2-->

提取查询表达式，可为`Typed Selector`、`Query Object`以及`CallbackSelector`。

### Typed Selector
<!--rehype:wrap-class=col-span-2-->

指各类可使用字符串形式书写出来的表达式，完整语法为：`type:expression`。
例如`css:div`等同于使用CSS 提取器使用`div`表达式提取信息，而`regex:<h1>(.*?)</h1>`则表示使用Regex 提取器使用`<h1>(.*?)</h1>`表达式提取信息。

### Query Object
<!--rehype:wrap-class=col-span-3-->

单个查询最完整的对象形式配置

属性 | 类型 | 说明
:- | :- | :-
`areaType` | `string` | 区域查询器类型
`area` | `Selector` | 区域查询表达式（支持`Typed Selector`），将查询限定在某个区域内执行
`type` | `string` | 查询器类型（既提取器的名字）
`selector` | `Selector` | 查询表达式（支持`Typed Selector`）
`fields` | `Field` | 嵌套查询
`repeated` | `boolean` | 是否重复字段
`recursive` | `boolean` | 是否嵌套字段
`callback` | `(field: any) => any` | 后置处理器，可用于将提取到的数据进一步处理
<!--rehype:className=show-header-->

### Selector
<!--rehype:wrap-class=col-span-3-->

```ts
type Selector = string | RegExp | CallbackSelector
```

### CallbackSelector
<!--rehype:wrap-class=col-span-3-->

提取回调，传入提取内容，自定义逻辑提取需要的信息


属性 | 说明
:- | :-
`name` | 使用的导出器名字
`其他` | 任意其他的自定义扩展属性

### 示例
<!--rehype:wrap-class=col-span-3-->

```ts
import { TextSelector } from '../src/Extractor/TextExtractor';
import { Config, Extractor } from '../src/Extractor';

const testContent = () => `
<div class="comments">
    <div class="comment level1">
        <p class="comment-author">张三</p>
        <p class="comment-time">2023-02-03 09:29:36</p>
        <p class="comment-content">我认为意大利面就应该拌42号混凝土，因为这个螺丝钉的长度，它很容易会直接影响到挖掘机的扭矩，你知道吧？你往里砸的时候，一瞬间它就会产生大量的高能蛋白，俗称UFO，会严重影响经济的发展，甚至对这个太平洋以及充电器都会造成一定的核污染。</p>
        <div class="comment level2">
            <p class="comment-author">张三</p>
            <p class="comment-time">2023-02-03 09:35:21</p>
            <p class="comment-content">滑稽</p>
        </div>
        <div class="comment level2">
            <p class="comment-author">李四</p>
            <p class="comment-time">2023-02-03 09:35:53</p>
            <p class="comment-content">6</p>
            <div class="comment level3">
                <p class="comment-author">张三</p>
                <p class="comment-time">2023-02-03 09:36:06</p>
                <p class="comment-content">6</p>
            </div>
        </div>
    </div>
    <div class="comment level1">
        <p class="comment-author">李四</p>
        <p class="comment-time">2023-02-03 09:29:49</p>
        <p class="comment-content">啊对对对</p>
        <div class="comment level2">
            <p class="comment-author">王五</p>
            <p class="comment-time">2023-02-03 09:29:54</p>
            <p class="comment-content">啊对对对</p>
        </div>
    </div>
    <div class="comment level1">
        <p class="comment-author">赵六</p>
        <p class="comment-time">2023-02-03 09:30:28</p>
        <p class="comment-content">只因</p>
    </div>
</div>
`;

const config: Config = {
    maxNestedLevel: -1,

    fields: {
       'css_comments': {
            area: 'css:.comments',
            selector: 'css:.>div',
            fields: {
                author: 'p.comment-author',
                time: 'p.comment-time',
                content: 'p.comment-content',
            },
            repeated: true,
            recursive: true,
        },
        'xpath_comments': {
            area: 'xpath:div[contains(@class, "comments")]',
            selector: 'xpath:./div',
            fields: {
                author: 'p.comment-author',
                time: 'p.comment-time',
                content: 'p.comment-content',
            },
            repeated: true,
            recursive: true,
        },
        'xpath_text_comments': {
            area: 'xpath:div[contains(@class, "comments")]',
            selector: 'xpath:./div',
            fields: {
                author: 'text:(<p class="comment-author">,</p>)',
                time: 'text:(<p class="comment-time">,</p>)',
                content: 'text:(<p class="comment-content">,</p>)',
            },
            repeated: true,
            recursive: true,
        },
        'text_comments': {
            area: 'xpath:div[contains(@class, "comments")]',
            selector: 'xpath:./div',
            fields: {
                author: {
                    type: 'text',
                    selector: <any><TextSelector>{
                        leftSearch: '<p class="comment-author">',
                        rightSearch: '</p>',
                    },
                },
                time: {
                    type: 'text',
                    selector: <any><TextSelector>{
                        leftSearch: '<p class="comment-time">',
                        rightSearch: '</p>',
                        searchOptions: {
                            includeLeft: false,
                            includeRight: false,
                        },
                    },
                },
                content: {
                    type: 'text',
                    selector: <any><TextSelector>{
                        leftSearch: '<p class="comment-content">',
                        rightSearch: '</p>',
                        searchOptions: {
                            includeRight: false,
                        },
                    },
                },
            },
            repeated: true,
            recursive: true,
        },
    },

    export: { name: 'dump' },
};

const extractor = new Extractor(config);
const content = testContent();
const data = extractor.extract(content);
extractor.export(data);
```

#### 输出

```json
{
    "css_comments": [
        {
            "author": "张三",
            "time": "2023-02-03 09:29:36",
            "content": "我认为意大利面就应该拌42号混凝土，因为这个螺丝钉的长度，它很容易会直接影响到挖掘机的扭矩，你知道吧？你往里砸的时候，一瞬间它就会产生大量的高能蛋白，俗称UFO，会严重影响经济的发展，甚至对这个太平洋以及充电器都会造成一定的核污染。",
            "css_comments": [
                {
                    "author": "张三",
                    "time": "2023-02-03 09:35:21",
                    "content": "滑稽"
                },
                {
                    "author": "李四",
                    "time": "2023-02-03 09:35:53",
                    "content": "6",
                    "css_comments": [
                        {
                            "author": "张三",
                            "time": "2023-02-03 09:36:06",
                            "content": "6"
                        }
                    ]
                }
            ]
        },
        {
            "author": "李四",
            "time": "2023-02-03 09:29:49",
            "content": "啊对对对",
            "css_comments": [
                {
                    "author": "王五",
                    "time": "2023-02-03 09:29:54",
                    "content": "啊对对对"
                }
            ]
        },
        {
            "author": "赵六",
            "time": "2023-02-03 09:30:28",
            "content": "只因"
        }
    ],
    "xpath_comments": [
        {
            "author": "张三",
            "time": "2023-02-03 09:29:36",
            "content": "我认为意大利面就应该拌42号混凝土，因为这个螺丝钉的长度，它很容易会直接影响到挖掘机的扭矩，你知道吧？你往里砸的时候，一瞬间它就会产生大量的高能蛋白，俗称UFO，会严重影响经济的发展，甚至对这个太平洋以及充电器都会造成一定的核污染。",
            "xpath_comments": [
                {
                    "author": "张三",
                    "time": "2023-02-03 09:35:21",
                    "content": "滑稽"
                },
                {
                    "author": "李四",
                    "time": "2023-02-03 09:35:53",
                    "content": "6",
                    "xpath_comments": [
                        {
                            "author": "张三",
                            "time": "2023-02-03 09:36:06",
                            "content": "6"
                        }
                    ]
                }
            ]
        },
        {
            "author": "李四",
            "time": "2023-02-03 09:29:49",
            "content": "啊对对对",
            "xpath_comments": [
                {
                    "author": "王五",
                    "time": "2023-02-03 09:29:54",
                    "content": "啊对对对"
                }
            ]
        },
        {
            "author": "赵六",
            "time": "2023-02-03 09:30:28",
            "content": "只因"
        }
    ],
    "xpath_text_comments": [
        {
            "author": "张三",
            "time": "2023-02-03 09:29:36",
            "content": "我认为意大利面就应该拌42号混凝土，因为这个螺丝钉的长度，它很容易会直接影响到挖掘机的扭矩，你知道吧？你往里砸的时候，一瞬间它就会产生大量的高能蛋白，俗称UFO，会严重影响经济的发展，甚至对这个太平洋以及充电器都会造成一定的核污染。",
            "xpath_text_comments": [
                {
                    "author": "张三",
                    "time": "2023-02-03 09:35:21",
                    "content": "滑稽"
                },
                {
                    "author": "李四",
                    "time": "2023-02-03 09:35:53",
                    "content": "6",
                    "xpath_text_comments": [
                        {
                            "author": "张三",
                            "time": "2023-02-03 09:36:06",
                            "content": "6"
                        }
                    ]
                }
            ]
        },
        {
            "author": "李四",
            "time": "2023-02-03 09:29:49",
            "content": "啊对对对",
            "xpath_text_comments": [
                {
                    "author": "王五",
                    "time": "2023-02-03 09:29:54",
                    "content": "啊对对对"
                }
            ]
        },
        {
            "author": "赵六",
            "time": "2023-02-03 09:30:28",
            "content": "只因"
        }
    ],
    "text_comments": [
        {
            "author": "张三",
            "time": "2023-02-03 09:29:36",
            "content": "我认为意大利面就应该拌42号混凝土，因为这个螺丝钉的长度，它很容易会直接影响到挖掘机的扭矩，你知道吧？你往里砸的时候，一瞬间它就会产生大量的高能蛋白，俗称UFO，会严重影响经济的发展，甚至对这个太平洋以及充电器都会造成一定的核污染。",
            "text_comments": [
                {
                    "author": "张三",
                    "time": "2023-02-03 09:35:21",
                    "content": "滑稽"
                },
                {
                    "author": "李四",
                    "time": "2023-02-03 09:35:53",
                    "content": "6",
                    "text_comments": [
                        {
                            "author": "张三",
                            "time": "2023-02-03 09:36:06",
                            "content": "6"
                        }
                    ]
                }
            ]
        },
        {
            "author": "李四",
            "time": "2023-02-03 09:29:49",
            "content": "啊对对对",
            "text_comments": [
                {
                    "author": "王五",
                    "time": "2023-02-03 09:29:54",
                    "content": "啊对对对"
                }
            ]
        },
        {
            "author": "赵六",
            "time": "2023-02-03 09:30:28",
            "content": "只因"
        }
    ]
}
```
