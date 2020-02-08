<template>
  <!-- Компонент предназначен для 1 трека, который можно послушать (будет использоваться в релизах а потом и по отдельности) -->
    <div>
      <!-- Название трека -->
      <div>
        <span 
        v-for="(author, y) of track.authors_name"
        :key="y"
        >
          {{author}}
        </span>
          —
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