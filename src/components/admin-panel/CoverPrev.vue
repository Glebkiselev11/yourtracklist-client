<template>
  <!-- Компонент для загрузки и предпросмотра обложки для релизов / миксов -->
  <div>
    <!-- Превью обложки -->
    <div class="form__image-window" :style="coverPrev"></div>

    <input type="file" id="cover" required @change="sync">
  </div>
</template>

<script>
export default {
  name: 'Cover-prev',
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
		}
  },
}
</script>

<style scoped>
  /* Окно предпросмотра картинки которую мы загрузили */
  .form__image-window {
    width: 295px;
    height: 295px;
    border: 1px solid var(--primary-color);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
  }  

</style>