; Tags for code navigation

; Function definitions
(function_declaration
  name: (identifier) @name) @definition.function

; Struct definitions
(struct_declaration
  name: (identifier) @name) @definition.class

; Enum definitions
(enum_declaration
  name: (identifier) @name) @definition.enum

; Type aliases
(type_alias
  (identifier) @name) @definition.type

; Function calls
(call_expression
  function: (identifier) @name) @reference.call

; Member function calls
(call_expression
  function: (member_expression
    property: (identifier) @name)) @reference.call
