<template>
  <!-- Компонент предназначен для 1 трека, который можно послушать (будет использоваться в релизах а потом и по отдельности) -->
    <div>
      
      <div>
        <span
          v-for="(author, index) of track.authors_permalink"
          :key="index"
          class="author-item"
        >
          <router-link 
            
            :to="`/author/${author}`"
            class="author-link"
            >{{track.authors_name[index]}}</router-link>{{track.authors_name.length - 1 != index ? ' & ' : ''}}
        </span>
        
          —
        <!-- Название трека -->  
        <span>{{track.name}}</span>

      </div>

      <!-- Длительность трека -->
      <span>{{computedDuration(track.duration)}}</span>

    </div>
    

</template>

<script>
import duration from '@/mixins/duration.mixin.js'

export default {
  name: 'AppTrackItem',

  mixins: [
    duration, // Внутри computedDuration он превращает секунды например 90 в 01:30
  ],

  props: {
    track: Object
  }


}
</script>

<style sooped>
  .author-item {
    font-weight: 500;
  }

  .author-link:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.829);
  }
</style>