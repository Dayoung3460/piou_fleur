Analyse all current git changes and create multiple focused commits by grouping related changes together.

## Steps

1. Run `git status` and `git diff` to identify all unstaged and staged changes
2. Analyse the changes and group them by logical concern (e.g. feature additions, bug fixes, config changes, documentation updates, styling)
3. For each group, stage only the relevant files using `git add <files>`
4. Write a commit message following the template below, then commit
5. Repeat for each group until all changes are committed

## Commit Message Template

```
<type>: <subject>
```

Where `<type>` is one of:
- `feat` — a new feature
- `fix` — a bug fix
- `docs` — documentation changes (README, CLAUDE.md, locale messages, etc.)
- `style` — formatting/style-only changes (no logic changes)
- `refactor` — code changes that neither fix a bug nor add a feature
- `test` — adding or updating tests
- `chore` — build/config/dependency/maintenance tasks

## Commit Message Rules

- Use NZ English
- Use imperative mood (e.g., "Add observer role to database")
- Start subject with uppercase
- No trailing period
- Keep subject within 72 characters
- Do NOT group unrelated changes into one commit just to reduce the number of commits

## Example

If there are changes to a new gallery component, a locale message update, and a Sanity schema fix, create three separate commits:
- `feat: add gallery lightbox component`
- `docs: add KO/EN strings for gallery section`
- `fix: correct Sanity image schema field type`