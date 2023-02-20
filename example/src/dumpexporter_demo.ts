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
