import { IExtractor } from "./IExtractor";
import { JSONPath } from 'jsonpath-plus';

export class JSONPathExtractor<K = any, V = any> implements IExtractor<string, K, V> {
    public extractOne(selector: string, content: K) {
        return <V>JSONPath({
            path: selector,
            json: <any>content,
            wrap: false,
        });
    }

    public extractAll(selector: string, content: K) {
        return <V[]>JSONPath({
            path: selector,
            json: <any>content,
            wrap: true,
        });
    }
}
