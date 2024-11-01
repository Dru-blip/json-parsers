import { Token, TokenType } from "./token.ts";

export class Lexer {
    private position: number;
    private nextChar: string | undefined;
    private currentChar: string | undefined;
    private line: number;
    private col: number;

    constructor(private readonly source: string) {
        this.position = 0;
        this.line = 1;
        this.col = 1;
        this.advance();
    }

    private advance() {
        this.nextChar = this.source.at(this.position++);
        this.currentChar = this.nextChar;
        this.col++;
    }

    private peek() {
        return this.currentChar;
    }

    private next() {
        return this.nextChar;
    }

    private makeToken(type: TokenType, literal: string) {
        return new Token(literal, type, this.line, this.col, this.position - literal.length);
    }

    private skipWhiteSpaces() {
        while (true) {
            if (this.currentChar === " " || this.currentChar === "\t" || this.currentChar === "\r") {
                this.col++;
            } else if (this.currentChar === "\n") {
                this.line++;
                this.col = 1;
            } else {
                break;
            }
            this.advance();
        }
    }

    private scanOperators() {
        let token;
        switch (this.currentChar) {
            case "}": {
                token = this.makeToken(TokenType.RBRACE, "}");
                break;
            }
            case "{": {
                token = this.makeToken(TokenType.LBRACE, "{");
                break;
            }
            case "]": {
                token = this.makeToken(TokenType.RSQRBR, "]");
                break;
            }
            case "[": {
                token = this.makeToken(TokenType.LSQRBR, "[");
                break;
            }
            case ":": {
                token = this.makeToken(TokenType.COLON, ":");
                break;
            }
            case ",": {
                token = this.makeToken(TokenType.COMMA, ",");
                break;
            }
            default: {
                token = new Token("eof", TokenType.EOF, this.line, this.col, this.position);
            }
        }
        this.advance();
        return token;
    }

    private isDigit(char: string | undefined) {
        return char && char >= "0" && char <= "9";
    }

    private isAlpha(char: string | undefined) {
        return char && ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z"));
    }

    nextToken() {
        this.skipWhiteSpaces();

        switch (this.currentChar) {
            case ",":
            case "}":
            case "{":
            case "[":
            case "]":
            case ":": {
                return this.scanOperators();
            }
            case '"': {
                let literal = "";
                this.advance();
                while (this.currentChar !== '"') {
                    literal += this.currentChar;
                    this.advance();
                }
                this.advance();
                return this.makeToken(TokenType.STRING, literal);
            }
            default: {
                if (this.isDigit(this.currentChar)) {
                    let literal = "";
                    while (this.isDigit(this.currentChar)) {
                        literal += this.currentChar;
                        this.advance();
                    }

                    return this.makeToken(TokenType.NUMBER, literal);
                } else if (this.isAlpha(this.currentChar)) {
                    let literal = "";
                    while (this.isDigit(this.currentChar)) {
                        literal += this.currentChar;
                        this.advance();
                    }
                    if (literal === "false") {
                        return this.makeToken(TokenType.FALSE, literal);
                    } else if (literal === "true") {
                        return this.makeToken(TokenType.TRUE, literal);
                    } else {
                        throw new Error(`Unexpected Symbol at ${this.line}:${this.col}`);
                    }
                } else if (this.currentChar === undefined) {
                    return new Token("eof", TokenType.EOF, this.line, this.col, this.position);
                }
            }
        }
    }

    getTokens() {
        let token = this.nextToken();
        const tokens = [token];
        while (token?.type !== TokenType.EOF) {
            token=this.nextToken()
            tokens.push(token);
        }
        return tokens
    }
}
