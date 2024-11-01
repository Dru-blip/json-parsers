import { JArray, JBoolean, JDocument, JNumber, JObject, JString, NodeType, type Node } from "../parser/ast.ts";

type JType = number | string | boolean | null | Record<string, any> | any[];

export class Builder {
    constructor() {}

    static transform(node: Node):any {
        switch (node.type) {
            case NodeType.NUMBER: {
                const num=node as JNumber
                return num.value
            }
            case NodeType.STRING: {
                const num=node as JString
                return num.value
            }
            case NodeType.BOOLEAN: {
                const num=node as JBoolean
                return num.value
            }
            case NodeType.NULL: {
                return null;
            }
            case NodeType.ARRAY: {
                return this.transformArray(node as JArray);
            }
            case NodeType.OBJECT: {
                return this.transformObject(node as JObject);
            }
            case NodeType.DOCUMENT: {
                return this.transformDocument(node as JDocument);
            }
            default: {
                return null;
            }
        }
    }

    private static transformDocument(node: JDocument) {
        return this.transform(node.body);
    }
    private static transformObject(node: JObject) {
        let elements: Record<string, any> = {};
        node.children.forEach((child) => {
            elements[child.name] = this.transform(child.value);
        });
        return elements;
    }
    private static transformArray(node: JArray) {
        let elements: JType[] = [];
        node.children.forEach((child) => {
            elements.push(this.transform(child));
        });
        return elements;
    }
}
