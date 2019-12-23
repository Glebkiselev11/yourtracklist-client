<template>
  <!-- Компонент для выбора максимального/минимального количества треков в релизах -->
  <div class="min-max-wrap">
    <h3 class="sorting-title">Количество треков</h3>

    <div class="min-max-item">
      <button class="count-button"
        :class="minPossible >= minTracks ? 'count-button--disable' : ''" 
        @click="minusMinTracks"
      >—</button>
      
      <input type="text" v-model="minTracks" id="minTracks" readonly>
      
      <button class="count-button" 
        :class="maxPossible <= minTracks ? 'count-button--disable' : ''"
        @click="plusMinTracks"
      >+</button>
      
      <label for="minTracks">Минимум</label>
    </div>

    <div class="min-max-item">
      <button class="count-button"
        :class="minPossible >= maxTracks ? 'count-button--disable' : ''"
        @click="minusMaxTracks"
      >—</button>
      
      <input type="text" v-model="maxTracks" id="maxTracks" readonly>
      
      <button class="count-button"
        :class="maxPossible <= maxTracks ? 'count-button--disable' : ''" 
        @click="plusMaxTracks"
      >+</button>

      <label for="maxTracks">Максимум</label>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Min-max-tracks',
  props: [
    'minTracks', // Минимальное кол-во треков в релизах
    'maxTracks', // Максимальное кол-во треков в релизах
    'rangeNumberOfTracks', // Диапазон доступного кол-ва треков в релизах
  ],
  computed: {
    // Минимальное возможное кол-во треков, мы этот показатель вытаскиваем из rangeNumberOfTracks
    minPossible() {
      return this.rangeNumberOfTracks[0]
    },
    // Максимально возмоное кол-во треков
    maxPossible() {
      return this.rangeNumberOfTracks[this.rangeNumberOfTracks.length - 1]
    }

  },
  methods: {
    // Методы для управления плюсом и минусом
    plusMinTracks() {
      console.log(this.rangeNumberOfTracks)

      console.log(this.minTracks)
      let min = this.minTracks + 1


      this.$emit('min', min)
    },
    minusMinTracks() {
      let min = this.minTracks - 1
      this.$emit('min', min)
    },

    plusMaxTracks() {
      let max = this.maxTracks + 1
      this.$emit('max', max)
    },

    minusMaxTracks() {
      let max = this.maxTracks - 1
      this.$emit('max', max)
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
    background-color: black;
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