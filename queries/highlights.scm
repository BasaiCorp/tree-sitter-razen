; Function calls
(call_expression
  function: (identifier) @function.call)

(call_expression
  function: (member_expression
    property: (identifier) @function.method.call))

; Built-in functions
((identifier) @function.builtin
  (#match? @function.builtin "^(print|println|input|read|write|open|close)$"))

; Function definitions
(function_declaration
  name: (identifier) @function)

; Struct and type definitions
(struct_declaration
  name: (identifier) @type)

(enum_declaration
  name: (identifier) @type)

(impl_block
  type: (identifier) @type)

(type_alias
  (identifier) @type)

; Variables and constants
(variable_declaration
  (identifier) @variable)

(constant_declaration
  (identifier) @constant)

; Parameters
(parameter
  (identifier) @variable.parameter)

; Struct fields
(struct_field
  (identifier) @property)

; Enum variants
(enum_variant
  (identifier) @constant)

; Member access
(member_expression
  property: (identifier) @property)

; Identifiers
(identifier) @variable

; Operators
[
  "+"
  "-"
  "*"
  "/"
  "%"
  "**"
  "=="
  "!="
  "<"
  ">"
  "<="
  ">="
  "&&"
  "||"
  "!"
  "&"
  "|"
  "^"
  "~"
  "<<"
  ">>"
  "="
  "+="
  "-="
  "*="
  "/="
  "%="
  "&="
  "|="
  "^="
  "<<="
  ">>="
  "++"
  "--"
  "?"
  ".."
  "..="
] @operator

; Keywords
[
  "const"
  "var"
  "fun"
  "type"
  "struct"
  "enum"
  "impl"
  "if"
  "else"
  "elif"
  "while"
  "for"
  "in"
  "match"
  "return"
  "break"
  "continue"
  "try"
  "catch"
  "throw"
  "mod"
  "use"
  "from"
  "as"
] @keyword

; Visibility and special
(pub) @keyword
(self) @variable.builtin

; Types
[
  "int"
  "float"
  "str"
  "bool"
  "char"
  "any"
  "array"
  "map"
] @type.builtin

; Literals
(integer_literal) @number
(float_literal) @number.float
(string_literal) @string
(fstring_literal) @string
(escape_sequence) @string.escape
(boolean_literal) @boolean
(null_literal) @constant.builtin

; Comments
(comment) @comment

; Punctuation
[
  "("
  ")"
  "["
  "]"
  "{"
  "}"
] @punctuation.bracket

[
  ","
  ";"
  ":"
  "::"
] @punctuation.delimiter

"." @punctuation.delimiter

[
  "->"
  "=>"
] @punctuation.special
