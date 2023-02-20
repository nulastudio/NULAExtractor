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

// 定义自定义导出器，实现导出数据到文件
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
