import { assertEquals } from "@std/assert";
import { Lexer } from "./lexer.ts";
import { TokenType } from "./token.ts";

Deno.test(function testScan() {
    const source =
        '{\
    "add":"add",\
    "array":[4]\
    }';
    const lexer = new Lexer(source);
    const expected = [
        { type: TokenType.LBRACE, literal: "{" },
        { type: TokenType.STRING, literal: "add" },
        { type: TokenType.COLON, literal: ":" },
        { type: TokenType.STRING, literal: "add" },
        { type: TokenType.COMMA, literal: "," },
        { type: TokenType.STRING, literal: "array" },
        { type: TokenType.COLON, literal: ":" },
        { type: TokenType.LSQRBR, literal: "[" },
        { type: TokenType.NUMBER, literal: "4" },
        { type: TokenType.RSQRBR, literal: "]" },
        { type: TokenType.RBRACE, literal: "}" },
    ];

    for (const test of expected) {
        const token = lexer.nextToken();
        assertEquals(test.type, token?.type);
        assertEquals(test.literal, token?.literal);
    }

    const token = lexer.nextToken();
    assertEquals(token?.type, TokenType.EOF);
});

Deno.test(function testScanLeftBrace() {
    const source = "{";
    const lexer = new Lexer(source);
    const token = lexer.nextToken();
    assertEquals(token?.type, TokenType.LBRACE);
});

Deno.test(function testScanRightBrace() {
    const source = "}";
    const lexer = new Lexer(source);
    const token = lexer.nextToken();
    assertEquals(token?.type, TokenType.RBRACE);
});

Deno.test(function testScanComma() {
    const source = ",";
    const lexer = new Lexer(source);
    const token = lexer.nextToken();
    assertEquals(token?.type, TokenType.COMMA);
});

Deno.test(function testScanString() {
    const source = '"hello"';
    const lexer = new Lexer(source);
    const token = lexer.nextToken();
    assertEquals(token?.type, TokenType.STRING);
    assertEquals(token?.literal, "hello");
});

Deno.test(function testScanNumber() {
    const source = "454";
    const lexer = new Lexer(source);
    const token = lexer.nextToken();
    assertEquals(token?.type, TokenType.NUMBER);
    assertEquals(token?.literal, "454");
});
