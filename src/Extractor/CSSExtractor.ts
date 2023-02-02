const cheerio: CheerioAPI = require('cheerio');
import { Cheerio, CheerioAPI } from "cheerio";
import { IExtractor } from "./IExtractor";

export class CSSExtractor implements IExtractor<string, string, string> {
    protected nodeAction(selector: string) {
        let node: string;
        let action: string;

        let childOnly = selector.startsWith('.>');

        if (childOnly) {
            selector = selector.replace(/^\.>/, '');
        }

        action = <any>selector.match(/@(?<action>\w+)$/);

        if (action) {
            action = (<any>action).groups.action;
            selector = selector.replace(/@(?<action>\w+)$/, '');
        }

        node = selector;

        return {node, action, childOnly};
    }

    protected queryAction(node: Cheerio<any>, action: string) {
        switch (action || '') {
            case 'outerHTML':
                return cheerio.html(node, { decodeEntities: false });
            case '':
                return node.html();
            default:
                return node.attr(action);
        }
    }

    public extractOne(selector: string, content: string) {
        const nodeAction = this.nodeAction(selector);

        const document = cheerio.load(content, { decodeEntities: false });

        let node: Cheerio<any> = null;

        if (nodeAction.childOnly) {
            node = document(nodeAction.node).first();
        } else {
            node = document(nodeAction.node);
        }

        return this.queryAction(node, nodeAction.action);
    }

    public extractAll(selector: string, content: string) {
        const nodeAction = this.nodeAction(selector);

        const document = cheerio.load(content, { decodeEntities: false });

        let nodes = document(nodeAction.node);

        const results: string[] = [];

        if (nodeAction.childOnly) {
            nodes = nodes.first().parent().children(nodeAction.node);
        }

        nodes.each((_, e) => {
            const result = this.queryAction(document(e), nodeAction.action);
            results.push(result);
        });

        return results;
    }
}
