import { Lexer } from "./lexer/lexer.ts";
import { Parser } from "./parser/parser.ts";

const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("examples/hello.json");

const source = decoder.decode(data);
const lexer = new Lexer(source);
const parser = new Parser(lexer);
const node = parser.parse();

console.log(node);
