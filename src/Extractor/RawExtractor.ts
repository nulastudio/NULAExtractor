import { IExtractor } from "./IExtractor";

export class RawExtractor<T = any, K = any> implements IExtractor<T, K, K> {
    public extractOne(selector: T, content: K) {
        return content;
    }

    public extractAll(selector: T, content: K) {
        return Array.isArray(content) ? <K[]>content : [content];
    }
}
