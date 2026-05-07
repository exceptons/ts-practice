# ts-practice

TypeScript の基礎を実践しながら学ぶための学習用リポジトリです。

## 目的

- TypeScript の基本文法と型システムを学ぶ
- 非同期処理、API レスポンス、フォーム入力、コレクション処理を型付きで練習する
- 基礎が固まってから React / Vue などのフレームワークへ進む

## 技術スタック

- TypeScript
- Vite
- ESLint
- Prettier

## 開発

依存関係をインストール:

```bash
npm install
```

Vite の開発サーバーを起動:

```bash
npm run dev
```

TypeScript の型チェック:

```bash
npm run typecheck
```

ESLint:

```bash
npm run lint
```

Prettier の確認:

```bash
npm run format:check
```

Prettier で整形:

```bash
npm run format
```

本番ビルド:

```bash
npm run build
```

## 品質ゲート

Git の `pre-push` hook では Husky により次のチェックを実行します。

```bash
npm run typecheck
npm run build
```

Codex hooks は `.codex/config.toml` に設定しています。

- Codex からの `git push` や危険な破壊的コマンドをブロックする
- Codex のターン終了時に、関連ファイルの変更があれば `format:check` / `lint` / `typecheck` / `build` を確認する

## 学習内容

- 基本型、配列、オブジェクト
- optional / union type
- unknown と narrowing
- Promise / async / await
- API レスポンスとエラーハンドリング
- FormData とバリデーション
- map / filter / find / Record / Partial

## 理解度チェック

学習ごとの確認問題は `learning-checks/` に追加します。

## Codex Skill

このリポジトリには TypeScript 学習課題を追加するための Codex workflow skill を含めています:

- `skills/ts-practice-lesson/SKILL.md`

この skill は、現在のコードを読んでから課題を設計し、1 テーマ 1 commit で検証可能な演習を追加するための運用ルールです。

## 次にやること

1. API レスポンス型と fetch の練習を深める
2. 必要に応じて React または Vue を導入する
