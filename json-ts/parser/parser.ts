import type { Lexer } from "../lexer/lexer.ts";
import { TokenType, type Token } from "../lexer/token.ts";

export class Parser {
    private currentToken: Token | undefined;
    private nextToken: Token | undefined;
    public tokens:Token[]=[]

    constructor(private readonly lexer: Lexer) {
        this.advance();
        this.advance();
    }

    private advance() {
        this.tokens.push(this.nextToken!)
        this.currentToken = this.nextToken;
        this.nextToken = this.lexer.nextToken();
    }

    private check(type: TokenType) {
        return this.currentToken?.type === type;
    }

    parse() {
        if (this.check(TokenType.LBRACE) || this.check(TokenType.LSQRBR)) {
            return this.parseContainers();
        }
        return this.parsePrimitive();
    }

    private parseContainers() {
        if (this.check(TokenType.LSQRBR)) {
            this.advance();
            return this.parseArray();
        } else {
            this.advance();
            return this.parseObject();
        }
    }

    private parseObject() {
        const obj: Record<string, any> = {};
        while (!this.check(TokenType.RBRACE)) {
            const key = this.currentToken?.literal;
            this.advance();
            this.advance();
            const value = this.parse();
            obj[key!] = value;
            if (this.currentToken?.type === TokenType.COMMA) {
                this.advance();
            }
        }
        this.advance()
        return obj;
    }

    private parseArray() {
        const parent: any[] = [];
        while (!this.check(TokenType.RSQRBR)) {
            const child = this.parse();
            parent.push(child!);
            if (this.currentToken?.type === TokenType.COMMA) {
                this.advance();
            }
        }
        this.advance();
        return parent;
    }

    private parsePrimitive() {
        const token = this.currentToken;
        // console.log(token)
        switch (token?.type) {
            case TokenType.NUMBER: {
                this.advance();
                return Number(token.literal);
            }
            case TokenType.STRING: {
                this.advance();
                return token.literal;
            }
            case TokenType.TRUE: {
                return true;
            }
            case TokenType.FALSE: {
                return false;
            }
            default: {
                throw new Error("Unexpected Token");
            }
        }
    }
}
