# tree-sitter-razen

[![CI](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/razen-lang/tree-sitter-razen)
[![npm](https://img.shields.io/npm/v/tree-sitter-razen)](https://www.npmjs.com/package/tree-sitter-razen)

Razen grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

## Features

This grammar supports all Razen language features including:

- **Keywords**: `const`, `var`, `fun`, `struct`, `enum`, `impl`, `type`, `mod`, `use`, `pub`
- **Control Flow**: `if`, `else`, `elif`, `while`, `for`, `in`, `match`, `return`, `break`, `continue`
- **Exception Handling**: `try`, `catch`, `throw`
- **Types**: `int`, `float`, `str`, `bool`, `char`, `array`, `map`, `any`
- **Operators**: All arithmetic, comparison, logical, bitwise, and assignment operators
- **Special Features**: 
  - F-strings with interpolation: `f"Hello {name}"`
  - Null coalescing: `??`
  - Power operator: `**`
  - Range operators: `..`, `..=`, `...`
  - Update operators: `++`, `--`
- **Comments**: Single-line (`//`) and multi-line (`/* */`)

## Installation

### npm

```bash
npm install tree-sitter-razen
```

### Cargo

```toml
[dependencies]
tree-sitter-razen = "0.1.0"
```

## Usage

### Node.js

```javascript
const Parser = require('tree-sitter');
const Razen = require('tree-sitter-razen');

const parser = new Parser();
parser.setLanguage(Razen);

const sourceCode = `
fun main() {
    const name = "World";
    println(f"Hello, {name}!");
}
`;

const tree = parser.parse(sourceCode);
console.log(tree.rootNode.toString());
```

### Rust

```rust
use tree_sitter::Parser;
use tree_sitter_razen::LANGUAGE;

fn main() {
    let mut parser = Parser::new();
    parser.set_language(&LANGUAGE.into()).unwrap();
    
    let source_code = r#"
        fun main() {
            const name = "World";
            println(f"Hello, {name}!");
        }
    "#;
    
    let tree = parser.parse(source_code, None).unwrap();
    println!("{}", tree.root_node().to_sexp());
}
```

## Development

### Prerequisites

- Node.js (v16+)
- tree-sitter-cli: `npm install -g tree-sitter-cli`

### Building

```bash
# Generate the parser
tree-sitter generate

# Test the parser
tree-sitter test

# Try the playground
tree-sitter playground
```

### Testing

```bash
# Run tests
tree-sitter test

# Parse a file
tree-sitter parse examples/example.rz
```

## Syntax Highlighting

This grammar includes comprehensive syntax highlighting queries:

- **highlights.scm**: Main syntax highlighting
- **locals.scm**: Local variable scoping
- **injections.scm**: Language injections (f-string interpolation)
- **tags.scm**: Symbol tagging for code navigation
- **indents.scm**: Indentation rules

## File Extensions

- `.rz`
- `.razen`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details.

## Related Projects

- [Razen Language](https://github.com/razen-lang/razen)
- [Tree-sitter](https://tree-sitter.github.io/)
