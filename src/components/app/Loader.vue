<template>
  <!-- Компонент для отображения загрузки -->
  <div class="loader"></div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>

.loader {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid black; /* Blue */
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 0.8s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>