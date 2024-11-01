import { TokenType, type Token } from "../lexer/token.ts";

export enum NodeType {
    NUMBER = "Number",
    STRING = "String",
    BOOLEAN = "Boolean",
    NULL = "Null",

    ARRAY = "Array",
    MEMBER = "Member",
    OBJECT = "Object",
    DOCUMENT = "Document",
}

export interface Node {
    type: NodeType;
    getType: () => NodeType;
}

export class JDocument implements Node {
    type: NodeType = NodeType.DOCUMENT;
    constructor(public name: string, public body: Node) {}
    getType() {
        return this.type;
    }
}

export class JArray implements Node {
    type: NodeType = NodeType.ARRAY;
    public children: Node[] = [];
    getType() {
        return this.type;
    }
}

export class JObject implements Node {
    type: NodeType = NodeType.OBJECT;
    public children: JMember[] = [];
    getType() {
        return this.type;
    }
}

export class JMember implements Node {
    type: NodeType = NodeType.MEMBER;
    constructor(public name: string, public value: Node) {}
    getType() {
        return this.type;
    }
}

export class JNumber implements Node {
    type: NodeType = NodeType.NUMBER;
    public value: number;
    constructor(private readonly token: Token) {
        this.value = Number(token.literal);
    }
    getType() {
        return this.type;
    }
}

export class JString implements Node {
    type: NodeType = NodeType.STRING;
    public value: string;
    constructor(private readonly token: Token) {
        this.value = token.literal;
    }
    getType() {
        return this.type;
    }
}

export class JBoolean implements Node {
    type: NodeType = NodeType.BOOLEAN;

    public value: boolean;

    constructor(private readonly token: Token) {
        this.value = token.type === TokenType.TRUE ? true : false;
    }

    getType() {
        return this.type;
    }
}

export class JNull implements Node {
    type: NodeType = NodeType.NULL;
    public value: null = null;
    getType() {
        return this.type;
    }
}
