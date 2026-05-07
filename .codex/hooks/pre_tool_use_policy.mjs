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

const getCommand = (input) => {
  const toolInput = input.tool_input ?? {}

  return String(toolInput.command ?? toolInput.cmd ?? '')
}

const deny = (reason) => {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason,
      },
    }),
  )
}

const input = await parseInput()
const command = getCommand(input)

const deniedPatterns = [
  {
    pattern: /\bgit\s+push\b/,
    reason:
      'このリポジトリでは SSH passphrase が必要な push はユーザーが実行します。Codex は push せず、必要なコマンドをユーザーに依頼してください。',
  },
  {
    pattern: /\bgit\s+reset\s+--hard\b/,
    reason: 'git reset --hard は作業中の変更を破棄するため、Codex からは実行しません。',
  },
  {
    pattern: /\bgit\s+checkout\s+--\b/,
    reason: 'git checkout -- は作業中の変更を破棄するため、Codex からは実行しません。',
  },
  {
    pattern: /\bgit\s+clean\s+-[^\s]*[fd][^\s]*\b/,
    reason: 'git clean は未追跡ファイルを削除するため、Codex からは実行しません。',
  },
  {
    pattern: /\brm\s+-[^\s]*r[^\s]*f|\brm\s+-[^\s]*f[^\s]*r/,
    reason: 'rm -rf は広範囲の削除につながるため、Codex からは実行しません。',
  },
]

const denied = deniedPatterns.find(({ pattern }) => pattern.test(command))

if (denied) {
  deny(denied.reason)
}
