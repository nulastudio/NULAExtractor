import { IExtractor } from "./IExtractor";
const jmespath = require('@gorillastack/jmespath');

export class JMESPathExtractor<V = any> implements IExtractor<string, string, V> {
    public extractOne(selector: string, content: string) {
        return <V>jmespath.search(content, selector);
    }

    public extractAll(selector: string, content: string) {
        const result = this.extractOne(selector, content);
        return Array.isArray(result) ? <V[]>result : [result];
    }
}
