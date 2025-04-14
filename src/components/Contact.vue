<template>
  <section class="section-container mt-20 space-y-16">
    <div 
      class="bg-gradient-to-r from-purple-500 to-violet-500 text-white p-12 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300" 
      data-sr-bottom
    >
      <div class="max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-3xl font-bold mb-4">Quer otimizar seus processos?</h3>
            <p class="text-lg text-purple-100 mb-6">
              Vamos conversar sobre como posso agregar ao seu projeto ou negócio. 
              Transforme suas ideias em soluções eficientes e escaláveis.
            </p>
            <a 
              href="https://wa.me/5565999448004?text=Olá, estou entrando em contato pelo seu site sobre trabalhos de freelance" 
              class="inline-flex items-center px-8 py-3 bg-[#25D366] text-white font-semibold rounded-xl shadow-lg hover:bg-[#128C7E] transition-colors duration-200"
            >
              <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.52 3.449C18.24 1.245 15.24 0.05 12.045 0.05C5.463 0.05 0.103 5.453 0.103 12.05C0.103 14.192 0.659 16.233 1.675 18.021L0 24.25L6.335 22.6C8.076 23.532 9.975 24.014 11.925 24.014H11.93C18.51 24.014 23.87 18.611 23.87 12.014C23.87 8.798 22.709 5.843 20.52 3.449ZM12.045 22.012C10.285 22.012 8.571 21.541 7.103 20.664L6.735 20.444L2.923 21.427L3.913 17.679L3.651 17.29C2.695 15.774 2.194 14.013 2.194 12.196C2.194 6.636 6.58 2.215 12.075 2.215C14.72 2.215 17.22 3.234 19.086 5.049C20.955 6.867 21.97 9.316 21.97 12.011C21.97 17.551 17.588 22.012 12.045 22.012ZM17.498 14.507C17.198 14.351 15.727 13.638 15.458 13.517C15.188 13.399 14.993 13.348 14.793 13.635C14.593 13.928 14.048 14.582 13.877 14.783C13.707 14.979 13.537 15.007 13.242 14.854C12.948 14.7 11.962 14.368 10.798 13.318C9.894 12.503 9.298 11.501 9.127 11.203C8.957 10.906 9.111 10.752 9.256 10.608C9.39 10.482 9.552 10.28 9.693 10.109C9.836 9.937 9.891 9.816 9.997 9.621C10.106 9.424 10.06 9.257 9.981 9.102C9.9 8.948 9.302 7.49 9.058 6.9C8.82 6.316 8.576 6.387 8.396 6.387C8.226 6.36 8.031 6.36 7.834 6.36C7.638 6.36 7.319 6.436 7.045 6.734C6.776 7.031 5.999 7.744 5.999 9.197C5.999 10.653 7.042 12.058 7.178 12.255C7.319 12.452 9.299 15.426 12.239 16.8C12.957 17.103 13.517 17.283 13.956 17.416C14.647 17.637 15.277 17.608 15.772 17.529C16.323 17.44 17.523 16.814 17.767 16.119C18.013 15.426 18.013 14.85 17.93 14.731C17.85 14.609 17.698 14.557 17.498 14.507Z"/>
              </svg>
              Iniciar Conversa
            </a>
          </div>
        </div>
      </div>
    </div>

    <form class="card space-y-6" name="contact" data-netlify="true" data-sr-right>
      <h2 class="text-2xl font-semibold gradient-text mb-2">Envie uma mensagem</h2>
      <p class="text-gray-600 dark:text-gray-400">Preencha o formulário abaixo e entrarei em contato o mais breve possível.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input class="input-field" name="name" placeholder="Seu nome" required />
        <input class="input-field" name="email" type="email" placeholder="Seu e-mail" required />
      </div>
      <textarea class="input-field" name="message" placeholder="Sua mensagem..." rows="4" required></textarea>
      <button class="btn-primary w-full md:w-auto">
        <span class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
          </svg>
          Enviar Mensagem
        </span>
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white;
}

.btn-primary {
  @apply px-8 py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:from-purple-600 hover:to-violet-600 transition-all duration-200;
}

.card {
  @apply bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl;
}
</style>
 