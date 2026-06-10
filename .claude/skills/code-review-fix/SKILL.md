---
description: Code review with auto-fix in an isolated worktree.
agent: code-review-fix
---

## After the agent completes

1. Inspect the diffs between the worktree and the main working tree.
2. Apply approved changes to the main working tree.
3. Clean up the worktree:
   ```
   git worktree remove --force <worktreePath>
   git branch -d <worktreeBranch>
   ```
   Use the `worktreePath` and `worktreeBranch` values returned by the agent.