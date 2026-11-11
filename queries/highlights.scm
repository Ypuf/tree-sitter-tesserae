(comment) @comment

(entry key: (key) @property)
(section "::" @punctuation.special path: (key) @title)
(environment "@" @punctuation.special name: (name) @label)

(string) @string
(escape_sequence) @string.escape
(reference "{" @punctuation.special (path) @variable "}" @punctuation.special)

(number) @number
(port) @number
(duration) @number
(size) @number
(colour) @constant
(boolean) @boolean

"=" @operator
"," @punctuation.delimiter
["[" "]"] @punctuation.bracket
