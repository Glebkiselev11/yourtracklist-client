<template>
  <!-- Компонент для выбора максимального/минимального количества треков в релизах -->
  <div class="min-max-wrap">
    <h3 class="sorting-title">Количество треков</h3>

    <!-- Кнопки плюс и минус блокируем так, чтобы нельзя было выбрать заранее неправильное кол-во треков в релизах -->
    <div class="min-max-item">
      <button 
        :class="minPossible >= minTracks ? 'count-button--disable' : ''"
        class="count-button" 
        @click="minusMinTracks"
      >—
      </button>
      
      <input
        id="minTracks" 
        v-model="minTracks" 
        type="text" 
        readonly
      >
      
      <button  
        :class="maxPossible <= minTracks || minTracks === maxTracks ? 'count-button--disable' : ''"
        class="count-button"
        @click="plusMinTracks"
      >+
      </button>
      
      <label for="minTracks">Минимум</label>
    </div>

    <div class="min-max-item">
      <button class="count-button"
        :class="minPossible >= maxTracks || minTracks === maxTracks ? 'count-button--disable' : ''"
        @click="minusMaxTracks"
      >—</button>
      
      <input
        id="maxTracks"
        v-model="maxTracks"
        type="text" 
        readonly
      >
      
      <button 
        :class="maxPossible <= maxTracks ? 'count-button--disable' : ''" 
        class="count-button"
        @click="plusMaxTracks"
      >+
      </button>

      <label for="maxTracks">Максимум</label>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SortSideReleasesArchiveMinMaxTracks',

  props: {
    minTracks: { // Минимальное кол-во треков в релизах
      type: Number,
      default: 0,
    }, 
    maxTracks: {
      type: Number,
      default: 5
    }, // Максимальное кол-во треков в релизах
    rangeNumberOfTracks: Array, // Диапазон доступного кол-ва треков в релизах
  },

  computed: {
    // Минимальное возможное кол-во треков, мы этот показатель вытаскиваем из rangeNumberOfTracks
    minPossible() {
      return this.rangeNumberOfTracks ? this.rangeNumberOfTracks[0] : this.minTracks
    },
    // Максимально возмоное кол-во треков
    maxPossible() {
      return this.rangeNumberOfTracks ? this.rangeNumberOfTracks[this.rangeNumberOfTracks.length - 1] : this.maxTracks
    }
  },

  methods: {
    // Методы для управления плюсом и минусом
    plusMinTracks() {
      // Тут мы просто проходимся циклом по массиву и ищем первое ближайшее кол-во треков
      for(let i = 0; i < this.rangeNumberOfTracks.length; i++) {
        if (this.rangeNumberOfTracks[i] == this.minTracks) { 
          this.$emit('min', this.rangeNumberOfTracks[i + 1])
          break
        }
      }
    },
    
    minusMinTracks() {
      for(let i = this.rangeNumberOfTracks.length; i > 0; i--) {
        if (this.rangeNumberOfTracks[i] == this.minTracks) { 
          this.$emit('min', this.rangeNumberOfTracks[i - 1])
          break
        }
      }
    },

    plusMaxTracks() {
      for(let i = 0; i < this.rangeNumberOfTracks.length; i++) {
        if (this.rangeNumberOfTracks[i] == this.maxTracks) { 
          this.$emit('max', this.rangeNumberOfTracks[i + 1])
          break
        }
      }
    },

    minusMaxTracks() {
      for(let i = this.rangeNumberOfTracks.length; i > 0; i--) {
        if (this.rangeNumberOfTracks[i] == this.maxTracks) { 
          this.$emit('max', this.rangeNumberOfTracks[i - 1])
          break
        }
      }
    }
    
  }
}
</script>

<style scoped>

  .min-max-wrap {
    margin-top: 50px;
  }

  .sorting-title {
    font-size: 20px;
    font-weight: 500;
    display: block; 
    margin-bottom: 20px;
  }

  .min-max-item {
    margin-bottom: 10px;
  }

  .min-max-item input{
    text-align: center;
    max-width: 18px;
    font-size: 16px;
    outline: none;
    border: none;
    border-bottom: 1px solid grey;
    margin: 0 10px;
  }

  .min-max-item label {
    margin-left: 15px;
  }

  .count-button {
    width: 20px;
    outline: none;
    font-size: 16px;
    border: 1px solid grey;
  }

  .count-button:hover {
    background-color: var(--primary-color);
    color: white;
  }

  /* Класс для неактивной кнопки, нужен для того, что если нету релизов у которых треков меньше 2, то мы блочим нажатия на минус, если уже стоит 2 */
  .count-button--disable {
    background-color: rgba(128, 128, 128, 0.384);
    pointer-events: none;
    color: rgba(128, 128, 128, 0.342);
    border: 1px solid rgba(128, 128, 128, 0.445);
  }

</style>