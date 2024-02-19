# Commit Message Rules

This repository enforces specific rules for commit messages to maintain a consistent and meaningful commit history. Please follow the guidelines outlined below when creating commit messages.

## 1. Commit Type and Format

Commit messages must adhere to the following format:

```regex
^(feat|fix|ci|chore|docs|test|style|refactor|perf|build|revert)(\(.+?\))?: .{1,}$
```

-   **Valid Examples:**

    -   `feat: implement new feature`
    -   `fix(scope): resolve a bug`
    -   `docs: update documentation`

-   **Invalid Examples:**
    -   `feat - add new feature without colon`
    -   `chore(update): update without space after colon`
    -   `invalid message`

## 2. Message Length

Additionally, the length of the commit message should not exceed 88 characters. This helps maintain readability and ensures concise and focused commit messages.

-   **Valid Example:**

    -   `feat: implement new feature and resolve issues`

-   **Invalid Example:**
    -   `feat: implement a new feature and resolve several issues in the codebase, making improvements and addressing feedback`
