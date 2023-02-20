选择器
===

列举`CSS`、`XPath`、`JSONPath`、`JMESPath`、`Regex`、`Text`等类型的常见选择器语法。

CSS 选择器
-----------

### 基础

选择器 | 说明
:- | :-
`*`          | 所有元素
`div`        | 所有 div 标签
`.class`     | 具有类的所有元素
`#id`        | 带 ID 的元素
`@outerHTML` | 元素的`outerHTML` ***[扩展语法]***
`@property`  | 元素的`property`属性 ***[扩展语法]***

### 组合器

选择器 | 说明
:- | :-
`div.class`      | 具有特定类名的 div
`div#id`         | 具有特定 ID 的 div
`div p`          | div 中的所有段落
`div > p`        | 父元素是 div 的 `P` 标签
`div + p`        | div 之后的第一个同级 `P` 标签
`div ~ p`        | div 之后所有的同级 `P` 标签
`div @outerHTML` | 获取 div 的`outerHTML` ***[扩展语法]***
`a @href`        | 获取 a 的`href`属性 ***[扩展语法]***

### 示例
<!--rehype:wrap-class=row-span-2-->

选择器 | 说明
:- | :-
`article > .post-title`
`.post-meta a[itemprop="name"]`
`.post-meta time`
`.post-meta li:nth-child(3) > a`
`.post-meta *[itemprop="interactionCount"]`
`a[itemprop="keywords"] > a`
`#comments > h3`
`#comments > .comment-list > li > .comment-author > *[itemprop="creator"]`
`#comments > .comment-list > li > .comment-meta > *[itemprop="commentTime"]`
`#comments > .comment-list > li > .comment-content`

### 属性选择器

选择器 | 说明
:- | :-
`a[target]`          | 带有`target`属性
`a[target="_blank"]` | 在新标签中打开
`a[href^="/index"]`  | 以`/index`开头
`[class\|="chair"]`  | 以`chair`开头
`[class*="chair"]`   | 包含`chair`
`[title~="chair"]`   | 包含单词`chair`
`a[href$=".doc"]`    | 以`.doc`结尾
`[type="button"]`    | 指定类型

### 伪类

选择器 | 说明
:- | :-
`p:first-child`         | 第一个子元素
`p:last-child`          | 最后一个子元素
`p:first-of-type`       | 第一个 p 类型的元素
`p:last-of-type`        | 某种类型的最后一个
`p:nth-child(2)`        | 第二个子元素
`p:nth-child(3n+2)`     | `nth-child(an + b)` 公式
`p:nth-last-child(2)`   | 倒数第二个子元素
`p:nth-of-type(2)`      | 此类型的第二个子元素
`p:nth-last-of-type(2)` | 此类型的倒数第二个子元素

另见
---------

- [Selectors | jQuery API Documentation](https://api.jquery.com/category/selectors/)


XPath 选择器
--------

### 后代选择器

| Xpath        | CSS          |
|--------------|--------------|
| `//h1`       | h1           |
| `//div//p`   | div p        |
| `//ul/li`    | ul > li      |
| `//ul/li/a`  | ul > li > a  |
| `//div/*`    | div > *      |
| `/`          | :root        |
| `/html/body` | :root > body |
<!--rehype:className=show-header-->

### 有序选择器

| Xpath               | CSS                  |
|---------------------|----------------------|
| `//ul/li[1]`        | ul > li:first-child  |
| `//ul/li[2]`        | ul > li:nth-child(2) |
| `//ul/li[last()]`   | ul > li:last-child   |
| `//li[@id="id"][1]` | li#id:first-child    |
| `//a[1]`            | a:first-child        |
| `//a[last()]`       | a:last-child         |
<!--rehype:className=show-header-->

### 兄弟姐妹选择器

| Xpath                                | CSS      |
|--------------------------------------|----------|
| `//h1/following-sibling::ul`         | h1 ~ ul  |
| `//h1/following-sibling::ul[1]`      | h1 + ul  |
| `//h1/following-sibling::[@id="id"]` | h1 ~ #id |
<!--rehype:className=show-header-->

### 属性选择器
<!--rehype:wrap-class=col-span-2 row-span-2-->

| Xpath                           | CSS                  |
|---------------------------------|----------------------|
| `//*[@id="id"]`                 | #id                  |
| `//*[@class="class"]`           | .class               |
| `//input[@type="submit"]`       | input[type="submit"] |
| `//a[@id="abc"][@for="xyz"]`    | a#abc[for="xyz"]     |
| `//a[@rel]`                     | a[rel]               |
| `//a[starts-with(@href, '/')]`  | a[href^='/']         |
| `//a[ends-with(@href, '.pdf')]` | a[href$='pdf']       |
| `//a[contains(@href, '://')]`   | a[href*='`:`//']     |
| `//a[contains(@rel, 'help')]`   | a[rel~='help']       |
<!--rehype:className=show-header-->

### 最有用的路径表达式
<!--rehype:wrap-class=row-span-3-->

| Xpath                            | CSS                        |
|----------------------------------|----------------------------|
`nodename` | 选择名称为 `nodename` 的所有节点
`/`  | 从根节点中选择
`//` | 从当前节点中选择文档中与选择匹配的节点，无论它们在哪里
`.`  | 选择当前节点
`..` | 选择当前节点的父节点
`@`  | 选择属性
<!--rehype:className=show-header-->

### 杂项选择器
<!--rehype:wrap-class=col-span-2-->

| Xpath                             | CSS                       |
|-----------------------------------|---------------------------|
| `//h1[not(@id)]`                  | h1:not([id])              |
| `//button[text()="Submit"]`       | 文字匹配 |
| `//button[contains(text(),"Go")]` | 文本包含（子字符串） |
| `//product[@price > 2.50]`        | 算术 |
| `//ul[*]`                         | 有孩子 |
| `//ul[li]`                        | 有孩子（具体） |
| `//a[@name or @href]`             | 或逻辑 |
| `//a \| //div`                    | 联合（加入结果） |
<!--rehype:className=show-header-->

### 运算符
<!--rehype:wrap-class=col-span-2-->

运算符 | 说明  | 示例
:- | - | -
`\|`  | 计算两个节点集 | `//book \| //cd`
`+`   | 添加 | `6 + 4`
`-`   | 减法 | `6 - 4`
`*`   | 乘法 | `6 * 4`
`div` | 分配 | `8 div 4`
`=`   | 平等的 | `price=9.80`
`!=`  | 不相等 | `price!=9.80`
`<`   | 小于   | `price<9.80`
`<=`  | 小于或等于 | `price<=9.80`
`>`   | 大于 | `price>9.80`
`>=`  | 大于或等于 | `price>=9.80`
`or`  | 或者 | `price=9.80` or `price=9.70`
`and` | 和 | `price>9.00` and `price<9.90`
`mod` | 模数（除法余数） | `5` mod `2`
<!--rehype:className=show-header-->

### 常用函数

函数 | 示例
:- | :-
`text()`        | `//a/text()`
`count()`       | `//table[count(tr)=1]`
`position()`    | `//ol/li[position()=2]`
`contains()`    | `font[contains(@class,"head")]`
`starts-with()` | `font[starts-with(@class,"head")]`
`ends-with()`   | `font[ends-with(@class,"head")]`
`not(expr)`     | `button[not(starts-with(text(),"Submit"))]`

另见
---------

- [Xpath cheatsheet](https://devhints.io/xpath)


JSONPath 选择器
-----------

### 基础

选择器 | 说明
:- | :-
`$`                | 根元素
`@`                | 当前元素
`.`                | 对象操作符
`[]`               | 数组操作符
`..`               | 从任意层级的元素开始
`*`                | 通配符，匹配任意对象或数组
`[,]`              | 联合操作符
`[start:end:step]` | 数组切片操作符
`?()`              | 筛选表达式
`()`               | 脚本表达式

### 运算符
<!--rehype:wrap-class=col-span-2-->

运算符 | 说明  | 示例
:- | - | -
`==`  | 等于 | `[?(@.color == 'blue')]`
`!=`   | 不等于 | `[?(@.color != 'red')]`
`<`   | 小于 | `[?(@.days < 30)]`
`<=`   | 小于或等于 | `[?(@.days <= 30)]`
`>` | 大于 | `[?(@.days > 30)]`
`>=`   | 大于或等于 | `[?(@.days >= 30)]`
`=~`  | 正则匹配 | `[?(@.firstName =~ /vi.*?/i)]`
`!`   | 非（取反）   | `[?(!@.isbn)]`
`&&`  | 逻辑与 | `[?(@.isbn && @.price < 10)]`
`\|\|`   | 逻辑或 | `[?(@.category == 'fiction' \|\| @.price < 10)]`
`in`  | 集合中是否存在元素 | `[?(@.size in ['S', 'M'])]`
`nin`  | 集合中是否不存在元素 | `[?(@.size nin ['S', 'M'])]`
`size` | 集合大小 | `[?(@.name size 12)]`
`empty true` | 空值 | `[?(@.isbn empty true)]`
`empty false` | 非空值 | `[?(@.isbn empty false)]`
<!--rehype:className=show-header-->

### 示例
<!--rehype:wrap-class=col-span-3-->

JSONPath | XPath | <br />
:- | :- | :-
`$.store.book[*].author`                      | `/store/book/author`
`$..author`                                   | `//author`
`$.store.*`                                   | `/store/*`
`$.store..price`                              | `/store//price`
`$..book[2]`                                  | `//book[3]`
`$..book[(@.length-1)]` <br /> `$..book[-1:]` | `//book[last()]`
`$..book[0,1]` <br /> `$..book[:2]`           | `//book[position()<3]`
`$..book[?(@.isbn)]`                          | `//book[isbn]`
`$..book[?(@.price<10)]`                      | `//book[price<10]`
`$..*`                                        | `//*`
<!--rehype:className=show-header-->

另见
---------

- [JSONPath Online Evaluator](http://jsonpath.com/)
- [JSONPath - XPath for JSON](https://goessner.net/articles/JsonPath/index.html#e2)
- [Writing JSONPath Expressions - Hevo Data](https://docs.hevodata.com/sources/engg-analytics/streaming/rest-api/writing-jsonpath-expressions/)


JMESPath 选择器
-----------

### 基础
<!--rehype:wrap-class=col-span-2-->

选择器 | 说明
:- | :-
`any`                                     | 任意对象中的`any`属性
`.`                                       | 对象操作符
`[]`                                      | 数组操作符
`@`                                       | 当前元素
`[,]`                                     | 联合操作符
`[start:end:step]`                        | 数组切片操作符
`*`                                       | 通配符，匹配任意对象或数组
`[?<expression><comparator><expression>]` | 筛选表达式

### 常用函数
<!--rehype:wrap-class=row-span-2-->

函数 | 示例
:- | :-
`abs()`
`avg()`
`ceil()`
`floor()`
`sum()`
`min()`
`max()`
`length()`
`contains()`
`starts_with()`
`ends_with()`
`not_null()`
`keys()`
`values()`
`min_by`
`max_by()`
`sort()`
`sort_by()`
`merge()`
`map()`
`join()`
`reverse()`
`to_array()`
`to_string()`
`to_number()`
`type()`

### 运算符
<!--rehype:wrap-class=col-span-2-->

运算符 | 说明
:- | -
`==`  | 等于
`!=`   | 不等于
`<`   | 小于
`<=`   | 小于或等于
`>` | 大于
`>=`   | 大于或等于
<!--rehype:className=show-header-->

另见
---------

- [JMESPath &mdash; JMESPath](https://jmespath.org/)
- [JMESPath Specification](https://jmespath.org/specification.html#jmespath-specification)

Regex 选择器
-----------

### 字符类

范例 | 说明
:-|-
`[abc]`       | 单个字符：`a`、`b` 或 `c`
`[^abc]`      | 一个字符，除了：`a`、`b` 或 `c`
`[a-z]`       | 范围内的字符：`a-z`
`[^a-z]`      | 不在范围内的字符：`a-z`
`[0-9]`       | 范围内的数字：`0-9`
`[a-zA-Z]`    | 范围内的字符：<br>`a-z` 或 `A-Z`
`[a-zA-Z0-9]` | 范围内的字符：<br>`a-z`、`A-Z` 或 `0-9`

### 量词

范例 | 说明
:-|-
`a?`      | 零个或一个`a`
`a*`      | 零个或多个 `a`
`a+`      | 一个或多个`a`
`[0-9]+`  | `0-9`中的一个或多个
`a{3}`    | 正好 `3` 个 `a`
`a{3,}`   | 3个或更多的`a`
`a{3,6}`  | `a` 的 `3` 到 `6` 之间
`a*`      | 贪心量词
`a*?`     | 惰性量词
`a*+`     | 占有量词

### 常用元字符

- \^
- \{
- \+
- \<
- \[
- \*
- \)
- \>
- \.
- \(
- \|
- \$
- \\
- \?
<!--rehype:className=cols-3 style-none-->

使用 `\` 转义这些特殊字符

### 元序列
<!--rehype:wrap-class=row-span-4-->

范例 | 说明
:-|-
`.`          | 任何单个字符
`\s`         | 任何空白字符
`\S`         | 任何非空白字符
`\d`         | 任何数字，与 `[0-9]` 相同
`\D`         | 任何非数字，与 `[^0-9]` 相同
`\w`         | 任何单词字符
`\W`         | 任何非单词字符
`\X`         | 任何 Unicode 序列，包括换行符
`\C`         | 匹配一个数据单元
`\R`         | Unicode 换行符
`\v`         | 垂直空白字符
`\V`         | `\v` 的否定 - 除了换行符和垂直制表符之外的任何内容
`\h`         | 水平空白字符
`\H`         | `\h` 的否定
`\K`         | 重置匹配
`\n`         | 匹配第 `n` 个子模式
`\pX`        | `Unicode` 属性 `X`
`\p{...}`    | `Unicode` 属性或脚本类别
`\PX`        | `\pX` 的否定
`\P{...}`    | `\p` 的否定
`\Q...\E`    | 引用;视为文字
`\k<name>`   | 匹配子模式`name`
`\k'name'`   | 匹配子模式`name`
`\k{name}`   | 匹配子模式`name`
`\gn`        | 匹配第 n 个子模式
`\g{n}`      | 匹配第 n 个子模式
`\g<n>`      | 递归第 n 个捕获组
`\g'n'`      | 递归第 n 个捕获组。
`\g{-n}`     | 匹配第 n 个相对前一个子模式
`\g<+n>`     | 递归第 n 个相对即将到来的子模式
`\g'+n'`     | 匹配第 n 个相对即将到来的子模式
`\g'letter'` | 递归命名捕获组 `字母`
`\g{letter}` | 匹配先前命名的捕获组 `字母`
`\g<letter>` | 递归命名捕获组 `字母`
`\xYY`       | 十六进制字符 `YY`
`\x{YYYY}`   | 十六进制字符 `YYYY`
`\ddd`       | 八进制字符`ddd`
`\cY`        | 控制字符 `Y`
`[\b]`       | 退格字符
`\`          | 使任何字符文字

### 锚点

范例 | 说明
:-|-
`\G`    | 比赛开始
`^`     | 字符串的开始
`$`     | 字符串结束
`\A`    | 字符串的开始
`\Z`    | 字符串结束
`\z`    | 字符串的绝对结尾
`\b`    | 一个词的边界
`\B`    | 非单词边界

### 替代

范例 | 说明
:-|-
`\0`       | 完整的比赛内容
`\1`       | 捕获组 `1` 中的内容
`$1`       | 捕获组 `1` 中的内容
`${foo}`   | 捕获组 `foo` 中的内容
`\x20`     | 十六进制替换值
`\x{06fa}` | 十六进制替换值
`\t`       | 标签
`\r`       | 回车
`\n`       | 新队
`\f`       | 换页
`\U`       | 大写转换
`\L`       | 小写转换
`\E`       | 终止任何转换

### 组构造

范例 | 说明
:-|-
`(...)`           | 捕获所有封闭的东西
`(a\|b)`          | 匹配 `a` 或 `b`
`(?:...)`         | 匹配随附的所有内容
`(?>...)`         | 原子组（非捕获）
`(?\|...)`        | 重复的子模式组号
`(?#...)`         | 注解
`(?'name'...)`    | 命名捕获组
`(?<name>...)`    | 命名捕获组
`(?P<name>...)`   | 命名捕获组
`(?imsxXU)`       | 内联修饰符
`(?(DEFINE)...)`  | 在使用它们之前预定义模式

### 断言

:-|-
:-|-
`(?(1)yes\|no)`      | 条件语句
`(?(R)yes\|no)`      | 条件语句
`(?(R#)yes\|no)`     | 递归条件语句
`(?(R&name)yes\|no)` | 条件语句
`(?(?=...)yes\|no)`  | 有条件的前瞻
`(?(?<=...)yes\|no)` | 有条件的往后看

### 递归

:-|-
:-|-
`(?R)`      | 递归整个模式
`(?1)`      | 递归第一个子模式
`(?+1)`     | 递归第一个相对子模式
`(?&name)`  | 递归子模式`name`
`(?P=name)` | 匹配子模式`name`
`(?P>name)` | 递归子模式`name`

### 标志/修饰符

:-|-
:-|-
`g`   | 全部
`m`   | 多行
`i`   | 不区分大小写
`x`   | 忽略空格
`s`   | 单线
`u`   | 统一码
`X`   | 扩展
`U`   | 不贪心
`A`   | 锚
`J`   | 重复的组名
`d`   | 结果包含捕获组子字符串开始和结束的索引

### 零宽度断言

:-|-
:-|-
`(?=...)`  | 正先行断言
`(?!...)`  | 负先行断言
`(?<=...)` | 正后发断言
`(?<!...)` | 负后发断言
`?=`|正先行断言-存在
`?!`|负先行断言-排除
`?<=`|正后发断言-存在
`?<!`|负后发断言-排除

零宽度断言 允许您在主模式之前（向后看）或之后（lookahead）匹配一个组，而不会将其包含在结果中。

### POSIX 字符类
<!--rehype:wrap-class=col-span-2-->

字符类 | 如同 | 意义
:-|-|-
| `[[:alnum:]]`   | `[0-9A-Za-z]`                                     | 字母和数字
| `[[:alpha:]]`   | `[A-Za-z]`                                        | 字母
| `[[:ascii:]]`   | `[\x00-\x7F]`                                     | ASCII 码 0-127
| `[[:blank:]]`   | `[\t ]`                                           | 仅空格或制表符
| `[[:cntrl:]]`   | `[\x00-\x1F\x7F]`                                 | 控制字符
| `[[:digit:]]`   | `[0-9]`                                           | 十进制数字
| `[[:graph:]]`   | `[[:alnum:][:punct:]]`                            | 可见字符（不是空格）
| `[[:lower:]]`   | `[a-z]`                                           | 小写字母
| `[[:print:]]`   | `[ -~] == [ [:graph:]]`                           | 可见字符
| `[[:punct:]]`   | <code>[!"#$%&’()*+,-./:;<=>?@[]^_\`{\|}~]</code>  | 可见标点符号
| `[[:space:]]`   | <code>[\t\n\v\f\r ]</code>                        | 空白
| `[[:upper:]]`   | `[A-Z]`                                           | 大写字母
| `[[:word:]]`    | `[0-9A-Za-z_]`                                    | 单词字符
| `[[:xdigit:]]`  | `[0-9A-Fa-f]`                                     | 十六进制数字
| `[[:<:]]`       | `[\b(?=\w)]`                                      | 词的开头
| `[[:>:]]`       | `[\b(?<=\w)]`                                     | 词尾
<!--rehype:className=show-header-->

### 控制动词

:-|-
:-|-
`(*ACCEPT)`            | 控制动词
`(*FAIL)`              | 控制动词
`(*MARK:NAME)`         | 控制动词
`(*COMMIT)`            | 控制动词
`(*PRUNE)`             | 控制动词
`(*SKIP)`              | 控制动词
`(*THEN)`              | 控制动词
`(*UTF)`               | 图案修饰符
`(*UTF8)`              | 图案修饰符
`(*UTF16)`             | 图案修饰符
`(*UTF32)`             | 图案修饰符
`(*UCP)`               | 图案修饰符
`(*CR)`                | 换行修饰符
`(*LF)`                | 换行修饰符
`(*CRLF)`              | 换行修饰符
`(*ANYCRLF)`           | 换行修饰符
`(*ANY)`               | 换行修饰符
`\R`                   | 换行修饰符
`(*BSR_ANYCRLF)`       | 换行修饰符
`(*BSR_UNICODE)`       | 换行修饰符
`(*LIMIT_MATCH=x)`     | 正则表达式引擎修饰符
`(*LIMIT_RECURSION=d)` | 正则表达式引擎修饰符
`(*NO_AUTO_POSSESS)`   | 正则表达式引擎修饰符
`(*NO_START_OPT)`      | 正则表达式引擎修饰符

正则表达式示例
--------------

### 字符串

范例 | 说明
:-|-
`ring` | 匹配 <yel>ring</yel> sp<yel>ring</yel>board 等。
`.` | 匹配 <yel>a</yel>、<yel>9</yel>、<yel>+</yel> 等。
`h.o` | 匹配 <yel>hoo</yel>、<yel>h2o</yel>、<yel>h/o</yel> 等。
`ring\?` | 匹配 <yel>ring?</yel>
`\(quiet\)` | 匹配<yel>（安静）</yel>
`c:\\windows` | 匹配 <yel>c:\windows</yel>

使用 `\` 搜索这些特殊字符：<br> `[ \ ^ $ . | ? * + ( ) { }`

### 速记类

范例 | 说明
:-|-
`\w` | “单词”字符 <br> _(字母、数字或下划线)_
`\d` | 数字
`\s` | 空格 <br> _(空格、制表符、vtab、换行符)_
`\W, \D, or \S` | 不是单词、数字或空格
`[\D\S]` | 表示不是数字或空格，两者都匹配
`[^\d\s]` | 禁止数字和空格

### 出现次数

范例 | 说明
:-|-
`colou?r`           | 匹配 <yel>color</yel> 或 <yel>colour</yel>
`[BW]ill[ieamy's]*` | 匹配 <yel>Bill</yel>、<yel>Willy</yel>、<yel>William's</yel> 等。
`[a-zA-Z]+`         | 匹配 1 个或多个字母
`\d{3}-\d{2}-\d{4}` | 匹配 SSN
`[a-z]\w{1,7}`      | 匹配 UW NetID

### 备择方案

范例 | 说明
:-|-
`cat\|dog` | 匹配 <yel>cat</yel> 或 <yel>dog</yel>
`id\|identity` | 匹配 <yel>id</yel> 或 <yel>id</yel>entity
`identity\|id` | 匹配 <yel>id</yel> 或 <yel>identity</yel>

当替代品重叠时，命令从长到短

### 字符类

范例 | 说明
:-|-
`[aeiou]`     | 匹配任何元音
`[^aeiou]`    | 匹配一个非元音
`r[iau]ng`    | 匹配<yel>ring</yel>、w<yel>rang</yel>le、sp<yel>rung</yel>等。
`gr[ae]y`     | 匹配 <yel>gray</yel> 或 <yel>grey</yel>
`[a-zA-Z0-9]` | 匹配任何字母或数字

在 `[ ]` 中总是转义 `. \ ]` 有时是 `^ - .`

### 贪婪与懒惰

范例 | 说明
:-|-
`*  + {n,}`<br>_greedy_  | 尽可能匹配
`<.+>`                | 在 <yel>\<b>bold\<\/b></yel> 中找到 1 个大匹配项
`*?  +? {n,}?`<br>_lazy_ | 尽可能少匹配
`<.+?>`                  | 在 \<<yel>b</yel>>bold\<<yel>\/b</yel>> 中找到 2 个匹配项

### 范围
<!--rehype:wrap-class=col-span-2-->

范例 | 说明
:-|-
`\b` | “单词”边缘（非“单词”字符旁边）
`\bring` | 单词以“ring”开头，例如 <yel>ringtone</yel>
`ring\b` | 单词以“ring”结尾，例如 <yel>spring</yel>
`\b9\b` | 匹配单个数字 <yel>9</yel>，而不是 19、91、99 等。
`\b[a-zA-Z]{6}\b` | 匹配 6 个字母的单词
`\B` | 不是字边
`\Bring\B` | 匹配 <yel>springs</yel> 和 <yel>wringer</yel>
`^\d*$` | 整个字符串必须是数字
`^[a-zA-Z]{4,20}$` | 字符串必须有 4-20 个字母
`^[A-Z]` | 字符串必须以大写字母开头
`[\.!?"')]$` | 字符串必须以终端标点结尾

### 修饰

范例 | 说明
:-|-
`(?i)`[a-z]*`(?-i)` | 忽略大小写开/关
`(?s)`.*`(?-s)`     | 匹配多行（导致 . 匹配换行符）
`(?m)`^.*;$`(?-m)`  | <yel>^</yel> & <yel>$</yel> 匹配行不是整个字符串
`(?x)`              | #free-spacing 模式，此 EOL 注释被忽略
`(?-x)`             | 自由空间模式关闭
/regex/`ismx`       | 修改整个字符串的模式

### 组

范例 | 说明
:-|-
`(in\|out)put` | 匹配 <yel>input</yel> 或 <yel>output</yel>
`\d{5}(-\d{4})?` | 美国邮政编码 _(“+ 4”可选)_

如果组后匹配失败，解析器会尝试每个替代方案。
<br>
可能导致灾难性的回溯。

### 反向引用

范例 | 说明
:-|-
`(to) (be) or not \1 \2` | 匹配 <yel>to be or not to be</yel>
`([^\s])\1{2}`           | 匹配非空格，然后再相同两次 &nbsp; <yel>aaa</yel>, <yel>...</yel>
`\b(\w+)\s+\1\b`         | 匹配双字

### 非捕获组

范例 | 说明
:-|-
`on(?:click\|load)` | 快于：`on(click\|load)`

尽可能使用非捕获或原子组

### 原子组

范例 | 说明
:-|-
`(?>red\|green\|blue)` | 比非捕获更快
`(?>id\|identity)\b`   | 匹配 <yel>id</yel>，但不匹配 <yel>id</yel>entity

"id" 匹配，但 `\b` 在原子组之后失败，
解析器不会回溯到组以重试“身份”

如果替代品重叠，请从长到短命令。

### 零宽度断言 Lookaround(前后预查)
<!--rehype:wrap-class=col-span-2 row-span-2-->

范例 | 说明
:-|-
`(?= )`                 | 向前看，如果你能提前找到
`(?! )`                 | 向前看，如果你找不到前面
`(?<= )`                | 向后看，如果你能找到后面
`(?<! )`                | 向后看，如果你找不到后面
`\b\w+?(?=ing\b)`       | 匹配 <yel>warbl</yel>ing, <yel>str</yel>ing, <yel>fish</yel>ing, ...
`\b(?!\w+ing\b)\w+\b`   | 不以“ing”结尾的单词
`(?<=\bpre).*?\b`      | 匹配 pre<yel>tend</yel>、pre<yel>sent</yel>、pre<yel>fix</yel>、...
`\b\w{3}(?<!pre)\w*?\b` | 不以“pre”开头的词
`\b\w+(?<!ing)\b`       | 匹配不以“ing”结尾的单词

### If-then-else

匹配 `Mr.` 或 `Ms.` 如果单词 `her` 稍后在字符串中

```
M(?(?=.*?\bher\b)s|r)\.
```

需要环顾 `IF` 条件


另见
---------

- [在线 Regex 测试器](https://regex101.com/)
- [轻松学习 Regex](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)

Text 选择器
-----------

### 基础

选择器 | 说明
:- | :-
`[` | 提取包含左边文本
`]` | 提取包含右边文本
`(` | 提取不包含左边文本
`)` | 提取不包含右边文本
`[leftText, rightText]` | 提取包含两边文本
`(leftText, rightText)` | 提取不包含两边文本

### 特殊
<!--rehype:wrap-class=col-span-2-->

当文本含有特殊文本时，可使用以下完整形式配置

```ts
const content = extractor.extractOne(<TextSelector>{
    leftSearch: '<div id="content">',
    rightSearch: '</div>',
    searchOptions: {
        includeLeft: false,
        includeRight: false,
    },
}, html);
```
