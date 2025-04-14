<script setup>

</script>

<template>
  <div class="animated-background">
    <div class="grid-overlay"></div>
    <div class="particles-container">
      <div v-for="n in 30" :key="n" class="particle"></div>
    </div>
    <div class="circuit-lines">
      <div v-for="n in 5" :key="n" class="circuit-line"></div>
    </div>
  </div>
</template>

<style scoped>
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  opacity: 0.4;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(123, 31, 162, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(123, 31, 162, 0.3) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 30s linear infinite;
}

.dark .grid-overlay {
  background-image: 
    linear-gradient(to right, rgba(147, 51, 234, 0.3) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(147, 51, 234, 0.3) 1px, transparent 1px);
}

@keyframes grid-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgb(168, 85, 247);
  border-radius: 50%;
  animation-name: float-particle;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-iteration-count: infinite;
}

.dark .particle {
  background: rgb(192, 132, 252);
  box-shadow: 0 0 5px rgba(192, 132, 252, 0.7);
}

@keyframes float-particle {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0);
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) translateX(20px);
  }
}

/* Generate random positions and animation durations for particles */
.particle:nth-child(1) { left: 10%; animation-duration: 15s; }
.particle:nth-child(2) { left: 20%; animation-duration: 18s; animation-delay: 1s; }
.particle:nth-child(3) { left: 30%; animation-duration: 20s; animation-delay: 2s; }
.particle:nth-child(4) { left: 40%; animation-duration: 16s; animation-delay: 0.5s; }
.particle:nth-child(5) { left: 50%; animation-duration: 22s; animation-delay: 1.5s; }
.particle:nth-child(6) { left: 60%; animation-duration: 19s; animation-delay: 3s; }
.particle:nth-child(7) { left: 70%; animation-duration: 17s; animation-delay: 2.5s; }
.particle:nth-child(8) { left: 80%; animation-duration: 21s; animation-delay: 1s; }
.particle:nth-child(9) { left: 90%; animation-duration: 14s; animation-delay: 0.2s; }
.particle:nth-child(10) { left: 15%; animation-duration: 23s; animation-delay: 1.2s; }
.particle:nth-child(11) { left: 25%; animation-duration: 16s; animation-delay: 2.2s; }
.particle:nth-child(12) { left: 35%; animation-duration: 19s; animation-delay: 3.5s; }
.particle:nth-child(13) { left: 45%; animation-duration: 20s; animation-delay: 0.7s; }
.particle:nth-child(14) { left: 55%; animation-duration: 15s; animation-delay: 1.7s; }
.particle:nth-child(15) { left: 65%; animation-duration: 17s; animation-delay: 2.7s; }
.particle:nth-child(16) { left: 75%; animation-duration: 24s; animation-delay: 3.2s; }
.particle:nth-child(17) { left: 85%; animation-duration: 18s; animation-delay: 0.9s; }
.particle:nth-child(18) { left: 5%; animation-duration: 21s; animation-delay: 2.9s; }
.particle:nth-child(19) { left: 95%; animation-duration: 22s; animation-delay: 1.9s; }
.particle:nth-child(20) { left: 38%; animation-duration: 19s; animation-delay: 2.5s; }
.particle:nth-child(21) { left: 28%; animation-duration: 20s; animation-delay: 0.4s; }
.particle:nth-child(22) { left: 58%; animation-duration: 17s; animation-delay: 1.3s; }
.particle:nth-child(23) { left: 78%; animation-duration: 23s; animation-delay: 2.3s; }
.particle:nth-child(24) { left: 8%; animation-duration: 18s; animation-delay: 0.3s; }
.particle:nth-child(25) { left: 48%; animation-duration: 21s; animation-delay: 1.8s; }
.particle:nth-child(26) { left: 68%; animation-duration: 16s; animation-delay: 2.8s; }
.particle:nth-child(27) { left: 88%; animation-duration: 22s; animation-delay: 0.8s; }
.particle:nth-child(28) { left: 18%; animation-duration: 19s; animation-delay: 1.6s; }
.particle:nth-child(29) { left: 38%; animation-duration: 17s; animation-delay: 2.6s; }
.particle:nth-child(30) { left: 82%; animation-duration: 24s; animation-delay: 0.6s; }

/* Different particle sizes */
.particle:nth-child(3n) { width: 8px; height: 8px; }
.particle:nth-child(4n) { width: 4px; height: 4px; }
.particle:nth-child(5n) { width: 10px; height: 10px; opacity: 0.6; }

/* Digital dots effect */
.particle:nth-child(2n)::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  border: 1px solid rgba(168, 85, 247, 0.4);
  border-radius: 50%;
  top: -50%;
  left: -50%;
  animation: pulse 3s infinite;
}

.dark .particle:nth-child(2n)::before {
  border-color: rgba(192, 132, 252, 0.4);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Circuit lines */
.circuit-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circuit-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent);
  animation: circuit-line 8s linear infinite;
}

.circuit-line:nth-child(1) {
  top: 20%;
  width: 60%;
  left: -60%;
}

.circuit-line:nth-child(2) {
  top: 40%;
  width: 70%;
  left: -70%;
  animation-delay: 2s;
}

.circuit-line:nth-child(3) {
  top: 60%;
  width: 50%;
  right: -50%;
  animation-delay: 4s;
}

.circuit-line:nth-child(4) {
  top: 80%;
  width: 80%;
  right: -80%;
  animation-delay: 6s;
}

.circuit-line:nth-child(5) {
  top: 30%;
  width: 65%;
  right: -65%;
  animation-delay: 3s;
}

@keyframes circuit-line {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(200%);
  }
}

.dark .circuit-line {
  background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.8), transparent);
  box-shadow: 0 0 8px rgba(167, 139, 250, 0.4);
}

/* Add glowing effect to particles in dark mode */
.dark .particle {
  box-shadow: 0 0 5px rgba(192, 132, 252, 0.5);
}
</style> 