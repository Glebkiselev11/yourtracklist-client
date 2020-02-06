<template>
  <!-- Компонент для выбора типа сортировки релизов / видео / миксов -->
  <select v-model="sort">
    <option value="new">Сначала новые</option>
    <option value="old">Сначала старые</option>
    <option value="random">В случайном порядке</option>
    <option value="artist">По исполнителю</option>
  </select>
</template>

<script>
export default {
  name: 'SortSideSelect',

  props: ['sorting'],
  
  computed: {
    sort: {
      get() {
        return this.sorting
      },
      set(s) {
        this.$emit('sorting', s)
      }
    }
  },

  
}
</script>

<style scoped>

  .sort-side-bar-wrap {
    height: 100%;
    width: 280px;
  }

  select {
    border: none;
    font-size: 20px;
    font-weight: 500;
    margin-left: -4px;

  }
  select:focus {
    outline: none;
  }
  </style>