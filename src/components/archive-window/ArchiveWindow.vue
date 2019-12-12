<template>
  <!-- Компонент окна куда выводятся отсортированные релизы / миксы (он много где используется) -->

    <div class="window-wrap">
     
      <!-- Количество найденых релизов -->
      <span class="number-of-releases" v-if="count > 0">Найден{{count == 1 ? '': 'o'}} {{count}} {{countText}}</span>

      <!-- Сюда итерируем сами релизы / миксы -->
      <div class="archive-wrap">

        <!-- Итерируемый итем -->
        <ReleaseItem 
          v-for="(release, index) of releases"
          :key="index"
          :release="release"
        />
      </div>


      <!-- Пагинация (для визуального представления был использован плагин vuejs-paginate, 
          а сама логика для работы с нашей таблицей лежит в @/mixins/pagination.mixin.js) -->
      <Paginate
        v-if="pageCount && (count > pageSize)"
        :page-count="pageCount"
        v-model="pageNum"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :active-class="'page-active'"
      />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ReleaseItem from '@/components/ReleasePrevCartItem.vue'
import paginationMixin from '@/mixins/pagination.mixin.js'

export default {
  name: 'Archive-window',
  props: ['releases', 'linkTo', 'count'],
  components: {
    ReleaseItem
  },
  computed: {
    ...mapGetters(['pageSize',]),

    // Вычисляет текст записи исходя из количества релизов
    countText() {
      if (this.count == 1) {
        return 'релиз'
      } else if (this.count <= 4) {
        return 'релиза'
      } else {
        return 'релизов'
      }
    }
  },
  mixins: [ paginationMixin ], // Тут мы инициализируем миксин который нужен для пагинации
  methods: {
    // Открывает релиз (по клику на обложку)
    openRelease(authors, release) {

      // Возможно это костыль, но по сути у нас не бывает больше 4 авторов в одном релизе
      if (authors.length === 1) {
        this.$router.push(`/release-cart/${authors[0]['permalink']}/${release}`)
      } else if (authors.length === 2) {
        this.$router.push(`/release-cart/${authors[0]['permalink']}+${authors[1]['permalink']}/${release}`)
      } else if (authors.length === 3) {
        this.$router.push(`/release-cart/${authors[0]['permalink']}+${authors[1]['permalink']}+${authors[2]['permalink']}/${release}`)
      } else {
        this.$router.push(`/release-cart/${authors[0]['permalink']}+${authors[1]['permalink']}+${authors[2]['permalink']}+${authors[3]['permalink']}/${release}`)
      }
    }
  },
  
  beforeDestroy() {
    // Когда закрываем этот компонент то чистим стор от тех релизов которые были загружены до этого
    this.$store.commit('clearReleases')
  },
}
</script>

<style scoped>

  /* Обертка под карточки и пагинацию */
  .window-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 200px;
    width: 892px;
  }

  /* Спан с количеством найденых релизов */
  .number-of-releases {
    margin-left: auto;
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 300;
  }


  /* Только для карточек */
  .archive-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  /* Делалает отступ 26 пикселей всем, кроме каждого 3 элемента */
  .release-item:not(:nth-child(3n)) {
    margin-right: 26px;
  }


  /* Карточка релиза */
  .release-item {
    margin-bottom: 60px;

  }

</style>

