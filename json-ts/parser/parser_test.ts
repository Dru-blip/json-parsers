import { assertEquals } from "@std/assert";
import { Lexer } from "../lexer/lexer.ts";
import { NodeType } from "./ast.ts";
import { Parser } from "./parser.ts";

Deno.test(function TestParsePrimitive() {
  const source = "3";
  const lexer = new Lexer(source);
  const parser = new Parser(lexer);

  const expected = { value: 3, type: NodeType.NUMBER };
  // const got = parser.parse();
  // assertEquals(expected.value, got.value);
});
