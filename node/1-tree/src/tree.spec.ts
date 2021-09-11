import { TreeNodeObj } from './tree';
import { node } from './node';
import { INode } from './node';

let treeNodeObj: TreeNodeObj;

beforeEach(() => {
    treeNodeObj = new TreeNodeObj(node);
});

describe('test getPrefix method', () => {
    const resultsMap = new Map ([
        [1, '└──'],
        [2, '   └──'],
        [3, '      └──']
    ]);

    resultsMap.forEach((value, key) => {
        it(`returns '${value}' for depth level = ${key}`, () => {
            expect(treeNodeObj.getPrefix(key)).toBe(value);
        });
    });
});


describe('test getNodeStr method', () => {
    const node_1: INode = {name: '1' };
    const node_2: INode = {name: '1', items: [{name: '2'}]};
    const node_3: INode = {name: '1', items: [{name: '2', items: [{name: '3'}]}]};
    const node_4: INode = {name: '1', items: [{name: '2', items: [{name: '3'}, {name: '4'}]}]};
    const node_5: INode = {name: '1', items: [{name: '2', items: [{name: '3'}, {name: '4'}]}, {name: '5'}]};

    const resultsMap = new Map ([
        [node_1, '1\n'],
        [node_2, '1\n└──2\n'],
        [node_3, '1\n└──2\n   └──3\n'],
        [node_4, '1\n└──2\n   └──3\n   └──4\n'],
        [node_5, '1\n└──2\n   └──3\n   └──4\n└──5\n'],
    ]);

    resultsMap.forEach((value, key) => {
        it(`returns '\n ${value}' for node`, () => {
            expect(treeNodeObj.getNodeStr(key, 0)).toBe(value);
        });
    });

});
