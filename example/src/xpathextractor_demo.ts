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
