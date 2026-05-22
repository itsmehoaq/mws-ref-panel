export function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 10).padEnd(8, "0")
}

const ANTI_SPAM_SUBCMDS = ["map", "mods", "timer", "start"]

export function withAntiSpam(cmd: string): string {
  const trimmed = cmd.trimEnd()
  const sub = trimmed.match(/^!mp\s+(\w+)/i)?.[1]?.toLowerCase()
  return sub && ANTI_SPAM_SUBCMDS.includes(sub) ? `${trimmed} ${randomSuffix()}` : trimmed
}
