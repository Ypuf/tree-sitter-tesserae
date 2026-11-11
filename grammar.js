/**
 * @file Typed config file format
 * @author Ypuf <ypuf@jpuf.xyz>
 * @license Apache-2.0
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "tesserae",

  extras: $ => [/[ \t\r]/, $.comment],

  rules: {
    source_file: $ => seq(repeat(seq(optional($._line), "\n")), optional($._line)),

    _line: $ => choice($.entry, $.environment, $.section),

    comment: $ => token(seq("//", /[^\n]*/)),

    entry: $ => seq(field("key", $.key), "=", field("value", $._value)),
    environment: $ => seq("@", optional(field("name", $.name))),
    section: $ => seq("::", optional(field("path", $.key))),

    key: $ => /[A-Za-z0-9_-]+(\/[A-Za-z0-9_-]+)*/,
    name: $ => /[A-Za-z0-9_-]+/,

    _value: $ => choice($._scalar, $.list),

    _scalar: $ => choice($.port, $.colour, $.boolean, $.number, $.duration, $.size, $.string),

    list: $ => seq(
      "[",
      optional(seq($._scalar, repeat(seq(",", $._scalar)))),
      "]"
    ),

    port: $ => /:[0-9]+/,
    colour: $ => /#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6})/,
    boolean: $ => choice("true", "false"),
    number: $ => /-?[0-9]+(\.[0-9]+)?/,
    duration: $ => /[0-9]+(\.[0-9]+)?(sec|min|hr|d|wk|mo|yr)/,
    size: $ => /[0-9]+(\.[0-9]+)?(KiB|MiB|GiB|TiB|kB|KB|MB|GB|TB|B)/,

    string: $ => seq(
      '"',
      repeat(choice($.string_content, $.escape_sequence, $.reference)),
      '"'
    ),
    string_content: $ => token.immediate(prec(1, /[^"\\{\n]+/)),
    escape_sequence: $ => token.immediate(/\\["\\{}]/),
    reference: $ => seq(
      token.immediate('{'),
      alias(token.immediate(/[A-Za-z0-9_\/-]+/), $.path),
      token.immediate('}')
    ),
  },
});
