// Генерирует сообщение об ошибке
export default function(error) {
  if (error.response.data.message) {
    return error.response.data.message
  } else {
    return 'Ошибка подключения к серверу'
  }
}
