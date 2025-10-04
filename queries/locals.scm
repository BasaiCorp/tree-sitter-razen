; Scopes
(source_file) @local.scope
(block) @local.scope
(function_declaration) @local.scope
(for_statement) @local.scope
(while_statement) @local.scope
(if_statement) @local.scope
(match_statement) @local.scope
(try_statement) @local.scope

; Definitions
(variable_declaration
  (identifier) @local.definition.variable)

(constant_declaration
  (identifier) @local.definition.constant)

(function_declaration
  name: (identifier) @local.definition.function)

(parameter
  (identifier) @local.definition.parameter)

(struct_declaration
  name: (identifier) @local.definition.type)

(enum_declaration
  name: (identifier) @local.definition.type)

(type_alias
  (identifier) @local.definition.type)

; References
(identifier) @local.reference
