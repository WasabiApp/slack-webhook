# Github commit rules

```bash
<Type> [Scope]: "Message"
```

## Type

Must be one of the following mentioned below :

- `<build>`: Build related changes (eg: npm related/ adding external dependencies)
- `<chore>`: A code change that external user won't see (eg: change to .gitignore)
- `<docs>`: Documentation related changes
- `<feat>`: Introduction of a new feature
- `<fix>`: Resolve an issue directly linked to development (bugfixes)
- `<hotfix>`: Resolve an issue directly linked to production (patches)
- `<test>`: Add/Update test cases
- `<performance>`: Add code that improves performance
- `<refactor>`: Update for code for maintainability (clean code)

## Scope

Must be an array of nouns that represents the section of the codebase

```bash
<feat> [home, components]: Add login modal
<fix> [home, components]: Resolve issue with modal collapses
```

## Message

Should be imperative and should describe the commit with a clear message/keywords.

```bash
<feat> [home, components]: Add login button
<feat> [home, components]: Add login modal
<fix> [home, components]: Resolve issue with modal collapses
<chore> [home]: Move icons folder
<feat> [newsletter]: Add Newsletter component
<feat> [navbar]: Add navbar container
```
