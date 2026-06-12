// i18n — strings do redesign "a Linha" (PT/EN)
// Identidade: William Galleti — desenvolvedor freelancer.
// "Todo problema é um nó. Eu desato com código."

const WHATS_PT = 'https://wa.me/5565999448004?text=' + encodeURIComponent('Olá William! Vim pelo site e quero te contar um problema.')
const WHATS_EN = 'https://wa.me/5565999448004?text=' + encodeURIComponent('Hi William! Found your site and I have a problem to tell you about.')

export const translations = {
  pt: {
    // Header / Nav
    navKnot: 'o nó',
    navProcess: 'como trabalho',
    navStack: 'stack',
    navAbout: 'quem sou',
    navCta: 'vamos conversar',
    tagline: 'tecnologia que resolve',

    // Hero
    heroEyebrow: 'william galleti — desenvolvedor · 15 anos desatando nós',
    heroTitle1: 'Todo problema é um nó.',
    heroTitle2: 'Eu desato com código.',
    heroDescription: 'Sistemas, apps e automações sob medida. Você me conta o problema no seu idioma — eu devolvo a solução funcionando. Sem jargão, sem enrolação.',
    heroCtaPrimary: 'Me conta seu problema',
    heroCtaSecondary: 'Ver como trabalho',
    heroLogoCaption: '// a marca reage ao seu mouse',
    heroStat1Num: '15+',
    heroStat1Label: 'anos de código',
    heroStat2Num: '50+',
    heroStat2Label: 'projetos entregues',
    heroStat3Num: '30+',
    heroStat3Label: 'clientes atendidos',

    // O nó
    knotEyebrow: 'o nó',
    knotTitle: 'Reconhece algum destes?',
    knotIntro: 'São os nós que mais chegam até mim — e como eu costumo desatá-los.',
    knot1Title: '"A operação inteira vive de planilha e WhatsApp"',
    knot1Desc: 'Construo o sistema que centraliza tudo: ERP, dashboard ou portal sob medida — moldado no seu processo, não num software genérico.',
    knot1Foot: '→ sistemas web · python, django, vue',
    knot2Title: '"O cliente pede um app e você só tem o balcão"',
    knot2Desc: 'App multiplataforma com Flutter: uma base de código, Android e iOS publicados na loja — sem pagar dois desenvolvimentos.',
    knot2Foot: '→ apps mobile · flutter, dart',
    knot3Title: '"Seu time perde horas todo dia na mesma tarefa"',
    knot3Desc: 'Automatizo o repetitivo: integrações entre sistemas, APIs e robôs de rotina. O boleto sai sozinho, o relatório chega pronto.',
    knot3Foot: '→ automação · apis, integrações',
    knot4Title: '"O sistema do antigo dev virou caixa-preta"',
    knot4Desc: 'Assumo, documento e modernizo código legado — sem parar a operação. Você volta a ter controle sobre o que é seu.',
    knot4Foot: '→ resgate técnico · consultoria',
    knot5Title: '"Cada deploy é um dia de tensão"',
    knot5Desc: 'Pipeline, monitoramento e infraestrutura que se cuida: publicar uma versão nova vira rotina de terça-feira, não evento.',
    knot5Foot: '→ cloud & devops · ci/cd',
    knotCtaTitle: 'Seu nó não está aqui?',
    knotCtaDesc: 'Me conta mesmo assim. Se eu não for a pessoa certa para resolver, te digo quem é — de graça.',
    knotCtaLink: '→ contar meu problema',

    // A linha
    lineEyebrow: 'a linha',
    lineTitle: 'Como eu trabalho',
    line1Title: 'Você me conta o problema',
    line1Desc: 'Uma conversa franca, no seu idioma. Sem formulário de 40 campos, sem call de vendas com slide.',
    line2Title: 'Eu desenho a solução',
    line2Desc: 'Proposta clara: escopo, prazo e preço fechados. Você sabe exatamente o que recebe antes de pagar.',
    line3Title: 'Entrego e fico por perto',
    line3Desc: 'Entregas semanais que você acompanha funcionando. Depois do lançamento, eu mantenho — o nó não volta.',

    // Stack
    stackEyebrow: 'as ferramentas',
    stackTitle: 'Stack escolhida por resultado, não por moda',

    // About
    aboutEyebrow: 'quem desata',
    aboutLocation: 'mato grosso, brasil',
    aboutTitle1: 'Sou o William.',
    aboutTitle2: 'Você fala direto comigo.',
    aboutBio1: 'Desenvolvedor de software há mais de 15 anos. Já construí ERPs para indústria, apps para o varejo e automações para times que perdiam noites com trabalho manual.',
    aboutBio2: 'Atendo poucos clientes por vez, por escolha: aqui não há camadas nem telefone sem fio — quem entende seu problema é quem escreve o código, da primeira conversa ao deploy. Atendo remoto, qualquer fuso.',
    aboutPhotoPlaceholder: 'sua foto',

    // Contact
    contactEyebrow: 'o próximo nó',
    contactTitle1: 'Me conta',
    contactTitle2: 'seu problema',
    contactDesc: 'A primeira conversa é grátis e sem compromisso. Se eu não for a pessoa certa, te aponto quem é.',
    contactCta: 'Chamar no WhatsApp',
    terminalTitle: 'wgalleti — terminal',
    terminalCommand: 'wgalleti resolve --novo',
    terminalPrompt: '> descreva o nó:',
    terminalSuccess: '✓ isso tem solução — me chama no whatsapp',

    // Experimentos (link discreto)
    productsEyebrow: 'curiosidade',
    productsTitle: 'Algumas coisas que já construí',
    productsDesc: 'Se quiser xeretar, tem uma vitrine separada com cases — sistemas, apps e experimentos.',
    productsCta: 'ver o que já saiu da prancheta →',

    // Footer
    footerCopyright: '© 2026 william galleti · cnpj 50.326.042/0001-95',

    // Whatsapp
    whatsappUrl: WHATS_PT,

    // Product page (legado, manter)
    close: 'Fechar',
    next: 'Próximo',
    prev: 'Anterior',
  },

  en: {
    navKnot: 'the knot',
    navProcess: 'how I work',
    navStack: 'stack',
    navAbout: 'about',
    navCta: "let's talk",
    tagline: 'technology that solves',

    heroEyebrow: 'william galleti — developer · 15 years untying knots',
    heroTitle1: 'Every problem is a knot.',
    heroTitle2: 'I untie it with code.',
    heroDescription: 'Custom systems, apps and automation. Tell me your problem in plain words — I hand back a working solution. No jargon, no runaround.',
    heroCtaPrimary: 'Tell me your problem',
    heroCtaSecondary: 'See how I work',
    heroLogoCaption: '// the mark reacts to your mouse',
    heroStat1Num: '15+',
    heroStat1Label: 'years of code',
    heroStat2Num: '50+',
    heroStat2Label: 'projects shipped',
    heroStat3Num: '30+',
    heroStat3Label: 'clients served',

    knotEyebrow: 'the knot',
    knotTitle: 'Recognize any of these?',
    knotIntro: 'The knots that land on my desk most often — and how I usually untie them.',
    knot1Title: '"The whole operation runs on spreadsheets and WhatsApp"',
    knot1Desc: "I build the system that centralizes everything: a custom ERP, dashboard or portal — shaped around your process, not a generic product.",
    knot1Foot: '→ web systems · python, django, vue',
    knot2Title: '"Customers ask for an app and all you have is a counter"',
    knot2Desc: 'Cross-platform app with Flutter: one codebase, Android and iOS in the stores — without paying for two builds.',
    knot2Foot: '→ mobile apps · flutter, dart',
    knot3Title: '"Your team loses hours every day to the same task"',
    knot3Desc: 'I automate the repetitive: system integrations, APIs and routine bots. Invoices go out on their own, reports arrive ready.',
    knot3Foot: '→ automation · apis, integrations',
    knot4Title: '"The previous dev\'s system became a black box"',
    knot4Desc: "I take over, document and modernize legacy code — without stopping the operation. You regain control of what's yours.",
    knot4Foot: '→ technical rescue · consulting',
    knot5Title: '"Every deploy is a day of tension"',
    knot5Desc: 'Pipelines, monitoring and infrastructure that takes care of itself: shipping a new version becomes a Tuesday routine, not an event.',
    knot5Foot: '→ cloud & devops · ci/cd',
    knotCtaTitle: "Your knot isn't here?",
    knotCtaDesc: "Tell me anyway. If I'm not the right person to solve it, I'll point you to who is — for free.",
    knotCtaLink: '→ tell my problem',

    lineEyebrow: 'the line',
    lineTitle: 'How I work',
    line1Title: 'You tell me the problem',
    line1Desc: 'A frank conversation, in plain words. No 40-field form, no sales call with slides.',
    line2Title: 'I design the solution',
    line2Desc: 'A clear proposal: fixed scope, deadline and price. You know exactly what you get before you pay.',
    line3Title: 'I deliver and stick around',
    line3Desc: "Weekly deliveries you can watch working. After launch I maintain it — the knot doesn't come back.",

    stackEyebrow: 'the tools',
    stackTitle: 'A stack picked for results, not hype',

    aboutEyebrow: 'who unties',
    aboutLocation: 'mato grosso, brazil',
    aboutTitle1: "I'm William.",
    aboutTitle2: 'You talk directly to me.',
    aboutBio1: "Software developer for over 15 years. I've built ERPs for industry, apps for retail and automations for teams losing their nights to manual work.",
    aboutBio2: "I take on few clients at a time, by choice: there are no layers here — the person who understands your problem is the one writing the code, from first chat to deploy. Remote, any timezone.",
    aboutPhotoPlaceholder: 'your photo',

    contactEyebrow: 'the next knot',
    contactTitle1: 'Tell me',
    contactTitle2: 'your problem',
    contactDesc: "The first conversation is free, no strings attached. If I'm not the right person, I'll point you to who is.",
    contactCta: 'Message me on WhatsApp',
    terminalTitle: 'wgalleti — terminal',
    terminalCommand: 'wgalleti solve --new',
    terminalPrompt: '> describe the knot:',
    terminalSuccess: "✓ that's solvable — ping me on whatsapp",

    productsEyebrow: 'curiosity',
    productsTitle: 'A few things I have built',
    productsDesc: "If you want to peek, there's a separate gallery with cases — systems, apps and experiments.",
    productsCta: "see what's left the drawing board →",

    footerCopyright: '© 2026 william galleti · cnpj 50.326.042/0001-95',

    whatsappUrl: WHATS_EN,

    close: 'Close',
    next: 'Next',
    prev: 'Previous',
  },
}

// Terminal phrases — used by Contact section
export const terminalPhrases = {
  pt: [
    'minha loja ainda controla estoque no caderno',
    'preciso de um app pra ontem',
    'o sistema cai toda sexta às 18h',
    'quero parar de digitar nota fiscal na mão',
  ],
  en: [
    'my store still tracks inventory in a notebook',
    'I need an app for yesterday',
    'the system crashes every Friday at 6pm',
    'I want to stop typing invoices by hand',
  ],
}

export const getTranslation = (lang, key) => {
  const langData = translations[lang] || translations.pt
  return langData[key] !== undefined ? langData[key] : key
}

export const useI18n = (lang) => {
  return {
    t: (key) => getTranslation(lang, key),
  }
}
