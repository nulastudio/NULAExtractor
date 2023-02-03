import { DumpExporter } from './Exporter/DumpExporter';
import { IExporter } from './Exporter/IExporter';
import { NullExporter } from './Exporter/NullExporter';
import { CSSExtractor } from './Extractor/CSSExtractor';
import { IExtractor } from './Extractor/IExtractor';
import { JMESPathExtractor } from './Extractor/JMESPathExtractor';
import { JSONPathExtractor } from './Extractor/JSONPathExtractor';
import { RawExtractor } from './Extractor/RawExtractor';
import { RegexExtractor } from './Extractor/RegexExtractor';
import { TextExtractor } from './Extractor/TextExtractor';
import { XPathExtractor } from './Extractor/XPathExtractor';
import { simpleCloneDeep, isEmpty } from './Util';

export type Dictionary<T = any> = {
    [index: string]: T,
}

export type Config = {
    /**
     * 限制嵌套层数，默认100层，-1则视为无限制嵌套递归
     */
    maxNestedLevel?: number;

    fields?: Field;

    export?: ExportConfig;
}

export type ExportConfig = {
    name: string;
}

export type UrlAbsoluteMatch = string

export type UrlRegexMatch = RegExp

export type UrlCallbackMatch = (url: string) => boolean

export type UrlMatch = UrlAbsoluteMatch | UrlRegexMatch | UrlCallbackMatch

export type Field = Dictionary<Query>

export type CallbackSelector<I = any, O = any> = (content: I) => O | O[]

export type Selector = string | RegExp | CallbackSelector

export type Query = string | {
    areaType?: string,
    area?: Selector,
    type?: string,
    selector?: Selector,
    fields?: Field,
    repeated?: boolean,
    recursive?: boolean,
    callback?: ((field: any) => any),
} | CallbackSelector

export class Extractor<I = string, O = Dictionary<any>> {
    private extractors: Dictionary<IExtractor<any, I, O>> = {};
    private exporters: Dictionary<IExporter<O>> = {};

    public config: Config;

    public constructor(config: Config) {
        this.checkConfig(config);
        this.registerComponents();
    }

    private checkConfig(config: Config) {
        const defaultConfig: Config = {
            maxNestedLevel: 100,
            fields: {},
            export: { name: 'null' },
        };

        if (!config) {
            this.config = defaultConfig;
            return;
        }

        this.config = simpleCloneDeep(config);

        for (const key in defaultConfig) {
            if (this.config[key] === undefined || (typeof this.config[key] == 'object' && isEmpty(this.config[key]))) {
                this.config[key] = defaultConfig[key];
            }
        }
    }

    private registerComponents() {
        this.registerExtractors();
        this.registerExporters();
    }

    private registerExtractors() {
        const extractors = {
            "text":     TextExtractor,
            "css":      CSSExtractor,
            "xpath":    XPathExtractor,
            "jsonpath": JSONPathExtractor,
            "jmespath": JMESPathExtractor,
            "regex":    RegexExtractor,
            "raw":      RawExtractor,
        };

        for (const name in extractors) {
            const ext = extractors[name];
            this.registerExtractor(name, new ext(this.config.export));
        }
    }

    private registerExporters() {
        const exporters = {
            "null": NullExporter,
            "dump": DumpExporter,
        };

        for (const name in exporters) {
            const exp = exporters[name];
            this.registerExporter(name, new exp(this.config.export));
        }
    }

    public isUrlMatch(url: string, patterns: UrlMatch[]): boolean {
        return !!patterns.find(urlMatch => {
            if (typeof urlMatch === 'string') {
                return url === urlMatch;
            } else if (urlMatch instanceof RegExp) {
                return urlMatch.test(url);
            } else if (typeof urlMatch === 'function') {
                return urlMatch(url);
            }

            return false;
        });
    }

    public findExtractor(name: string) {
        return this.extractors[name];
    }

    public findExporter(type: string) {
        return this.exporters[type];
    }

    public registerExporter(name: string, exporter: IExporter) {
        this.exporters[name] = exporter;
    }

    public registerExtractor(name: string, extractor: IExtractor) {
        this.extractors[name] = extractor;
    }

    public parseSelector(selector: string) {
        let type: string = null;
        let segments = (selector || '').split(':');

        if (segments.length == 1) {
            selector = segments[0];
        } else {
            type = segments.shift();
            selector = segments.join(':');
        }

        return { type, selector };
    };

    public fetchSingleField(type: string, selector: any, content: I) {
        const extractor = this.findExtractor(type);
        if (!extractor) return null;

        return extractor.extractOne(selector, content);
    }

    public fetchRepeatedField(type: string, selector: any, content: I) {
        const extractor = this.findExtractor(type);
        if (!extractor) return null;
        return extractor.extractAll(selector, content);
    }

    private fetchFields(content: I, fields?: Field, level = 0): O {
        let result: O = <any>{};

        let recursiveResult: Dictionary<{
            repeated: boolean,
            result: any[],
        }> = {};

        if (!fields) return null;

        for (const name in fields) {
            const query = fields[name];

            if (!query) {
                result[name] = null;
                continue;
            }

            let curContent = content;
            let field: any = null;

            recursiveResult[name] = {
                repeated: false,
                result: []
            };

            try {
                if (typeof(query) == 'string') {
                    // 简化选择器
                    const typedSelector = this.parseSelector(query);
                    if (!typedSelector.type) {
                        typedSelector.type = 'css';
                    }
                    field = this.fetchSingleField(typedSelector.type, typedSelector.selector, curContent);
                } else if (typeof(query) == 'function' || (query.type == 'callback' && typeof(query.selector) == 'function')) {
                    // 回调模式
                    const callback = (<any>query).selector || query;
                    if (callback) {
                        field = (<CallbackSelector>callback)(curContent);
                    }
                } else {
                    let type: string = 'css';
                    let areaType: string = null;
                    let area: Selector = null;
                    let selector: Selector = null;
                    if (query.type) {
                        type = areaType = query.type;
                    }
                    if (query.areaType) {
                        areaType = query.areaType;
                    }
                    // Typed Selector优先级比type参数高
                    if (typeof query.area == 'string') {
                        const typedSelector = this.parseSelector(<string>query.area);
                        if (typedSelector.type) {
                            areaType = typedSelector.type;
                        }
                        area = typedSelector.selector;
                    } else {
                        area = query.area;
                    }
                    if (area) {
                        curContent = <I><any>this.fetchSingleField(areaType, area, curContent);
                    }
                    if (typeof query.selector == 'string') {
                        const typedSelector = this.parseSelector(query.selector);
                        if (typedSelector.type) {
                            type = typedSelector.type;
                        }
                        selector = typedSelector.selector;
                    } else {
                        selector = query.selector;
                    }
                    if (query.repeated) {
                        recursiveResult[name].repeated = true;
                        field = this.fetchRepeatedField(type, selector, curContent);

                        if (!Array.isArray(field)) field = [field];

                        const newField = [];
                        for (const item of field) {
                            let newItem = item;
                            if (item && query.fields && (this.config.maxNestedLevel == -1 || level <= this.config.maxNestedLevel)) {
                                newItem = this.fetchFields(item, query.fields, level + 1);
                            }

                            let recursiveField = null;
                            if (item && query.recursive && (this.config.maxNestedLevel == -1 || level + 1 <= this.config.maxNestedLevel)) {
                                if (!newItem) newItem = {};
                                const recursiveQuery = query;
                                for (const key in query) {
                                    recursiveQuery[key] = query[key];
                                }
                                recursiveQuery.areaType = null; 
                                recursiveQuery.area = null;
                                recursiveField = this.fetchFields(item, {
                                    [name]: recursiveQuery,
                                }, level + 1)[name];
                            }

                            if (query.callback) {
                                newItem = query.callback(newItem);
                            }

                            recursiveResult[name].result.push(recursiveField);
                            newField.push(newItem);
                        }

                        field = newField;
                    } else {
                        field = this.fetchSingleField(type, selector, curContent);

                        const rawField = field;

                        if (rawField && query.fields && (this.config.maxNestedLevel == -1 || level <= this.config.maxNestedLevel)) {
                            field = this.fetchFields(rawField, query.fields, level + 1);
                        }

                        let recursiveField = null;
                        if (rawField && query.recursive && (this.config.maxNestedLevel == -1 || level + 1 <= this.config.maxNestedLevel)) {
                            if (!field) field = {};
                            const recursiveQuery = query;
                            for (const key in query) {
                                recursiveQuery[key] = query[key];
                            }
                            recursiveQuery.areaType = null;
                            recursiveQuery.area = null;
                            recursiveField = this.fetchFields(rawField, {
                                [name]: recursiveQuery,
                            }, level + 1)[name];
                        }
                        if (rawField && query.callback) {
                            field = query.callback(field);
                        }

                        recursiveResult[name].result.push(recursiveField);
                    }
                }
            } catch {} finally {
                result[name] = field === undefined ? null : field;
            }
        }

        if (result && !isEmpty(recursiveResult)) {
            for (const name in recursiveResult) {
                let oResult = result[name];
                const rResult = recursiveResult[name];

                if (oResult && rResult && rResult.result.length) {
                    if (rResult.repeated) {
                        for (let i = 0; i < oResult.length; i++) {
                            if (rResult.result[i] && rResult.result[i].length) {
                                oResult[i][name] = rResult.result[i];
                            }
                        }
                    } else if (rResult.result[0]) {
                        oResult[name] = rResult.result[0];
                    }
                }
            }
        }

        return result;
    }

    public findUrls(content: string): string[] {
        return this.fetchRepeatedField('css', 'a[href] @href', content as any) as any[];
    }

    public extract(content: I, fields?: Field): O {
        return this.fetchFields(content, fields || this.config.fields);
    }

    public export(data: O, name?: string) {
        const exporter = this.findExporter(name || this.config.export?.name);
        if (!exporter) return null;

        exporter.export(data, this.config.export);
    }
}
