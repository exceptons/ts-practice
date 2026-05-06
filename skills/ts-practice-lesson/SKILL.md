---
name: ts-practice-lesson
description: Use when adding or continuing TypeScript learning exercises in the ts-practice repository. Follow a workflow-focused process: read the current code first, design one focused learning theme per commit, preserve implementation flexibility, verify with typecheck/build, and leave push to the user when SSH passphrase is involved.
---

# ts-practice Lesson Workflow

Use this skill when adding, continuing, or reviewing a TypeScript learning exercise in the `ts-practice` repository.

## Core Principle

Do not force a fixed UI or file pattern. The goal is to add one focused, verifiable TypeScript learning step that fits the current codebase.

## Workflow

1. Inspect the current state before designing the exercise:
   - `git status --short --branch`
   - recent `git log --oneline --decorate`
   - relevant source files under `src/`
   - existing exercise files under `src/exercises/`

2. Design one learning theme per commit.
   - Keep the theme narrow enough to explain and test.
   - Prefer examples that build on prior lessons.
   - Avoid mixing unrelated TypeScript concepts in one commit.

3. Prefer adding focused exercise code under `src/exercises/`.
   - Add or update UI wiring only when visual feedback helps learning.
   - Keep UI changes consistent with existing patterns.
   - Do not require every lesson to modify `main.ts` or `style.css` if a pure TypeScript exercise is clearer.

4. Preserve local project rules.
   - Do not track `docs/`.
   - Do not commit generated `dist/`.
   - Keep SSH passphrase operations with the user; ask the user to run `git push` when needed.

5. Verify before commit:
   - `npm run typecheck`
   - `npm run build`
   - If a dev server is relevant and running, optionally check `curl -I http://localhost:5173/`.

6. Review the diff before commit:
   - `git diff --stat`
   - `git status --short --branch`
   - Confirm only the intended learning theme changed.

7. Commit one coherent learning step.
   - Use a concise commit message such as `Add {topic} exercise`.
   - After commit, report the commit hash and ask the user to push when needed.

## Quality Gate

Do not finish an exercise as complete unless:

- The code matches the current repository style.
- The concept can be explained to the learner in a few sentences.
- TypeScript checks pass.
- Build passes.
- The working tree is clean except for intentional uncommitted user changes.

## Teaching Follow-up

After adding an exercise, be ready to:

- Explain the new TypeScript concepts from the actual code.
- Ask short understanding-check questions.
- Correct misunderstandings with precise examples.
