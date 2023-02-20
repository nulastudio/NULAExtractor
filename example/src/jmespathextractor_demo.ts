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
