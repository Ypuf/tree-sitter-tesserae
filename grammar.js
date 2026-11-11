/**
 * @file Typed config file format
 * @author Ypuf <ypuf@jpuf.xyz>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "tesserae",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
