<template>
  <!-- Компонент для выбора максимального/минимального количества треков в релизах -->
  <div class="min-max-wrap">
    <h3 class="sorting-title">Количество треков</h3>

    <div class="min-max-item">
      <button class="count-button" @click="minusMinTracks">—</button>
      <input type="text" v-model="minTracks" id="minTracks" readonly>
      <button class="count-button" @click="plusMinTracks">+</button>
      
      <label for="minTracks">Минимум</label>
    </div>

    <div class="min-max-item">
      <button class="count-button" @click="minusMaxTracks">—</button>
      <input type="text" v-model="maxTracks" id="maxTracks" readonly>
      <button class="count-button" @click="plusMaxTracks">+</button>

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
  ],
  
  methods: {
    // Методы для управления плюсом и минусом
    plusMinTracks() {
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
</style>