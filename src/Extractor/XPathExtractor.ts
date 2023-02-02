import { IExtractor } from "./IExtractor";
import * as xpath from 'xpath-ts';
import { JSDOM } from 'jsdom';

export class XPathExtractor<V = string | number | boolean> implements IExtractor<string, string, V> {
    protected selectNode(selector: string, content: string, single: boolean = false) {
        if (selector && selector[0] === '/') {
            selector = selector.substr(1);
        }

        selector = `/xml/${selector}`;

        const outerHTML = selector.endsWith('/@outerHTML');
        if (outerHTML) {
            selector = selector.replace(/\/@outerHTML$/, '');
        }

        content = `<xml>${content}</xml>`;

        // const document = new dom().parseFromString(content);
        const document = new JSDOM(content, {
            contentType: 'text/xml',
        }).window.document;

        let nodes: (string | number | boolean | Node)[] = single ? <any>xpath.select1(selector, document) : <any>xpath.select(selector, document);

        if (!Array.isArray(nodes)) nodes = [nodes];

        return <V[]><unknown[]>nodes.map(node => {
            if (node == null) {
                return node;
            } else if (node.constructor?.name === 'Element') {
                return outerHTML ? (<Element>node).outerHTML : (<Element>node).innerHTML;
            } else if (node.constructor?.name === 'Attr') {
                return (<Attr>node).value;
            } else {
                return node;
            }
        });
    }

    public extractOne(selector: string, content: string) {
        return this.selectNode(selector, content, true)[0];
    }

    public extractAll(selector: string, content: string) {
        return this.selectNode(selector, content, false);
    }
}
