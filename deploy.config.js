// Single source of truth para o deploy via SSH.
// Mudar host/usuário/domínios aqui — nunca em package.json.

export default {
  ssh: {
    host: '185.239.210.193',
    port: 65002,
    user: 'u625816484',
    // identityFile: '~/.ssh/hostinger_id', // opcional — usa a chave default se omitido
  },

  source: 'dist/',

  rsync: {
    flags: ['-avz', '--delete'],
    excludes: ['.well-known', '.htaccess'],
  },

  // remotePath é derivado de ssh.user + domain via convenção Hostinger
  // (/home/<user>/domains/<domain>/public_html/). Para sobrescrever em um
  // target específico, defina `remotePath` explicitamente.
  targets: [
    { name: 'tech',  domain: 'wgalleti.tech' },
    { name: 'io',    domain: 'wgalleti.io' },
    { name: 'cloud', domain: 'wgalleti.cloud' },
  ],
}
