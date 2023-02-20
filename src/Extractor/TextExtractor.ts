import { IExtractor } from "./IExtractor";

export type TextSelector = string | {
    leftSearch?: string,
    rightSearch?: string,
    searchPosition?: number,
    searchOptions?: SearchOptions,
}

export interface SearchOptions {
    includeLeft?: boolean;
    includeRight?: boolean;
}

export class TextExtractor implements IExtractor<string, string, string> {
    protected parseSelector(selector: TextSelector) {
        let leftSearch: string = "";
        let rightSearch: string = "";
        let searchPosition: number = 0;
        let option: SearchOptions = {
            includeLeft: false,
            includeRight: false,
        };

        if (typeof selector === 'string') {
            // ()不包含，[]包含

            let char = selector[0];
            if (char === '(' || char === '[') {
                selector = selector.substr(1);
                option.includeLeft = char === '[';
            }

            char = selector[selector.length - 1];
            if (char === ')' || char === ']') {
                selector = selector.substr(0, selector.length - 1);
                option.includeRight = char === ']';
            }

            const searches = selector.split(',', 2);

            leftSearch = searches[0] || '';
            rightSearch = searches[1] || '';
        } else {
            leftSearch = selector.leftSearch || '';
            rightSearch = selector.rightSearch || '';
            searchPosition = selector.searchPosition || 0;
            option = selector.searchOptions || { includeLeft: false, includeRight: false };
        }

        return {leftSearch, rightSearch, searchPosition, option};
    }

    protected findText(wholeText: string, leftSearch: string, rightSearch: string, searchPosition: number = 0, searchOptions: SearchOptions = null): {
        text: string,
        position: number,
    } {
        if (searchPosition < 0) searchPosition = wholeText.length + searchPosition;

        let text: string = '';
        let position: number = -1;

        const leftPos = leftSearch ? wholeText.indexOf(leftSearch, searchPosition) : 0;

        if (leftPos == -1) return { text, position };

        const textStart = leftPos + leftSearch.length;

        const rightPos = rightSearch ? wholeText.indexOf(rightSearch, textStart) : wholeText.length - 1;

        if (rightPos == -1) return { text, position };

        const textEnd = rightPos - 1;

        text = wholeText.substr(textStart, textEnd - textStart + 1);

        if (searchOptions.includeLeft) text = leftSearch + text;
        if (searchOptions.includeRight) text = text + rightSearch;

        position = textStart;

        return { text, position };
    }

    public extractOne(selector: string | TextSelector, content: string) {
        const sel = this.parseSelector(selector);
        return this.findText(content, sel.leftSearch, sel.rightSearch, sel.searchPosition, sel.option).text;
    }

    public extractAll(selector: string | TextSelector, content: string) {
        const result: string[] = [];

        const sel = this.parseSelector(selector);
        do {
            const found = this.findText(content, sel.leftSearch, sel.rightSearch, sel.searchPosition, sel.option);

            if (found.position != -1) {
                sel.searchPosition = found.position + found.text.length;
                result.push(found.text);
            } else {
                sel.searchPosition = found.position;
            }
        } while (sel.searchPosition != -1);

        return result;
    }
}
