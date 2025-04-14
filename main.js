import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
  setup() {
    const dark = ref(false)
    const toggleTheme = () => {
      dark.value = !dark.value
      document.documentElement.classList.toggle('dark', dark.value)
    }

    return {
      name: 'William Gallëti',
      title: 'Estrategista de Sistemas',
      description: 'Crio sistemas que otimizam processos, automatizam tarefas e liberam equipes para focar no que realmente importa.',
      specialties: [
        '🔧 Desenvolvimento Full Stack com Nuxt e Django',
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
        <a href="https://wa.me/5565999448004?text=Olá, estou entrando em contato pelo seu site sobre trabalhos de freelance" class='mt-4 md:mt-0 inline-block bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg shadow hover:bg-gray-100 transition'>
          <span class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.627-5.372-12-12-12zm6.067 16.511c-.272.861-.935 1.572-1.916 1.807-.476.114-.975.165-1.587.094-.613-.07-1.322-.254-2.16-.534-2.98-1.287-4.927-4.289-5.077-4.487-.149-.198-1.213-1.612-1.213-3.074 0-1.463.768-2.182 1.04-2.479.272-.298.57-.372.768-.372.199 0 .397.002.57.01.182.01.427-.069.669.51.247.595.841 2.058.916 2.207.075.149.124.322.025.52-.1.199-.149.323-.298.497-.148.173-.312.387-.446.52-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.247.67-.148.272.1 1.733.818 2.03.967.298.149.496.223.57.347.075.124.075.719-.173 1.413z"/>
            </svg>
            Entrar em Contato
          </span>
        </a>
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
