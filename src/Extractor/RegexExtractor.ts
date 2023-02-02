import { IExtractor } from "./IExtractor";

export class RegexExtractor implements IExtractor<string | RegExp, string, string> {
    protected defaultFlags = 's';

    protected trans2Regexp(regex: string | RegExp): RegExp {
        if (regex instanceof RegExp) return regex;

        if (typeof regex != 'string') return null;

        const regexpLike = regex.match(/\/(?<regex>.*)\/(?<flags>[a-z]+)?/);

        if (!regexpLike) return new RegExp(regex, this.defaultFlags);

        return new RegExp(regexpLike.groups.regex, regexpLike.groups.flags || '');
    }

    protected firstResult(result: RegExpMatchArray) {
        if (!result || !result.length) return null;

        // 如果有分组则返回分组1内容，否则返回匹配到的全文
        return result.length == 1 ? result[0] : result[1];
    }

    public extractOne(selector: string | RegExp, content: string) {
        if (!content) return null;

        const result = content.match(this.trans2Regexp(selector));
        return this.firstResult(result);
    }

    public extractAll(selector: string | RegExp, content: string) {
        selector = this.trans2Regexp(selector);

        if (!selector.global) {
            selector = new RegExp(selector, selector.flags + 'g');
        }

        let match: RegExpExecArray;

        const result = [];

        while ((match = selector.exec(content)) != null) {
            result.push(this.firstResult(match));
        }

        return result;
    }
}
