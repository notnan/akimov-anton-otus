import {INode} from './node';

export abstract class TreeNode {
    abstract currentNode: INode;
    abstract symbols: Object;

    abstract showTree(): void;
    abstract getNodeStr(node: INode, level: number): string;
}

export class TreeNodeObj extends TreeNode {
    symbols = {
        'parent': '└',
        'line': '──',
        'spaces': '   '
    }

    constructor(public currentNode: INode){ 
        super();
    }

    showTree():void {
        console.log(this.getNodeStr(this.currentNode, 0));
    }

    getPrefix(level:number):string {
        return (this.symbols.spaces).repeat(level - 1) + this.symbols.parent + this.symbols.line;
    }   

    getNodeStr(node: INode, level: number): string {
        let result ='';

        if (level === 0) {
            result = String(node.name) + '\n';
        } else {
            result +=  this.getPrefix(level) + node.name + '\n';
        }

        if ('items' in node) {
            node.items?.forEach((item:INode) => result += this.getNodeStr(item, level + 1));
        }

        return result;
    }

}
