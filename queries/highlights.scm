; ============================================================================
; FUNCTIONS
; ============================================================================

; Function definitions
(function_declaration
  name: (identifier) @function.definition)

; Function calls
(call_expression
  function: (identifier) @function.call)

; Method calls
(call_expression
  function: (member_expression
    property: (identifier) @function.method.call))

; Built-in I/O functions
((identifier) @function.builtin
  (#match? @function.builtin "^(print|println|input|read|write|open|close)$"))

; ============================================================================
; TYPES & STRUCTURES
; ============================================================================

; Type definitions
(struct_declaration
  name: (identifier) @type.definition)

(enum_declaration
  name: (identifier) @type.definition)

(impl_block
  type: (identifier) @type)

(type_alias
  (identifier) @type.definition)

; Type in annotations  
(struct_field
  (identifier) @type
  (#not-eq? @type "pub"))

(function_declaration
  return_type: (_) @type)

; ============================================================================
; VARIABLES & CONSTANTS
; ============================================================================

; Variable declarations
(variable_declaration
  (identifier) @variable.declaration)

; Constant declarations
(constant_declaration
  (identifier) @constant)

; Function parameters
(parameter
  (identifier) @variable.parameter)

; Struct field definitions
(struct_field
  (identifier) @variable.member)

; Enum variants
(enum_variant
  (identifier) @type.enum.variant)

; Member/property access
(member_expression
  property: (identifier) @property)

; Assignment left-hand side
(assignment_expression
  left: (identifier) @variable)

(assignment_expression
  left: (member_expression
    property: (identifier) @property))

; Generic identifiers (fallback)
(identifier) @variable

; ============================================================================
; OPERATORS
; ============================================================================

; Arithmetic
[
  "+"
  "-"
  "*"
  "/"
  "%"
] @operator.arithmetic

; Power operator
"**" @operator.arithmetic

; Comparison
[
  "=="
  "!="
  "<"
  ">"
  "<="
  ">="
] @operator.comparison

; Logical
[
  "&&"
  "||"
  "!"
] @operator.logical

; Bitwise
[
  "&"
  "|"
  "^"
  "~"
  "<<"
  ">>"
] @operator.bitwise

; Assignment
"=" @operator.assignment

; Compound assignment
[
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
] @operator.assignment

; Increment/Decrement
[
  "++"
  "--"
] @operator.increment

; Ternary
"?" @operator.ternary

; Range
[
  ".."
  "..="
] @operator.range

; ============================================================================
; KEYWORDS
; ============================================================================

; Declaration keywords
[
  "const"
  "var"
  "fun"
  "type"
] @keyword.declaration

; Structure keywords
[
  "struct"
  "enum"
  "impl"
] @keyword.type

; Control flow
[
  "if"
  "else"
  "elif"
  "while"
  "for"
  "in"
  "return"
  "break"
  "continue"
] @keyword.control.flow

; Pattern matching
"match" @keyword.control.conditional

; Exception handling
[
  "try"
  "catch"
  "throw"
] @keyword.control.exception

; Module system
[
  "mod"
  "use"
  "from"
  "as"
] @keyword.control.import

; Visibility modifier
(pub) @keyword.modifier

; Special identifiers
(self) @variable.builtin.self

; ============================================================================
; BUILT-IN TYPES
; ============================================================================

[
  "int"
  "float"
  "str"
  "bool"
  "char"
  "any"
] @type.builtin

[
  "array"
  "map"
] @type.builtin.collection

; ============================================================================
; LITERALS
; ============================================================================

; Numbers
(integer_literal) @number
(float_literal) @number.float

; Strings
(string_literal) @string

; F-strings
(fstring_literal) @string.special

; String escape sequences
(escape_sequence) @constant.character.escape

; F-string interpolation braces
(fstring_interpolation
  "{" @punctuation.special
  "}" @punctuation.special)

; Booleans
(boolean_literal) @boolean
[
  "true"
  "false"
] @boolean

; Null
(null_literal) @constant.builtin

; ============================================================================
; COMMENTS
; ============================================================================

(comment) @comment @spell

; ============================================================================
; PUNCTUATION
; ============================================================================

; Brackets
[
  "("
  ")"
] @punctuation.bracket.round

[
  "["
  "]"
] @punctuation.bracket.square

[
  "{"
  "}"
] @punctuation.bracket.curly

; Delimiters
"," @punctuation.delimiter.comma
";" @punctuation.delimiter.semicolon
"." @punctuation.delimiter.dot

; Separators
":" @punctuation.separator
"::" @punctuation.separator

; Arrows
"->" @punctuation.arrow
"=>" @punctuation.arrow

; ============================================================================
; SPECIAL PATTERNS
; ============================================================================

; Wildcard pattern in match
((pattern) @constant.builtin
  (#eq? @constant.builtin "_"))

; Match arms
(match_arm
  "=>" @punctuation.arrow)
