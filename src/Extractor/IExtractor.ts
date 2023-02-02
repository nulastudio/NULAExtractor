export interface IExtractor<T = any, I = any, O = any> {
    extractOne(selector: T, content: I): O;
    extractAll(selector: T, content: I): O[];
}
