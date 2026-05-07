import { spawnSync } from 'node:child_process'

const readStdin = async () => {
  const chunks = []

  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks).toString('utf8')
}

const parseInput = async () => {
  const rawInput = await readStdin()

  if (rawInput.trim() === '') {
    return {}
  }

  return JSON.parse(rawInput)
}

const run = (command, args, cwd, timeout = 120_000) => {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    timeout,
  })
  const failedToStart = result.status === null && result.error

  return {
    label: [command, ...args].join(' '),
    status: result.status ?? (failedToStart ? 1 : 0),
    output: [result.stdout, result.stderr].filter(Boolean).join('\n').trim(),
    error: failedToStart ? result.error : undefined,
  }
}

const getLines = (output) =>
  output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

const getChangedFiles = (cwd) => {
  const tracked = run('git', ['diff', '--name-only', '--diff-filter=ACMRTUXB', 'HEAD'], cwd)
  const untracked = run('git', ['ls-files', '--others', '--exclude-standard'], cwd)

  return [...getLines(tracked.output), ...getLines(untracked.output)]
}

const isRelevantChange = (file) =>
  /^(src\/|learning-checks\/|skills\/|\.codex\/|index\.html$|package\.json$|package-lock\.json$|tsconfig\.json$|eslint\.config\.js$|README\.md$|\.prettierrc\.json$|\.prettierignore$)/.test(
    file,
  )

const formatFailure = (checks) =>
  checks
    .filter((check) => check.status !== 0 || check.error)
    .map((check) => {
      const output = check.error ? String(check.error) : check.output
      const trimmedOutput = output.length > 3000 ? `${output.slice(0, 3000)}\n...` : output

      return `- ${check.label}\n${trimmedOutput}`
    })
    .join('\n\n')

const continueNormally = () => {
  process.stdout.write(JSON.stringify({ continue: true }))
}

const requestContinuation = (reason) => {
  process.stdout.write(
    JSON.stringify({
      decision: 'block',
      reason,
    }),
  )
}

const input = await parseInput()
const cwd = input.cwd ?? process.cwd()
const changedFiles = getChangedFiles(cwd)

if (!changedFiles.some(isRelevantChange)) {
  continueNormally()
  process.exit(0)
}

const checks = [
  run('npm', ['run', 'format:check'], cwd),
  run('npm', ['run', 'lint'], cwd),
  run('npm', ['run', 'typecheck'], cwd),
  run('npm', ['run', 'build'], cwd, 180_000),
]

if (checks.some((check) => check.status !== 0 || check.error)) {
  requestContinuation(
    `Codex hooks の品質ゲートが失敗しました。失敗したチェックを修正してから最終回答してください。\n\n${formatFailure(
      checks,
    )}`,
  )
  process.exit(0)
}

continueNormally()
