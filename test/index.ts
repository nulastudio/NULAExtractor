import { Config, Extractor } from './../src/Extractor';

const testContent = () => `
<div class="comments">
<div class="comment level1">
    <p class="comment-author">评论者</p>
    <p class="comment-time">2019-06-30 16:27:37</p>
    <p class="comment-content">这是评论内容1</p>
    <div class="comment level3">
        <p class="comment-author">子子评论者</p>
        <p class="comment-time">2019-06-30 16:27:37</p>
        <p class="comment-content">这是评论内容1的回复的回复</p>
        <div class="comment level3">
            <p class="comment-author">子子子评论者</p>
            <p class="comment-time">2019-06-30 16:27:37</p>
            <p class="comment-content">这是评论内容1的回复的回复的回复</p>
        </div>
    </div>
</div>
<div class="comment level1">
    <p class="comment-author">评论者</p>
    <p class="comment-time">2019-06-30 16:27:37</p>
    <p class="comment-content">这是评论内容2</p>
    <div class="comment level2">
        <p class="comment-author">子评论者</p>
        <p class="comment-time">2019-06-30 16:27:37</p>
        <p class="comment-content">这是评论内容1的回复</p>
    </div>
</div>
</div>
`;

const config: Config = {
    maxNestedLevel: 0,

    fields: {
//         'css_01': 'css:head',
//         'css_02': {
//             source: testContent,
//             selector: 'css:div.comments',
//         },
//         'xpath_01': {
//             source: testContent,
//             area: 'xpath:div[contains(@class, "comments")]',
//             selector: 'xpath:./div',
//             // fields: {
//             //     author: 'p.comment-author',
//             //     time: 'p.comment-time',
//             //     content: 'p.comment-content',
//             // },
//             // repeated: true,
//             // recursive: true,
//         },
//         'text_01': {
//             source: testContent,
//             area: 'xpath:div[contains(@class, "comments")]',
//             selector: 'xpath:./div',
//             fields: {
//                 author: 'text:(<p class="comment-author">,</p>)',
//                 time: 'text:[<p class="comment-time">,</p>]',
//                 content: 'text:(<p class="comment-content">,</p>]',
//             },
//         },
//         'text_02': {
//             source: () => `
// <s>1<e>
// <s>2<e>
// <s>3<e>
// `,
//             selector: 'text:(<s>,<e>)',
//             repeated: true,
//         },
//         'text_03': {
//             source: testContent,
//             area: 'xpath:div[contains(@class, "comments")]',
//             selector: 'xpath:./div',
//             fields: {
//                 author: {
//                     type: 'text',
//                     selector: <any><TextSelector>{
//                         leftSearch: '<p class="comment-author">',
//                         rightSearch: '</p>',
//                     },
//                 },
//                 time: {
//                     type: 'text',
//                     selector: <any><TextSelector>{
//                         leftSearch: '<p class="comment-time">',
//                         rightSearch: '</p>',
//                         searchOptions: {
//                             includeLeft: true,
//                             includeRight: true,
//                         },
//                     },
//                 },
//                 content: {
//                     type: 'text',
//                     selector: <any><TextSelector>{
//                         leftSearch: '<p class="comment-content">',
//                         rightSearch: '</p>',
//                         searchOptions: {includeRight: true},
//                     },
//                 },
//             },
//         },
//         'regex_01': 'regex:<head>(.*?)<\/head>',
//         'regex_02': 'regex:/<head>(.*?)<\/head>/',
//         'regex_03': 'regex:/<head>(.*?)<\/head>/i',
//         'regex_04': 'regex:/<HeaD>(.*?)<\/HeaD>/si',
//         'regex_05': 'regex:/<head>.*?<\/head>/s',
//         'regex_06': {
//             type: 'regex',
//             selector: /<head>(.*?)<\/head>/si,
//         },
//         'regex_07': {
//             type: 'regex',
//             selector: '/<head>(.*?)<\/head>/s',
//         },
//         'regex_08': {
//             selector: 'regex:/<head>(.*?)<\/head>/s',
//         },
//         'calback_01': (content, request: Request, response: Response) => {
//             return content;
//         },
//         'calback_02': (content, request, response) => {
//             return 'content has been override';
//         },
//         'calback_03': {
//             type: 'callback',
//             selector: (content, request: Request, response: Response) => {
//                 return 'the html content is: ' + content;
//             },
//         },
//         'source_01': {
//             source: new Request('GET', 'https://www.example.com/'),
//             type: 'raw',
//         },
//         'callback_01': {
//             selector: 'regex:/<head>(.*?)<\/head>/s',
//             callback: (content: string) => content.replace(/\s+/sg, ''),
//         },
//         'child_01': {
//             selector: 'regex:/<head>(.*?)<\/head>/s',
//             fields: {
//                 meta: {
//                     selector: 'regex:/<meta.*?\/>/s',
//                     repeated: true,
//                 },
//             },
//         },
//         'child_02': {
//             selector: 'regex:/<head>(.*?)<\/head>/s',
//             fields: {
//                 meta: {
//                     selector: 'regex:/<meta.*?\/>/s',
//                     repeated: true,
//                 },
//             },
//             callback: (content) => content.meta.trim(),
//         },
//         'repeated_01': {
//             // source: () => "<div>123</div>",
//             selector: 'regex:/<div.*?>.*?<\/div>/s',
//             fields: {
//                 content: 'regex:\>(.*)\<',
//                 test: {
//                     source: () => 'test',
//                     type: 'raw',
//                 },
//             },
//             repeated: true,
//         },
//         'repeated_02': {
//             selector: 'regex:/<div.*?>.*?<\/div>/s',
//             repeated: true,
//             callback: (content) => {
//                 return content.script.trim();
//             },
//         },
//        'recursive_01': {
//             source: testContent,
//             area: 'css:.comments',
//             selector: 'css:.>div',
//             fields: {
//                 author: 'p.comment-author',
//                 time: 'p.comment-time',
//                 content: 'p.comment-content',
//             },
//             repeated: true,
//             recursive: true,
//             callback: (field) => {
//                 return field;
//             },
//         },
        // 'jsonpath_01': {
        //     source: () => {
        //         return JSON.parse(readFileSync('./test/data/posts.json').toString('UTF-8'));
        //     },
        //     selector: 'jsonpath:$[*]',
        //     fields: {
        //         title: 'jsonpath:$.title',
        //         body: 'jsonpath:$.body',
        //     },
        //     repeated: true
        // },
        // 'jmespath_01': {
        //     source: () => {
        //         return JSON.parse(readFileSync('./test/data/posts.json').toString('UTF-8'));
        //     },
        //     selector: 'jmespath:[]',
        //     fields: {
        //         title: 'jmespath:title',
        //         body: 'jmespath:body',
        //     },
        //     repeated: true
        // },
    },

    export: { name: 'dump' },
};

const extractor = new Extractor(config);
const data = extractor.extract(config.fields, testContent());
extractor.export(data);
