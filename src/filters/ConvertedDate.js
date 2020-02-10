// Преобразует формат времени в ISO в более привлекательный формат
export default function (date) {
  return new Date(date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', year: 'numeric' })
}