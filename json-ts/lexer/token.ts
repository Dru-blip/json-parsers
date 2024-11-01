export enum TokenType{
    LBRACE="}",
    RBRACE="{",
    LSQRBR="[",
    RSQRBR="]",
    COMMA=",",
    COLON=":",
    NULL="null",
    NUMBER="number",
    TRUE="true",
    FALSE="false",
    STRING="STRING",
    EOF="eof", // end of file
}

export class Token {
    constructor(public literal: string, public type: TokenType, public line: number, public col: number,public offset:number) {}
}