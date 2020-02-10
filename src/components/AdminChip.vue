<template>
  <!-- Компонет чипса (одного, мы итерируем этот компонент) (используется только для выбора соц сетей) -->
  <span
    :style="`flex-grow: ${chip.length < 5 ? 1 : chip.length < 10 ? 2 : chip.length < 15 ? 3 : 4}`"
    :title="title ? title : chip"
    class="chip-item"
  >{{chip}}
    <button
      :title="buttonTitleMessage"
      class="chip-item-btn"
      @click.prevent="destroy"
    >X
    </button>
  </span>
</template>

<script>
export default {
  name: 'AdminChip',
  
  props: {
    chip: String, // Строку которую мы выводим
    buttonTitleMessage: String, // Сообщение которое мы выводим при наведении на кнопку закрытия (Убрать автора / убрать тег и тд)
    title: String // Сообщение которое мы выводим при наведении на саму чипсу
  },

  methods: {
    // Емитит, что этого автора(тег, ссылку) нужно убрать
    destroy() {
      this.$emit('destroy')
    }
  },

}
</script>

<style scoped>
  .chip-item {
    background-color: var(--primary-color);
    color: var(--primary-background-color);
    height: 1.5em;
    padding-left: 2px;
    margin: 2px;
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis;
    font-size: .8rem;
    border: 1px solid var(--primary-color);
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  /* Кнопка удаления автора */
  .chip-item-btn {
    color: white;
    height: 100%;
    width: 16px;
    text-align: center;
    font-weight: 300;
    background: rgba(128, 128, 128, 0.589);
  }

  .chip-item-btn:hover {
    cursor: pointer;
    outline: none;
    background-color: rgb(252, 87, 87);
  }

</style>