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
