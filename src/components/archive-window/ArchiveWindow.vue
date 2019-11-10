<template>
  <!-- Компонент окна куда выводятся отсортированные релизы / миксы (он много где используется) -->
  <div class="window-wrap">

    <!-- Сюда итерируем сами релизы / миксы -->
    <div class="archive-wrap">
      <div class="item"
        v-for="(item, index) of releases"
        :key="index"
      ><p>{{item.nameInfo.name}}</p>

      </div>
    </div>


    <!-- Пагинация (для визуального представления был использован плагин vuejs-paginate, 
        а сама логика для работы с нашей таблицей лежит в @/mixins/pagination.mixin.js) -->
    <Paginate
      :page-count="5"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :active-class="'page-active'"
      v-model="pageNum"
    />
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin.js'

export default {
  name: 'Archive-window',
  props: ['releases'],
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
}
</script>

<style scoped>
  .window-wrap {
    width: 892px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>

