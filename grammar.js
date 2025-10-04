/**
 * @file Razen grammar for tree-sitter
 * @author Razen Team
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
  primary: 8,
  unary: 7,
  power: 6,
  multiplicative: 5,
  additive: 4,
  shift: 3,
  bitwise_and: 2,
  bitwise_xor: 1,
  bitwise_or: 0,
  comparative: -1,
  and: -2,
  or: -3,
  ternary: -4,
  assign: -5,
};

module.exports = grammar({
  name: 'razen',

  extras: $ => [
    $.comment,
    /\s/,
  ],

  word: $ => $.identifier,

  conflicts: $ => [
    [$.unary_expression, $.update_expression],
  ],

  rules: {
    source_file: $ => repeat($._statement),

    // Comments
    comment: $ => token(choice(
      seq('//', /.*/),
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/'),
    )),

    // Statements
    _statement: $ => choice(
      $.variable_declaration,
      $.constant_declaration,
      $.function_declaration,
      $.struct_declaration,
      $.enum_declaration,
      $.impl_block,
      $.type_alias,
      $.module_declaration,
      $.use_statement,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.match_statement,
      $.try_statement,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
      $.throw_statement,
      $.expression_statement,
      $.block,
    ),

    // Declarations
    variable_declaration: $ => seq(
      optional($.pub),
      'var',
      $.identifier,
      optional(seq(':', $._type)),
      optional(seq('=', $._expression)),
      ';',
    ),

    constant_declaration: $ => seq(
      optional($.pub),
      'const',
      $.identifier,
      optional(seq(':', $._type)),
      '=',
      $._expression,
      ';',
    ),

    function_declaration: $ => seq(
      optional($.pub),
      'fun',
      field('name', $.identifier),
      field('parameters', $.parameter_list),
      optional(seq('->', field('return_type', $._type))),
      field('body', $.block),
    ),

    parameter_list: $ => seq(
      '(',
      optional(seq(
        $.parameter,
        repeat(seq(',', $.parameter)),
        optional(','),
      )),
      ')',
    ),

    parameter: $ => choice(
      $.self,
      seq(
        $.identifier,
        ':',
        $._type,
      ),
    ),

    struct_declaration: $ => seq(
      optional($.pub),
      'struct',
      field('name', $.identifier),
      '{',
      repeat($.struct_field),
      '}',
    ),

    struct_field: $ => seq(
      optional($.pub),
      $.identifier,
      ':',
      $._type,
      ',',
    ),

    enum_declaration: $ => seq(
      optional($.pub),
      'enum',
      field('name', $.identifier),
      '{',
      repeat($.enum_variant),
      '}',
    ),

    enum_variant: $ => seq(
      $.identifier,
      optional(seq('(', commaSep($._type), ')')),
      ',',
    ),

    impl_block: $ => seq(
      'impl',
      field('type', $.identifier),
      '{',
      repeat($.function_declaration),
      '}',
    ),

    type_alias: $ => seq(
      optional($.pub),
      'type',
      $.identifier,
      '=',
      $._type,
      ';',
    ),

    module_declaration: $ => seq(
      'mod',
      $.identifier,
      choice(';', $.block),
    ),

    use_statement: $ => seq(
      'use',
      choice(
        $.identifier,
        seq($.identifier, '::', $.identifier),
        seq('from', $.identifier, 'use', commaSep1($.identifier)),
      ),
      optional(seq('as', $.identifier)),
      ';',
    ),

    // Control Flow
    if_statement: $ => seq(
      'if',
      field('condition', $._expression),
      field('consequence', $.block),
      repeat($.elif_clause),
      optional($.else_clause),
    ),

    elif_clause: $ => seq(
      'elif',
      field('condition', $._expression),
      field('consequence', $.block),
    ),

    else_clause: $ => seq(
      'else',
      field('body', $.block),
    ),

    while_statement: $ => seq(
      'while',
      field('condition', $._expression),
      field('body', $.block),
    ),

    for_statement: $ => seq(
      'for',
      $.identifier,
      'in',
      field('iterable', $._expression),
      field('body', $.block),
    ),

    match_statement: $ => seq(
      'match',
      field('value', $._expression),
      '{',
      repeat($.match_arm),
      '}',
    ),

    match_arm: $ => seq(
      $.pattern,
      '=>',
      choice($._expression, $.block),
      ',',
    ),

    pattern: $ => choice(
      $.identifier,
      $._literal,
      '_',
    ),

    try_statement: $ => seq(
      'try',
      $.block,
      repeat1($.catch_clause),
    ),

    catch_clause: $ => seq(
      'catch',
      optional(seq('(', $.identifier, ')')),
      $.block,
    ),

    return_statement: $ => seq(
      'return',
      optional($._expression),
      ';',
    ),

    break_statement: $ => seq('break', ';'),

    continue_statement: $ => seq('continue', ';'),

    throw_statement: $ => seq(
      'throw',
      $._expression,
      ';',
    ),

    expression_statement: $ => seq($._expression, ';'),

    block: $ => seq(
      '{',
      repeat($._statement),
      '}',
    ),

    // Types
    _type: $ => choice(
      $.primitive_type,
      $.array_type,
      $.map_type,
      $.identifier,
    ),

    primitive_type: $ => choice(
      'int',
      'float',
      'str',
      'bool',
      'char',
      'any',
    ),

    array_type: $ => seq(
      'array',
      '<',
      $._type,
      '>',
    ),

    map_type: $ => seq(
      'map',
      '<',
      $._type,
      ',',
      $._type,
      '>',
    ),

    // Expressions
    _expression: $ => choice(
      $.identifier,
      $._literal,
      $.binary_expression,
      $.unary_expression,
      $.call_expression,
      $.index_expression,
      $.member_expression,
      $.assignment_expression,
      $.update_expression,
      $.ternary_expression,
      $.range_expression,
      $.array_literal,
      $.map_literal,
      $.parenthesized_expression,
      $.self,
    ),

    binary_expression: $ => {
      const table = [
        [PREC.or, '||'],
        [PREC.and, '&&'],
        [PREC.bitwise_or, '|'],
        [PREC.bitwise_xor, '^'],
        [PREC.bitwise_and, '&'],
        [PREC.comparative, choice('==', '!=', '<', '>', '<=', '>=')],
        [PREC.shift, choice('<<', '>>')],
        [PREC.additive, choice('+', '-')],
        [PREC.multiplicative, choice('*', '/', '%')],
        [PREC.power, '**'],
      ];

      return choice(...table.map(([precedence, operator]) =>
        prec.left(precedence, seq(
          field('left', $._expression),
          field('operator', operator),
          field('right', $._expression),
        )),
      ));
    },

    unary_expression: $ => prec(PREC.unary, seq(
      field('operator', choice('!', '-', '+', '~')),
      field('argument', $._expression),
    )),

    update_expression: $ => choice(
      prec.left(PREC.unary, seq($._expression, choice('++', '--'))),
      prec.right(PREC.unary, seq(choice('++', '--'), $._expression)),
    ),

    ternary_expression: $ => prec.right(PREC.ternary, seq(
      field('condition', $._expression),
      '?',
      field('consequence', $._expression),
      ':',
      field('alternative', $._expression),
    )),

    assignment_expression: $ => prec.right(PREC.assign, seq(
      field('left', choice($.identifier, $.member_expression, $.index_expression)),
      field('operator', choice(
        '=', '+=', '-=', '*=', '/=', '%=',
        '&=', '|=', '^=', '<<=', '>>=',
      )),
      field('right', $._expression),
    )),

    call_expression: $ => prec(PREC.primary, seq(
      field('function', choice($.identifier, $.member_expression)),
      field('arguments', $.argument_list),
    )),

    argument_list: $ => seq(
      '(',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression)),
        optional(','),
      )),
      ')',
    ),

    member_expression: $ => prec(PREC.primary, seq(
      field('object', $._expression),
      '.',
      field('property', $.identifier),
    )),

    index_expression: $ => prec(PREC.primary, seq(
      field('object', $._expression),
      '[',
      field('index', $._expression),
      ']',
    )),

    range_expression: $ => choice(
      prec.left(PREC.comparative, seq($._expression, '..', $._expression)),
      prec.left(PREC.comparative, seq($._expression, '..=', $._expression)),
    ),

    array_literal: $ => seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression)),
        optional(','),
      )),
      ']',
    ),

    map_literal: $ => prec(1, seq(
      '{',
      seq(
        $.map_entry,
        repeat(seq(',', $.map_entry)),
        optional(','),
      ),
      '}',
    )),

    map_entry: $ => seq(
      field('key', $._expression),
      ':',
      field('value', $._expression),
    ),

    parenthesized_expression: $ => seq('(', $._expression, ')'),

    // Literals
    _literal: $ => choice(
      $.integer_literal,
      $.float_literal,
      $.string_literal,
      $.fstring_literal,
      $.boolean_literal,
      $.null_literal,
    ),

    integer_literal: $ => token(seq(
      optional(choice('0x', '0b', '0o')),
      /[0-9][0-9_]*/,
    )),

    float_literal: $ => token(seq(
      /[0-9][0-9_]*/,
      '.',
      /[0-9][0-9_]*/,
      optional(seq(/[eE]/, optional(/[+-]/), /[0-9]+/)),
    )),

    string_literal: $ => seq(
      '"',
      repeat(choice(
        token.immediate(prec(1, /[^"\\]+/)),
        $.escape_sequence,
      )),
      '"',
    ),

    fstring_literal: $ => seq(
      'f"',
      repeat(choice(
        token.immediate(prec(1, /[^"{\\]+/)),
        $.fstring_interpolation,
        $.escape_sequence,
      )),
      '"',
    ),

    fstring_interpolation: $ => seq(
      '{',
      $._expression,
      '}',
    ),

    escape_sequence: $ => token.immediate(seq(
      '\\',
      choice(
        /[nrt\\'"]/,
        /x[0-9a-fA-F]{2}/,
        /u[0-9a-fA-F]{4}/,
        /U[0-9a-fA-F]{8}/,
      ),
    )),

    boolean_literal: $ => choice('true', 'false'),

    null_literal: $ => 'null',

    // Keywords and identifiers
    pub: $ => 'pub',

    self: $ => 'self',

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,
  },
});

function commaSep(rule) {
  return optional(commaSep1(rule));
}

function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}
