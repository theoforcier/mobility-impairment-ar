export function getFormattedDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

export function getFormattedDateUTC() {
  const today = new Date();
  const dd = String(today.getUTCDate()).padStart(2, '0');
  const mm = String(today.getUTCMonth() + 1).padStart(2, '0');
  const yyyy = today.getUTCFullYear();
  return yyyy + '-' + mm + '-' + dd;
}