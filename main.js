import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const dark = ref(false)
    const toggleTheme = () => {
      dark.value = !dark.value
      document.documentElement.classList.toggle('dark', dark.value)
    }

    return {
      name: 'William Galleti',
      title: 'Estrategista de Sistemas',
      description: 'Crio sistemas que otimizam processos, automatizam tarefas e liberam equipes para focar no que realmente importa.',
      specialties: [
        '🔧 Desenvolvimento Full Stack com Nuxt3 e Django',
        '⚙️ Automação com Celery e integração de sistemas',
        '🧠 Arquitetura orientada a impacto e performance',
        '🚀 Projetos com foco em produtividade e ROI'
      ],
      contactEmail: 'william.galleti@gmail.com',
      toggleTheme
    }
  },
  template: `
    <div class='p-4 text-right'>
      <button @click='toggleTheme' class='px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition'>Alternar Tema</button>
    </div>

    <header class='bg-white dark:bg-gray-900 shadow p-6 sticky top-0 z-50'>
      <div class='max-w-6xl mx-auto flex justify-between items-center'>
        <h1 class='text-3xl font-bold gradient-text dark:text-white'>{{ name }}</h1>
        <span class='text-blue-600 dark:text-cyan-400 font-semibold'>{{ title }}</span>
      </div>
    </header>

    <section class='relative bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-800 dark:to-gray-700 py-20 px-6'>
      <div class='max-w-6xl mx-auto text-center'>
        <h2 class='text-4xl font-bold mb-4 gradient-text'>Soluções que Transformam</h2>
        <p class='text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto'>{{ description }}</p>
        <lottie-player src='https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json' background='transparent' speed='1' style='width: 300px; height: 300px; margin: 0 auto;' loop autoplay></lottie-player>
      </div>
    </section>

    <section class='max-w-6xl mx-auto mt-12 px-6'>
      <div class='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md' data-sr>
        <h2 class='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>Especialidades</h2>
        <ul class='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 dark:text-gray-200'>
          <li v-for='item in specialties' :key='item'>{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class='max-w-6xl mx-auto mt-12 px-6'>
      <div class='bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between' data-sr>
        <div>
          <h3 class='text-xl font-semibold'>Quer otimizar seus processos?</h3>
          <p class='text-sm mt-1'>Vamos conversar sobre como posso agregar ao seu projeto ou negócio.</p>
        </div>
        <a :href='"mailto:" + contactEmail' class='mt-4 md:mt-0 inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition'>Entrar em Contato</a>
      </div>
    </section>

    <section class='max-w-6xl mx-auto mt-12 px-6'>
      <form class='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md space-y-4' name='contact' netlify>
        <h2 class='text-xl font-semibold text-gray-900 dark:text-white'>Envie uma mensagem</h2>
        <input class='w-full p-2 rounded border dark:bg-gray-700 dark:text-white' name='name' placeholder='Seu nome' required />
        <input class='w-full p-2 rounded border dark:bg-gray-700 dark:text-white' name='email' type='email' placeholder='Seu e-mail' required />
        <textarea class='w-full p-2 rounded border dark:bg-gray-700 dark:text-white' name='message' placeholder='Sua mensagem...' rows='4' required></textarea>
        <button class='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700' type='submit'>Enviar</button>
      </form>
    </section>

    <footer class='mt-20 p-6 text-center text-sm text-gray-500 dark:text-gray-400'>
      &copy; 2025 {{ name }}. Todos os direitos reservados.
    </footer>
  `
}).mount('#app')

ScrollReveal().reveal('[data-sr]', {
  distance: '40px',
  duration: 800,
  easing: 'ease-in-out',
  origin: 'bottom',
  interval: 100
})
