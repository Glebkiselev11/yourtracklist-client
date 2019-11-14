<template>
  <!-- Админ панель, в будущем личный кабинет, пока используется, чтобы удобнее добавлять новых артистов -->
  <div class="admin-wrap">
    <h1 class="author-title">Админ панель</h1>

    <!--  модуль для добавления нового автора в базу -->
    <AddNewAuthor /> 

    <hr>

    <AddNewRelease />
    

    
  </div>
</template>

<script>
import AddNewAuthor from '@/components/admin-panel/AddNewAuthor.vue'
import AddNewRelease from '@/components/admin-panel/AddNewRelease.vue'
export default {
  name: 'Admin-panel',
  components: {
    AddNewAuthor, AddNewRelease
  },
  
}
</script>

<style scoped>
  .admin-wrap {
    height: 100%;
    width: 100%;
  }
  
</style>