#!/usr/bin/env node
// Deploy via SSH/rsync.
//
// Uso:
//   node scripts/deploy.mjs                 # publica todos os targets (não rebuilda)
//   node scripts/deploy.mjs --build         # rebuilda e publica todos
//   node scripts/deploy.mjs tech io         # publica só os targets nomeados
//   node scripts/deploy.mjs --dry-run       # mostra o que seria enviado, sem mudar nada
//   node scripts/deploy.mjs --parallel      # roda os rsyncs concorrentes

import { spawn } from 'node:child_process'
import { parseArgs } from 'node:util'
import config from '../deploy.config.js'

const { values, positionals } = parseArgs({
  options: {
    build: { type: 'boolean' },
    parallel: { type: 'boolean' },
    'dry-run': { type: 'boolean' },
    help: { type: 'boolean', short: 'h' },
  },
  allowPositionals: true,
})

if (values.help) {
  console.log(`
Uso: node scripts/deploy.mjs [opções] [targets...]

Opções:
  --build       Roda 'yarn build' antes de publicar.
  --parallel    Executa os rsyncs em paralelo (mistura output).
  --dry-run     Não envia nada — só lista o que mudaria.
  -h, --help    Mostra esta ajuda.

Targets disponíveis: ${config.targets.map((t) => t.name).join(', ')}
Sem targets nomeados, publica em todos.
`)
  process.exit(0)
}

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${cmd} exited with code ${code}`))
    })
  })

const remotePathFor = (target) =>
  target.remotePath ?? `/home/${config.ssh.user}/domains/${target.domain}/public_html/`

const sshCommand = () => {
  const parts = ['ssh', '-p', String(config.ssh.port)]
  if (config.ssh.identityFile) parts.push('-i', config.ssh.identityFile)
  return parts.join(' ')
}

const rsyncArgsFor = (target) => [
  ...config.rsync.flags,
  ...(values['dry-run'] ? ['--dry-run'] : []),
  ...config.rsync.excludes.map((e) => `--exclude=${e}`),
  '-e', sshCommand(),
  config.source,
  `${config.ssh.user}@${config.ssh.host}:${remotePathFor(target)}`,
]

const allNames = config.targets.map((t) => t.name)
const unknown = positionals.filter((p) => !allNames.includes(p))
if (unknown.length) {
  console.error(`Target(s) desconhecido(s): ${unknown.join(', ')}`)
  console.error(`Disponíveis: ${allNames.join(', ')}`)
  process.exit(1)
}

const selected = positionals.length
  ? config.targets.filter((t) => positionals.includes(t.name))
  : config.targets

const deployOne = async (target) => {
  console.log(`\n→ ${target.name} (${target.domain})`)
  await run('rsync', rsyncArgsFor(target))
}

try {
  if (values.build) {
    console.log('→ build')
    await run('yarn', ['build'])
  }

  if (values.parallel) {
    await Promise.all(selected.map(deployOne))
  } else {
    for (const t of selected) {
      await deployOne(t)
    }
  }

  console.log(`\n✓ ${selected.length} target(s) publicado(s)`)
} catch (err) {
  console.error(`\n✗ deploy falhou: ${err.message}`)
  process.exit(1)
}
