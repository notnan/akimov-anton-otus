export interface INode {
    name: number | string;
    items?: INode[];
  }

export const node: INode = {
  "name": 1,
  "items": [{
      "name": 2,
      "items": [{
              "name": 3
          },
          {
              "name": 4
          }
      ]
  }, {
      "name": 5,
      "items": [{
          "name": 6
      }]
  }]
}
  