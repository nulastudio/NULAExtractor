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
