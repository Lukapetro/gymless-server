export function getToday() {
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var yyyy = today.getFullYear()

  return (today = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z')
}
