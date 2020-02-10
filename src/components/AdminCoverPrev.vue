<template>
  <!-- Компонент для загрузки и предпросмотра обложки для релизов / миксов -->
  <div>
    <!-- Превью обложки -->
    <div class="form__image-window" :style="coverPrev">

      <!-- Сам инпут мы не отображаем -->
      <input 
        id="cover"
        type="file" 
        accept="image/jpeg" 
        required 
        @change="sync" 
      >
      
      <!-- Отображаем лейбл к нему (в том случае если картинка еще не загружена) -->
      <label 
        v-if="!coverPrev"
        for="cover"
        class="btn-add-cover" 
      >Выбрать изображение
      </label>
      
      <!-- Удаление обложки (если случайно залил не ту картинку) -->
      <span
        v-else
        class="close-btn"
        @click="deleteImage"
      >X
      </span>

    </div>

  </div>
</template>

<script>
export default {
  name: 'AdminCoverPrev',

  data: () => ({
    coverPrev: '', // Предпросмотр картинки
  }),

  methods: {
    // Нужно для предпросмотра обложки
    selectImage (file) {
      // Отправляем в родительский компонент файл для отправки на бэк
      this.$emit('cover', file)

      let reader = new FileReader();

      reader.onload = this.onImageLoad;
      reader.readAsDataURL(file);
		},
		sync (e) {
      e.preventDefault();
      this.selectImage(e.target.files[0]);
		},
		onImageLoad (e) {
      this.content = e.target.result;
      this.coverPrev = `background-image: url("${this.content}")`;
    },
    
    // Метод для удаления обложки (Если мы случайно выбрали не ту оболжку)
    deleteImage() {
      this.coverPrev = ''
      this.$emit('cover', null)
    }
  },
  
}
</script>

<style scoped>
  /* Окно предпросмотра картинки которую мы загрузили */
  .form__image-window {
    width: 200px;
    height: 200px;
    border: 1px solid var(--primary-color);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }  

  .form__image-window #cover {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .form__image-window .btn-add-cover:hover {
    cursor: pointer;
  }

  /* Кнопка удаления картинки */
  .close-btn {
    position: absolute;
    content: '';
    width: 20px;
    text-align: center;
    right: 0;
    top: 0;
    background-color: white;
    border: 1px solid black;
  }

  .close-btn:hover {
    cursor: pointer;
  }



</style>