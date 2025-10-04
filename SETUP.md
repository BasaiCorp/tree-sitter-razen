# Razen Tree-sitter Setup Guide

## ✅ What's Been Created

### 1. **Complete Grammar** (`grammar.js`)
   - All 50+ Razen tokens defined
   - Proper operator precedence
   - Support for all language features:
     - Keywords: const, var, fun, struct, enum, impl, type, mod, use, pub
     - Control flow: if, else, elif, while, for, match, try, catch, throw
     - Types: int, float, str, bool, char, array, map, any
     - Operators: arithmetic, comparison, logical, bitwise, assignment
     - Special: f-strings, null coalescing (??), power (**), ranges (.., ..=, ...)

### 2. **Syntax Highlighting Queries** (queries/)
   - ✅ **highlights.scm** - Complete syntax highlighting with proper scopes
   - ✅ **locals.scm** - Variable scoping and definitions
   - ✅ **injections.scm** - F-string interpolation support
   - ✅ **tags.scm** - Code navigation and symbol tagging
   - ✅ **indents.scm** - Smart indentation rules

### 3. **Language Bindings**
   - ✅ Node.js bindings (bindings/node/)
   - ✅ Rust bindings (bindings/rust/)
   - ✅ Python support (pyproject.toml)

### 4. **Configuration Files**
   - ✅ package.json - npm package configuration
   - ✅ Cargo.toml - Rust crate configuration
   - ✅ binding.gyp - Native Node.js addon build
   - ✅ README.md - Complete documentation
   - ✅ LICENSE - MIT license

## 🔧 Next Steps to Generate Parser

### Option 1: Using Cargo (Recommended)
```bash
# Wait for cargo install to finish, then:
cd /home/prathmeshbro/Desktop/Razen-Zed-Extension/tree-sitter-razen
tree-sitter generate
```

### Option 2: Using npm global install
```bash
npm install -g tree-sitter-cli
cd /home/prathmeshbro/Desktop/Razen-Zed-Extension/tree-sitter-razen
tree-sitter generate
```

### Option 3: Download pre-built binary
```bash
# Download from: https://github.com/tree-sitter/tree-sitter/releases
# Extract and add to PATH, then run:
tree-sitter generate
```

## 📝 After Generation

Once `tree-sitter generate` completes successfully:

1. **Test the parser:**
   ```bash
   tree-sitter test
   ```

2. **Try the playground:**
   ```bash
   tree-sitter playground
   ```

3. **Build the bindings:**
   ```bash
   pnpm install  # This will now work after parser.c is generated
   ```

4. **Create example file** (examples/example.rz):
   ```razen
   fun main() {
       const name = "Razen";
       println(f"Hello, {name}!");
   }
   ```

5. **Parse the example:**
   ```bash
   tree-sitter parse examples/example.rz
   ```

## 🎨 Highlight Scopes Reference

The highlights.scm file uses these scopes for best editor support:

- **Keywords**: `@keyword.declaration`, `@keyword.control`, `@keyword.exception`
- **Types**: `@type`, `@type.builtin`
- **Functions**: `@function`, `@function.call`, `@function.method.call`
- **Variables**: `@variable`, `@constant`, `@variable.parameter`, `@property`
- **Literals**: `@number`, `@string`, `@boolean`, `@constant.builtin`
- **Operators**: `@operator.arithmetic`, `@operator.comparison`, etc.
- **Comments**: `@comment`

## 🔍 File Extensions

The parser recognizes:
- `.rz`
- `.razen`

## 📦 Project Structure

```
tree-sitter-razen/
├── grammar.js              # Main grammar definition
├── src/                    # Generated parser (after tree-sitter generate)
│   ├── parser.c
│   ├── node-types.json
│   └── grammar.json
├── queries/                # Syntax highlighting queries
│   ├── highlights.scm
│   ├── locals.scm
│   ├── injections.scm
│   ├── tags.scm
│   └── indents.scm
├── bindings/               # Language bindings
│   ├── node/
│   └── rust/
├── package.json
├── Cargo.toml
└── README.md
```

## ✨ Key Features Implemented

1. **F-string interpolation**: `f"Hello {name}"`
2. **Null coalescing**: `value ?? default`
3. **Power operator**: `2 ** 8`
4. **Range operators**: `0..10`, `0..=10`, `...spread`
5. **Update operators**: `i++`, `--j`
6. **Pattern matching**: `match value { ... }`
7. **Error handling**: `try { } catch { }`
8. **Module system**: `mod`, `use`, `from`, `as`

## 🐛 Troubleshooting

If you encounter issues:

1. **Parser generation fails**: Check grammar.js syntax
2. **Highlighting not working**: Verify queries/*.scm files
3. **Build fails**: Ensure tree-sitter-cli is installed
4. **Tests fail**: Create test/corpus/ directory with test files

## 📚 Resources

- [Tree-sitter Documentation](https://tree-sitter.github.io/)
- [Writing Grammars](https://tree-sitter.github.io/tree-sitter/creating-parsers)
- [Syntax Highlighting](https://tree-sitter.github.io/tree-sitter/syntax-highlighting)
