<template>
  <!-- Админ панель, в будущем личный кабинет, пока используется, чтобы удобнее добавлять новых артистов -->
  <div class="admin-wrap">
    <h1 class="author-title">Админ панель</h1>

    <!--  модуль для добавления нового автора в базу -->
    <AddNewAuthor /> 

    
  </div>
</template>

<script>
import AddNewAuthor from '@/components/admin-panel/AddNewAuthor.vue'
export default {
  name: 'Admin-panel',
  components: {
    AddNewAuthor
  },
  
}
</script>

<style scoped>
  .admin-wrap {
    height: 100%;

  }
  
</style>